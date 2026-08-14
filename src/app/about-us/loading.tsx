export default function Loading() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <div className="mx-auto h-4 w-28 rounded-full bg-violet-100" />
          <div className="mx-auto mt-4 h-10 w-full max-w-2xl rounded-2xl bg-slate-100" />
          <div className="mx-auto mt-4 h-4 w-full max-w-3xl rounded-2xl bg-slate-100" />
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 px-4 pb-16 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="h-8 rounded-full bg-slate-100" />
              <div className="mx-auto mt-3 h-3 w-16 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto h-4 w-28 rounded-full bg-sky-100" />
          <div className="mx-auto mt-4 h-9 w-full max-w-md rounded-2xl bg-slate-100" />
          <div className="mx-auto mt-3 h-4 w-full max-w-lg rounded-2xl bg-slate-100" />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="h-10 w-10 rounded-xl bg-slate-100" />
              <div className="mt-4 h-4 w-28 rounded-full bg-slate-100" />
              <div className="mt-2 h-4 w-full rounded-full bg-slate-100" />
              <div className="mt-2 h-4 w-5/6 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
