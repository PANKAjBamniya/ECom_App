import { Link } from "react-router-dom";
import {
    FiUser,
    FiHome,
    FiCreditCard,
    FiBell,
    FiHelpCircle,
    FiLogOut,
} from "react-icons/fi";
import { FaBorderAll } from "react-icons/fa";
import NotificationIcon from "./common/NotificationIcon";
import { IoArrowBack } from "react-icons/io5";
import AcItemOption from "./common/AcItemOption";
import ButtomTab from "./ButtomTab";

const AccountPage = () => {
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
                            Account
                        </h1>

                        <NotificationIcon />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">

                    <AcItemOption icon={FaBorderAll} text="My Order" to="/order" />

                    <div className="h-3 bg-gray-100 dark:bg-gray-700" />

                    <AcItemOption icon={FiUser} text="My Details" />
                    <AcItemOption icon={FiHome} text="Address Book" />
                    <AcItemOption icon={FiCreditCard} text="Payment Methods" />
                    <AcItemOption icon={FiBell} text="Notifications" />

                    <div className="h-3 bg-gray-100 dark:bg-gray-700" />

                    <AcItemOption icon={FiHelpCircle} text="FAQs" />
                    <AcItemOption icon={FiHelpCircle} text="Help Center" />

                    <div className="h-3 bg-gray-100 dark:bg-gray-700" />

                    <AcItemOption icon={FiLogOut} text="Logout" danger />
                </div>

                {/* Bottom Tab */}
                <ButtomTab />
            </div>
        </div>
    );
};

export default AccountPage;
