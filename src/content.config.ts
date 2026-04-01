import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import {
  creatorBenefitBlockSchema,
  creatorWhyProgramSchema,
} from './models/creator-landing-content.model';
import { creatorCreditRatesSchema } from './models/creator-credits.model';

/**
 * Astro 6 Content Layer: la config tiene que vivir en `src/content.config.ts`.
 * `src/content/config.ts` está deprecado y rompe el build (LegacyContentConfigError).
 *
 * Copy y estructura narrativa (SSOT): `docs/Slowork Creators Program Landing Page - v2.md`
 */
const creators = defineCollection({
  loader: glob({ base: './src/content/creators', pattern: '**/*.md' }),
  schema: z.object({
    locale: z.enum(['en', 'es']),
    title: z.string(),
    /** Hero: secondary microcopy (v2 §1). Opcional por compatibilidad con entradas antiguas. */
    heroMicrocopy: z.string().optional(),
    /** Hero + esencia de la story section (texto largo para la página). */
    subheadline: z.string(),
    /** Meta description breve (límite amplio por tipografía Unicode / traducciones). */
    seoDescription: z.string().max(320),
    benefitBlocks: z.array(creatorBenefitBlockSchema).length(5),
    whyProgram: creatorWhyProgramSchema,
    creditRates: creatorCreditRatesSchema,
  }),
});

export const collections = { creators };
