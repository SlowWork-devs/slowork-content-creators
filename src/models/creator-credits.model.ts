import { z } from 'astro/zod';

/**
 * Créditos por tipo de entrega (briefing, reporting, límites de campaña, etc.).
 * Los valores son orientativos hasta que producto los cierre.
 */
export const creatorCreditRatesSchema = z.object({
  reel: z.number().int().nonnegative(),
  story: z.number().int().nonnegative(),
  carousel: z.number().int().nonnegative(),
  shortVideo: z.number().int().nonnegative(),
  longFormVideo: z.number().int().nonnegative(),
  blogPost: z.number().int().nonnegative(),
});

export type CreatorCreditRates = z.infer<typeof creatorCreditRatesSchema>;
