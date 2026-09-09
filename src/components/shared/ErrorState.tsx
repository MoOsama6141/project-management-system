import { RefreshCw, TriangleAlert } from "lucide-react";

type ErrorStateProps = {
  title?: string;
  message?: string;
  className?: string;
};

const ErrorState = ({
  title = "Something went wrong",
  message = "We could not load this information. Please reload the page and try again.",
  className = "",
}: ErrorStateProps) => {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center text-red-950 ${className}`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-600">
        <TriangleAlert size={22} aria-hidden="true" />
      </div>
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-red-700">{message}</p>
      </div>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-1 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        <RefreshCw size={16} aria-hidden="true" />
        Reload page
      </button>
    </div>
  );
};

export default ErrorState;
