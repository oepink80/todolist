// contexts/AuthContext.ts
import { createContext, useContext, useState } from 'react';

type AuthContextType = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void; // Новая функция для выхода
};

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {} // заглушка для начальной версии
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const storedAccessToken = localStorage.getItem('yandex_access_token');
    const initialAuthState = !!storedAccessToken;

    const [isAuthenticated, setIsAuthenticated] = useState(initialAuthState);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('yandex_access_token'); // очищаем токен
        setIsAuthenticated(false); // устанавливаем флаг авторизации в false
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
