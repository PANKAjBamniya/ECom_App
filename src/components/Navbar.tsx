import { GiSun } from "react-icons/gi";
import { MdNightlight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { logOutUser } from "../store/slice/authSlice";
import { toggleTheme } from "../store/slice/themeSlice";
import { toggleLanguage } from "../store/slice/languageSlice";
import { useNavigate } from "react-router-dom";
import { translations } from "../utils/translations";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.auth.user);
    const theme = useSelector((state: RootState) => state.theme.theme);
    const lang = useSelector((state: RootState) => state.language.lang);

    const t = translations[lang];

    const handleLogOut = () => {
        dispatch(logOutUser());
        navigate("/login");
    };

    return (
        <div className="bg-gray-100 flex items-center justify-between px-10 py-4 dark:bg-gray-700">
            <h2 className="font-bold text-2xl text-black dark:text-white">
                {t.appName}
            </h2>

            <div className="flex gap-4 items-center">
                {/* Theme toggle */}
                <button
                    onClick={() => dispatch(toggleTheme())}
                    className="bg-gray-800 text-white rounded-md px-2 py-1.5"
                >
                    {theme === "dark" ? <GiSun /> : <MdNightlight />}
                </button>

                {/*  Language toggle */}
                <button
                    onClick={() => dispatch(toggleLanguage())}
                    className="bg-blue-600 text-white rounded px-2 py-1 text-sm flex items-center"
                >
                    {lang === "en" ? "हिंदी" : "EN"}
                </button>

                {user && (
                    <button
                        onClick={handleLogOut}

                        className="bg-red-800 text-white rounded py-1 px-3"
                    >
                        {t.logout}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
