export default function Loading() {
  return (
    <div className="min-h-[30vh] md:min-h-[40vh] relative z-10 gap-6 flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 text-center pt-20 mb-10 md:mb-20 animate-pulse">
      {/* Title skeleton */}
      <div className="space-y-3 w-full max-w-5xl mx-auto">
        <div className="h-10 sm:h-12 bg-gray-200 mx-auto w-11/12" />
        <div className="h-10 sm:h-12 bg-gray-200 mx-auto w-8/12" />
      </div>

      {/* Description skeleton */}
      <div className="w-full max-w-5xl mx-auto mt-4 space-y-3 px-2">
        <div className="h-4 bg-gray-200 w-full" />
        <div className="h-4 bg-gray-200 w-11/12 mx-auto" />
        <div className="h-4 bg-gray-200 w-10/12 mx-auto" />
      </div>

      {/* CTA buttons skeleton */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full sm:w-auto mt-6">
        <div className="h-10 bg-gray-300 w-40" />
        <div className="h-10 bg-gray-300 w-48" />
      </div>
    </div>
  );
}
