import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '@/App';
import Login from '@/components/Login';
import Callback from '@/components/Callback'; // Специальный компонент для обработки callback-запросов

function RootRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/callback" element={<Callback />} />
            </Routes>
        </Router>
    );
}

export default RootRoutes;