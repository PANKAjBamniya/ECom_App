import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import Button from "../../components/common/Button";
import ProductCard from "../../components/common/ProductCard";
import ButtomTab from "../../components/ButtomTab";
import Search from "../../components/common/Search";
import NotificationIcon from "../../components/common/NotificationIcon";
import { fetchProducts } from "../../store/slice/productSlice";
import Loader from "../../components/common/Loader";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [query, setQuery] = useState("");

    const { products, loading, error } = useSelector(
        (state: RootState) => state.product
    );

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );

    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            dispatch(fetchProducts());
        }
    }, [user, navigate, dispatch]);

    const handleShowProduct = (id: number) => {
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

                        <button className="bg-black dark:bg-gray-700 text-white p-3 rounded-xl">
                            <BiMenu className="text-xl" />
                        </button>
                    </div>

                    {/* Categories */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        <Button
                            text="All"
                            className="bg-black text-white dark:bg-gray-700"
                        />
                        <Button
                            text="T-Shirt"
                            className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                        />
                        <Button
                            text="Shoes"
                            className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                        />
                    </div>
                </div>

                {/* Products */}
                <div className="flex-1 overflow-y-auto px-4 pb-24 scrollbar-hide w-full">
                    <div className="flex justify-center">
                        {loading && <Loader />}
                        {error && (
                            <p className="text-red-500 dark:text-red-400">
                                {error}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onClick={() => handleShowProduct(product.id)}
                            />
                        ))}
                    </div>
                </div>

                <ButtomTab />
            </div>
        </div>
    );
};

export default Home;
