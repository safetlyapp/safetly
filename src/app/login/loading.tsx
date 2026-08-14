export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white px-4 py-10">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div className="hidden lg:block">
          <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 shadow-sm" />
        </div>

        <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <div className="h-5 w-24 rounded-full bg-sky-100" />
          <div className="mt-6 space-y-4">
            <div className="h-11 rounded-xl bg-slate-100" />
            <div className="h-11 rounded-xl bg-slate-100" />
            <div className="h-11 rounded-xl bg-slate-100" />
            <div className="grid grid-cols-2 gap-2 rounded-full bg-slate-100 p-1.5">
              <div className="h-9 rounded-full bg-white shadow-sm" />
              <div className="h-9 rounded-full bg-slate-200" />
            </div>
            <div className="h-11 rounded-xl bg-slate-100" />
            <div className="h-11 rounded-xl bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
