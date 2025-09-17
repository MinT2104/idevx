interface HowItWorksIllustrationProps {
  illustrationData?: any;
}

export default function HowItWorksIllustration({ 
  illustrationData 
}: HowItWorksIllustrationProps) {
  return (
    <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
      {/* Placeholder for illustration */}
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
          <span className="text-4xl">🎯</span>
        </div>
        <p className="text-sm text-gray-500">
          Illustration placeholder
        </p>
      </div>
    </div>
  );
}
