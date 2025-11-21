import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Shield, Sparkles } from 'lucide-react';

export default function CodeVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';
  
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newCode[index] = char;
    });
    setCode(newCode);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);

    // Simulate API call to verify code
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo, accept any 6-digit code
    // In production, verify with backend
    navigate('/reset', { state: { email, code: verificationCode } });
    setIsLoading(false);
  };

  const handleResend = async () => {
    setError('');
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    
    // Simulate resend API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message (you can add a toast notification here)
    console.log('Code resent to:', email);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Code Verification Card */}
      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <Link
          to="/forgot-password"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Back</span>
        </Link>

        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl mb-4 shadow-lg shadow-emerald-500/20">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Verify Code
          </h1>
          <p className="text-zinc-400">
            We sent a code to <span className="text-white font-medium">{email}</span>
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.1] rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Code Inputs */}
            <div>
              <label className="block text-sm font-medium text-white mb-4 text-center">
                Enter 6-digit code
              </label>
              <div className="flex gap-3 justify-center" onPaste={handlePaste}>
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`
                      w-12 h-14 text-center text-2xl font-bold
                      bg-white/[0.03] border rounded-xl
                      text-white
                      focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
                      transition-all duration-300
                      ${error ? 'border-red-500/50' : 'border-white/[0.1]'}
                    `}
                  />
                ))}
              </div>
              {error && (
                <p className="text-xs text-red-400 mt-3 text-center">{error}</p>
              )}
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
                  Verifying...
                </>
              ) : (
                <>
                  Verify Code
                </>
              )}
            </button>
          </form>

          {/* Resend Code */}
          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-400">
              Didn't receive the code?{' '}
              <button
                onClick={handleResend}
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Resend
              </button>
            </p>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <p className="text-sm text-emerald-400">
              💡 The code expires in 10 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
