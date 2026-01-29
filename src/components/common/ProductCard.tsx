import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { addToWishlist, removeFromWishlist } from "../../store/slice/wishlistSlice";
import { toast } from "react-toastify";
import { useMemo } from "react";

interface ProductCardProps {
    onClick: () => void;
    product: {
        _id: string;
        title: string;
        price: number;
        image: {
            url: string;
        };
        category?: string;
    };
}

const ProductCard = ({ onClick, product }: ProductCardProps) => {
    const dispatch = useDispatch();


    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);


    const isSaved = useMemo(() => {
        return wishlistItems.some((item) => item._id === product._id);
    }, [wishlistItems, product._id]);

    const handleWishList = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!isSaved) {
            dispatch(addToWishlist(product));
            toast.success("Added to wishlist");
        } else {
            dispatch(removeFromWishlist(product._id));
            toast.success("Removed from wishlist");
        }
    };

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer dark:bg-gray-700 hover:shadow-md transition"
        >
            {/* Image */}
            <div className="relative">
                <img
                    src={product.image.url}
                    alt={product.title}
                    className="w-full h-32 object-cover rounded-2xl"
                />

                {/* Heart Button */}
                <button
                    className="absolute top-2 right-2 bg-white/80 backdrop-blur rounded-full p-2 hover:bg-white transition"
                    onClick={handleWishList}
                    aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
                >
                    {isSaved ? (
                        <FaHeart className="text-red-500 text-lg" />
                    ) : (
                        <CiHeart className="text-gray-700 text-lg" />
                    )}
                </button>
            </div>

            {/* Content */}
            <div className="p-3">
                <h2 className="text-sm font-medium truncate dark:text-white">
                    {product.title}
                </h2>

                <div className="flex items-center justify-between mt-1">
                    <p className="text-sm font-semibold dark:text-gray-50">
                        ${product.price}
                    </p>
                    <span className="text-xs text-green-600 font-medium">
                        20% OFF
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;