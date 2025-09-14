import { X } from "lucide-react";
import type { RefObject } from "react";

interface ModalHeaderProps {
    title: string;
    onClose: () => void;
    closeButtonRef: RefObject<HTMLButtonElement | null>;
}

export default function ModalHeader({ title, onClose, closeButtonRef }: ModalHeaderProps) {
    return (
        <div className="flex items-center justify-between p-5 border-b border-gray-500 rounded-t-3xl">
            <h2 id="modal-title" className="text-md font-medium">
                {title}
            </h2>
            <button
                ref={closeButtonRef}
                onClick={onClose}
                className="p-2 rounded-full"
                aria-label={`Close ${title.toLowerCase()}`}
            >
                <X className="h-6 w-6" aria-hidden="true" />
            </button>
        </div>
    );
}