import { ChevronUp } from "lucide-react";

interface BackToTopButtonProps {
    isVisible: boolean;
    onClick: () => void;
}

export default function BackToTopButton({ isVisible, onClick }: BackToTopButtonProps) {
    if (!isVisible) return null;

    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 z-40 p-3 bg-gray-900 hover:bg-black text-white rounded-full shadow-lg transition-all duration-300 focus:outline-none"
            aria-label="Go back to top"
        >
            <ChevronUp className="h-6 w-6" aria-hidden="true" />
        </button>
    );
}