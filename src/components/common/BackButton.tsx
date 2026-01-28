import React from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const BackButton = () => {
    return (
        <Link to="/">
            <button className="p-2 rounded-lg bg-gray-100">
                <IoArrowBack className="text-lg" />
            </button>
        </Link>
    )
}

export default BackButton