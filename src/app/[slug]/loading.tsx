export default function Loading() {
  return (
    <>
      <main className="prose prose-neutral max-w-prose mx-auto w-full px-4 overflow-hidden flex flex-col justify-center border-b-2 border-gray-200 pb-8 gap-4">
        <div className="relative overflow-hidden bg-gray-200 rounded-md h-8 w-32">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[slide_1.2s_linear_infinite]" />
        </div>

        <div className="relative overflow-hidden bg-gray-200 rounded-md h-12 w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[slide_1.2s_linear_infinite]" />
        </div>

        <div className="relative overflow-hidden bg-gray-200 rounded-md h-8 w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[slide_1.2s_linear_infinite]" />
        </div>

        <div className="relative overflow-hidden bg-gray-200 rounded-md h-16 w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[slide_1.2s_linear_infinite]" />
        </div>
      </main>

      <section className="prose prose-neutral max-w-prose mx-auto w-full px-4 overflow-hidden flex flex-col justify-center gap-4">
        <div className="relative overflow-hidden bg-gray-200 rounded-md h-24 w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[slide_1.2s_linear_infinite]" />
        </div>
        <div className="relative overflow-hidden bg-gray-200 rounded-md h-28 w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[slide_1.2s_linear_infinite]" />
        </div>
        <div className="relative overflow-hidden bg-gray-200 rounded-md h-20 w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[slide_1.2s_linear_infinite]" />
        </div>
      </section>
    </>
  );
}
