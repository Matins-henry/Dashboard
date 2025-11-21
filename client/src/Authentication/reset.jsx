import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle, Sparkles } from 'lucide-react';

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const code = location.state?.code || '';

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-500'];
    
    return {
      strength,
      label: labels[strength - 1] || '',
      color: colors[strength - 1] || '',
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    // Simulate API call to reset password
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Navigate to login with success message
    navigate('/login', { state: { message: 'Password reset successful! Please login.' } });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Reset Password Card */}
      <div className="relative w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mb-4 shadow-lg shadow-emerald-500/20">
            <CheckCircle size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Reset Password
          </h1>
          <p className="text-zinc-400">
            Create a new password for <span className="text-white font-medium">{email}</span>
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.1] rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="
                    w-full pl-12 pr-12 py-3 bg-white/[0.03] border border-white/[0.1]
                    rounded-xl text-white placeholder-zinc-500
                    focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                    transition-all duration-300
                  "
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password Strength */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          level <= passwordStrength.strength
                            ? passwordStrength.color
                            : 'bg-white/[0.1]'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-500">
                    Password strength: <span className="text-white">{passwordStrength.label}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="
                    w-full pl-12 pr-12 py-3 bg-white/[0.03] border border-white/[0.1]
                    rounded-xl text-white placeholder-zinc-500
                    focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                    transition-all duration-300
                  "
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
              <p className="text-xs font-medium text-white mb-2">Password must contain:</p>
              <ul className="space-y-1">
                <li className={`text-xs flex items-center gap-2 ${formData.password.length >= 8 ? 'text-emerald-400' : 'text-zinc-500'}`}>
                  <div className={`w-1 h-1 rounded-full ${formData.password.length >= 8 ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                  At least 8 characters
                </li>
                <li className={`text-xs flex items-center gap-2 ${/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'text-emerald-400' : 'text-zinc-500'}`}>
                  <div className={`w-1 h-1 rounded-full ${/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                  Uppercase and lowercase letters
                </li>
                <li className={`text-xs flex items-center gap-2 ${/\d/.test(formData.password) ? 'text-emerald-400' : 'text-zinc-500'}`}>
                  <div className={`w-1 h-1 rounded-full ${/\d/.test(formData.password) ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                  At least one number
                </li>
                <li className={`text-xs flex items-center gap-2 ${/[^a-zA-Z0-9]/.test(formData.password) ? 'text-emerald-400' : 'text-zinc-500'}`}>
                  <div className={`w-1 h-1 rounded-full ${/[^a-zA-Z0-9]/.test(formData.password) ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                  At least one special character
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || formData.password !== formData.confirmPassword}
              className="
                w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600
                hover:from-emerald-400 hover:to-emerald-500
                text-white font-semibold rounded-xl
                shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
              "
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Resetting password...
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  Reset Password
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back to Login */}
        <p className="text-center text-zinc-400 text-sm mt-6">
          Remember your password?{' '}
          <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
