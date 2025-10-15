import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types';
import { GoogleIcon, LinkedInIcon } from '../components/Icons';

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
            <img src="/src/assets/full-logo.svg" alt="ProConnect Logo" className="h-12 w-auto mx-auto" />
            <h1 className="mt-14 text-xl font-poppins font-extrabold text-navy">
                Welcome to ProConnect
            </h1>
            <p className="mt-1 text-gray-600">
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
                {(['student', 'professional', 'mentor'] as UserRole[]).map(r => (
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
            <span className="px-4 bg-white text-gray-500">or </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 text-gray-700 font-medium py-2 rounded-md hover:bg-gray-50">
                <svg className="h-5 w-5" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  <path fill="#FF3D00" d="M6.306,14.691l6.06-6.06C9.837,12.268,8,17.854,8,24c0,1.432,0.226,2.813,0.624,4.145l-6.132,6.132C2.25,31.398,2,27.82,2,24C2,19.705,3.548,15.9,6.306,14.691z"></path>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-6.19C28.958,35.636,26.628,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                  <path fill="#1976D2" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,6.19C42.02,35.846,44,30.396,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                Google
            </button>
            <button className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 text-gray-700 font-medium py-2 rounded-md hover:bg-gray-50">
                <LinkedInIcon className="h-5 w-5" />
                LinkedIn
            </button>
        </div>
      </div>
    </div>
  );
};

export default Login;