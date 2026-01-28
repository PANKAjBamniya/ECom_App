
interface InputProps {
    label: string;
    placeholder: string;
    type?: string;
    register: any
}

const Input = ({
    label,
    placeholder,
    register,
    type = "text",
}: InputProps) => {


    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-light text-gray-700">
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                {...register}
                className={`w-full px-4 py-2.5 font-light border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
            />
        </div>
    );
};

export default Input;
