import { useParams, Link, useNavigate } from "react-router-dom";
import NotificationIcon from "./common/NotificationIcon";
import { IoArrowBack } from "react-icons/io5";
import { RiStarSFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchSingleProduct } from "../store/slice/productSlice";
import { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { addToWishlist } from "../store/slice/wishlistSlice";
import { addToCart } from "../store/slice/cartSlice";
import { toast } from "react-toastify";
import Loader from "./common/Loader";

const SingleProductPage = () => {
    const { singleProduct, loading, error } = useSelector(
        (state: RootState) => state.product
    );

    const isSaved = useSelector((state: RootState) =>
        state.wishlist.items.some(
            (item) => item.id === singleProduct?.id
        )
    );

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(fetchSingleProduct(Number(id)));
        }
    }, [id, dispatch]);

    if (loading) return <Loader />;

    if (error) {
        return (
            <p className="text-center mt-10 text-red-500 dark:text-red-400">
                {error}
            </p>
        );
    }

    if (!singleProduct) return null;

    const handleAddToCart = () => {
        dispatch(addToCart(singleProduct));
        toast.success("Product Added Successfully");
        navigate("/cart");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center p-4">
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-lg mt-4 overflow-hidden">

                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                    >
                        <IoArrowBack className="text-lg dark:text-white" />
                    </button>

                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Product
                    </h1>

                    <NotificationIcon />
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Image */}
                    <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4 overflow-hidden relative">
                        <img
                            src={singleProduct.thumbnail}
                            alt={singleProduct.title}
                            className="w-full h-full object-cover"
                        />

                        {/* Wishlist */}
                        <div
                            className="absolute top-2 right-2 bg-white/80 dark:bg-black/60 backdrop-blur rounded-full p-2 cursor-pointer"
                            onClick={() => dispatch(addToWishlist(singleProduct))}
                        >
                            {isSaved ? (
                                <FaHeart className="text-red-500 text-xl" />
                            ) : (
                                <CiHeart className="text-gray-700 dark:text-gray-200 text-xl" />
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {singleProduct.title}
                    </h2>

                    {/* Rating */}
                    <p className="flex items-center gap-1 text-sm mt-3 text-gray-600 dark:text-gray-300">
                        <RiStarSFill className="text-yellow-500 text-lg" />
                        <Link
                            to="/review"
                            state={{ reviews: singleProduct.reviews }}
                            className="underline"
                        >
                            {singleProduct.rating}
                        </Link>
                        ({singleProduct.reviews.length} reviews)
                    </p>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                        {singleProduct.description}
                    </p>

                    {/* Size */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Choose size
                        </h2>
                        <div className="flex gap-3 mt-2">
                            {["S", "M", "L"].map(size => (
                                <span
                                    key={size}
                                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm cursor-pointer dark:text-white"
                                >
                                    {size}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center gap-4 mt-6">
                        <div className="flex flex-col w-40">
                            <span className="text-sm text-gray-400">Price</span>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                ${singleProduct.price}
                            </span>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-black dark:bg-white dark:text-black text-white py-3 rounded-xl font-semibold"
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
