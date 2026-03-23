import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

const WHY_WIN = [
  { label: "Training and Licensing", href: "https://winfranchising.com/why-win/training/" },
  { label: "End-to-End Marketing", href: "https://winfranchising.com/why-win/marketing/" },
  { label: "Proprietary Technology", href: "https://winfranchising.com/why-win/technology/" },
  { label: "Success Stories", href: "https://winfranchising.com/reviews/" },
];

const ABOUT_US = [
  { label: "Culture of Brotherhood", href: "https://winfranchising.com/culture-of-brotherhood/" },
  { label: "Support Team", href: "https://winfranchising.com/team/" },
];

const RESOURCES = [
  { label: "Articles", href: "https://winfranchising.com/knowledge-center/" },
  { label: "Becoming a Home Inspector", href: "https://winfranchising.com/how-to-become-a-home-inspector/" },
  { label: "Frequently Asked Questions", href: "https://winfranchising.com/faq/" },
];

const SOCIAL = [
  { label: "LinkedIn", icon: "https://d2nnm6ppct4rc3.cloudfront.net/icons8_linkedin_2_73439bf95f.svg", href: "https://www.linkedin.com/company/66033/admin/" },
  { label: "Facebook", icon: "https://d2nnm6ppct4rc3.cloudfront.net/facebook_20fa99c2a0.svg", href: "https://www.facebook.com/WINHomeInspection/" },
  { label: "X (Twitter)", icon: "https://d2nnm6ppct4rc3.cloudfront.net/twitter_847ff1df9e.svg", href: "https://x.com/winhomeinspect" },
  { label: "Instagram", icon: "https://d2nnm6ppct4rc3.cloudfront.net/instagram_d7878a3b2c.svg", href: "https://www.instagram.com/winhomeinspection/" },
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
              className="h-[56px] mb-4"
            />
          </div>

          {/* Why WIN */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Why WIN</h3>
            <ul className="space-y-2">
              {WHY_WIN.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">About Us</h3>
            <ul className="space-y-2">
              {ABOUT_US.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {RESOURCES.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us + Contact Us */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Follow Us</h3>
            <ul className="mb-8 flex items-center gap-3">
              {SOCIAL.map(({ label, icon, href }) => (
                <li key={label}>
                  <a href={href} className="flex items-center justify-center w-[25px] h-[25px] rounded-full transition-colors">
                    <img src={icon} alt={label} className="w-[25px] h-[25px]" />
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
