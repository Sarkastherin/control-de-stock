import type React from "react";
import { Button, variants } from "../Buttons";
type ButtonsFooter = {
  label: string;
  handleOnClick: () => void;
  variant?:keyof typeof variants
};
type FooterModal = {
  btnPrimary?: ButtonsFooter;
  btnSecondary?: ButtonsFooter;
};

export type ModalProps = {
  title: string;
  bodyModal: React.ReactNode;
  onClose: () => void;
  variant: "loading" | "success" | "error";
  footer?: FooterModal;
};
export const Modal = ({
  title,
  onClose,
  bodyModal,
  variant,
  footer,
}: ModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="flex items-start justify-between">
          <h2
            id="modalTitle"
            className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white"
          >
            {title}
          </h2>
          {variant !== "loading" && (
            <button
              type="button"
              onClick={onClose}
              className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-red-400 cursor-pointer"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="mt-4">{bodyModal}</div>
        {footer && (
          <footer className="mt-6 flex justify-end gap-2">
            {footer.btnSecondary && (
              <button
                type="button"
                onClick={footer.btnSecondary.handleOnClick}
                className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >{footer.btnSecondary.label}</button>
            )}
            {footer.btnPrimary && (
              <Button
                variant={footer.btnPrimary.variant}
                onClick={footer.btnPrimary.handleOnClick}
                type="button">
                {footer.btnPrimary.label}
              </Button>
            )}
          </footer>
        )}
      </div>
    </div>
  );
};
