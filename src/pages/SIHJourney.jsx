import React from "react";

const SIHApp = React.lazy(() => import("../../SIH2025/src/App.jsx"));

export default function SIHJourney() {
  return (
    <div className="w-full h-full">
      <React.Suspense
        fallback={<div className="p-8">Loading journey app...</div>}
      >
        <SIHApp />
      </React.Suspense>
    </div>
  );
}
