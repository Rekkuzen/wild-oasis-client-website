"use client";

type ErrorPropType = {
  error: Error;
  reset: () => void;
};

const GlobalError = ({ error, reset }: ErrorPropType) => {
  // create this for RootLayout Error fallback...
  return (
    <div className="-mt-40 flex h-full flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 px-6 py-3 text-lg text-primary-800"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
};

export default GlobalError;
