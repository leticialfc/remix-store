import type { ReactNode, RefObject } from "react";

interface ModalSheetProps {
    isOpen: boolean;
    children: ReactNode;
    className?: string;
    modalRef: RefObject<HTMLDivElement | null>;
    onMouseDown: (e: React.MouseEvent) => void;
}

export default function ModalSheet({
    isOpen,
    children,
    className = "",
    modalRef,
    onMouseDown
}: ModalSheetProps) {
    return (
        <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onMouseDown={onMouseDown}
            className={[
                "absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl",
                "max-h-[80vh] flex flex-col",
                "transition-transform duration-300 ease-out",
                isOpen ? "translate-y-0" : "translate-y-full",
                "z-[1201]",
                className,
            ].join(" ")}
        >
            {children}
        </div>
    );
}