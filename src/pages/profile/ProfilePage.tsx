import NotificationIcon from "../../components/common/NotificationIcon";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const ProfilePage = () => {
    const authUser = useSelector((state: RootState) => state.auth.user);
    const googleUser = useSelector((state: RootState) => state.googleAuth.user);
    const order = useSelector((state: RootState) => state.order)

    const user = authUser || googleUser;


    if (!user) {
        return <p className="text-center mt-10">User not logged in</p>;
    }

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
                        Profile
                    </h1>

                    <NotificationIcon />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-hide">

                    {/* Profile Card */}
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4 flex items-center gap-4">
                        <img
                            src={
                                "picture" in user
                                    ? user.picture
                                    : "https://i.pravatar.cc/100"
                            }
                            alt="User"
                            className="w-14 h-14 rounded-full object-cover"
                        />

                        <div className="flex-1">
                            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                                {user.name}
                            </h2>
                            <p className="text-xs text-gray-500 dark:text-gray-300">
                                {user.email}
                            </p>
                        </div>

                        <button className="p-2 rounded-lg bg-white dark:bg-gray-800">
                            <FiEdit className="text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>

                    {/* Account Info */}
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4 space-y-2">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                            Account Information
                        </h2>

                        <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                            <span>Email</span>
                            <span>{user.email}</span>
                        </div>

                        {"role" in user && (
                            <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                                <span>Role</span>
                                <span>{user.role}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
