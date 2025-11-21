import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Send, Sparkles } from 'lucide-react';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call to send verification code
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Navigate to code verification with email
    navigate('/code', { state: { email } });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Forgot Password Card */}
      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Back to login</span>
        </Link>

        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mb-4 shadow-lg shadow-emerald-500/20">
            <Sparkles size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Forgot Password?
          </h1>
          <p className="text-zinc-400">
            No worries, we'll send you reset instructions
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.1] rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full pl-12 pr-4 py-3 bg-white/[0.03] border border-white/[0.1]
                    rounded-xl text-white placeholder-zinc-500
                    focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                    transition-all duration-300
                  "
                  placeholder="you@example.com"
                  required
                />
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                We'll send a verification code to this email
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
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
                  Sending code...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Code
                </>
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <p className="text-sm text-emerald-400">
              💡 Check your spam folder if you don't see the email
            </p>
          </div>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-zinc-400 text-sm mt-6">
          Remember your password?{' '}
          <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
