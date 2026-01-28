import { Navigate, Outlet } from 'react-router-dom';
import { UserRole } from '../../types/auth';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

export function AdminRoute() {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== UserRole.ADMIN) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-destructive mb-2">Access Denied</h1>
                    <p className="text-muted-foreground">
                        You don't have permission to access this page.
                    </p>
                </div>
            </div>
        );
    }

    return <Outlet />;
}