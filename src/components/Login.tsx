// components/Login.tsx
import { useAuth } from '@/context/AuthContext';

function Login() {
    const { login } = useAuth();
    return (
        <div className="login-form">
            <h2>Please Log In</h2>
            <a href={`https://oauth.yandex.ru/authorize?response_type=token&client_id=${import.meta.env.VITE_YANDEX_OAUTH_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback`}>
                Войти через Яндекс
            </a>
        </div>
    );
}

export default Login;