"use client";

import * as React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  message?: string;
};

export default function ConfirmSubmitButton({
  children,
  className,
  message,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const handleTrigger = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setOpen(true);
    },
    []
  );

  const handleCancel = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleConfirm = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const form =
        (e.currentTarget as HTMLButtonElement).closest("form") ||
        (document.activeElement instanceof HTMLButtonElement &&
          document.activeElement.closest("form"));
      setOpen(false);
      if (form) form.requestSubmit();
    },
    []
  );

  return (
    <>
      <button type="button" className={className} onClick={handleTrigger}>
        {children}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleCancel}
          />
          <div className="relative z-10 w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="text-sm font-medium text-gray-900">Confirm</div>
            </div>
            <div className="px-4 py-4 text-sm text-gray-700">
              {message || "Are you sure you want to perform this action?"}
            </div>
            <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-end gap-2">
              <button
                type="button"
                className="h-9 px-4 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="h-9 px-4 rounded-md bg-red-600 text-white hover:bg-red-700"
                onClick={handleConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
