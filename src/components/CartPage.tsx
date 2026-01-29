import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import NotificationIcon from "./common/NotificationIcon";
import ButtomTab from "./ButtomTab";
import { BiCart } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { addToCart, decrease, removeFromCart } from "../store/slice/cartSlice";
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const CartPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items } = useSelector((state: RootState) => state.cart);

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

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

                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                            My Cart
                        </h1>

                        <NotificationIcon />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-hide">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <BiCart className="text-gray-400 dark:text-gray-500 text-5xl mb-2" />
                            <h3 className="text-lg font-medium dark:text-white">
                                Your Cart is empty
                            </h3>
                            <p className="text-sm text-gray-400 mt-2 max-w-xs">
                                When you add products, they’ll appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {items.map((i) => (
                                <div
                                    key={i.id}
                                    className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3"
                                >
                                    <div className="flex items-center justify-between relative">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={i.image.url}
                                                alt={i.title}
                                                className="w-14 h-14 rounded-lg object-cover border dark:border-gray-600"
                                            />
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {i.title}
                                                </h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-300">
                                                    ₹{i.price}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Remove */}
                                        <button
                                            onClick={() => dispatch(removeFromCart(i.id))}
                                            className="text-xs bg-red-600 text-white p-2 rounded-full absolute top-0 right-0"
                                        >
                                            <AiFillDelete />
                                        </button>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => dispatch(decrease(i.id))}
                                                className="p-1 bg-white dark:bg-gray-600 rounded-lg border dark:border-gray-500"
                                            >
                                                <AiOutlineMinus className="dark:text-white" />
                                            </button>

                                            <span className="text-sm font-medium dark:text-white">
                                                {i.quantity}
                                            </span>

                                            <button
                                                onClick={() => dispatch(addToCart(i))}
                                                className="p-1 bg-white dark:bg-gray-600 rounded-lg border dark:border-gray-500"
                                            >
                                                <AiOutlinePlus className="dark:text-white" />
                                            </button>
                                        </div>

                                        <span className="text-sm font-semibold dark:text-white">
                                            ${(i.price * i.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-500 dark:text-gray-300">
                                Total
                            </span>
                            <span className="text-lg font-semibold dark:text-white">
                                ${total.toFixed(2)}
                            </span>
                        </div>

                        <Link to="/checkout">
                            <button className="w-full bg-black dark:bg-white dark:text-black text-white py-3 rounded-xl font-semibold">
                                Checkout
                            </button>
                        </Link>
                    </div>
                )}

                <ButtomTab />
            </div>
        </div>
    );
};

export default CartPage;
