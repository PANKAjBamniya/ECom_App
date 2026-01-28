import { BiMessage } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";
import ButtomTab from "./ButtomTab";
import { Link } from "react-router-dom";
import NotificationIcon from "./common/NotificationIcon";

const Notifications = () => {
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
                            Notifications
                        </h1>

                        <NotificationIcon />
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-hide">
                    {/* Empty State */}
                    <div className="h-full flex flex-col items-center justify-center text-center">
                        <BiMessage className="text-4xl text-gray-300 dark:text-gray-500 mb-3" />
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                            No notifications yet
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-400 mt-1">
                            You’ll see updates here
                        </p>
                    </div>
                </div>

                {/* Bottom Tab */}
                <ButtomTab />
            </div>
        </div>
    );
};

export default Notifications;
