export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 to-indigo-50 p-6">
      <div className="mx-auto mb-4 h-4 w-full max-w-6xl rounded-full bg-slate-100" />

      <div className="mx-auto flex max-w-6xl overflow-hidden rounded-2xl bg-white shadow-sm">
        <aside className="hidden w-64 shrink-0 border-r border-slate-100 p-6 md:block">
          <div className="h-6 w-28 rounded-full bg-slate-100" />
          <div className="mx-auto mt-8 h-16 w-16 rounded-full bg-slate-100" />
          <div className="mx-auto mt-4 h-4 w-28 rounded-full bg-slate-100" />
          <div className="mt-8 space-y-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-11 rounded-xl bg-slate-100" />
            ))}
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="h-7 w-44 rounded-full bg-slate-100" />
            <div className="h-8 w-8 rounded-full bg-slate-100" />
          </div>

          <div className="rounded-xl border border-slate-100 bg-white">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-[140px_1fr] gap-4 border-b border-slate-100 px-6 py-5 last:border-b-0"
              >
                <div className="h-4 w-20 rounded-full bg-slate-100" />
                <div className="h-4 w-full rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
