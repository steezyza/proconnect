import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types'; 
import { LinkedInIcon } from '../components/Icons';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate('/dashboard');
  };

  const inputClasses = "w-full px-4 py-2 bg-white shadow text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal placeholder-gray-500";

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 space-y-8">
        <div className="text-center">
            <img src="/src/assets/icon.svg" alt="ProConnect Logo" className="h-12 w-auto mx-auto" />
            <h1 className="mt-8 text-2xl font-poppins font-extrabold text-navy">
                Welcome
            </h1>
            <p className="mt-2 text-sm text-gray-600">
                {isLogin ? 'Sign in to continue your journey' : 'Create an account to get started'}
            </p>
        </div>
        
        <div className="flex border-b border-gray-200">
            <button onClick={() => setIsLogin(true)} className={`w-1/2 py-4 text-sm font-medium transition-colors ${isLogin ? 'border-b-2 border-teal text-teal' : 'text-gray-500 hover:text-gray-700'}`}>
                Sign In
            </button>
            <button onClick={() => setIsLogin(false)} className={`w-1/2 py-4 text-sm font-medium transition-colors ${!isLogin ? 'border-b-2 border-teal text-teal' : 'text-gray-500 hover:text-gray-700'}`}>
                Sign Up
            </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <input 
                type="text" 
                placeholder="Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClasses}
            />
          )}
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            required
          />
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            className={inputClasses}
            required
          />

          {!isLogin && (
            <div>
              <label className="text-sm font-medium text-gray-700">I am a...</label>
              <div className="mt-2 grid grid-cols-3 gap-3">
                {(['student', 'junior professional', 'mentor'] as UserRole[]).map(r => (
                  <button type="button" key={r} onClick={() => setRole(r)} className={`px-2 py-2 text-sm rounded-md capitalize transition-colors ${role === r ? 'bg-teal text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="w-full bg-navy text-white font-bold py-3 rounded-md hover:bg-opacity-90 transition-transform transform hover:scale-105">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 w-full bg-white shadow text-gray-700 font-medium py-2 rounded-md hover:bg-gray-50">
                <svg className="h-5 w-5" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.82l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
                Google
            </button>
            <button className="flex items-center justify-center gap-2 w-full bg-white shadow text-gray-700 font-medium py-2 rounded-md hover:bg-gray-50">
                <LinkedInIcon className="h-5 w-5" />
                LinkedIn
            </button>
        </div>
      </div>
    </div>
  );
};

export default Login;