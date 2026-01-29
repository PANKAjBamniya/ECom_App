import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useEffect, useState, useMemo } from "react";
import { BiMenu } from "react-icons/bi";
import Button from "../../components/common/Button";
import ProductCard from "../../components/common/ProductCard";
import ButtomTab from "../../components/ButtomTab";
import Search from "../../components/common/Search";
import NotificationIcon from "../../components/common/NotificationIcon";
import Loader from "../../components/common/Loader";
import { useGetProductsQuery } from "../../store/products/productApi";

const Home = () => {
    const { isLoggedIn: isGoogleLoggedIn } = useSelector(
        (state: RootState) => state.googleAuth
    );
    const { data: products, isLoading, error } = useGetProductsQuery();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        if (!user && !isGoogleLoggedIn) {
            navigate("/login");
        }
    }, [user, navigate]);

    const categories = useMemo(() => {
        if (!products) return ["All"];

        const uniqueCategories = Array.from(
            new Set(products.map((product) => product.category))
        );

        return ["All", ...uniqueCategories];
    }, [products]);

    const filteredProducts = useMemo(() => {
        if (!products) return [];

        return products.filter((product) => {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(query.toLowerCase());

            const matchesCategory =
                selectedCategory === "All" || product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [products, query, selectedCategory]);

    const handleShowProduct = (id: string) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center">
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl shadow-md flex flex-col h-[90vh] mt-4 overflow-hidden">

                {/* Header */}
                <div className="p-4 pb-2">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Discover
                        </h1>
                        <NotificationIcon />
                    </div>

                    {/* Search Bar */}
                    <div className="flex items-center gap-2 mb-4">
                        <Search
                            value={query}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setQuery(e.target.value)
                            }
                        />

                        <button className="bg-black dark:bg-gray-700 text-white p-3 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition">
                            <BiMenu className="text-xl" />
                        </button>
                    </div>

                    {/* Dynamic Categories */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                text={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`whitespace-nowrap ${selectedCategory === category
                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Products */}
                <div className="flex-1 overflow-y-auto px-4 pb-24 scrollbar-hide w-full">
                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex justify-center items-center h-full">
                            <Loader />
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-red-500 dark:text-red-400">
                                Failed to load products
                            </p>
                        </div>
                    )}

                    {/* Products Grid */}
                    {!isLoading && !error && (
                        <>
                            {/* Category/Search Info */}
                            {(selectedCategory !== "All" || query) && (
                                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                                    {filteredProducts.length} product(s) found
                                    {selectedCategory !== "All" && ` in ${selectedCategory}`}
                                    {query && ` for "${query}"`}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                            onClick={() => handleShowProduct(product._id)}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-2 text-center py-12">
                                        <div className="text-6xl mb-4">🔍</div>
                                        <p className="text-gray-500 dark:text-gray-400 mb-2">
                                            No products found
                                        </p>
                                        {(selectedCategory !== "All" || query) && (
                                            <button
                                                onClick={() => {
                                                    setSelectedCategory("All");
                                                    setQuery("");
                                                }}
                                                className="text-sm text-blue-500 hover:underline"
                                            >
                                                Clear filters
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                <ButtomTab />
            </div>
        </div>
    );
};

export default Home;