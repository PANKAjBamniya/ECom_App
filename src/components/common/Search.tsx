import React from "react";
import { CgSearch } from "react-icons/cg";
import { MdMic } from "react-icons/md";

type SearchProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ value, onChange }: SearchProps) => {
    return (
        <div className="flex items-center gap-2 border border-gray-600 rounded-xl p-3 w-full">
            <CgSearch className="text-gray-500" />
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Search products"
                className="bg-transparent outline-none text-sm flex-1 placeholder:text-gray-600 text-white"
            />
            <MdMic className="dark:text-gray-500" />
        </div>
    );
};

export default Search;
