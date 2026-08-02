import PolicyNav from "@/components/policy-nav";

export default function PolicyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-white px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-xl font-semibold text-slate-900">
          Terms &amp; Condition
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
          <PolicyNav />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}