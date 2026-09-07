type LoadingSpinnerProps = {
  size?: number;
  className?: string;
  label?: string;
};

const LoadingSpinner = ({
  size = 32,
  className = "",
  label = "Loading",
}: LoadingSpinnerProps) => {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: size + 12, height: size + 12 }}
        aria-label={label}
      >
        <span className="absolute inset-0 rounded-full border-2 border-primary/15" />
        <span className="absolute inset-1 rounded-full border-2 border-transparent border-t-primary border-r-accent-orange animate-spinner-ring" />
        <span className="absolute inset-0 animate-spinner-orbit">
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent-orange shadow-[0_0_12px_rgba(245,158,11,0.7)]" />
        </span>
      </div>

      <span className="text-sm font-medium text-muted-foreground">
        {label}...
      </span>
    </div>
  );
};

export default LoadingSpinner;
