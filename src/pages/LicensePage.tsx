import { useState } from "react";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

export default function LicensePage() {
  const [selectedState, setSelectedState] = useState("");

  return (
    <div className="flex flex-col min-h-screen pt-24" style={{ fontFamily: "Axiforma, Arial, sans-serif" }}>
      {/* Hero */}
      <section className="py-20 bg-[#005981]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Home Inspector License Requirements
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Select your state to view the licensing process, requirements, and steps to get certified.
          </p>
        </div>
      </section>

      {/* Dropdown */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Select Your State
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-slate-300 text-slate-800 text-sm font-medium bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#005981]/30 focus:border-[#005981] transition-colors"
          >
            <option value="">-- Choose a State --</option>
            {US_STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Content */}
      <section className="flex-1 py-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {!selectedState ? (
            <div className="text-center py-24 text-slate-400">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-lg font-medium">Select a state to view its license process</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-1">
                {selectedState}
              </h2>
              <p className="text-sm text-[#005981] font-semibold mb-8">Home Inspector Licensing Requirements</p>
              <p className="text-slate-500 text-sm italic">
                Detailed licensing steps for {selectedState} coming soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
