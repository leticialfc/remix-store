interface ModalBackdropProps {
    isOpen: boolean;
    onClick: (e: React.MouseEvent) => void;
}

export default function ModalBackdrop({ isOpen, onClick }: ModalBackdropProps) {
    return (
        <div
            className={[
                "fixed inset-0 lg:hidden",
                isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none",
                "transition-opacity duration-300 ease-in-out",
                "z-[1200]", // above everything
            ].join(" ")}
            id="mobile-modal-layer"
        >
            <div
                className="absolute inset-0 bg-black/50 z-[1200]"
                onMouseDown={onClick}
                aria-hidden="true"
            />
        </div>
    );
}