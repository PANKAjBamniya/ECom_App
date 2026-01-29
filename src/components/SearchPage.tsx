import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import ButtomTab from "./ButtomTab";
import Search from "./common/Search";
import NotificationIcon from "./common/NotificationIcon";
import Loader from "./common/Loader";
import { useGetProductsQuery } from "../store/products/productApi";

const SearchPage = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");


    const { data: products, isLoading, error } = useGetProductsQuery();

    const filteredProducts = products?.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
    ) || [];

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
                        placeholder="Search products..." //  Add placeholder
                    />
                </div>

                {/* Results */}
                <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-hide">
                    {/*  Loading State */}
                    {isLoading && (
                        <div className="flex justify-center items-center h-full">
                            <Loader />
                        </div>
                    )}

                    {/*  Error State */}
                    {error && (
                        <p className="text-center text-sm text-red-500 dark:text-red-400">
                            Failed to load products
                        </p>
                    )}

                    {/*  Empty Search State */}
                    {!isLoading && !error && query.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <div className="text-6xl mb-4">🔍</div>
                            <p className="text-sm text-gray-400 dark:text-gray-500">
                                Start typing to search products
                            </p>
                        </div>
                    )}

                    {/* Search Results */}
                    {!isLoading && !error && query.length > 0 && (
                        filteredProducts.length > 0 ? (
                            <div className="space-y-3">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product._id} // Use _id instead of id
                                        className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3 flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-600 transition cursor-pointer"
                                        onClick={() => navigate(`/product/${product._id}`)} //  Clickable card
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={product.image.url} // Use image.url
                                                alt={product.title}
                                                className="w-14 h-14 object-cover border border-gray-300 dark:border-gray-600 rounded-lg"
                                            />
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                                                    {product.title}
                                                </h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {product.category}
                                                </p>
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                                                    ${product.price}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent card click
                                                navigate(`/product/${product._id}`);
                                            }}
                                            className="text-xs bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-full hover:scale-105 transition"
                                        >
                                            View
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="text-6xl mb-4">😔</div>
                                <p className="text-sm text-gray-400 dark:text-gray-500">
                                    No products found for "{query}"
                                </p>
                                <button
                                    onClick={() => setQuery("")}
                                    className="mt-4 text-xs text-blue-500 hover:underline"
                                >
                                    Clear search
                                </button>
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