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
            <img src="/src/assets/icon.svg" alt="ProConnect Logo" className="h-12 w-auto mx-auto" />
            <h1 className="mt-8 text-2xl font-poppins font-extrabold text-navy">
                Welcome to ProConnect
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
                <GoogleIcon className="h-5 w-5" />
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