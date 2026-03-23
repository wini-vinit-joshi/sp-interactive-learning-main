import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#f4f4f4]">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <h2 className="text-4xl font-extrabold text-[#005981]">Turn your skills into a business</h2>
        <p className="text-xl text-[#005981] max-w-2xl mx-auto">
          Ready to take the next step? Join the fastest-growing home inspection franchise network in the country.
        </p>
        <a
          href="https://winfranchising.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center justify-center rounded-md bg-[#005981] px-4 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-[#004a6e]"
        >
          Visit Official Franchise Site <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
