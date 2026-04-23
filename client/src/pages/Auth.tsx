/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "../api/axios";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin ? { email, password } : { name, email, password };
      const response = await axios.post(endpoint, payload);
      if (isLogin) {
        const { token, user } = response.data;
        login(token, user);
        navigate(from, { replace: true });
      } else {
        setIsLogin(true);
        setError("Account created. Please sign in.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border-b py-3 outline-none focus:border-[color:var(--accent)] transition-all font-light text-base tracking-tight placeholder:opacity-30";
  const labelClass =
    "text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 block";

  return (
    <main className="w-full min-h-screen flex flex-col lg:flex-row bg-[color:var(--bg-base)]">
      {/* LEFT SIDE: BRANDING ANCHOR */}
      <section
        className="hidden lg:flex lg:w-5/12 p-16 flex-col justify-between border-r sticky top-0 h-screen"
        style={{
          borderColor: "var(--border-color)",
          backgroundColor: "var(--bg-surface)",
        }}
      >
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter cursor-pointer"
        >
          CRUX<span style={{ color: "var(--accent)" }}>.</span>
        </Link>

        <div>
          <h2 className="text-5xl font-bold tracking-tighter leading-tight mb-6 uppercase">
            Operational <br />
            Integrity.
          </h2>
          <p className="text-base font-light opacity-60 leading-relaxed max-w-sm">
            Professional diagnostic tools for supply chain architecture and ESG
            oversight.
          </p>
        </div>

        <div className="flex items-center gap-4 opacity-20">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em]">
            © 2026 CRUX OPERATIONS
          </span>
        </div>
      </section>

      {/* RIGHT SIDE: INTERACTION ZONE */}
      <section className="w-full lg:w-7/12 flex items-center justify-center p-8 md:p-20 overflow-y-auto">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-12">
            <Link
              to="/"
              className="text-2xl font-black tracking-tighter cursor-pointer"
            >
              CRUX<span style={{ color: "var(--accent)" }}>.</span>
            </Link>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tighter uppercase mb-2">
              {isLogin ? "Sign In" : "Register"}
            </h1>
            <p className="text-sm opacity-50 font-light">
              {isLogin
                ? "Enter credentials to access the portal."
                : "Create a new partner account."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            {!isLogin && (
              <div className="space-y-1">
                <label className={labelClass}>Full Name</label>
                <input
                  required
                  type="text"
                  className={inputClass}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ borderColor: "var(--border-color)" }}
                  placeholder="Your name"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className={labelClass}>Email Address</label>
              <input
                required
                type="email"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderColor: "var(--border-color)" }}
                placeholder="name@company.com"
              />
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Password</label>
              <input
                required
                type="password"
                className={inputClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderColor: "var(--border-color)" }}
                placeholder="••••••••"
              />
            </div>

            {!isLogin && (
              <div className="space-y-1">
                <label className={labelClass}>Confirm Password</label>
                <input
                  required
                  type="password"
                  className={inputClass}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ borderColor: "var(--border-color)" }}
                  placeholder="••••••••"
                />
              </div>
            )}

            {error && (
              <p className="text-[10px] font-bold tracking-widest text-red-500 uppercase">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-[11px] font-bold uppercase tracking-[0.15em] transition-all cursor-pointer hover:opacity-90 active:scale-[0.98]"
                style={{
                  backgroundColor: "var(--text-base)",
                  color: "var(--bg-base)",
                }}
              >
                {loading ? "Verifying..." : isLogin ? "Sign In" : "Register"}
              </button>
{/* 
              <button
                type="button"
                className="w-full py-4 border text-[10px] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-3 hover:bg-[color:var(--bg-surface)] transition-all cursor-pointer"
                style={{ borderColor: "var(--border-color)" }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button> */}
            </div>
          </form>

          <div className="mt-10 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
            >
              {isLogin
                ? "Need an account? Register"
                : "Have an account? Sign In"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
