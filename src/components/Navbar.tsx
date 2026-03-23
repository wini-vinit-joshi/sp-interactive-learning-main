import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, UserCircle } from "lucide-react";
import ConsultationModal from "./ConsultationModal";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white border-b border-gray-200 shadow-sm"
            : "bg-[#005981]"
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="https://d2nnm6ppct4rc3.cloudfront.net/WIN_logo_white_SVG_09244e565a.svg"
                alt="WIN Home Inspection"
                className={`h-8 w-auto transition-all duration-300 ${scrolled ? "[filter:brightness(0)_saturate(100%)_invert(24%)_sepia(97%)_saturate(600%)_hue-rotate(170deg)_brightness(90%)]" : "brightness-100"}`}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              {[
                { to: "/learn", label: "Training Platform" },
                { to: "/franchise", label: "Franchise Opportunities" },
                { to: "/articles", label: "Articles" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`text-sm font-medium transition-colors ${
                    scrolled
                      ? "text-gray-700 hover:text-[#005981]"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => setAuthOpen(true)}
                className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${
                  scrolled ? "text-gray-700 hover:text-[#005981]" : "text-white/90 hover:text-white"
                }`}
              >
                <UserCircle className="w-5 h-5" />
                Sign In
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className={`inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold border transition-colors ${
                  scrolled
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
                  scrolled
                    ? "bg-[#005981] text-white hover:bg-[#004a6e]"
                    : "bg-white text-[#005981] hover:bg-white/90"
                }`}
              >
                Own a Franchise
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className={`md:hidden transition-colors ${scrolled ? "text-gray-700" : "text-white"}`}
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
                <button onClick={() => { setMenuOpen(false); setAuthOpen(true); }} className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <UserCircle className="w-5 h-5" /> Sign In
                </button>
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
