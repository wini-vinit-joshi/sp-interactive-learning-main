import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, UserCircle, LogOut } from "lucide-react";
import ConsultationModal from "./ConsultationModal";
import AuthModal from "./AuthModal";
import { useAuth } from "@/context/AuthContext";

function getInitials(name: string | null | undefined) {
  if (!name) return "U";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function UserAvatar({ photoURL, displayName, size = "w-8 h-8", text = "text-sm" }: { photoURL?: string | null; displayName?: string | null; size?: string; text?: string }) {
  console.log({photoURL})
  return photoURL ? (
    <img src={photoURL} alt={displayName ?? ""} referrerPolicy="no-referrer" className={`${size} rounded-full object-cover`} />
  ) : (
    <div className={`${size} rounded-full bg-[#005981] text-white flex items-center justify-center font-bold ${text}`}>
      {getInitials(displayName)}
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isBlue = scrolled;
  const isWhite = !isBlue;
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();

  console.log({user})

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isWhite
            ? "bg-white border-b border-gray-200 shadow-sm"
            : "bg-[#005981]"
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="https://d2nnm6ppct4rc3.cloudfront.net/WIN_logo_white_SVG_09244e565a.svg"
                alt="WIN Home Inspection"
                className={`h-[57px] transition-all duration-300 ${isWhite ? "[filter:brightness(0)_saturate(100%)_invert(24%)_sepia(97%)_saturate(600%)_hue-rotate(170deg)_brightness(90%)]" : "brightness-100"}`}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              {[
                { to: "/learn", label: "Training Platform" },
                { to: "/license", label: "License Platform" },
                { to: "/franchise", label: "Franchise Opportunities" },
                { to: "/articles", label: "Articles" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`transition-colors ${
                    isWhite
                      ? "text-gray-700 hover:text-[#005981]"
                      : "text-white/90 hover:text-white"
                  } text-[14px] cursor-pointer`}
                  style={{ fontFamily: 'Axiforma', fontWeight: 500 }}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 transition-colors"
                  >
                    <UserAvatar photoURL={user.photoURL} displayName={user.displayName} />
                    <span className={`text-sm font-medium ${isWhite ? "text-gray-700" : "text-white"}`}>
                      {user.displayName?.split(" ")[0] ?? "Account"}
                    </span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800 truncate">{user.displayName}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => { signOut(); setDropdownOpen(false); }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${
                    isWhite ? "text-gray-700 hover:text-[#005981]" : "text-white/90 hover:text-white"
                  }`}
                >
                  <UserCircle className="w-5 h-5" />
                  Sign In
                </button>
              )}
              <button
                onClick={() => setModalOpen(true)}
                className={`inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold border transition-colors ${
                  isWhite
                    ? "border-[#005981] text-[#005981] hover:bg-[#005981] hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-[#005981]"
                }`}
              >
                Book Free Consultation
              </button>
              <a
                href="https://winfranchising.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold shadow transition-colors ${
                  isWhite
                    ? "bg-[#005981] text-white hover:bg-[#004a6e]"
                    : "bg-white text-[#005981] hover:bg-white/90"
                }`}
              >
                Own a Franchise
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className={`md:hidden transition-colors ${isWhite ? "text-gray-700" : "text-white"}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {[
                { to: "/learn", label: "Training Platform" },
                { to: "/license", label: "License Platform" },
                { to: "/franchise", label: "Franchise Opportunities" },
                { to: "/articles", label: "Articles" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm font-medium text-gray-700 hover:text-[#005981] py-1"
                >
                  {label}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserAvatar photoURL={user.photoURL} displayName={user.displayName} size="w-7 h-7" text="text-xs" />
                      <span className="text-sm font-medium text-gray-700">{user.displayName?.split(" ")[0]}</span>
                    </div>
                    <button onClick={() => { signOut(); setMenuOpen(false); }} className="text-sm text-red-500 flex items-center gap-1">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <button onClick={() => { setMenuOpen(false); setAuthOpen(true); }} className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <UserCircle className="w-5 h-5" /> Sign In
                  </button>
                )}
                <button
                  onClick={() => { setMenuOpen(false); setModalOpen(true); }}
                  className="inline-flex h-9 items-center justify-center rounded-md border border-[#005981] px-4 text-sm font-semibold text-[#005981]"
                >
                  Book Free Consultation
                </button>
                <a
                  href="https://winfranchising.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-9 items-center justify-center rounded-md bg-[#005981] px-4 text-sm font-semibold text-white"
                >
                  Own a Franchise
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} defaultTab="signin" />
    </>
  );
}
