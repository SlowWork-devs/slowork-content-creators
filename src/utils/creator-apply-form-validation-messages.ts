import type { ZodIssue } from 'astro/zod';

import type { CreatorApplyFormValidationCopy } from '../models/creator-apply-form.copy';

/** Claves de payload con posible error bajo el campo (checkbox consent incluido). */
export type CreatorApplyFieldKey =
  | 'fullName'
  | 'email'
  | 'country'
  | 'primaryPlatform'
  | 'profileOrHandle'
  | 'audienceBand'
  | 'contentLanguages'
  | 'contentPitch'
  | 'sampleLinks'
  | 'agreePrivacy';

const isFieldKey = (k: string): k is CreatorApplyFieldKey =>
  [
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
  ].includes(k);

const pickMessage = (issue: ZodIssue, v: CreatorApplyFormValidationCopy): string | null => {
  const head = issue.path[0];
  if (typeof head !== 'string' || !isFieldKey(head)) return null;

  if (head === 'fullName') return v.fullName;
  if (head === 'email') return v.email;
  if (head === 'country') return v.country;
  if (head === 'profileOrHandle') return v.profileOrHandle;
  if (head === 'sampleLinks') return v.sampleLinks;
  if (head === 'agreePrivacy') return v.agreePrivacy;

  if (head === 'contentPitch') {
    if (issue.code === 'too_big') return v.contentPitchMax;
    return v.contentPitchMin;
  }

  if (head === 'primaryPlatform' || head === 'audienceBand' || head === 'contentLanguages') {
    return v.choiceInvalid;
  }

  return v.choiceInvalid;
};

/**
 * Primer mensaje por campo (orden Zod), para mostrar bajo cada input.
 */
export function mapCreatorApplyIssuesToFieldMessages(
  issues: ZodIssue[],
  v: CreatorApplyFormValidationCopy,
): Partial<Record<CreatorApplyFieldKey, string>> {
  return issues.reduce<Partial<Record<CreatorApplyFieldKey, string>>>((acc, issue) => {
    const head = issue.path[0];
    if (typeof head !== 'string' || !isFieldKey(head) || acc[head] !== undefined) return acc;
    const msg = pickMessage(issue, v);
    if (msg === null) return acc;
    return { ...acc, [head]: msg };
  }, {});
}
