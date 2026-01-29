import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FiCreditCard, FiPlus } from "react-icons/fi";
import { FaGooglePay, FaPaypal, FaMoneyBillWave } from "react-icons/fa";
import PaymentOption from "../../components/common/PaymentOption";

const PaymentPage = () => {
    return (
        <div className="min-h-screen w-full flex justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl shadow-md flex flex-col h-[90vh] mt-4 overflow-hidden">

                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <Link to="/account">
                        <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                            <IoArrowBack className="text-lg dark:text-white" />
                        </button>
                    </Link>

                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Payment Methods
                    </h1>

                    <span />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-hide">

                    {/* Saved Cards */}
                    <div>
                        <h2 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                            Saved Cards
                        </h2>

                        <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FiCreditCard className="text-lg text-gray-600 dark:text-gray-300" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        Visa •••• 4242
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Expires 09/26
                                    </p>
                                </div>
                            </div>
                            <input type="radio" checked readOnly />
                        </div>
                    </div>

                    {/* UPI / Wallets */}
                    <div>
                        <h2 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                            UPI / Wallets
                        </h2>

                        <PaymentOption icon={FaGooglePay} label="Google Pay" />
                        <PaymentOption icon={FaPaypal} label="PayPal" />
                    </div>

                    {/* Cash on Delivery */}
                    <div>
                        <h2 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                            Other
                        </h2>

                        <PaymentOption
                            icon={FaMoneyBillWave}
                            label="Cash on Delivery"
                        />
                    </div>

                    {/* Add New */}
                    <button className="w-full py-3 rounded-xl border border-dashed border-gray-400 dark:border-gray-500 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2">
                        <FiPlus />
                        Add New Payment Method
                    </button>
                </div>

                {/* Pay Button */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="w-full bg-black dark:bg-white dark:text-black text-white py-3 rounded-xl font-medium">
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;



