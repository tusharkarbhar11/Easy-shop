
const Loader = ({ className = "" }) => {
  return (
    <div
      className={`flex min-h-60 flex-col items-center justify-center p-6 text-center ${className}`}
    >
      
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-orange-500" />

       
      <h2 className="mt-5 text-xl font-semibold text-white">
        Loading products...
      </h2>

      <p className="mt-2 text-sm text-gray-400">
        Getting everything ready for you.
      </p>
    </div>
  );
};

export default Loader;
