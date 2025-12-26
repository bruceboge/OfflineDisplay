import { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setError("");
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      await login(email, password);
      navigate("/"); 
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex w-full">
      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-900 relative overflow-hidden items-center justify-center p-12 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-10 translate-x-10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-10 -translate-x-10 animate-pulse-slow"></div>
        
        <div className="relative z-10 max-w-lg space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-800 text-brand-200 text-xs font-bold tracking-wider mb-2">
            OFFLINE PREVIEW MODE
          </div>
          <h1 className="text-5xl font-bold tracking-tight font-display">Manage Your Club With Flow.</h1>
          <p className="text-brand-100 text-lg leading-relaxed">
            This is an offline demonstration version. Log in with any credentials to preview the interface.
          </p>
          
          <div className="flex gap-4 pt-4">
             <div className="glass p-4 rounded-xl backdrop-blur-md bg-white/10 border-white/10 text-center w-32">
                <span className="block text-2xl font-bold">10+</span>
                <span className="text-xs text-brand-200">Active Clubs</span>
             </div>
             <div className="glass p-4 rounded-xl backdrop-blur-md bg-white/10 border-white/10 text-center w-32">
                <span className="block text-2xl font-bold">1k+</span>
                <span className="text-xs text-brand-200">Members</span>
             </div>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white relative">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
            <div className="text-center lg:text-left">
                <div className="h-12 w-12 bg-brand-600 rounded-xl flex items-center justify-center text-white mb-6 mx-auto lg:mx-0 shadow-lg shadow-brand-200">
                    <ArrowRight size={24} className="-rotate-45" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 font-display">Welcome Previewer</h2>
                <p className="text-slate-500 mt-2">Enter any email/password to demo.</p>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm border border-red-100 animate-slide-up flex items-center gap-2">
                <span className="block w-1.5 h-1.5 rounded-full bg-red-600"></span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <div className="relative group">
                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-brand-600 transition-colors" />
                        <input 
                            type="email" 
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                            placeholder="demo@clubflow.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-slate-700">Password</label>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-brand-600 transition-colors" />
                        <input 
                            type="password" 
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium text-slate-900 placeholder:text-slate-400"
                            placeholder="any password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-brand-500/30 hover:shadow-brand-500/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
                >
                    {loading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>
                            Enter Demo Mode
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-6 text-center w-full text-xs text-slate-400">
            © 2024 ClubFlow Systems (Offline Preview).
        </div>
      </div>
    </div>
  );
}