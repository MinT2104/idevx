import { Button } from "@/ui/components/button";

interface ModelListItemProps {
  icon: string;
  name: string;
  onTry?: () => void;
  onExplore?: () => void;
  actionType?: 'try' | 'explore';
}

export default function ModelListItem({ 
  icon, 
  name, 
  onTry, 
  onExplore, 
  actionType = 'try' 
}: ModelListItemProps) {
  const handleAction = () => {
    if (actionType === 'try' && onTry) {
      onTry();
    } else if (actionType === 'explore' && onExplore) {
      onExplore();
    }
  };

  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors group">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 flex items-center justify-center">
          <span className="text-lg">{icon}</span>
        </div>
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
          {name}
        </span>
      </div>
      
      <Button
        size="sm"
        className="text-xs px-4 py-2 h-8 bg-white text-black border border-gray-300 hover:bg-gray-50 font-medium"
        onClick={handleAction}
      >
        Try It
      </Button>
    </div>
  );
}
