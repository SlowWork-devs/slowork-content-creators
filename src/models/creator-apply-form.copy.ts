/** Textos UI + validación del formulario «registro creador» (solo datos, sin lógica). */

export interface CreatorApplyFormValidationCopy {
  fullName: string;
  email: string;
  country: string;
  profileOrHandle: string;
  contentPitchMin: string;
  contentPitchMax: string;
  sampleLinks: string;
  agreePrivacy: string;
  choiceInvalid: string;
}

export interface CreatorApplyFormCopy {
  dialogTitle: string;
  dialogLead: string;
  fieldFullName: string;
  fieldEmail: string;
  fieldCountry: string;
  fieldCountryHint: string;
  fieldPlatform: string;
  optInstagram: string;
  optTiktok: string;
  optYoutube: string;
  optOther: string;
  fieldProfile: string;
  fieldProfileHint: string;
  fieldAudience: string;
  audLt5k: string;
  aud5k25k: string;
  aud25k100k: string;
  aud100kplus: string;
  audPreferNot: string;
  fieldLanguages: string;
  langEn: string;
  langEs: string;
  langBoth: string;
  fieldPitch: string;
  fieldPitchHint: string;
  fieldSamples: string;
  fieldSamplesHint: string;
  consentPrefix: string;
  consentLinkLabel: string;
  submit: string;
  cancel: string;
  closeFormAria: string;
  closeSuccessAria: string;
  submitting: string;
  errorSummary: string;
  errorNetwork: string;
  successTitle: string;
  successBody: string;
  successButton: string;
  validation: CreatorApplyFormValidationCopy;
}

const creatorApplyFormCopyEn: CreatorApplyFormCopy = {
  dialogTitle: 'Register as a Slowork creator',
  dialogLead:
    'Share how you create and where you publish. We read every submission with care, not as a volume funnel.',
  fieldFullName: 'Full name',
  fieldEmail: 'Email',
  fieldCountry: 'Country or region (optional)',
  fieldCountryHint: 'e.g. Spain, Portugal, Mexico',
  fieldPlatform: 'Main platform today',
  optInstagram: 'Instagram',
  optTiktok: 'TikTok',
  optYoutube: 'YouTube',
  optOther: 'Other',
  fieldProfile: 'Profile link or handle',
  fieldProfileHint: 'https://… or @yourhandle',
  fieldAudience: 'Audience on that platform',
  audLt5k: 'Under 5,000',
  aud5k25k: '5,000 – 25,000',
  aud25k100k: '25,000 – 100,000',
  aud100kplus: 'Over 100,000',
  audPreferNot: 'Prefer not to say',
  fieldLanguages: 'Main language of your public content',
  langEn: 'English',
  langEs: 'Spanish',
  langBoth: 'English and Spanish',
  fieldPitch: 'How does your content fit Slowork?',
  fieldPitchHint: 'At least a short paragraph: themes, tone, and why this program suits you.',
  fieldSamples: 'Sample links (optional)',
  fieldSamplesHint: 'URLs to posts or videos, one per line.',
  consentPrefix: 'I have read and accept the ',
  consentLinkLabel: 'privacy policy',
  submit: 'Submit and continue',
  cancel: 'Cancel',
  closeFormAria: 'Close registration form',
  closeSuccessAria: 'Close confirmation',
  submitting: 'Sending…',
  errorSummary: 'Please fix the fields below and try again.',
  errorNetwork: 'We could not send your application right now. Please try again in a few minutes.',
  successTitle: 'You are all set',
  successBody:
    'Thank you for your interest. We are taking you to the Slowork portal to log in or create your account.',
  successButton: 'Go to portal now',
  validation: {
    fullName: 'Enter at least 2 characters.',
    email: 'Enter a valid email address.',
    country: 'Use at most 80 characters.',
    profileOrHandle: 'Enter at least 2 characters (link or handle).',
    contentPitchMin: 'Write at least 30 characters so we can understand your fit.',
    contentPitchMax: 'Keep this field under 2,500 characters.',
    sampleLinks: 'Keep sample links under 2,000 characters.',
    agreePrivacy: 'You need to accept the privacy policy to continue.',
    choiceInvalid: 'Please choose a valid option.',
  },
};

const creatorApplyFormCopyEs: CreatorApplyFormCopy = {
  dialogTitle: 'Registro como creador Slowork',
  dialogLead:
    'Cuéntanos cómo creas y dónde publicas. Leemos cada solicitud con calma, no como un embudo masivo.',
  fieldFullName: 'Nombre completo',
  fieldEmail: 'Correo electrónico',
  fieldCountry: 'País o región (opcional)',
  fieldCountryHint: 'p. ej. España, Portugal, México',
  fieldPlatform: 'Plataforma principal hoy',
  optInstagram: 'Instagram',
  optTiktok: 'TikTok',
  optYoutube: 'YouTube',
  optOther: 'Otra',
  fieldProfile: 'Enlace al perfil o @usuario',
  fieldProfileHint: 'https://… o @usuario',
  fieldAudience: 'Audiencia en esa plataforma',
  audLt5k: 'Menos de 5.000',
  aud5k25k: '5.000 – 25.000',
  aud25k100k: '25.000 – 100.000',
  aud100kplus: 'Más de 100.000',
  audPreferNot: 'Prefiero no decirlo',
  fieldLanguages: 'Idioma principal de tu contenido público',
  langEn: 'Inglés',
  langEs: 'Español',
  langBoth: 'Inglés y español',
  fieldPitch: '¿Cómo encaja tu contenido con Slowork?',
  fieldPitchHint: 'Al menos un párrafo corto: temas, tono y por qué te encaja este programa.',
  fieldSamples: 'Enlaces de ejemplo (opcional)',
  fieldSamplesHint: 'URLs a publicaciones o vídeos, una por línea.',
  consentPrefix: 'He leído y acepto la ',
  consentLinkLabel: 'política de privacidad',
  submit: 'Enviar y continuar',
  cancel: 'Cancelar',
  closeFormAria: 'Cerrar formulario de registro',
  closeSuccessAria: 'Cerrar confirmación',
  submitting: 'Enviando…',
  errorSummary: 'Corrige los campos marcados e inténtalo de nuevo.',
  errorNetwork: 'No hemos podido enviar tu solicitud ahora. Vuelve a intentarlo en unos minutos.',
  successTitle: 'Todo listo',
  successBody:
    'Gracias por tu interés. Te llevamos al portal de Slowork para iniciar sesión o crear tu cuenta.',
  successButton: 'Ir al portal ahora',
  validation: {
    fullName: 'Escribe al menos 2 caracteres.',
    email: 'Introduce un correo electrónico válido.',
    country: 'Como máximo 80 caracteres.',
    profileOrHandle: 'Al menos 2 caracteres (enlace o usuario).',
    contentPitchMin: 'Escribe al menos 30 caracteres para valorar tu encaje.',
    contentPitchMax: 'Máximo 2.500 caracteres en este campo.',
    sampleLinks: 'Máximo 2.000 caracteres en enlaces de ejemplo.',
    agreePrivacy: 'Debes aceptar la política de privacidad para continuar.',
    choiceInvalid: 'Elige una opción válida.',
  },
};

export function getCreatorApplyFormCopy(lang: 'en' | 'es'): CreatorApplyFormCopy {
  return lang === 'es' ? creatorApplyFormCopyEs : creatorApplyFormCopyEn;
}
