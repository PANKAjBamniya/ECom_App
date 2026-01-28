export interface User {
    email: string;
    name?: string;
    isAuthenticated: boolean;
    createdAt?: string;
}

export interface HomeProps {
    user: User | null;
}

export interface LoginProps {
    user: User | null;
    handleUserData: (data: User) => void;
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    MODERATOR = 'moderator',
}