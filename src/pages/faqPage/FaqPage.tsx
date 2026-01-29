import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import NotificationIcon from "../../components/common/NotificationIcon";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqData = [
    {
        question: "How do I make a purchase?",
        answer:
            "Browse products, add them to your cart, and proceed to checkout. Follow the on-screen instructions to complete payment.",
    },
    {
        question: "What payment methods are accepted?",
        answer:
            "We accept credit/debit cards, UPI, wallets, and Cash on Delivery.",
    },
    {
        question: "How do I track my orders?",
        answer:
            "Go to the 'My Orders' section in your account to track the current status of your order.",
    },
    {
        question: "Can I cancel or return an order?",
        answer:
            "Yes, you can cancel or return orders from the 'My Orders' page within the return window.",
    },
    {
        question: "How can I contact customer support?",
        answer:
            "You can contact us via Help Center, WhatsApp, or Customer Service chat available in the app.",
    },
];

const FaqPage = () => {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center">
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl mt-4 h-[90vh] overflow-hidden">

                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
                    >
                        <IoArrowBack className="text-lg dark:text-white" />
                    </button>

                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                        FAQs
                    </h1>

                    <NotificationIcon />
                </div>

                {/* Tabs (UI only) */}
                <div className="flex gap-2 px-4 mt-3">
                    {["General", "Account", "Service", "Payment"].map((tab) => (
                        <button
                            key={tab}
                            className="px-4 py-1 rounded text-sm bg-black text-white"
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* FAQ List */}
                <div className="p-4 space-y-3 overflow-y-auto scrollbar-hide">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex items-center justify-between w-full text-left"
                            >
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <FiChevronUp className="text-gray-600 dark:text-gray-300" />
                                ) : (
                                    <FiChevronDown className="text-gray-600 dark:text-gray-300" />
                                )}
                            </button>

                            {openIndex === index && (
                                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {faq.answer}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
