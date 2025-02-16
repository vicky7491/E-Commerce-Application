import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-gradient-to-r from-neutral-800 to-neutral-700 shadow-lg",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
