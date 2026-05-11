/** Construye el payload crudo desde `FormData` (listo para `creatorApplicationPayloadSchema.safeParse`). */

export function formDataToCreatorApplicationPayload(fd: FormData): unknown {
  const countryRaw = String(fd.get('country') ?? '').trim();
  const samplesRaw = String(fd.get('sampleLinks') ?? '').trim();
  return {
    fullName: String(fd.get('fullName') ?? ''),
    email: String(fd.get('email') ?? ''),
    country: countryRaw.length > 0 ? countryRaw : undefined,
    primaryPlatform: String(fd.get('primaryPlatform') ?? ''),
    profileOrHandle: String(fd.get('profileOrHandle') ?? ''),
    audienceBand: String(fd.get('audienceBand') ?? ''),
    contentLanguages: String(fd.get('contentLanguages') ?? ''),
    contentPitch: String(fd.get('contentPitch') ?? ''),
    sampleLinks: samplesRaw.length > 0 ? samplesRaw : undefined,
    agreePrivacy: fd.get('agreePrivacy') === 'yes' ? ('yes' as const) : undefined,
  };
}
