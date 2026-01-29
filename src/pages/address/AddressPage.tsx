import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FiPlus, FiMapPin } from "react-icons/fi";

const AddressPage = () => {
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
                        Address Book
                    </h1>

                    <button className="p-2 rounded-lg bg-black text-white dark:bg-white dark:text-black">
                        <FiPlus />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">

                    {/* Address Card */}
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <FiMapPin className="text-gray-600 dark:text-gray-300" />
                            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                                Home
                            </h2>
                        </div>

                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            Pankaj Bamniya <br />
                            21, MG Road <br />
                            Indore, MP - 452001 <br />
                            India
                        </p>

                        <div className="flex gap-4 mt-3">
                            <button className="text-xs text-blue-600 dark:text-blue-400">
                                Edit
                            </button>
                            <button className="text-xs text-red-600">
                                Remove
                            </button>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden">
                        <iframe
                            title="map"
                            className="w-full h-48 border-0"
                            loading="lazy"
                            allowFullScreen
                            src="https://www.google.com/maps?q=Indore,MP&output=embed"
                        />
                    </div>

                    {/* Add New Address Button */}
                    <button className="w-full py-3 rounded-xl border border-dashed border-gray-400 dark:border-gray-500 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        + Add New Address
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddressPage;
