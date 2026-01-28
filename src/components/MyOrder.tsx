import { Link } from "react-router-dom";
import ButtomTab from "./ButtomTab";
import NotificationIcon from "./common/NotificationIcon";
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const MyOrder = () => {
    const orders = useSelector(
        (state: RootState) => state.order.orders
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
                            My Orders
                        </h1>

                        <NotificationIcon />
                    </div>
                </div>

                {/* Orders */}
                <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-hide">
                    {orders.length === 0 ? (
                        /* Empty State */
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                You have no orders yet
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                Your past and current orders will appear here
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders?.map((order) => (
                                <div
                                    key={order.orderId}
                                    className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4"
                                >
                                    {/* Order Meta */}
                                    <div className="flex justify-between mb-2">
                                        <p className="text-xs text-gray-500 dark:text-gray-300">
                                            Order ID
                                        </p>
                                        <p className="text-xs font-medium dark:text-white">
                                            {order.orderId}
                                        </p>
                                    </div>

                                    <div className="flex justify-between mb-2">
                                        <p className="text-xs text-gray-500 dark:text-gray-300">
                                            Date
                                        </p>
                                        <p className="text-xs dark:text-white">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex justify-between font-semibold mb-3 dark:text-white">
                                        <span>Total</span>
                                        <span>₹{order.totalAmount}</span>
                                    </div>

                                    {/* Order Items */}
                                    <div className="space-y-2">
                                        {orders[0].map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center gap-3"
                                            >
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="w-10 h-10 rounded-lg object-cover"
                                                />

                                                <div className="flex-1">
                                                    <p className="text-sm dark:text-white">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-300">
                                                        ₹{item.price} × {item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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

export default MyOrder;
