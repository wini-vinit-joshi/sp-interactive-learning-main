import { Link } from "react-router-dom";
import { Phone, Mail, Linkedin, Facebook, Twitter, Instagram } from "lucide-react";

const WHY_WIN = [
  "Training and Licensing",
  "End-to-End Marketing",
  "Proprietary Technology",
  "Success Stories",
];

const ABOUT_US = [
  "Culture of Brotherhood",
  "Support Team",
];

const RESOURCES = [
  "Articles",
  "Becoming a Home Inspector",
  "Frequently Asked Questions",
];

const SOCIAL = [
  { label: "LinkedIn", icon: Linkedin, href: "#" },
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "X (Twitter)", icon: Twitter, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#005981" }} className="text-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src="https://d2nnm6ppct4rc3.cloudfront.net/WIN_logo_white_SVG_09244e565a.svg"
              alt="WIN Home Inspection"
              className="h-10 w-auto mb-4"
            />
          </div>

          {/* Why WIN */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Why WIN</h3>
            <ul className="space-y-2">
              {WHY_WIN.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">About Us</h3>
            <ul className="space-y-2">
              {ABOUT_US.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {RESOURCES.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us + Contact Us */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Follow Us</h3>
            <ul className="mb-8 flex items-center gap-1">
              {SOCIAL.map(({ label, icon: Icon, href }) => (
                <li key={label} className="p-0 m-0">
                  <a href={href} className="flex items-center gap-2 p-0 text-sm text-white/70 hover:text-white transition-colors">
                    <Icon className="w-4 h-4 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Contact Us</h3>
            <a href="tel:8009678127" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-2">
              <Phone className="w-4 h-4 shrink-0" />
              (800) 967-8127
            </a>
            <a href="mailto:franchising@wini.com" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
              <Mail className="w-4 h-4 shrink-0" />
              franchising@wini.com
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} WIN Home Inspection. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
