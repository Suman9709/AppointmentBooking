import React from "react";

const Loader = ({ label = "Loading...", fullPage = false }) => (
  <div
    className={`flex items-center justify-center gap-3 text-sky-700 ${fullPage ? "min-h-[60vh]" : "py-8"}`}
    role="status"
    aria-live="polite"
  >
    <span className="h-7 w-7 animate-spin rounded-full border-3 border-sky-200 border-t-sky-600" />
    <span className="font-medium">{label}</span>
  </div>
);

export default Loader;

