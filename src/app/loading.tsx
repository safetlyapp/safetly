export default function Loading() {
  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center px-4">
      {/* Spinner */}
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-slate-100 border-t-sky-500" />
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 shadow-sm" />
      </div>

      <p className="mt-6 animate-pulse text-sm font-medium text-slate-500">
        Loading Safetly...
      </p>
    </div>
  );
}