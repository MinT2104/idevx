import { Button } from "@/ui/components/button";
import Image from "next/image";

interface ModelListItemProps {
  image: string;
  name: string;
  onTry?: () => void;
  onExplore?: () => void;
  actionType?: "try" | "explore";
}

export default function ModelListItem({
  image,
  name,
  onTry,
  onExplore,
  actionType = "try",
}: ModelListItemProps) {
  const handleAction = () => {
    if (actionType === "try" && onTry) {
      onTry();
    } else if (actionType === "explore" && onExplore) {
      onExplore();
    }
  };

  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors group border-t-[0.5px] border-[#A9A9A9]">
      <div className="flex items-center space-x-3">
        {image && (image.startsWith("/") || image.startsWith("https")) ? (
          <Image src={image} alt={name} width={30} height={30} />
        ) : (
          <div className="w-8 h-8 bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-sm rounded">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
          {name}
        </span>
      </div>

      <Button
        size="sm"
        className="text-xs w-20 px-4 py-2 h-7 bg-white text-black border border-[#A9A9A9] hover:bg-gray-50 font-medium rounded-none cursor-pointer"
        onClick={handleAction}
      >
        {actionType === "try" && onTry ? "Try It" : "Explore"}
      </Button>
    </div>
  );
}
