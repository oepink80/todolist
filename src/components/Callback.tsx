// components/Callback.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

function Callback() {
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
console.log(accessToken);
        if (accessToken) {
            localStorage.setItem('yandex_access_token', accessToken);
            auth.login(); // Производим авторизацию
            navigate('/');
        }
    }, [auth, navigate]);

    return null;
}

export default Callback;