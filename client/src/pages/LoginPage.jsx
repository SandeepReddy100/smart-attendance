import React, { useState, useEffect } from 'react';
import { User, Lock, Eye, EyeOff, Code, Zap, ArrowRight, Shield, Sparkles } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempted with:', { username, password });
      if (onLogin) onLogin();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 flex items-center justify-center p-6">
      {/* Clean background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100" />

      {/* Main Login Container */}
      <div className={`relative z-10 w-full max-w-md transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

        {/* Header Section */}
        <div className="text-center mb-8">

    

        </div>

        {/* Login Form */}
        <div className={`bg-white rounded-3xl p-8 shadow-xl border border-slate-200 transform transition-all duration-700 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Decorative Header */}
        

          <div className="space-y-6">

            {/* Email Field */}
            <div className="relative group">
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  className={`w-full px-4 py-4 bg-slate-100 border rounded-xl text-slate-700 placeholder-slate-400 transition-all duration-300 focus:outline-none ${
                    focusedField === 'email' 
                      ? 'border-blue-400 shadow-md bg-white' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  placeholder="📧 Email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  className={`w-full px-4 py-4 bg-slate-100 border rounded-xl text-slate-700 placeholder-slate-400 pr-12 transition-all duration-300 focus:outline-none ${
                    focusedField === 'password'
                      ? 'border-blue-400 shadow-md bg-white'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  placeholder="🔒 Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                isLoading
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 hover:shadow-lg active:scale-[0.98]'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Get Started</span>
                </>
              )}
            </button>
          </div>

          {/* Social Login */}
       
        </div>

      </div>
    </div>
  );
};

export default LoginPage;