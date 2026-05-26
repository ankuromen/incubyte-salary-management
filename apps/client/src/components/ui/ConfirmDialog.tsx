import { useEffect } from "react";
import { Button } from "./Button";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isLoading = false,
  onConfirm,
  onCancel
}: ConfirmDialogProps) => {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, isLoading, onCancel]);

  if (!open) {
    return null;
  }

  return (
    <div
      aria-labelledby="confirm-dialog-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
    >
      <button
        aria-label="Close dialog"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        disabled={isLoading}
        type="button"
        onClick={onCancel}
      />

      <div className="relative w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-6 shadow-elevated">
        <h2 className="text-lg font-bold text-slate-900" id="confirm-dialog-title">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{message}</p>

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button disabled={isLoading} type="button" variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button disabled={isLoading} type="button" variant="danger" onClick={onConfirm}>
            {isLoading ? "Deleting…" : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
