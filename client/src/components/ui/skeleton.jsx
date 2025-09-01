import React from "react";

// Shimmer animation
function Shimmer() {
  return (
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
  );
}

function Skeleton({ className }) {
  return (
    <div className={`relative overflow-hidden bg-muted rounded-md ${className}`}>
      <Shimmer />
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 p-6 bg-background">
      {/* Simulated Header */}
      <div className="space-y-4 w-full max-w-2xl">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Simulated content cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export { Skeleton, LoadingScreen };
