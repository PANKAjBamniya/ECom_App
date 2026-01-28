import { IoArrowBack } from "react-icons/io5";
import ButtomTab from "./ButtomTab";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import ProductCard from "./common/ProductCard";
import NotificationIcon from "./common/NotificationIcon";

const SaveItems = () => {
    const navigate = useNavigate();

    const savedItems = useSelector(
        (state: RootState) => state.wishlist.items
    );

    const handleShowProduct = (id: number) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="min-h-screen w-full flex justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl shadow-md flex flex-col h-[90vh] mt-4 overflow-hidden">

                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <Link to="/">
                            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                                <IoArrowBack className="text-lg dark:text-white" />
                            </button>
                        </Link>

                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Saved items
                        </h1>

                        <NotificationIcon />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-hide">
                    {savedItems.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
                            No saved products ❤️
                        </p>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {savedItems.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onClick={() => handleShowProduct(product.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Bottom Tab */}
                <ButtomTab />
            </div>
        </div>
    );
};

export default SaveItems;
