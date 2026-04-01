import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { creatorCreditRatesSchema } from './models/creator-credits.model';

/**
 * Astro 6 Content Layer: la config tiene que vivir en `src/content.config.ts`.
 * `src/content/config.ts` está deprecado y rompe el build (LegacyContentConfigError).
 */
const creators = defineCollection({
  loader: glob({ base: './src/content/creators', pattern: '**/*.md' }),
  schema: z.object({
    locale: z.enum(['en', 'es']),
    title: z.string(),
    subheadline: z.string(),
    creditRates: creatorCreditRatesSchema,
  }),
});

export const collections = { creators };
