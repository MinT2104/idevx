import Image from "next/image";
interface HowItWorksIllustrationProps {
  illustrationData: string;
}

export default function HowItWorksIllustration({
  illustrationData,
}: HowItWorksIllustrationProps) {
  return (
    <div className="flex items-center justify-center p-16 pb-0 rounded-lg">
      <Image
        src={illustrationData}
        alt="How It Works"
        width={0}
        height={0}
        sizes="100%"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
