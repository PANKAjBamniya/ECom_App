import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

type Props = {
    icon: React.ElementType;
    text: string;
    to?: string;
    danger?: boolean;
};

const AcItemOption = ({ icon: Icon, text, to = "#", danger = false }: Props) => {
    return (
        <Link
            to={to}
            className={`
        w-full flex items-center justify-between px-4 py-4 transition-colors
        ${danger
                    ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                }
      `}
        >
            <div className="flex items-center gap-3">
                <Icon
                    className={`text-xl ${danger ? "text-red-500" : "text-gray-700 dark:text-gray-300"
                        }`}
                />
                <span className="text-base font-medium">
                    {text}
                </span>
            </div>

            {!danger && (
                <BiChevronRight className="text-2xl text-gray-400 dark:text-gray-500" />
            )}
        </Link>
    );
};

export default AcItemOption;
