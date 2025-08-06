import React, { createContext, useContext, useState } from "react";
import type { ModalProps } from "~/components/modals/Modal";

type UIContextType = {
    modal: ModalTypes | null;
    closeModal: () => void;
    showModal: (modal: ModalTypes) => void
};
type ModalTypes = Omit<ModalProps, "onClose">;
const UIContext = createContext<UIContextType | undefined>(undefined);
export const UIProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modal, setModal] = useState<ModalTypes | null>(null);
  const closeModal = () => setModal(null);
  const showModal = (modal: ModalTypes) => setModal(modal);
  
  return (
    <UIContext.Provider value={{ modal, closeModal, showModal }}>
      {children}
    </UIContext.Provider>
  );
};
export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
