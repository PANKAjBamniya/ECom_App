import { useParams, Link, useNavigate } from "react-router-dom";
import NotificationIcon from "./common/NotificationIcon";
import { IoArrowBack } from "react-icons/io5";
import { RiStarSFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { addToWishlist, removeFromWishlist } from "../store/slice/wishlistSlice";
import { addToCart } from "../store/slice/cartSlice";
import { toast } from "react-toastify";
import Loader from "./common/Loader";
import { useGetProductByIdQuery } from "../store/products/productApi";
import { useMemo } from "react";

const SingleProductPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const { data: singleProduct, isLoading, error } = useGetProductByIdQuery(id!);


    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);


    const isSaved = useMemo(() => {
        if (!singleProduct) return false;
        return wishlistItems.some((item) => item._id === singleProduct._id);
    }, [wishlistItems, singleProduct]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <Loader />
            </div>
        );
    }


    if (error || !singleProduct) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <p className="text-red-500 dark:text-red-400 text-lg mb-4">
                        Product not found
                    </p>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-black text-white px-6 py-2 rounded-lg"
                    >
                        Go Back Home
                    </button>
                </div>
            </div>
        );
    }

    const handleToggleWishlist = () => {
        if (isSaved) {
            dispatch(removeFromWishlist(singleProduct._id));
            toast.success("Removed from wishlist");
        } else {
            dispatch(addToWishlist(singleProduct));
            toast.success("Added to wishlist");
        }
    };

    const handleAddToCart = () => {
        dispatch(addToCart(singleProduct));
        toast.success("Product added to cart");
        navigate("/cart");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center p-4">
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-lg mt-4 overflow-hidden">

                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                    >
                        <IoArrowBack className="text-lg dark:text-white" />
                    </button>

                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Product Details
                    </h1>

                    <NotificationIcon />
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Image */}
                    <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4 overflow-hidden relative">
                        <img
                            src={singleProduct.image.url}
                            alt={singleProduct.title}
                            className="w-full h-full object-cover"
                        />

                        {/* Wishlist Button */}
                        <button
                            className="absolute top-4 right-4 bg-white/90 dark:bg-black/70 backdrop-blur rounded-full p-3 cursor-pointer hover:scale-110 transition"
                            onClick={handleToggleWishlist}
                            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            {isSaved ? (
                                <FaHeart className="text-red-500 text-xl" />
                            ) : (
                                <CiHeart className="text-gray-700 dark:text-gray-200 text-xl" />
                            )}
                        </button>
                    </div>

                    {/* Title & Category */}
                    <div className="mb-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                            {singleProduct.category}
                        </span>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                            {singleProduct.title}
                        </h2>
                    </div>

                    {/* Rating (if available) */}
                    {singleProduct.rating && singleProduct.reviews && (
                        <p className="flex items-center gap-1 text-sm mt-3 text-gray-600 dark:text-gray-300">
                            <RiStarSFill className="text-yellow-500 text-lg" />
                            <Link
                                to="/review"
                                state={{ reviews: singleProduct.reviews }}
                                className="underline hover:text-black dark:hover:text-white"
                            >
                                {singleProduct.rating}
                            </Link>
                            ({singleProduct.reviews.length} reviews)
                        </p>
                    )}

                    <p className="flex items-center gap-1 text-sm mt-3 text-gray-600 dark:text-gray-300">
                        <RiStarSFill className="text-yellow-500 text-lg" />
                        <Link
                            to="/review"
                            state={{ reviews: singleProduct.reviews }}
                            className="underline hover:text-black dark:hover:text-white"
                        >
                            reviews
                        </Link>
                    </p>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm leading-relaxed">
                        {singleProduct.description}
                    </p>

                    {/* Size (Optional - only if you have sizes in your product) */}
                    {singleProduct.sizes && singleProduct.sizes.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Choose size
                            </h2>
                            <div className="flex gap-3">
                                {singleProduct.sizes.map((size: string) => (
                                    <button
                                        key={size}
                                        className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm cursor-pointer dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Price + CTA */}
                    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Price</span>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                ${singleProduct.price}
                            </span>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-black dark:bg-white dark:text-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProductPage;