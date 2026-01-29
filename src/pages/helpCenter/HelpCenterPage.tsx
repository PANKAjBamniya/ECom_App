import { FiHeadphones } from "react-icons/fi";
import { FaWhatsapp, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import NotificationIcon from "../../components/common/NotificationIcon";

const HelpCenterPage = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center">
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl mt-4 h-[90vh] overflow-hidden">

                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                    >
                        <IoArrowBack className="text-lg dark:text-white" />
                    </button>


                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Help Center
                    </h1>

                    <NotificationIcon />
                </div>

                {/* Options */}
                <div className="p-4 space-y-3">
                    <HelpItem icon={FiHeadphones} text="Customer Service" />
                    <HelpItem icon={FaWhatsapp} text="WhatsApp" />
                    <HelpItem icon={FaFacebook} text="Facebook" />
                    <HelpItem icon={FaTwitter} text="Twitter" />
                    <HelpItem icon={FaInstagram} text="Instagram" />
                </div>
            </div>
        </div>
    );
};

const HelpItem = ({ icon: Icon, text }: any) => (
    <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 p-4 rounded-xl cursor-pointer">
        <Icon className="text-lg dark:text-white" />
        <span className="text-sm font-medium dark:text-white">{text}</span>
    </div>
);

export default HelpCenterPage;
