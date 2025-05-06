// src/hooks/useVerifyToken.js
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import api from '../utils/api';
import { toast } from 'react-toastify';

export default function useVerifyToken() {
  const { token, login, logout, setLoading } = useAuthStore();
  const navigate = useNavigate();
  const hasValidated = useRef(false);

  useEffect(() => {
    const validate = async () => {
      if (!token) {
        navigate('/login');
        return;
      }

      if (hasValidated.current) return;
      hasValidated.current = true;

      try {
        setLoading(true);
        const res = await api.get('/verify_token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        login({
          token,
          user: { email: res.data.email, name: res.data.name },
          role: res.data.role,
        });
      } catch (err) {
        logout();
        toast.error('Session expired. Please login again.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    validate();
  }, []);
}
