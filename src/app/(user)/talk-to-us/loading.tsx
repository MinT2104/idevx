export default function Loading() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left skeleton */}
          <div className="animate-pulse">
            <div className="h-9 md:h-14 bg-gray-200 w-10/12" />
            <div className="mt-3 h-9 md:h-14 bg-gray-200 w-9/12" />
            <div className="mt-3 h-9 md:h-14 bg-gray-200 w-7/12" />
            <div className="mt-8 space-y-3">
              <div className="h-4 bg-gray-200 w-11/12" />
              <div className="h-4 bg-gray-200 w-10/12" />
              <div className="h-4 bg-gray-200 w-9/12" />
            </div>
            <div className="mt-6 h-4 bg-gray-300 w-72" />
          </div>

          {/* Right form skeleton */}
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 w-24" />
                <div className="h-10 bg-gray-200" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 w-24" />
                <div className="h-10 bg-gray-200" />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-200 w-28" />
              <div className="h-10 bg-gray-200" />
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-200 w-32" />
              <div className="h-10 bg-gray-200" />
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-200 w-64" />
              <div className="h-40 bg-gray-200" />
            </div>

            <div className="mt-4 h-3 bg-gray-200 w-80" />

            <div className="mt-4 h-11 bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
