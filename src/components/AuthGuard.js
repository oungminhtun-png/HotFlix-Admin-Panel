import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        if (!token) {
            // token မရှိရင် login page ကို ပြန်ပို့မယ်
            navigate('/login', { replace: true });
        }
    }, [token, navigate]);

    return token ? children : null;
};

export default AuthGuard;