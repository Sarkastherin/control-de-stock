import React from "react";

export const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`rounded-md border border-border dark:bg-slate-900 p-8 shadow-sm sm:p-6 md:min-w-sm ${className}`}>
      {children}
    </div>
  );
};
