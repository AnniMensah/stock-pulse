import { useState, ChangeEvent, FormEvent } from 'react';
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Phone } from 'lucide-react';

interface SignInProps {
  onLogin: () => void;
  onNavigate: (page: 'signup') => void;
}

const SignIn = ({ onLogin, onNavigate }: SignInProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ phone: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Demo Logic
    if (credentials.phone === '0541234567' && credentials.password === 'password123') {
      onLogin();
    } else {
      setError('Invalid phone number or password. Use the demo info!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-indigo-600 p-3 rounded-xl shadow-lg shadow-indigo-200">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">Sign in to StockPulse</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200 border border-slate-100 sm:rounded-2xl sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg text-center">{error}</div>}
            
            <div>
              <label className="block text-sm font-medium text-slate-700">Phone Number</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="0541234567"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="password123"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-slate-400" /> : <Eye className="h-5 w-5 text-slate-400" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors group"
            >
              Sign In
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">New to StockPulse?</span>
              </div>
            </div>

            <div className="mt-6">
              <button 
                onClick={() => onNavigate('signup')}
                className="w-full inline-flex justify-center py-2.5 px-4 border border-slate-200 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                Create an account
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-xs text-indigo-700 font-medium mb-1">Demo Credentials:</p>
            <p className="text-xs text-indigo-600">Phone: 0541234567</p>
            <p className="text-xs text-indigo-600">Password: password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;