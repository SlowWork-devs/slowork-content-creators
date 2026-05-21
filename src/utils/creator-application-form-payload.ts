import { z } from 'astro/zod';
import { creatorPlatformSchema } from '../models/creator-application.model';

type CreatorPlatform = z.infer<typeof creatorPlatformSchema>;

const readCheckbox = (fd: FormData, name: string): boolean => fd.get(name) === 'yes' || fd.get(name) === 'on';

const readYesNo = (fd: FormData, name: string): boolean | null => {
  const v = String(fd.get(name) ?? '').trim().toLowerCase();
  if (v === 'yes' || v === 'true') return true;
  if (v === 'no' || v === 'false') return false;
  return null;
};

const readPlatforms = (fd: FormData): CreatorPlatform[] =>
  fd
    .getAll('platforms')
    .map((p) => String(p).trim())
    .filter((p): p is CreatorPlatform => creatorPlatformSchema.safeParse(p).success);

/** Builds raw payload from multi-step form `FormData` for Zod parsing. */
export const formDataToCreatorApplicationPayload = (
  fd: FormData,
  lang: 'en' | 'es',
): unknown => {
  return {
    name: String(fd.get('name') ?? ''),
    surname: String(fd.get('surname') ?? ''),
    email: String(fd.get('email') ?? ''),
    countryOfResidence: String(fd.get('countryOfResidence') ?? ''),
    mainLanguage: String(fd.get('mainLanguage') ?? ''),
    phone: String(fd.get('phone') ?? ''),
    dobAgeConfirmed: readCheckbox(fd, 'dobAgeConfirmed') ? true : undefined,
    usualTravelLocation: String(fd.get('usualTravelLocation') ?? ''),
    nickname: String(fd.get('nickname') ?? ''),
    platforms: readPlatforms(fd),
    profileUrls: String(fd.get('profileUrls') ?? ''),
    mainNiche: String(fd.get('mainNiche') ?? ''),
    contentRegions: String(fd.get('contentRegions') ?? ''),
    contentLanguage: String(fd.get('contentLanguage') ?? ''),
    englishCapability: readYesNo(fd, 'englishCapability'),
    postLink1: String(fd.get('postLink1') ?? ''),
    postLink2: String(fd.get('postLink2') ?? ''),
    postLink3: String(fd.get('postLink3') ?? ''),
    whyJoin: String(fd.get('whyJoin') ?? ''),
    availabilityToVisit: readYesNo(fd, 'availabilityToVisit'),
    willingnessCreatePhases: readYesNo(fd, 'willingnessCreatePhases'),
    livingDifferently: String(fd.get('livingDifferently') ?? ''),
    agreeTerms: readCheckbox(fd, 'agreeTerms') ? true : undefined,
    agreePrivacy: readCheckbox(fd, 'agreePrivacy') ? true : undefined,
    lang,
  };
};
