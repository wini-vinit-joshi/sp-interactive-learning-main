import { useState, useEffect } from "react";
import { X, Eye, EyeOff, CheckCircle2, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface Props {
  open: boolean;
  onClose: () => void;
  defaultTab?: "signin" | "signup";
}

const inputClass = (err?: string) =>
  `w-full h-11 px-3 rounded-lg border text-sm outline-none transition-colors focus:ring-2 ${
    err
      ? "border-red-400 focus:ring-red-200"
      : "border-slate-300 focus:ring-[#005981]/20 focus:border-[#005981]"
  }`;

export default function AuthModal({ open, onClose, defaultTab = "signin" }: Props) {
  const [tab, setTab] = useState<"signin" | "signup">(defaultTab);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);

  const [signin, setSignin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({ email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setSignin({ email: "", password: "" });
      setSignup({ email: "", password: "", confirm: "" });
      setErrors({});
      setDone(false);
      setShowPw(false);
      setShowConfirm(false);
      setShowEmailForm(false);
    }
    setTab(defaultTab);
    setShowEmailForm(false);
  }, [open, defaultTab]);

  if (!open) return null;

  const validateSignin = () => {
    const e: Record<string, string> = {};
    if (!signin.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signin.email)) e.email = "Valid email required";
    if (!signin.password) e.password = "Password required";
    return e;
  };

  const validateSignup = () => {
    const e: Record<string, string> = {};
    if (!signup.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signup.email)) e.email = "Valid email required";
    if (signup.password.length < 8) e.password = "At least 8 characters";
    if (signup.confirm !== signup.password) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = tab === "signin" ? validateSignin() : validateSignup();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setDone(true);
  };

  const change = (setter: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter((p: any) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const switchTab = (t: "signin" | "signup") => {
    setTab(t);
    setErrors({});
    setShowEmailForm(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ backgroundColor: "#005981" }}>
          <div>
            <h2 className="text-xl font-bold text-white">
              {tab === "signin" ? "Welcome Back" : "Create Your Account"}
            </h2>
            <p className="text-sm text-white/70 mt-0.5">
              {tab === "signin" ? "Sign in to access your training modules." : "Free account. Unlock all training modules."}
            </p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100">
          {(["signin", "signup"] as const).map((t) => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                tab === t ? "border-b-2 text-[#005981]" : "text-slate-400 hover:text-slate-600"
              }`}
              style={tab === t ? { borderColor: "#005981" } : {}}
            >
              {t === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-14 px-6 text-center"
            >
              <CheckCircle2 className="w-14 h-14 mb-4" style={{ color: "#005981" }} />
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {tab === "signin" ? "Signed in!" : "Account created!"}
              </h3>
              <p className="text-slate-500 text-sm mb-8">
                {tab === "signin" ? "Welcome back. You now have full access." : "Welcome to WIN. Your training journey starts now."}
              </p>
              <button
                onClick={onClose}
                className="h-10 px-8 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#005981" }}
              >
                Continue
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: tab === "signin" ? -16 : 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="px-6 py-6 space-y-3"
            >
              {/* Social buttons */}
              <button type="button" onClick={handleGoogleSignIn} className="w-full h-11 rounded-full border border-slate-200 flex items-center justify-center gap-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                <GoogleIcon />
                Continue with Google
              </button>
              <button type="button" className="w-full h-11 rounded-full border border-slate-200 flex items-center justify-center gap-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                <MicrosoftIcon />
                Continue with Microsoft
              </button>

              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-400 font-medium">or</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Email toggle button */}
              {!showEmailForm ? (
                <button
                  type="button"
                  onClick={() => setShowEmailForm(true)}
                  className="w-full h-11 rounded-full border border-slate-200 flex items-center justify-center gap-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Mail className="w-4 h-4 text-slate-500" />
                  {tab === "signin" ? "Sign in with Email" : "Sign up with Email"}
                </button>
              ) : (
                <AnimatePresence>
                  <motion.form
                    key="email-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-3 overflow-hidden"
                  >
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email <span className="text-red-500">*</span></label>
                      <input
                        name="email"
                        type="email"
                        value={tab === "signin" ? signin.email : signup.email}
                        onChange={change(tab === "signin" ? setSignin : setSignup)}
                        placeholder="you@example.com"
                        className={inputClass(errors.email)}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Password <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input
                          name="password"
                          type={showPw ? "text" : "password"}
                          value={tab === "signin" ? signin.password : signup.password}
                          onChange={change(tab === "signin" ? setSignin : setSignup)}
                          placeholder={tab === "signin" ? "••••••••" : "Min. 8 characters"}
                          className={inputClass(errors.password) + " pr-10"}
                        />
                        <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                          {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                    </div>
                    {tab === "signup" && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input
                            name="confirm"
                            type={showConfirm ? "text" : "password"}
                            value={signup.confirm}
                            onChange={change(setSignup)}
                            placeholder="Re-enter password"
                            className={inputClass(errors.confirm) + " pr-10"}
                          />
                          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
                      </div>
                    )}
                    <button type="submit" className="w-full h-11 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: "#005981" }}>
                      {tab === "signin" ? "Sign In" : "Create Account"}
                    </button>
                  </motion.form>
                </AnimatePresence>
              )}

              <p className="text-center text-sm text-slate-500 pt-1">
                {tab === "signin" ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => switchTab(tab === "signin" ? "signup" : "signin")}
                  className="font-semibold hover:underline"
                  style={{ color: "#005981" }}
                >
                  {tab === "signin" ? "Create one" : "Sign in"}
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.1C9.5 35.6 16.3 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.7-.4-3.9z"/>
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 21 21">
      <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
      <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
      <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
    </svg>
  );
}
