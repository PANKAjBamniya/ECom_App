import { IoArrowBack } from "react-icons/io5";
import NotificationIcon from "./common/NotificationIcon";
import { Link, useLocation } from "react-router-dom";

const ReviewPage = () => {
    const location = useLocation();
    const reviews = location.state?.reviews || [];

    return (
        <div className="min-h-screen w-full flex justify-center bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl shadow-md flex flex-col h-[90vh] mt-4 overflow-hidden">

                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <Link to="/">
                        <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                            <IoArrowBack className="text-lg dark:text-white" />
                        </button>
                    </Link>

                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Reviews
                    </h1>

                    <NotificationIcon />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">

                    {/* Rating Summary */}
                    <div className="flex gap-4 mb-6 flex-col">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                                4.0
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                1034 Ratings
                            </p>
                        </div>

                        <div className="flex-1 space-y-2">
                            {[5, 4, 3, 2, 1].map((star, index) => (
                                <div key={star} className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500 dark:text-gray-300 w-6">
                                        {star}★
                                    </span>

                                    {/* Progress Bar */}
                                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                        <div
                                            className="h-2 bg-black dark:bg-white rounded-full"
                                            style={{ width: `${80 - index * 15}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reviews Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            {reviews.length} Reviews
                        </h3>

                        <span className="text-sm text-gray-500 dark:text-gray-300">
                            Most Relevant
                        </span>
                    </div>

                    {/* Review Cards */}
                    {reviews.map((review: any, i: number) => (
                        <div
                            key={i}
                            className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-4"
                        >
                            {/* Stars */}
                            <div className="flex items-center gap-1 mb-2">
                                {Array.from({ length: review.rating }).map((_, j) => (
                                    <span key={j} className="text-yellow-400">
                                        ★
                                    </span>
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                {review.comment}
                            </p>

                            {/* User & Date */}
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {review.reviewerName} · {review.date}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;
