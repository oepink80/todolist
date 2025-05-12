// Callback.tsx
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

        if (accessToken) {
            console.log('Received token:', accessToken);
            localStorage.setItem('yandex_access_token', accessToken);
            auth.login('user', 'Иван Иванов');
            console.log(auth);
            navigate('/');
        }
    }, [auth, navigate]);

    return null;
}

export default Callback;