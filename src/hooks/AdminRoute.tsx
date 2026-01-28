import { Navigate } from "react-router-dom";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import type { JSX } from "react";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const { role, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );

    // ⏳ role abhi load nahi hua
    if (isAuthenticated && role === null) {
        return null; // or loader
    }

    if (!isAuthenticated) return <Navigate to="/login" />;
    if (role !== "admin") return <Navigate to="/" />;

    return children;
};

export default AdminRoute;
