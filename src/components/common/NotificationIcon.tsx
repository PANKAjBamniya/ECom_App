import { IoIosNotifications } from 'react-icons/io'
import { Link } from 'react-router-dom'

const NotificationIcon = () => {
    return (
        <Link to="/notifications">
            <IoIosNotifications className="text-gray-500 text-xl dark:text-white" />
        </Link>
    )
}

export default NotificationIcon