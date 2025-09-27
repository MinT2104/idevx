"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ClientBrand {
  id: string;
  name: string;
  imageUrl: string;
  status: string;
}

export default function CompaniesSection() {
  const [brands, setBrands] = useState<ClientBrand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          "/api/client-brand?status=active&limit=20"
        );
        const data = await response.json();

        if (data.success) {
          setBrands(data.data.clientBrands);
        }
      } catch (error) {
        console.error("Error fetching client brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);
  return (
    <div className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2 sm:mb-3">
            Innovating Side by Side with Industry Leaders
          </h2>
        </div>

        {/* Logos Grid */}
        <div className="px-2 sm:px-4">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
              {[...Array(20)].map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center border-[0.5px] border-dashed border-gray-300 p-6 py-10 bg-gray-50 animate-pulse"
                >
                  <div className="h-6 w-24 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : brands.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex items-center justify-center border-[0.5px] hover-fill-slide border-dashed border-gray-300 p-6 py-10 bg-white"
                >
                  <Image
                    src={brand.imageUrl}
                    alt={brand.name}
                    width={160}
                    height={40}
                    className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No client brands available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
