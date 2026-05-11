import { creatorApplicationPayloadSchema } from '../models/creator-application.model';
import type { CreatorApplyFormCopy } from '../models/creator-apply-form.copy';
import { formDataToCreatorApplicationPayload } from './creator-apply-form-payload';
import {
  mapCreatorApplyIssuesToFieldMessages,
  type CreatorApplyFieldKey,
} from './creator-apply-form-validation-messages';

const FIELD_ORDER: CreatorApplyFieldKey[] = [
  'fullName',
  'email',
  'country',
  'primaryPlatform',
  'profileOrHandle',
  'audienceBand',
  'contentLanguages',
  'contentPitch',
  'sampleLinks',
  'agreePrivacy',
];

/** Tokens sueltos: `classList` no admite un string con espacios. */
const INPUT_ERROR_CLASSES = ['border-error/60', 'ring-2', 'ring-error/20'] as const;

const setInputErrorClasses = (el: HTMLElement, on: boolean) => {
  INPUT_ERROR_CLASSES.forEach((token) => {
    el.classList.toggle(token, on);
  });
};

const readJson = <T>(id: string): T => {
  const raw = document.getElementById(id)?.textContent ?? '{}';
  return JSON.parse(raw) as T;
};

const clearFieldUi = (form: HTMLFormElement, field: CreatorApplyFieldKey) => {
  const msg = form.querySelector(`[data-field-error="${field}"]`);
  if (msg instanceof HTMLElement) {
    msg.textContent = '';
    msg.classList.add('hidden');
  }
  const control = form.querySelector(`[name="${field}"]`);
  if (control instanceof HTMLElement) {
    control.removeAttribute('aria-invalid');
    setInputErrorClasses(control, false);
  }
};

const clearAllFieldErrors = (form: HTMLFormElement) => {
  FIELD_ORDER.forEach((field) => {
    clearFieldUi(form, field);
  });
};

const setFieldErrors = (
  form: HTMLFormElement,
  messages: Partial<Record<CreatorApplyFieldKey, string>>,
) => {
  Object.entries(messages).forEach(([key, text]) => {
    const field = key as CreatorApplyFieldKey;
    const msg = form.querySelector(`[data-field-error="${field}"]`);
    if (msg instanceof HTMLElement && text.length > 0) {
      msg.textContent = text;
      msg.classList.remove('hidden');
    }
    const control = form.querySelector(`[name="${field}"]`);
    if (control instanceof HTMLElement && text.length > 0) {
      control.setAttribute('aria-invalid', 'true');
      setInputErrorClasses(control, true);
    }
  });
};

const focusFirstInvalid = (form: HTMLFormElement, messages: Partial<Record<CreatorApplyFieldKey, string>>) => {
  const first = FIELD_ORDER.find((k) => messages[k] !== undefined);
  if (first === undefined) return;
  const el = form.querySelector(`[name="${first}"]`);
  if (el instanceof HTMLElement) {
    el.focus();
  }
};

const submitRemote = async (payload: Record<string, unknown>, applyApiUrl: string) => {
  if (applyApiUrl.length > 0) {
    const res = await fetch(applyApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('apply_http');
    return;
  }
  if (import.meta.env.DEV) {
    console.warn(
      '[Slowork Creators] PUBLIC_CREATORS_APPLY_URL is not set; application is not persisted server-side.',
    );
  }
};

export function mountCreatorApplyForm(): void {
  const copy = readJson<CreatorApplyFormCopy>('creator-apply-json');
  const { applyApiUrl, portalUrl } = readJson<{ applyApiUrl: string; portalUrl: string }>('creator-apply-runtime');

  const formDialog = document.getElementById('creator-apply-dialog');
  const successDialog = document.getElementById('creator-apply-success-dialog');
  const form = document.getElementById('creator-apply-form');
  const formSummaryError = document.getElementById('creator-apply-form-error');
  const submitBtn = document.getElementById('creator-apply-submit');

  if (!(form instanceof HTMLFormElement) || !(submitBtn instanceof HTMLButtonElement)) return;

  const showSummaryError = (message: string) => {
    if (!(formSummaryError instanceof HTMLElement)) return;
    formSummaryError.textContent = message;
    formSummaryError.classList.remove('hidden');
  };

  const clearSummaryError = () => {
    if (!(formSummaryError instanceof HTMLElement)) return;
    formSummaryError.textContent = '';
    formSummaryError.classList.add('hidden');
  };

  const goPortal = () => {
    window.location.href = portalUrl.length > 0 ? portalUrl : 'https://portal.slowork.app/login';
  };

  const openForm = () => {
    if (!(formDialog instanceof HTMLDialogElement)) return;
    clearSummaryError();
    clearAllFieldErrors(form);
    formDialog.showModal();
    window.setTimeout(() => {
      const first = document.getElementById('creator-apply-fullName');
      if (first instanceof HTMLInputElement) first.focus();
    }, 0);
  };

  document.querySelectorAll('[data-open-creator-apply]').forEach((el) => {
    el.addEventListener('click', openForm);
  });

  document.querySelectorAll('[data-creator-apply-close]').forEach((el) => {
    el.addEventListener('click', () => {
      if (formDialog instanceof HTMLDialogElement) formDialog.close();
    });
  });

  document.querySelectorAll('[data-creator-success-close]').forEach((el) => {
    el.addEventListener('click', () => {
      if (successDialog instanceof HTMLDialogElement) successDialog.close();
    });
  });

  document.getElementById('creator-apply-success-portal')?.addEventListener('click', goPortal);

  const showSuccess = () => {
    if (formDialog instanceof HTMLDialogElement) formDialog.close();
    if (successDialog instanceof HTMLDialogElement) {
      successDialog.showModal();
      window.setTimeout(goPortal, 2800);
    }
  };

  form.addEventListener('input', (ev) => {
    const target = ev.target;
    if (!(target instanceof HTMLElement)) return;
    const name = target.getAttribute('name');
    if (
      name === 'fullName' ||
      name === 'email' ||
      name === 'country' ||
      name === 'primaryPlatform' ||
      name === 'profileOrHandle' ||
      name === 'audienceBand' ||
      name === 'contentLanguages' ||
      name === 'contentPitch' ||
      name === 'sampleLinks' ||
      name === 'agreePrivacy'
    ) {
      clearFieldUi(form, name);
      clearSummaryError();
    }
  });

  form.addEventListener('change', (ev) => {
    const target = ev.target;
    if (!(target instanceof HTMLElement)) return;
    const name = target.getAttribute('name');
    if (
      name === 'primaryPlatform' ||
      name === 'audienceBand' ||
      name === 'contentLanguages' ||
      name === 'agreePrivacy'
    ) {
      clearFieldUi(form, name);
      clearSummaryError();
    }
  });

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    clearSummaryError();
    clearAllFieldErrors(form);

    const fd = new FormData(form);
    const raw = formDataToCreatorApplicationPayload(fd);
    const parsed = creatorApplicationPayloadSchema.safeParse(raw);

    if (!parsed.success) {
      const byField = mapCreatorApplyIssuesToFieldMessages(parsed.error.issues, copy.validation);
      setFieldErrors(form, byField);
      showSummaryError(copy.errorSummary);
      focusFirstInvalid(form, byField);
      return;
    }

    submitBtn.disabled = true;
    const prevLabel = submitBtn.textContent;
    submitBtn.textContent = copy.submitting;

    try {
      await submitRemote(parsed.data as unknown as Record<string, unknown>, applyApiUrl);
      showSuccess();
    } catch {
      showSummaryError(copy.errorNetwork);
    } finally {
      submitBtn.disabled = false;
      if (prevLabel) submitBtn.textContent = prevLabel;
    }
  });
}
