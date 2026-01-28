import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import ButtomTab from "./ButtomTab";
import Search from "./common/Search";
import NotificationIcon from "./common/NotificationIcon";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import Loader from "./common/Loader";

const SearchPage = () => {
    const navigate = useNavigate();

    const { products, loading, error } = useSelector(
        (state: RootState) => state.product
    );

    const [query, setQuery] = useState("");

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="min-h-screen w-full flex justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl shadow-md flex flex-col h-[90vh] mt-4 overflow-hidden">

                {/* Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <Link to="/">
                            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                                <IoArrowBack className="text-lg dark:text-white" />
                            </button>
                        </Link>

                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Search
                        </h1>

                        <NotificationIcon />
                    </div>
                </div>

                {/* Search Input */}
                <div className="px-4 py-3">
                    <Search
                        value={query}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setQuery(e.target.value)
                        }
                    />
                </div>

                {/* Results */}
                <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-hide">
                    {loading && <Loader />}

                    {error && (
                        <p className="text-center text-sm text-red-500 dark:text-red-400">
                            {error}
                        </p>
                    )}

                    {query.length > 0 && !loading && (
                        filteredProducts.length > 0 ? (
                            <div className="space-y-3">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={product.thumbnail}
                                                alt={product.title}
                                                className="w-12 border border-gray-300 dark:border-gray-600 rounded-lg"
                                            />
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {product.title}
                                                </h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-300">
                                                    ₹{product.price}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => navigate(`/product/${product.id}`)}
                                            className="text-xs bg-black dark:bg-white dark:text-black text-white px-3 py-1 rounded-full"
                                        >
                                            View
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-center">
                                <p className="text-sm text-gray-400 dark:text-gray-500">
                                    No products found
                                </p>
                            </div>
                        )
                    )}
                </div>

                {/* Bottom Tab */}
                <ButtomTab />
            </div>
        </div>
    );
};

export default SearchPage;
