import Link from 'next/link';

export default function DownloadPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-3xl text-purple-600">
          ↓
        </div>
        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          File access ready
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Your premium file and download access are now available.
        </p>
        <Link
          href="/user-center"
          className="mt-6 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white"
        >
          Open user center
        </Link>
      </div>
    </main>
  );
}
