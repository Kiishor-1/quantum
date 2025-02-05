import { useEffect } from "react";

export default function Modal({ isOpen, onClose, children }) {
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEscapeKey);
        return () => window.removeEventListener("keydown", handleEscapeKey);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 md:p-0 p-4 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
                {children}
            </div>
        </div>
    );
}
