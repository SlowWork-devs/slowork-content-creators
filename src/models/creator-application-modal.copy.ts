/** UI copy for CreatorApplicationModal (data only). */

export interface CreatorApplicationModalValidationCopy {
  nameRequired: string;
  surnameRequired: string;
  emailRequired: string;
  emailInvalid: string;
  dobRequired: string;
  platformsRequired: string;
  whyJoinMin: string;
  agreeTerms: string;
  agreePrivacy: string;
  sendFailed: string;
}

export interface CreatorApplicationModalCopy {
  dialogTitle: string;
  stepOf: string;
  closeAria: string;
  next: string;
  back: string;
  submit: string;
  submitting: string;
  errorSummary: string;
  thankYouTitle: string;
  thankYouLead: string;
  redirecting: string;
  fieldName: string;
  fieldSurname: string;
  fieldEmail: string;
  fieldCountry: string;
  fieldMainLanguage: string;
  fieldPhone: string;
  fieldDobConfirm: string;
  fieldUsualTravel: string;
  fieldNickname: string;
  fieldPlatforms: string;
  platformInstagram: string;
  platformTiktok: string;
  platformYoutube: string;
  platformLinkedin: string;
  platformOther: string;
  fieldProfileUrls: string;
  fieldMainNiche: string;
  nicheTravel: string;
  nicheLifestyle: string;
  nicheRemoteWork: string;
  nicheDigitalNomad: string;
  nicheWellbeing: string;
  nicheIntentional: string;
  nicheOther: string;
  fieldContentRegions: string;
  fieldContentLanguage: string;
  fieldEnglishCapability: string;
  yes: string;
  no: string;
  fieldPost1: string;
  fieldPost2: string;
  fieldPost3: string;
  fieldWhyJoin: string;
  fieldAvailability: string;
  fieldWillingnessPhases: string;
  fieldLivingDifferently: string;
  agreeTermsPrefix: string;
  agreeTermsLink: string;
  agreePrivacyPrefix: string;
  agreePrivacyLink: string;
  validation: CreatorApplicationModalValidationCopy;
}

const en: CreatorApplicationModalCopy = {
  dialogTitle: 'Apply to the Slowork creators program',
  stepOf: 'Step {current} of {total}',
  closeAria: 'Close application form',
  next: 'Next',
  back: 'Back',
  submit: 'Submit application',
  submitting: 'Submitting…',
  errorSummary: 'Please fix the highlighted fields or try again.',
  thankYouTitle: 'Thank you for applying',
  thankYouLead:
    'We have received your application. Our team will review it with care.',
  redirecting: 'Creating your profile… Redirecting to the app in 3 seconds.',
  fieldName: 'Name',
  fieldSurname: 'Surname',
  fieldEmail: 'Email',
  fieldCountry: 'Country of residence',
  fieldMainLanguage: 'Main language',
  fieldPhone: 'Phone / WhatsApp',
  fieldDobConfirm: 'I confirm I am at least 18 years old',
  fieldUsualTravel: 'City / country you usually travel from',
  fieldNickname: 'Nickname or display name',
  fieldPlatforms: 'Platforms you publish on',
  platformInstagram: 'Instagram',
  platformTiktok: 'TikTok',
  platformYoutube: 'YouTube',
  platformLinkedin: 'LinkedIn',
  platformOther: 'Other',
  fieldProfileUrls: 'Profile URLs (one per line is fine)',
  fieldMainNiche: 'Main niche',
  nicheTravel: 'Travel',
  nicheLifestyle: 'Lifestyle',
  nicheRemoteWork: 'Remote work',
  nicheDigitalNomad: 'Digital nomad',
  nicheWellbeing: 'Wellbeing',
  nicheIntentional: 'Intentional living',
  nicheOther: 'Other',
  fieldContentRegions: 'Content regions you cover',
  fieldContentLanguage: 'Primary content language',
  fieldEnglishCapability: 'Can you create in English or with English subtitles?',
  yes: 'Yes',
  no: 'No',
  fieldPost1: 'Link to post 1',
  fieldPost2: 'Link to post 2',
  fieldPost3: 'Link to post 3',
  fieldWhyJoin: 'Why do you want to join Slowork?',
  fieldAvailability: 'Are you available to visit Slowork locations?',
  fieldWillingnessPhases: 'Willing to create content before, during, and after a stay?',
  fieldLivingDifferently: 'What does living differently mean to you?',
  agreeTermsPrefix: 'I accept the',
  agreeTermsLink: 'Terms & Conditions',
  agreePrivacyPrefix: 'I accept the',
  agreePrivacyLink: 'Privacy Policy',
  validation: {
    nameRequired: 'Name is required',
    surnameRequired: 'Surname is required',
    emailRequired: 'Email is required',
    emailInvalid: 'Enter a valid email',
    dobRequired: 'You must confirm you are at least 18',
    platformsRequired: 'Select at least one platform',
    whyJoinMin: 'Tell us a bit more (at least 30 characters)',
    agreeTerms: 'You must accept the Terms & Conditions',
    agreePrivacy: 'You must accept the Privacy Policy',
    sendFailed: 'Something went wrong. Please try again.',
  },
};

const es: CreatorApplicationModalCopy = {
  dialogTitle: 'Solicitud al programa de creadores Slowork',
  stepOf: 'Paso {current} de {total}',
  closeAria: 'Cerrar formulario de solicitud',
  next: 'Siguiente',
  back: 'Atrás',
  submit: 'Enviar solicitud',
  submitting: 'Enviando…',
  errorSummary: 'Revisa los campos marcados o inténtalo de nuevo.',
  thankYouTitle: 'Gracias por tu solicitud',
  thankYouLead:
    'Hemos recibido tu solicitud. Nuestro equipo la revisará con atención.',
  redirecting: 'Creando tu perfil… Redirigiendo a la app en 3 segundos.',
  fieldName: 'Nombre',
  fieldSurname: 'Apellidos',
  fieldEmail: 'Email',
  fieldCountry: 'País de residencia',
  fieldMainLanguage: 'Idioma principal',
  fieldPhone: 'Teléfono / WhatsApp',
  fieldDobConfirm: 'Confirmo que tengo al menos 18 años',
  fieldUsualTravel: 'Ciudad / país desde el que sueles viajar',
  fieldNickname: 'Apodo o nombre público',
  fieldPlatforms: 'Plataformas donde publicas',
  platformInstagram: 'Instagram',
  platformTiktok: 'TikTok',
  platformYoutube: 'YouTube',
  platformLinkedin: 'LinkedIn',
  platformOther: 'Otra',
  fieldProfileUrls: 'URLs de perfil (puedes poner una por línea)',
  fieldMainNiche: 'Nicho principal',
  nicheTravel: 'Viajes',
  nicheLifestyle: 'Estilo de vida',
  nicheRemoteWork: 'Trabajo remoto',
  nicheDigitalNomad: 'Nómada digital',
  nicheWellbeing: 'Bienestar',
  nicheIntentional: 'Vida intencional',
  nicheOther: 'Otro',
  fieldContentRegions: 'Regiones que cubres con tu contenido',
  fieldContentLanguage: 'Idioma principal del contenido',
  fieldEnglishCapability: '¿Puedes crear en inglés o con subtítulos en inglés?',
  yes: 'Sí',
  no: 'No',
  fieldPost1: 'Enlace a publicación 1',
  fieldPost2: 'Enlace a publicación 2',
  fieldPost3: 'Enlace a publicación 3',
  fieldWhyJoin: '¿Por qué quieres unirte a Slowork?',
  fieldAvailability: '¿Tienes disponibilidad para visitar ubicaciones Slowork?',
  fieldWillingnessPhases:
    '¿Dispuesto/a a crear contenido antes, durante y después de una estancia?',
  fieldLivingDifferently: '¿Qué significa para ti vivir de otra manera?',
  agreeTermsPrefix: 'Acepto los',
  agreeTermsLink: 'Términos y Condiciones',
  agreePrivacyPrefix: 'Acepto la',
  agreePrivacyLink: 'Política de Privacidad',
  validation: {
    nameRequired: 'El nombre es obligatorio',
    surnameRequired: 'Los apellidos son obligatorios',
    emailRequired: 'El email es obligatorio',
    emailInvalid: 'Introduce un email válido',
    dobRequired: 'Debes confirmar que tienes al menos 18 años',
    platformsRequired: 'Selecciona al menos una plataforma',
    whyJoinMin: 'Cuéntanos un poco más (mínimo 30 caracteres)',
    agreeTerms: 'Debes aceptar los Términos y Condiciones',
    agreePrivacy: 'Debes aceptar la Política de Privacidad',
    sendFailed: 'Algo ha fallado. Inténtalo de nuevo.',
  },
};

export const getCreatorApplicationModalCopy = (lang: 'en' | 'es'): CreatorApplicationModalCopy =>
  lang === 'es' ? es : en;

export const formatStepLabel = (template: string, current: number, total: number): string =>
  template.replace('{current}', String(current)).replace('{total}', String(total));
