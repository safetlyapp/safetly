export default function Loading() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <div className="mx-auto h-4 w-28 rounded-full bg-violet-100" />
          <div className="mx-auto mt-4 h-10 w-full max-w-lg rounded-2xl bg-slate-100" />
          <div className="mx-auto mt-4 h-5 w-full max-w-2xl rounded-2xl bg-slate-100" />
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 py-16 lg:grid-cols-[0.9fr_1.3fr]">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-slate-100" />
              <div className="mt-4 h-4 w-20 rounded-full bg-slate-100" />
              <div className="mt-2 h-4 w-3/5 rounded-full bg-slate-100" />
            </div>
          ))}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
            <div className="h-4 w-28 rounded-full bg-slate-100" />
            <div className="mt-3 h-4 w-40 rounded-full bg-slate-100" />
            <div className="mt-2 h-4 w-52 rounded-full bg-slate-100" />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-md">
          <div className="h-8 w-36 rounded-full bg-slate-100" />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="h-11 rounded-xl bg-slate-100" />
            <div className="h-11 rounded-xl bg-slate-100" />
          </div>
          <div className="mt-4 h-11 rounded-xl bg-slate-100" />
          <div className="mt-4 h-32 rounded-2xl bg-slate-100" />
          <div className="mt-4 h-11 rounded-xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
