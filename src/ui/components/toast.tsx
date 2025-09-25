"use client";

import * as React from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/core/utils/utils";

export interface ToastProps {
  id?: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
  className?: string;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    { title, description, variant = "default", onClose, className, ...props },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
      if (props.duration && props.duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => onClose?.(), 300); // Wait for animation
        }, props.duration);

        return () => clearTimeout(timer);
      }
    }, [props.duration, onClose]);

    const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    };

    const variants = {
      default: "bg-white border-gray-200 text-gray-900",
      success: "bg-green-50 border-green-200 text-green-900",
      error: "bg-red-50 border-red-200 text-red-900",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
      info: "bg-blue-50 border-blue-200 text-blue-900",
    };

    const icons = {
      default: Info,
      success: CheckCircle,
      error: AlertCircle,
      warning: AlertTriangle,
      info: Info,
    };

    const Icon = icons[variant];

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-start space-x-3 p-4 border rounded-lg shadow-lg transition-all duration-300",
          variants[variant],
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          className
        )}
        {...props}
      >
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          {title && <p className="text-sm font-medium leading-5">{title}</p>}
          {description && (
            <p className="text-sm leading-5 mt-1 opacity-90">{description}</p>
          )}
        </div>
        {onClose && (
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = "Toast";

export { Toast };
