"use client";
import HeroSection from "@/features/shared/common/HeroSection";

const page = () => {
  return (
    <div>
      <HeroSection
        title="Privacy Policy"
        description="Please read these terms and conditions carefully before using Our Service."
        ctaButton="Get Started"
        ctaButton2="Talk to an Expert"
        link1="https://www.google.com"
        link2="https://www.google.com"
      />
      <div className="w-full bg-[#FAFAFA]">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="mb-8">
            <p className="text-lg text-black font-bold mb-1">Last updated:</p>
            <p className="text-sm text-[#6C6C6C] flex items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_331_175)">
                  <path
                    d="M28.4583 6.25H4.54167C2.65469 6.25 1.125 7.77969 1.125 9.66667V28.4583C1.125 30.3453 2.65469 31.875 4.54167 31.875H28.4583C30.3453 31.875 31.875 30.3453 31.875 28.4583V9.66667C31.875 7.77969 30.3453 6.25 28.4583 6.25Z"
                    stroke="#6C6C6C"
                    strokeWidth="1.70833"
                  />
                  <path
                    d="M1.125 13.0833C1.125 9.86142 1.125 8.25217 2.12608 7.25108C3.12717 6.25 4.73642 6.25 7.95833 6.25H25.0417C28.2636 6.25 29.8728 6.25 30.8739 7.25108C31.875 8.25217 31.875 9.86142 31.875 13.0833H1.125Z"
                    fill="#6C6C6C"
                  />
                  <path
                    d="M7.95898 1.125V6.25M25.0423 1.125V6.25"
                    stroke="#6C6C6C"
                    strokeWidth="1.70833"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13.9382 16.5H8.81315C8.34141 16.5 7.95898 16.8824 7.95898 17.3542V19.0625C7.95898 19.5342 8.34141 19.9167 8.81315 19.9167H13.9382C14.4099 19.9167 14.7923 19.5342 14.7923 19.0625V17.3542C14.7923 16.8824 14.4099 16.5 13.9382 16.5Z"
                    fill="#6C6C6C"
                  />
                  <path
                    d="M13.9382 23.3333H8.81315C8.34141 23.3333 7.95898 23.7157 7.95898 24.1875V25.8958C7.95898 26.3676 8.34141 26.75 8.81315 26.75H13.9382C14.4099 26.75 14.7923 26.3676 14.7923 25.8958V24.1875C14.7923 23.7157 14.4099 23.3333 13.9382 23.3333Z"
                    fill="#6C6C6C"
                  />
                  <path
                    d="M24.1882 16.5H19.0632C18.5914 16.5 18.209 16.8824 18.209 17.3542V19.0625C18.209 19.5342 18.5914 19.9167 19.0632 19.9167H24.1882C24.6599 19.9167 25.0423 19.5342 25.0423 19.0625V17.3542C25.0423 16.8824 24.6599 16.5 24.1882 16.5Z"
                    fill="#6C6C6C"
                  />
                  <path
                    d="M24.1882 23.3333H19.0632C18.5914 23.3333 18.209 23.7157 18.209 24.1875V25.8958C18.209 26.3676 18.5914 26.75 19.0632 26.75H24.1882C24.6599 26.75 25.0423 26.3676 25.0423 25.8958V24.1875C25.0423 23.7157 24.6599 23.3333 24.1882 23.3333Z"
                    fill="#6C6C6C"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_331_175">
                    <rect width="33" height="33" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Sep 5 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-[#6C6C6C] mb-8">
              DevX ("Company," "we," "our," or "us") operates the website
              idevx.ai and provides custom artificial intelligence (AI)
              solutions, products, and services. This Privacy Policy describes
              how we collect, use, and protect your information when you
              interact with our website, services, or products.
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-[#6C6C6C] mb-4">
                  1. Information We Collect
                </h2>
                <ul className="space-y-3 text-[#6C6C6C] list-disc list-outside pl-4">
                  <li>
                    Personal Information: Name, email address, phone number,
                    billing details, company information.
                  </li>
                  <li>
                    Payment Information: Payment details processed securely via
                    third-party providers.
                  </li>
                  <li>
                    Usage Data: Device information, IP address, browser type,
                    operating system, access times, and usage patterns.
                  </li>
                  <li>
                    Project Data: Any files, documents, or datasets you provide
                    for customization or integration into AI products.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#6C6C6C] mb-4">
                  2. How We Use Your Information
                </h2>
                <ul className="space-y-3 text-[#6C6C6C] list-disc list-outside pl-4">
                  <li>To provide, operate, and maintain our services.</li>
                  <li>
                    To communicate with you about your project, updates, and
                    support.
                  </li>
                  <li>To process payments and milestone invoices.</li>
                  <li>
                    To improve and customize our AI products and services.
                  </li>
                  <li>To comply with legal and regulatory obligations.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#6C6C6C] mb-4">
                  3. Sharing of Information
                </h2>
                <p className="text-[#6C6C6C] mb-3 pl-4">
                  We do not sell your personal data. Information may be shared
                  only with:
                </p>
                <ul className="space-y-3 text-[#6C6C6C] list-disc list-outside pl-4">
                  <li>
                    Trusted third-party providers (e.g., payment processors,
                    hosting providers).
                  </li>
                  <li>Legal authorities if required by law.</li>
                  <li>
                    Business partners only with your explicit consent for joint
                    services.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#6C6C6C] mb-4">
                  4. Data Security
                </h2>
                <p className="text-[#6C6C6C] pl-4">
                  We implement industry-standard security measures to protect
                  your personal and project data. However, no transmission over
                  the internet is 100% secure, and we cannot guarantee absolute
                  security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#6C6C6C] mb-4">
                  5. Your Rights
                </h2>
                <p className="text-[#6C6C6C] mb-3 pl-4">
                  Depending on your jurisdiction, you may have the right to:
                </p>
                <ul className="space-y-3 text-[#6C6C6C] list-disc list-outside pl-4">
                  <li>Access, update, or delete your personal data.</li>
                  <li>Request data portability.</li>
                  <li>Opt out of marketing communications.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#6C6C6C] mb-4">
                  6. Contact Us
                </h2>
                <p className="text-[#6C6C6C] mb-3 pl-4">
                  For privacy concerns, contact:
                </p>
                <div className="text-[#6C6C6C] text-xl pl-4 flex items-center">
                  <strong className="text-3xl mr-2 -mb-1">📧</strong>{" "}
                  <a href="mailto:support@idevx.ai">support@idevx.ai</a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
