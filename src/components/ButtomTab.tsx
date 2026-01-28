import { BiCart, BiHome, BiSearch } from 'react-icons/bi'
import { GiSelfLove } from 'react-icons/gi'
import { ImProfile } from 'react-icons/im'
import { Link } from 'react-router-dom'

const ButtomTab = () => {
    return (
        <div className=" bottom-0 w-full max-w-sm bg-white h-16 border-t border-gray-300  dark:bg-gray-900">
            <div className="flex items-center justify-around py-3">
                <Link to="/">
                    <button className="flex flex-col items-center text-xs dark:text-white">
                        <BiHome />
                        <span>Home</span>
                    </button>
                </Link>

                <Link to="/search">
                    <button className="flex flex-col items-center text-gray-400 text-xs">
                        <BiSearch />
                        <span>Search</span>
                    </button>
                </Link>
                <Link to="/save-items">
                    <button className="flex flex-col items-center text-gray-400 text-xs">
                        <GiSelfLove />
                        <span>Save</span>
                    </button>
                </Link>
                <Link to="/cart">
                    <button className="flex flex-col items-center text-gray-400 text-xs">
                        <BiCart />
                        <span>Cart</span>
                    </button>
                </Link>
                <Link to="/account">
                    <button className="flex flex-col items-center text-gray-400 text-xs">
                        <ImProfile />
                        <span>Account</span>
                    </button>
                </Link>
            </div>
        </div >
    )
}

export default ButtomTab