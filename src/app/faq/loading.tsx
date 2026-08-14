export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="text-center">
        <div className="mx-auto h-4 w-32 rounded-full bg-violet-100" />
        <div className="mx-auto mt-4 h-10 w-full max-w-xl rounded-2xl bg-slate-100" />
        <div className="mx-auto mt-3 h-4 w-full max-w-2xl rounded-2xl bg-slate-100" />
      </div>

      <div className="mx-auto mt-8 h-12 max-w-xl rounded-full bg-slate-100" />

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-10 w-28 rounded-full bg-slate-100" />
        ))}
      </div>

      <div className="mt-8 space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="h-4 w-3/4 rounded-full bg-slate-100" />
              <div className="h-7 w-7 rounded-full bg-slate-100" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-gradient-to-r from-violet-50 to-sky-50 px-6 py-10">
        <div className="mx-auto h-5 w-44 rounded-full bg-slate-100" />
        <div className="mx-auto mt-3 h-4 w-full max-w-md rounded-full bg-slate-100" />
        <div className="mx-auto mt-5 h-11 w-44 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}
