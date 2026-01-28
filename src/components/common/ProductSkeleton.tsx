const ProductSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-700 rounded-xl p-3 animate-pulse">
            {/* Image */}
            <div className="h-28 bg-gray-300 dark:bg-gray-600 rounded-lg mb-3" />

            {/* Title */}
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2" />

            {/* Price */}
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
        </div>
    );
};

export default ProductSkeleton;
