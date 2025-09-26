import OptimizedImage from "@/features/shared/components/OptimizedImage";
interface HowItWorksIllustrationProps {
  illustrationData: string;
}

export default function HowItWorksIllustration({
  illustrationData,
}: HowItWorksIllustrationProps) {
  return (
    <div className="flex items-center justify-center p-16 pb-0 rounded-lg">
      <OptimizedImage
        src={illustrationData}
        alt="How It Works"
        width={800}
        height={600}
        sizes="(max-width: 768px) 100vw, 80vw"
        className="w-full h-full object-contain"
        quality={90}
      />
    </div>
  );
}
