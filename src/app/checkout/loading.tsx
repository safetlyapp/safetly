export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-4 w-28 rounded-full bg-sky-100" />
          <div className="h-9 w-2/3 rounded-2xl bg-slate-100" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-14 rounded-2xl bg-slate-100" />
            ))}
          </div>
        </div>
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm">
          <div className="h-4 w-36 rounded-full bg-emerald-100" />
          <div className="h-12 rounded-2xl bg-slate-100" />
          <div className="h-12 rounded-2xl bg-slate-100" />
          <div className="h-24 rounded-2xl bg-slate-100" />
          <div className="h-12 rounded-2xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
