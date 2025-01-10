const Loader = ({ size }: { size: number }) => {
  return (
    <div className="flex  items-center justify-center bg-white dark:bg-dark">
      <div className={`h-${size} w-${size} animate-spin rounded-full border-4 border-solid border-primary border-t-transparent`}>
      </div>
    </div>
  );
};

export default Loader;
