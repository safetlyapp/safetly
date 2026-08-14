export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-10 md:py-16">
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <div className="h-4 w-28 rounded-full bg-sky-100" />
          <div className="space-y-3">
            <div className="h-12 w-full max-w-xl rounded-2xl bg-slate-100" />
            <div className="h-12 w-4/5 rounded-2xl bg-slate-100" />
          </div>
          <div className="h-6 w-full max-w-lg rounded-2xl bg-slate-100" />
          <div className="flex gap-3 pt-2">
            <div className="h-11 w-32 rounded-full bg-slate-200" />
            <div className="h-11 w-32 rounded-full bg-slate-100" />
          </div>
        </div>
        <div className="mx-auto h-[22rem] w-full max-w-md rounded-[2rem] bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 shadow-sm md:h-[30rem]" />
      </section>

      <section className="space-y-5">
        <div className="h-5 w-44 rounded-full bg-sky-100" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="h-4 w-24 rounded-full bg-slate-100" />
              <div className="mt-4 h-10 w-28 rounded-2xl bg-slate-100" />
              <div className="mt-6 space-y-3">
                <div className="h-3 rounded-full bg-slate-100" />
                <div className="h-3 rounded-full bg-slate-100" />
                <div className="h-3 w-4/5 rounded-full bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-4 w-32 rounded-full bg-violet-100" />
          <div className="mt-5 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                <div className="h-10 w-10 rounded-full bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-2/3 rounded-full bg-slate-100" />
                  <div className="h-3 w-1/2 rounded-full bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-4 w-40 rounded-full bg-emerald-100" />
          <div className="mt-5 space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-12 rounded-2xl bg-slate-100" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
