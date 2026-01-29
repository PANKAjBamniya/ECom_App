import { Link } from "react-router-dom";
// import { IconType } from "react-icons";

interface Props {
    icon: any;
    text: string;
    to?: string;
    danger?: boolean;
    onClick?: () => void;
}

const AcItemOption = ({ icon: Icon, text, to, danger, onClick }: Props) => {
    const content = (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer
        ${danger ? "text-red-600" : "text-gray-700 dark:text-gray-200"}
        hover:bg-gray-100 dark:hover:bg-gray-700`}
        >
            <Icon className="text-lg" />
            <span className="text-sm font-medium">{text}</span>
        </div>
    );

    return to ? <Link to={to}>{content}</Link> : content;
};

export default AcItemOption;
