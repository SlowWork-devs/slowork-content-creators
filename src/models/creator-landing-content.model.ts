import { z } from 'astro/zod';

/** Bloque de la sección «Why creators join» (beneficios). */
export const creatorBenefitBlockSchema = z.object({
  title: z.string(),
  text: z.string(),
});

/** Sección «Why we built this program» / narrativa estratégica. */
export const creatorWhyProgramSchema = z.object({
  heading: z.string(),
  intro: z.string(),
  aims: z.array(z.string()).length(5),
  closing: z.string(),
});

/** Pregunta / respuesta para FAQ (SEO + acordeón). */
export const creatorFaqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export type CreatorBenefitBlock = z.infer<typeof creatorBenefitBlockSchema>;
export type CreatorWhyProgram = z.infer<typeof creatorWhyProgramSchema>;
export type CreatorFaqItem = z.infer<typeof creatorFaqItemSchema>;
