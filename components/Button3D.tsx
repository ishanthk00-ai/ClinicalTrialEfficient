"use client";

import React from "react";

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** "sm" overrides tokens for a compact button; defaults to "md" */
  size?: "sm" | "md";
  children: React.ReactNode;
}

export default function Button3D({
  size = "md",
  className = "",
  children,
  disabled,
  ...rest
}: Button3DProps) {
  const sizeClass = size === "sm" ? "btn-3d--sm" : "";
  return (
    <button
      className={`btn-3d ${sizeClass} ${className}`.trim()}
      disabled={disabled}
      {...rest}
    >
      <span className="btn-3d__shadow" aria-hidden="true" />
      <span className="btn-3d__edge" aria-hidden="true" />
      <span className="btn-3d__front">{children}</span>
    </button>
  );
}
