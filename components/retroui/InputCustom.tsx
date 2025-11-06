import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = "text",
  placeholder = "Enter text",
  className = "",
  ...props
}, ref) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`px-3 py-1.5 w-full border-2 shadow-md transition focus:outline-hidden focus:shadow-xs ${
        props["aria-invalid"]
          ? "border-destructive text-destructive shadow-xs shadow-destructive"
          : ""
      } ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";
