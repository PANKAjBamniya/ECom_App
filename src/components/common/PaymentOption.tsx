const PaymentOption = ({ icon: Icon, label }: any) => (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4 flex items-center justify-between mb-2 cursor-pointer">
        <div className="flex items-center gap-3">
            <Icon className="text-lg text-gray-600 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </span>
        </div>
        <input type="radio" />
    </div>
);

export default PaymentOption