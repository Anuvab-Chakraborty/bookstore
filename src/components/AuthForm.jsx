import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

const AuthForm = ({ type = 'login' }) => {
  const isRegister = type === 'register';
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [submitted, setSubmitted] = useState(false);
  const [role, setRole] = useState('user');
  const [checkingToken, setCheckingToken] = useState(true);

  const schema = yup.object().shape({
    name: isRegister ? yup.string().required('Name is required') : yup.string(),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const verifyTokenOnLoad = async () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setCheckingToken(false);
        return;
      }

      try {
        const res = await api.get('/verify_token', {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        const { name, email, role } = res.data;

        login({
          user: { name, email },
          token: storedToken,
          role,
        });

        toast.success('Logged in automatically!');
        navigate('/');
      } catch (err) {
        localStorage.removeItem('token');
        setCheckingToken(false);
      }
    };

    verifyTokenOnLoad();
  }, [login, navigate]);

  const onSubmit = async (data) => {
    try {
      const endpoint = isRegister ? `/register_${role}` : `/login/${role}`;
      const res = await api.post(endpoint, data);

      setSubmitted(true);

      setTimeout(() => {
        if (!isRegister) {
          const token = res.data.access_token;

          localStorage.setItem('token', token);
          login({
            user: { email: data.email },
            token,
            role,
          });

          toast.success('Login successful!');
          navigate('/');
        } else {
          toast.success('Registered successfully!');
          navigate('/login');
        }
      }, 600);
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong';
      toast.error(msg);
    }
  };

  // Function to auto-login with predefined credentials
  const autoLogin = async (role) => {
    const credentials = {
      user: { email: 'user@example.com', password:'user123' },
      seller: { email: 'recruiter@example.com', password:'recruiter123'},
    };

    try {
      const res = await api.post(`/login/${role}`, credentials[role]);

      const token = res.data.access_token;
      localStorage.setItem('token', token);

      login({
        user: { email: credentials[role].email },
        token,
        role,
      });

      toast.success('Auto login successful!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong';
      toast.error(msg);
    }
  };

  const animatedField = {
    whileFocus: { scale: 1.02 },
    transition: { duration: 0.2 },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Background animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500 opacity-20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-pink-500 opacity-20 blur-2xl rounded-full animate-ping"></div>
      </motion.div>

      {checkingToken && (
        <div className="z-10 text-white text-xl font-semibold animate-pulse">Verifying session...</div>
      )}

      <AnimatePresence>
        {!checkingToken && !submitted && (
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 bg-white/10 px-6 py-8 sm:px-10 sm:py-10 rounded-2xl backdrop-blur-md shadow-2xl w-full max-w-lg text-white"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
              <TypeAnimation
                sequence={[isRegister ? 'Register' : 'Login', 1000, '']}
                repeat={Infinity}
                speed={60}
                deletionSpeed={40}
                wrapper="span"
              />
            </h2>

            {/* Role selector with tooltip + pointer + hover */}
            <div className="flex justify-center gap-4 mb-6">
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => { setRole('user'); autoLogin('user'); }}
                  className={`cursor-pointer px-4 py-1 rounded-full border transition duration-300 hover:scale-105 ${role === 'user' ? 'bg-purple-600 text-white' : 'bg-white/10 text-white border-white/30'}`}
                >
                  Try as User
                </button>
                <div className="absolute -top-8 left-full -ml-14 bg-black/80 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">  
                  For book renters or buyers
                </div>
              </div>
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => { setRole('seller'); autoLogin('seller'); }}
                  className={`cursor-pointer px-4 py-1 rounded-full border transition duration-300 hover:scale-105 ${role === 'seller' ? 'bg-purple-600 text-white' : 'bg-white/10 text-white border-white/30'}`}
                >
                  Try as Seller
                </button>
                <div className="absolute -top-8 left-full -ml-14 bg-black/80 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                  For book uploaders or shop owners
                </div>
              </div>
            </div>

            {isRegister && (
              <motion.div className="mb-5" {...animatedField}>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="Name"
                  className="glass-input"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
              </motion.div>
            )}

            <motion.div className="mb-5" {...animatedField}>
              <input
                type="email"
                {...register('email')}
                placeholder="Email"
                className="glass-input"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </motion.div>

            <motion.div className="mb-5" {...animatedField}>
              <input
                type="password"
                {...register('password')}
                placeholder="Password"
                className="glass-input"
              />
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              className="bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold py-2 px-4 mt-2 rounded-xl w-full transition"
            >
              {isRegister ? 'Register' : 'Login'}
            </motion.button>

            <div className="text-center mt-6 text-sm sm:text-base">
              {isRegister ? (
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="text-purple-400 hover:underline">
                    Login here
                  </Link>
                </p>
              ) : (
                <p>
                  New here?{' '}
                  <Link to="/register" className="text-purple-400 hover:underline">
                    Register now
                  </Link>
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthForm;
