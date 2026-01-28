import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { addToWishlist, removeFromWishlist } from "../../store/slice/wishlistSlice";
import { toast } from "react-toastify";

const ProductCard = ({ onClick, product }) => {
    const dispatch = useDispatch();

    const isSaved = useSelector((state: RootState) =>
        state.wishlist.items.some((item) => item.id === product.id)
    );

    const hanldeWishList = (product) => {
        if (!isSaved) {
            dispatch(addToWishlist(product));
            toast.success("Save Product")
        } else {
            dispatch(removeFromWishlist(product.id))
        }
    }

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer dark:bg-gray-700"
        >
            {/* Image */}
            <div className="relative">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-32 object-cove rounded-2xl"
                />

                {/*  Heart */}
                <div
                    className="absolute top-2 right-2 bg-white/70 backdrop-blur rounded-full p-1"
                    onClick={(e) => {
                        e.stopPropagation();
                        hanldeWishList(product)
                    }}
                >
                    {isSaved ? (
                        <FaHeart className="text-red-500 text-lg" />
                    ) : (
                        <CiHeart className="text-gray-700 text-lg" />
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-3">
                <h2 className="text-sm font-medium  truncate dark:text-white">
                    {product.title}
                </h2>

                <div className="flex items-center justify-between mt-1">
                    <p className="text-sm font-semibold dark:text-gray-50">
                        ${product.price}
                    </p>
                    <span className="text-xs text-green-600 font-medium ">
                        20% OFF
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
