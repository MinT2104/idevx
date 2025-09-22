import Image from "next/image";

export default function CompaniesSection() {
  return (
    <div className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2 sm:mb-3">
            Innovating Side by Side with Industry Leaders
          </h2>
        
        </div>

        {/* Single Companies Image */}
        <div className="flex justify-center px-2 sm:px-4">
          <Image 
            src="/images/company.png"
            alt="All company logos"
            width={1200}
            height={400}
            className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl h-auto object-contain"
            priority
          />
        </div>

      </div>
    </div>
  );
}
