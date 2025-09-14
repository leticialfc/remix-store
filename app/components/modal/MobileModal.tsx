import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import { useMobileModal } from "~/hooks/useMobileModal";
import ModalBackdrop from "./ModalBackdrop";
import ModalHeader from "./ModalHeader";
import ModalSheet from "./ModalSheet";

interface MobileModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    className?: string;
}

const MobileModal = ({ isOpen, onClose, title, children, className = "" }: MobileModalProps) => {
    const {
        isVisible,
        hasDOM,
        modalRef,
        closeButtonRef,
        handleBackdropClick,
        handleModalClick,
    } = useMobileModal({ isOpen, onClose });

    if (!hasDOM || !isVisible) return null;

    const modalContent = (
        <>
            <ModalBackdrop isOpen={isOpen} onClick={handleBackdropClick} />
            <ModalSheet
                isOpen={isOpen}
                modalRef={modalRef}
                onMouseDown={handleModalClick}
                className={className}
            >
                <ModalHeader
                    title={title}
                    onClose={onClose}
                    closeButtonRef={closeButtonRef}
                />
                <div className="flex-1 p-5 overflow-y-auto">
                    {children}
                </div>
            </ModalSheet>
        </>
    );

    return createPortal(modalContent, document.body);
};

export default MobileModal;