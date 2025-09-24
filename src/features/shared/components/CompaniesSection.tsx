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

        {/* Logos Grid */}
        <div className="px-2 sm:px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
            {[
              {
                src: "https://www.datocms-assets.com/104802/1758662941-logo-writer.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "writer",
                h: "h-6",
              },
              {
                src: "https://www.datocms-assets.com/104802/1758663023-zed-industries.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "zed_industry",
                h: "h-6",
              },
              {
                src: "https://www.datocms-assets.com/104802/1740008335-664287c9ef936d8ce43517f8_abridge-logo-wordmark-black.webp?auto=compress%2Cformat&fit=clip&h=50",
                alt: "abridge",
                h: "h-4",
              },
              {
                src: "https://www.datocms-assets.com/104802/1752855457-clay-logo-dark-1.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "clay",
                h: "h-6",
              },
              {
                src: "https://www.datocms-assets.com/104802/1758663169-sourcegraph_logo.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "sourcegraph",
                h: "h-4",
              },
              {
                src: "https://www.datocms-assets.com/104802/1758663041-superhuman_id2iogfm7h_1-1.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "superhuman",
                h: "h-3",
              },
              {
                src: "https://www.datocms-assets.com/104802/1740157858-bland-logo.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "bland",
                h: "h-4",
              },
              {
                src: "https://www.datocms-assets.com/104802/1758662897-logo-descript.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "descript",
                h: "h-6",
              },
              {
                src: "https://www.datocms-assets.com/104802/1758663073-ambience-logo.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "ambience",
                h: "h-4",
              },
              {
                src: "https://www.datocms-assets.com/104802/1758662918-retool.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "retool",
                h: "h-4",
              },
              {
                src: "https://www.datocms-assets.com/104802/1747248934-gamma-logo.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "gamma",
                h: "h-4",
              },
              {
                src: "https://www.datocms-assets.com/104802/1742563823-quora.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "quora",
                h: "h-4",
              },
              {
                src: "https://www.datocms-assets.com/104802/1758136309-openevidence-1.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "openevidence",
                h: "h-6",
              },
              {
                src: "https://www.datocms-assets.com/104802/1758662984-logo-picnic.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "picnic",
                h: "h-4",
              },
              {
                src: "https://www.datocms-assets.com/104802/1758663002-hex.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "hex",
                h: "h-4",
              },
              {
                src: "https://www.datocms-assets.com/104802/1724272610-wispr.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "wispr",
                h: "h-6",
              },
              {
                src: "https://www.datocms-assets.com/104802/1758663105-canopy.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "canopy",
                h: "h-6",
              },
              {
                src: "https://www.datocms-assets.com/104802/1758662959-logo-patreon.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "patreon",
                h: "h-4",
              },
              {
                src: "https://www.datocms-assets.com/104802/1758663144-cisco.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "cisco",
                h: "h-8",
              },
              {
                src: "https://www.datocms-assets.com/104802/1758663176-logo-rime.png?auto=compress%2Cformat&fit=clip&h=50",
                alt: "rime",
                h: "h-6",
              },
            ].map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center border-[0.5px]  hover-fill-slide border-dashed border-gray-300 p-6 py-10 bg-white"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={40}
                  className={`${logo.h} w-auto opacity-80 hover:opacity-100 transition-opacity`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
