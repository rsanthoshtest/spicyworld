import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    className?: string;
    showArrow?: boolean;
}

export default function Button({
    children,
    href,
    onClick,
    variant = "primary",
    className = "",
    showArrow = false,
}: ButtonProps) {
    const variants = {
        primary: "bg-primary text-white hover:bg-accent transition-colors",
        secondary: "bg-secondary text-white hover:bg-primary transition-colors",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all",
        ghost: "text-dark hover:text-primary transition-colors",
    };

    const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-base shadow-sm hover:scale-105 active:scale-95 transition-transform duration-200";

    const content = (
        <>
            {children}
            {showArrow && (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            )}
        </>
    );

    const fullClassName = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={fullClassName}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={fullClassName}>
            {content}
        </button>
    );
}
