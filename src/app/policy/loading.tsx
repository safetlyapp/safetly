export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="h-4 w-28 rounded-full bg-violet-100" />
        <div className="h-10 w-3/4 rounded-2xl bg-slate-100" />
        <div className="h-4 w-full rounded-full bg-slate-100" />
        <div className="h-4 w-11/12 rounded-full bg-slate-100" />
        <div className="h-4 w-4/5 rounded-full bg-slate-100" />
        <div className="rounded-2xl bg-amber-50 p-4">
          <div className="h-4 w-1/2 rounded-full bg-amber-100" />
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <section key={index} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-4 w-20 rounded-full bg-slate-100" />
            <div className="mt-3 h-7 w-2/3 rounded-2xl bg-slate-100" />
            <div className="mt-4 space-y-3">
              <div className="h-4 w-full rounded-full bg-slate-100" />
              <div className="h-4 w-11/12 rounded-full bg-slate-100" />
              <div className="h-4 w-5/6 rounded-full bg-slate-100" />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
