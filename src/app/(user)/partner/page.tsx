import { Button } from "@/ui/components/button";
import Link from "next/link";

export default function PartnerPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black leading-tight mb-6">
            Partner with DevX
          </h1>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Join our ecosystem of partners and unlock new opportunities in the
            AI space. Together, we can deliver innovative solutions and drive
            growth for businesses worldwide.
          </p>
        </div>

        {/* Partnership Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-black mb-4">
              Technology Partners
            </h3>
            <p className="text-gray-700 mb-6">
              Integrate our AI models and infrastructure into your existing
              solutions. Build powerful applications with our robust APIs and
              developer tools.
            </p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>• API Integration</li>
              <li>• White-label Solutions</li>
              <li>• Technical Support</li>
              <li>• Co-marketing Opportunities</li>
            </ul>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Learn More
            </Button>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-black mb-4">
              Channel Partners
            </h3>
            <p className="text-gray-700 mb-6">
              Resell our AI solutions and services to your customers. Benefit
              from our comprehensive partner program and dedicated support.
            </p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>• Reseller Program</li>
              <li>• Partner Portal Access</li>
              <li>• Sales Training</li>
              <li>• Revenue Sharing</li>
            </ul>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Join Program
            </Button>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-black mb-4">
              Strategic Partners
            </h3>
            <p className="text-gray-700 mb-6">
              Collaborate on joint initiatives and co-develop innovative AI
              solutions. Leverage our combined expertise to create
              market-leading products.
            </p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>• Joint Development</li>
              <li>• Market Expansion</li>
              <li>• Technology Integration</li>
              <li>• Strategic Consulting</li>
            </ul>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-black text-white p-12 rounded-lg mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Why Partner with DevX?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Cutting-Edge AI Technology
              </h3>
              <p className="text-gray-300 mb-6">
                Access to the latest AI models and infrastructure, including
                GPT, Claude, Gemini, and LLaMA.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Scalable Infrastructure
              </h3>
              <p className="text-gray-300 mb-6">
                Enterprise-grade infrastructure that scales with your business
                needs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Dedicated Support</h3>
              <p className="text-gray-300 mb-6">
                Technical support and resources to help you succeed in the AI
                market.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Global Reach</h3>
              <p className="text-gray-300 mb-6">
                Expand your market reach with our global presence and customer
                base.
              </p>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Partner Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">TechCorp Solutions</h3>
              <p className="text-gray-700 mb-4">
                &ldquo;Partnering with DevX allowed us to integrate AI
                capabilities into our platform in just 3 months, resulting in a
                40% increase in customer engagement.&rdquo;
              </p>
              <div className="text-sm text-gray-500">
                Technology Partner • Enterprise Software
              </div>
            </div>
            <div className="border border-gray-200 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                InnovateAI Consulting
              </h3>
              <p className="text-gray-700 mb-4">
                &ldquo;As a channel partner, we&apos;ve successfully deployed
                DevX solutions across 50+ clients, generating over $2M in
                additional revenue.&rdquo;
              </p>
              <div className="text-sm text-gray-500">
                Channel Partner • AI Consulting
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 p-12 rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Partner with Us?
          </h2>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            Join our growing ecosystem of partners and start building the future
            of AI together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/talk-to-us">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                Become a Partner
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 px-8 py-3"
            >
              Download Partner Kit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
