import { z } from 'astro/zod';

export const creatorPlatformSchema = z.enum([
  'instagram',
  'tiktok',
  'youtube',
  'linkedin',
  'other',
]);

export const creatorMainNicheSchema = z.enum([
  'travel',
  'lifestyle',
  'remote_work',
  'digital_nomad',
  'wellbeing',
  'intentional_living',
  'other',
]);

const trimmedToNull = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((v) => {
    if (v == null) return null;
    const t = v.trim();
    return t.length > 0 ? t : null;
  });

const yesNoToBoolean = z
  .union([z.boolean(), z.string(), z.null(), z.undefined()])
  .transform((v) => {
    if (v === true || v === 'true' || v === 'yes') return true;
    if (v === false || v === 'false' || v === 'no') return false;
    return null;
  });

/** Payload JSON para POST /api/creator-applications (camelCase, alineado con API). */
export const creatorApplicationCreateBodySchema = z.object({
  name: z.string().trim().min(1).max(120),
  surname: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  countryOfResidence: trimmedToNull,
  mainLanguage: trimmedToNull,
  phone: trimmedToNull,
  dobAgeConfirmed: z.literal(true),
  usualTravelLocation: trimmedToNull,
  nickname: trimmedToNull,
  platforms: z.array(creatorPlatformSchema).min(1),
  profileUrls: trimmedToNull,
  mainNiche: trimmedToNull,
  contentRegions: trimmedToNull,
  contentLanguage: trimmedToNull,
  englishCapability: yesNoToBoolean,
  postLink1: trimmedToNull,
  postLink2: trimmedToNull,
  postLink3: trimmedToNull,
  whyJoin: z.string().trim().min(30).max(10000),
  availabilityToVisit: yesNoToBoolean,
  willingnessCreatePhases: yesNoToBoolean,
  livingDifferently: trimmedToNull,
  agreeTerms: z.literal(true),
  agreePrivacy: z.literal(true),
  lang: z.enum(['en', 'es']).optional(),
});

export type CreatorApplicationCreateInput = z.infer<typeof creatorApplicationCreateBodySchema>;

export type CreatorApplicationFormValidationMessages = {
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
};

export const createCreatorApplicationFormSchema = (m: CreatorApplicationFormValidationMessages) =>
  creatorApplicationCreateBodySchema.extend({
    name: z.string().trim().min(1, m.nameRequired).max(120),
    surname: z.string().trim().min(1, m.surnameRequired).max(120),
    email: z.string().trim().min(1, m.emailRequired).email(m.emailInvalid).max(254),
    dobAgeConfirmed: z.literal(true, { message: m.dobRequired }),
    platforms: z.array(creatorPlatformSchema).min(1, m.platformsRequired),
    whyJoin: z.string().trim().min(30, m.whyJoinMin).max(10000),
    agreeTerms: z.literal(true, { message: m.agreeTerms }),
    agreePrivacy: z.literal(true, { message: m.agreePrivacy }),
  });
