import { createContext, useContext, useState } from 'react';
import AuthorizationService from '@/utils/AuthorizationUtils';

type AuthContextType = {
    isAuthenticated: boolean;
    userRole: string | undefined;
    username: string | undefined
    login: (role: string, username: string) => void;
    logout: () => void;
    canPerform: (action: string) => boolean;
};

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    userRole: undefined,
    username: undefined,
    login: () => {},
    logout: () => {},
    canPerform: () => false
});

export function useAuth(): AuthContextType {
    return useContext(AuthContext);
}


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const storedAccessToken = localStorage.getItem('yandex_access_token');
    const initialAuthState = !!storedAccessToken;

    const [isAuthenticated, setIsAuthenticated] = useState(initialAuthState);
    const [userRole, setUserRole] = useState<string>();

    const [username, setUsername] = useState<string>("");

    const authService = new AuthorizationService(userRole);

    const login = (role: string, name: string) => {
        console.log(`Logging in as ${role}`);
        console.log(`Username: ${name}`);
        setIsAuthenticated(true);
        setUserRole(role);
        setUsername(name);
    };

    const logout = () => {
        localStorage.removeItem('yandex_access_token');
        setIsAuthenticated(false);
        setUserRole(undefined);
    };

    const canPerform = (action: string) => authService.hasPermission(action);

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, username, login, logout, canPerform }}>
            {children}
        </AuthContext.Provider>
    );
};