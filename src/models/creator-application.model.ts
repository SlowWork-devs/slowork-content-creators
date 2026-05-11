import { z } from 'astro/zod';

export const creatorPrimaryPlatformSchema = z.enum(['instagram', 'tiktok', 'youtube', 'other']);

export const creatorAudienceBandSchema = z.enum(['lt5k', '5k25k', '25k100k', '100kplus', 'prefer_not']);

export const creatorContentLanguagesSchema = z.enum(['en', 'es', 'both']);

/** Payload enviado a `PUBLIC_CREATORS_APPLY_URL` (JSON) o cuerpo de mailto. */
export const creatorApplicationPayloadSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  country: z.string().trim().max(80).optional(),
  primaryPlatform: creatorPrimaryPlatformSchema,
  profileOrHandle: z.string().trim().min(2).max(300),
  audienceBand: creatorAudienceBandSchema,
  contentLanguages: creatorContentLanguagesSchema,
  contentPitch: z.string().trim().min(30).max(2500),
  sampleLinks: z.string().trim().max(2000).optional(),
  agreePrivacy: z.literal('yes'),
});

export type CreatorApplicationPayload = z.infer<typeof creatorApplicationPayloadSchema>;
