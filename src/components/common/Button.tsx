import React from "react";

type ButtonProps = {
    text: string;
    className?: string;
    type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
    text,
    className = "",
    type = "button",
}) => {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
