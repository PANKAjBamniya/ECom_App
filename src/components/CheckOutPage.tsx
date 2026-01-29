import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import NotificationIcon from "./common/NotificationIcon";
import ButtomTab from "./ButtomTab";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { toast } from "react-toastify";

const CheckOutPage = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const { items } = useSelector((state: RootState) => state.cart);

    // total price
    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );


    const orderPlace = () => {
        // console.log(items)
        toast.success("Order Successfully")
    }

    return (
        <div className="min-h-screen w-full flex justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-md flex flex-col h-[90vh] mt-4 overflow-hidden ">

                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <Link to="/cart">
                        <button className="p-2 rounded-lg bg-gray-100">
                            <IoArrowBack className="text-lg" />
                        </button>
                    </Link>

                    <h1 className="text-lg font-semibold text-gray-900">
                        Checkout
                    </h1>

                    <NotificationIcon />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">

                    <div className="bg-gray-100 rounded-xl p-4">
                        <h2 className="text-sm font-semibold mb-2">
                            Delivery Address
                        </h2>

                        <p className="text-sm text-gray-700">
                            {user.name} <br />
                            21, MG Road <br />
                            Indore, MP - 452001 <br />
                            India
                        </p>

                        <button className="text-xs text-blue-600 mt-2">
                            Change address
                        </button>
                    </div>

                    {/* Products */}
                    <div>
                        <h2 className="text-sm font-semibold mb-2">
                            Products
                        </h2>

                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between mb-3"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <div>
                                        <p className="text-sm font-medium">
                                            {item.title}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            ₹{item.price} × {item.quantity}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-sm font-semibold">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-100 rounded-xl p-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span>Subtotal</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-sm mb-2">
                            <span>Delivery</span>
                            <span>₹40.00</span>
                        </div>

                        <div className="flex justify-between font-semibold border-t pt-2">
                            <span>Total</span>
                            <span>₹{(total + 40).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Place Order */}
                <div className="p-4 border-t">
                    <button onClick={orderPlace} className="w-full bg-black text-white py-3 rounded-xl">
                        Place Order
                    </button>
                </div>

                {/* Bottom Tab */}
                <ButtomTab />
            </div>
        </div>
    );
};

export default CheckOutPage;
