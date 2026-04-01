import { z } from 'astro/zod';

/**
 * Créditos por tipo de entrega (briefing, reporting, límites de campaña, etc.).
 * Los valores son orientativos hasta que producto los cierre.
 */
const credit = z.coerce.number().int().nonnegative();

export const creatorCreditRatesSchema = z.object({
  reel: credit,
  story: credit,
  carousel: credit,
  shortVideo: credit,
  longFormVideo: credit,
  blogPost: credit,
});

export type CreatorCreditRates = z.infer<typeof creatorCreditRatesSchema>;
