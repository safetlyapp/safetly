import HowToInstall from '@/components/home/HowToInstall';
import { fetchBackendJson } from '@/lib/backend-api';

type SeoResponse = {
  settings?: {
    tutorialVideoUrl?: string | null;
  };
};

export const dynamic = 'force-dynamic';

export default async function DownloadPage() {
  const seoResponse = await fetchBackendJson<SeoResponse>('/api/seo');

  return (
    <>
      <HowToInstall tutorialVideoUrl={seoResponse.settings?.tutorialVideoUrl} />
    </>
  );
}
