import {
  createCreatorApplicationFormSchema,
  creatorApplicationCreateBodySchema,
} from '../models/creator-application.model';
import type { CreatorApplicationModalCopy } from '../models/creator-application-modal.copy';
import { formDataToCreatorApplicationPayload } from './creator-application-form-payload';
import { CREATORS_PORTAL_REGISTER_URL } from '../constants/site';

const TOTAL_STEPS = 4;
const REDIRECT_DELAY_MS = 3000;

const readJson = <T>(id: string): T => {
  const raw = document.getElementById(id)?.textContent ?? '{}';
  return JSON.parse(raw) as T;
};

const parseErrorMessage = async (res: Response | null): Promise<string | null> => {
  if (res === null) return null;
  const body = (await res.json().catch(() => null)) as { message?: string } | null;
  const msg = body?.message?.trim();
  return msg && msg.length > 0 ? msg : null;
};

const normalizePhoneForRedirect = (phone: string | null | undefined): string => {
  const trimmed = String(phone ?? '').trim();
  if (trimmed.length === 0) return '';
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/[^\d+]/g, '').replace(/\+/g, '');
  return digits.length === 0 ? '' : hasPlus ? `+${digits}` : digits;
};

export const mountCreatorApplicationModal = (): void => {
  const copy = readJson<CreatorApplicationModalCopy>('creator-application-json');
  const lang = (document.getElementById('creator-application-json')?.dataset.lang ?? 'en') as
    | 'en'
    | 'es';

  const dialog = document.getElementById('creator-application-dialog');
  const form = document.getElementById('creator-application-form');
  const formWrap = document.getElementById('creator-application-form-wrap');
  const thankYou = document.getElementById('thank-you-screen');
  const statusEl = document.getElementById('creator-application-status');
  const stepLabel = document.getElementById('creator-application-step-label');
  const submitBtn = document.getElementById('creator-application-submit');
  const submitLabel = document.getElementById('creator-application-submit-label');
  const nextBtn = document.getElementById('creator-application-next');
  const backBtn = document.getElementById('creator-application-back');
  const spinner = document.querySelector('[data-creator-application-spinner]');

  if (!(dialog instanceof HTMLDialogElement)) return;
  if (!(form instanceof HTMLFormElement)) return;
  if (!(submitBtn instanceof HTMLButtonElement)) return;

  let currentStep = 1;
  let redirectPayload: {
    name: string;
    surname: string;
    email: string;
    phone: string;
  } | null = null;

  const formSchema = createCreatorApplicationFormSchema(copy.validation);

  const fieldsets = () =>
    [...form.querySelectorAll<HTMLFieldSetElement>('fieldset[data-step]')].sort(
      (a, b) => Number(a.dataset.step) - Number(b.dataset.step),
    );

  const updateStepUi = () => {
    fieldsets().forEach((fs) => {
      const step = Number(fs.dataset.step);
      fs.dataset.active = step === currentStep ? 'true' : 'false';
    });
    if (stepLabel) {
      stepLabel.textContent = copy.stepOf
        .replace('{current}', String(currentStep))
        .replace('{total}', String(TOTAL_STEPS));
    }
    if (backBtn instanceof HTMLButtonElement) {
      backBtn.disabled = currentStep <= 1;
    }
    if (nextBtn instanceof HTMLButtonElement) {
      nextBtn.classList.toggle('hidden', currentStep >= TOTAL_STEPS);
    }
    if (submitBtn) {
      submitBtn.classList.toggle('hidden', currentStep < TOTAL_STEPS);
    }
  };

  const setSubmitVisual = (state: 'idle' | 'sending') => {
    submitBtn.dataset.status = state;
    submitBtn.disabled = state === 'sending';
    if (nextBtn instanceof HTMLButtonElement) nextBtn.disabled = state === 'sending';
    if (backBtn instanceof HTMLButtonElement) backBtn.disabled = state === 'sending' || currentStep <= 1;
    if (submitLabel) submitLabel.textContent = state === 'sending' ? copy.submitting : copy.submit;
    spinner?.classList.toggle('hidden', state !== 'sending');
  };

  const showStatusError = (message: string) => {
    if (!(statusEl instanceof HTMLElement)) return;
    statusEl.dataset.status = 'error';
    statusEl.textContent = message;
    statusEl.classList.remove('hidden');
  };

  const clearStatus = () => {
    if (!(statusEl instanceof HTMLElement)) return;
    statusEl.dataset.status = 'idle';
    statusEl.textContent = '';
    statusEl.classList.add('hidden');
  };

  const validateCurrentStep = (): boolean => {
    const active = fieldsets().find((fs) => Number(fs.dataset.step) === currentStep);
    if (!active) return false;

    if (currentStep === 2) {
      const checked = form.querySelectorAll<HTMLInputElement>('input[name="platforms"]:checked');
      if (checked.length === 0) {
        showStatusError(copy.validation.platformsRequired);
        return false;
      }
    }

    return active.checkValidity();
  };

  const enterSuccessLockedState = () => {
    dialog.dataset.phase = 'redirecting';
    dialog.setAttribute('closedby', 'none');
    if (formWrap instanceof HTMLElement) formWrap.dataset.visible = 'false';
    const actions = document.getElementById('creator-application-actions');
    if (actions instanceof HTMLElement) actions.dataset.visible = 'false';
    if (thankYou instanceof HTMLElement) thankYou.dataset.visible = 'true';
    if (statusEl instanceof HTMLElement) {
      statusEl.dataset.status = 'redirecting';
      statusEl.classList.add('hidden');
    }
    document.querySelectorAll('[data-creator-application-close]').forEach((el) => {
      if (el instanceof HTMLButtonElement) el.disabled = true;
    });
  };

  const resetModal = () => {
    currentStep = 1;
    redirectPayload = null;
    dialog.dataset.phase = 'idle';
    dialog.removeAttribute('closedby');
    form.reset();
    if (formWrap instanceof HTMLElement) formWrap.dataset.visible = 'true';
    const actions = document.getElementById('creator-application-actions');
    if (actions instanceof HTMLElement) actions.dataset.visible = 'true';
    if (thankYou instanceof HTMLElement) thankYou.dataset.visible = 'false';
    clearStatus();
    setSubmitVisual('idle');
    updateStepUi();
    document.querySelectorAll('[data-creator-application-close]').forEach((el) => {
      if (el instanceof HTMLButtonElement) el.disabled = false;
    });
  };

  const openDialog = () => {
    resetModal();
    dialog.showModal();
    const first = form.querySelector<HTMLElement>('input, select, textarea');
    window.setTimeout(() => first?.focus(), 0);
  };

  document.querySelectorAll('[data-open-creator-application]').forEach((el) => {
    el.addEventListener('click', openDialog);
  });

  document.querySelectorAll('[data-creator-application-close]').forEach((el) => {
    el.addEventListener('click', () => {
      if (dialog.dataset.phase === 'redirecting') return;
      dialog.close();
      resetModal();
    });
  });

  dialog.addEventListener('cancel', (ev) => {
    if (dialog.dataset.phase === 'redirecting') {
      ev.preventDefault();
    }
  });

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (!validateCurrentStep()) {
        form.reportValidity();
        return;
      }
      clearStatus();
      if (currentStep < TOTAL_STEPS) {
        currentStep += 1;
        updateStepUi();
      }
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep -= 1;
        updateStepUi();
      }
    });
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    clearStatus();

    if (!validateCurrentStep()) {
      form.reportValidity();
      return;
    }

    const raw = formDataToCreatorApplicationPayload(new FormData(form), lang);
    const parsedForm = formSchema.safeParse(raw);

    if (!parsedForm.success) {
      const firstIssue = parsedForm.error.issues[0];
      showStatusError(firstIssue?.message ?? copy.errorSummary);
      const path = firstIssue?.path[0];
      if (typeof path === 'string') {
        const el = form.querySelector<HTMLElement>(`[name="${path}"]`);
        el?.focus();
      }
      return;
    }

    const apiReady = creatorApplicationCreateBodySchema.safeParse(parsedForm.data);
    if (!apiReady.success) {
      showStatusError(copy.errorSummary);
      return;
    }

    setSubmitVisual('sending');

    const res = await fetch('/api/creator-applications/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(apiReady.data),
    }).catch(() => null);

    if (res === null || !res.ok) {
      const serverMessage = await parseErrorMessage(res);
      showStatusError(serverMessage ?? copy.validation.sendFailed);
      setSubmitVisual('idle');
      return;
    }

    redirectPayload = {
      name: apiReady.data.name,
      surname: apiReady.data.surname,
      email: apiReady.data.email,
      phone: normalizePhoneForRedirect(apiReady.data.phone),
    };

    enterSuccessLockedState();

    window.setTimeout(() => {
      if (!redirectPayload) return;
      const params = new URLSearchParams({
        name: redirectPayload.name,
        surname: redirectPayload.surname,
        email: redirectPayload.email,
        phone: redirectPayload.phone,
      });
      window.location.href = `${CREATORS_PORTAL_REGISTER_URL}?${params.toString()}`;
    }, REDIRECT_DELAY_MS);
  });

  updateStepUi();
};
