const NotFound = () => {
  return (
    <div className="center relative flex flex-1">
      <div className="flex max-w-md flex-col items-start gap-y-4 px-4 sm:px-6">
        <h1 className="bg-surface-inverse px-2 py-1 text-left font-bold font-mono text-4xl text-foreground-inverse sm:text-5xl">
          404
        </h1>
        <div className="flex flex-col items-start gap-y-1">
          <p className="text-left font-medium font-mono text-foreground text-lg">
            This page could not be found.
          </p>
          <p className="text-left font-mono text-foreground-soft text-sm">
            The route you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
