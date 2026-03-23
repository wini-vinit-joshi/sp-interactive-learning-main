import { useState, useEffect } from "react";
import { X, CheckCircle2 } from "lucide-react";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const EMPTY = {
  firstName: "", lastName: "", email: "", phone: "", state: "", note: "",
};

export default function ConsultationModal({ open, onClose }: Props) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<typeof EMPTY>>({});
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Reset on close
  useEffect(() => {
    if (!open) { setForm(EMPTY); setErrors({}); setSubmitted(false); }
  }, [open]);

  if (!open) return null;

  const validate = () => {
    const e: Partial<typeof EMPTY> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || !/^\+?[\d\s\-().]{7,}$/.test(form.phone)) e.phone = "Valid phone required";
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof typeof EMPTY]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100" style={{ backgroundColor: "#005981" }}>
          <div>
            <h2 className="text-xl font-bold text-white">Book a Free Consultation</h2>
            <p className="text-sm text-white/70 mt-0.5">A WIN expert will reach out within 24 hours.</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <CheckCircle2 className="w-16 h-16 mb-4" style={{ color: "#005981" }} />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">You're all set!</h3>
            <p className="text-slate-500 mb-8">Thanks, {form.firstName}! A WIN expert will contact you shortly.</p>
            <button
              onClick={onClose}
              className="h-10 px-8 rounded-full text-sm font-semibold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "#005981" }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="px-6 py-6 space-y-5">
            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className={`w-full h-10 px-3 rounded-lg border text-sm outline-none transition-colors focus:ring-2 ${
                    errors.firstName ? "border-red-400 focus:ring-red-200" : "border-slate-300 focus:ring-[#005981]/20 focus:border-[#005981]"
                  }`}
                />
                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={`w-full h-10 px-3 rounded-lg border text-sm outline-none transition-colors focus:ring-2 ${
                    errors.lastName ? "border-red-400 focus:ring-red-200" : "border-slate-300 focus:ring-[#005981]/20 focus:border-[#005981]"
                  }`}
                />
                {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`w-full h-10 px-3 rounded-lg border text-sm outline-none transition-colors focus:ring-2 ${
                  errors.email ? "border-red-400 focus:ring-red-200" : "border-slate-300 focus:ring-[#005981]/20 focus:border-[#005981]"
                }`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="(555) 000-0000"
                className={`w-full h-10 px-3 rounded-lg border text-sm outline-none transition-colors focus:ring-2 ${
                  errors.phone ? "border-red-400 focus:ring-red-200" : "border-slate-300 focus:ring-[#005981]/20 focus:border-[#005981]"
                }`}
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            {/* Country + State */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                <input
                  value="United States"
                  readOnly
                  className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">State <span className="text-slate-400 font-normal">(optional)</span></label>
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-[#005981]/20 focus:border-[#005981] bg-white"
                >
                  <option value="">Select state</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Note <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us a bit about what you're looking for..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none resize-none focus:ring-2 focus:ring-[#005981]/20 focus:border-[#005981]"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-11 rounded-full border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 h-11 rounded-full text-sm font-semibold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: "#005981" }}
              >
                Submit Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
