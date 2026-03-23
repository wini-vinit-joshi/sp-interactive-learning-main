import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

const WHO_WE_SERVE = ["Home Buyers", "Homeowners", "Home Sellers"];

const QUICK_LINKS = [
  "About WIN",
  "Services",
  "Reviews",
  "FAQs",
  "Home Maintenance Check",
  "Sample Report",
  "Resource Center",
  "Own a WIN Franchise",
  "WIN in the Media",
];

const CONTACTS = [
  {
    heading: "Schedule an Inspection",
    phone: "(800) 309-6753",
    email: "info@wini.com",
  },
  {
    heading: "Become a WIN Vendor",
    phone: "(312) 557-9319",
    email: "vendors@wini.com",
  },
  {
    heading: "Be a Franchise Owner",
    phone: "(800) 967-8127",
    email: "franchising@wini.com",
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#005981" }} className="text-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src="https://d2nnm6ppct4rc3.cloudfront.net/WIN_logo_white_SVG_09244e565a.svg"
              alt="WIN Home Inspection"
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm text-white/70 leading-relaxed">
              Empowering individuals to learn the skills of home inspection and build a thriving business with a proven franchise model.
            </p>
          </div>

          {/* Who We Serve */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Who We Serve
            </h3>
            <ul className="space-y-2">
              {WHO_WE_SERVE.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-bold uppercase tracking-wider text-white mt-8 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us — spans 2 cols on large screens */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              Contact Us
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {CONTACTS.map(({ heading, phone, email }) => (
                <div key={heading}>
                  <p className="text-sm font-semibold text-white mb-3">{heading}</p>
                  <a
                    href={`tel:${phone.replace(/\D/g, "")}`}
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-2"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    {phone}
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 shrink-0" />
                    {email}
                  </a>
                </div>
              ))}
            </div>
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
