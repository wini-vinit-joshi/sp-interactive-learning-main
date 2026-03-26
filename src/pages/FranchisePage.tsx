import { ArrowRight, BarChart3, Users, BookOpen, ShieldCheck, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import ConsultationModal from "@/components/ConsultationModal";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { API_BASE_URL } from "@/config";

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
const FRANCHISE_LOCATIONS = [
  { name: "Cheyenne, WY", lat: 40.762264, lng: -105.01233 },
  { name: "Saginaw, MI", lat: 43.268788, lng: -83.79486 },
  { name: "Castle Rock, CO", lat: 39.595115, lng: -104.7485 },
  { name: "Santa Ana, CA", lat: 33.695576, lng: -117.80588 },
  { name: "Victoria Gardens, CA", lat: 34.131659, lng: -117.5924 },
  { name: "Red River, OK", lat: 34.936221, lng: -97.74453 },
  { name: "Carmel, IN", lat: 39.970241, lng: -86.15416 },
  { name: "Canton, MI", lat: 42.370837, lng: -83.4856 },
  { name: "Cranberry, PA", lat: 40.608403, lng: -79.74234 },
  { name: "Norman, OK", lat: 35.118392, lng: -97.66381 },
  { name: "Plainfield, IN", lat: 39.84952, lng: -86.38739 },
  { name: "New Baltimore, MI", lat: 42.631359, lng: -82.554 },
  { name: "Fremont, NE", lat: 41.47502, lng: -96.34446 },
  { name: "La Mesa, CA", lat: 32.761801, lng: -117.01273 },
  { name: "Stroudsburg, PA", lat: 40.645665, lng: -75.36926 },
  { name: "Franklin, TN", lat: 35.921811, lng: -86.7952 },
  { name: "Royalton, OH", lat: 41.312752, lng: -81.83197 },
  { name: "SE Salt Lake City, UT", lat: 40.614997, lng: -111.88704 },
  { name: "Saratoga, NY", lat: 43.312104, lng: -73.64825 },
  { name: "Old Hickory Lake, TN", lat: 36.311047, lng: -86.61173 },
  { name: "Colonial Heights, VA", lat: 37.406204, lng: -77.4533 },
  { name: "Fishers, IN", lat: 39.973731, lng: -86.08875 },
  { name: "Lebanon, OH", lat: 39.550241, lng: -84.3087 },
  { name: "North Seattle, WA", lat: 47.66747, lng: -122.37468 },
  { name: "Kent Federal Way, WA", lat: 47.311072, lng: -122.31188 },
  { name: "Northwest Michigan, MI", lat: 44.789382, lng: -85.488449 },
  { name: "Crystal Lake, IL", lat: 42.217523, lng: -88.24338 },
  { name: "Tempe, AZ", lat: 33.426885, lng: -111.92733 },
  { name: "Amarillo, TX", lat: 34.971029, lng: -101.9212 },
  { name: "Patchogue, NY", lat: 40.74485, lng: -73.055 },
  { name: "Glendale, AZ", lat: 33.534128, lng: -112.1767 },
  { name: "Fresno, CA", lat: 36.657266, lng: -119.59309 },
  { name: "Albion, MI", lat: 42.645985, lng: -84.64772 },
  { name: "Johnson City, TN", lat: 36.331006, lng: -82.3386 },
  { name: "Redmond-Kirkland, WA", lat: 47.67903, lng: -122.1934 },
  { name: "Jupiter, FL", lat: 26.802139, lng: -80.07032 },
  { name: "Bethpage, NY", lat: 40.7143, lng: -73.55527 },
  { name: "Madera-Merced, CA", lat: 37.100417, lng: -120.27864 },
  { name: "Henderson, NV", lat: 36.0008, lng: -114.9588 },
  { name: "Chesapeake, VA", lat: 36.761698, lng: -76.24511 },
  { name: "Indian River, FL", lat: 27.762118, lng: -80.59472 },
  { name: "Leander, TX", lat: 30.501272, lng: -97.83087 },
  { name: "East End, NY", lat: 40.926595, lng: -72.65327 },
  { name: "Tracy, CA", lat: 37.889849, lng: -121.253872 },
  { name: "Fort Campbell, TN", lat: 36.574224, lng: -87.79018 },
  { name: "McMinnville, OR", lat: 45.100504, lng: -123.22834 },
  { name: "Kerrville, TX", lat: 29.718152, lng: -99.06605 },
  { name: "Dillon, MT", lat: 46.588803, lng: -112.04193 },
  { name: "Ave Maria, FL", lat: 26.28828, lng: -81.78726 },
  { name: "Chattanooga, TN", lat: 35.046324, lng: -85.31199 },
  { name: "Salem, OR", lat: 44.926644, lng: -122.98694 },
  { name: "North Naples, FL", lat: 26.142938, lng: -81.79852 },
  { name: "Beloit, WI", lat: 42.526464, lng: -89.04291 },
  { name: "Rocky Point, NY", lat: 40.783954, lng: -73.24517 },
  { name: "Renton, WA", lat: 47.369098, lng: -122.192276 },
  { name: "Valdosta, GA", lat: 31.003274, lng: -83.5282 },
  { name: "Clovis, CA", lat: 36.840057, lng: -119.66107 },
  { name: "Seacoast3, TX", lat: 33.786594, lng: -118.298662 },
  { name: "Westminster, CO", lat: 39.825357, lng: -105.06439 },
  { name: "Ellsworth, ME", lat: 44.81777, lng: -68.78952 },
  { name: "Layton, UT", lat: 41.126476, lng: -112.04427 },
  { name: "Monterey, CA", lat: 36.665879, lng: -121.65497 },
  { name: "Santa Cruz, CA", lat: 36.979333, lng: -121.8944 },
  { name: "Catalina Foothills, AZ", lat: 32.32764, lng: -110.98801 },
  { name: "Wentzville, MO", lat: 38.814432, lng: -90.94433 },
  { name: "Montlake, WA", lat: 47.63287, lng: -122.32253 },
  { name: "Twin Peaks, CO", lat: 40.171484, lng: -105.10033 },
  { name: "South Twin Cities, MN", lat: 44.743963, lng: -93.20624 },
  { name: "Reno Southeast, NV", lat: 39.542711, lng: -119.75445 },
  { name: "Stockbridge, Georgia", lat: 33.528345, lng: -84.33347 },
  { name: "Eglin, FL", lat: 30.361248, lng: -86.18759 },
  { name: "Green Valley, NV", lat: 36.038181, lng: -115.086999 },
  { name: "Lubbock, TX", lat: 33.578935, lng: -101.8316 },
  { name: "Lincolnwood, IL", lat: 42.07672, lng: -87.81922 },
  { name: "Central Oregon, OR", lat: 44.091256, lng: -121.29769 },
  { name: "Collierville, TN", lat: 35.057224, lng: -89.67417 },
  { name: "Lillington, NC", lat: 35.458804, lng: -79.16415 },
  { name: "Hilliard, Ohio ", lat: 40.089811, lng: -83.13983 },
  { name: "Macon, GA", lat: 32.556668, lng: -83.62435 },
  { name: "North Columbus, OH", lat: 40.097796, lng: -83.02076 },
  { name: "Stayton, OR", lat: 45.234609, lng: -122.79749 },
  { name: "Hanford, CA", lat: 36.311439, lng: -119.70823 },
  { name: "Redlands, CA", lat: 34.030714, lng: -117.31174 },
  { name: "Yucaipa, CA", lat: 33.920803, lng: -116.87897 },
  { name: "Spanaway, WA", lat: 47.028423, lng: -122.291 },
  { name: "Rock Springs, WY", lat: 41.594542, lng: -109.16304 },
  { name: "Santa Clarita, CA", lat: 34.481172, lng: -118.42821 },
  { name: "LaGrange, GA", lat: 32.867469, lng: -85.13779 },
  { name: "Goose Creek, SC", lat: 33.0185, lng: -80.1756 },
  { name: "Springville, UT", lat: 40.226302, lng: -111.64439 },
  { name: "Elyria, OH", lat: 41.386533, lng: -82.23419 },
  { name: "Portland ME, ME", lat: 43.216251, lng: -70.62856 },
  { name: "Troy, OH", lat: 40.215278, lng: -84.6477 },
  { name: "San Ramon, CA", lat: 37.879757, lng: -122.07143 },
  { name: "Fort Collins, CO", lat: 40.586282, lng: -105.10494 },
  { name: "Aurora South, CO", lat: 39.698387, lng: -104.83956 },
  { name: "Woodinville, WA", lat: 47.84311, lng: -122.20457 },
  { name: "Columbia-Spring Hill, TN", lat: 35.73062, lng: -86.91144 },
  { name: "Saint Cloud, FL", lat: 28.395979, lng: -81.17653 },
  { name: "Brentwood, TN", lat: 36.007373, lng: -86.79121 },
  { name: "Gulfport, MS", lat: 30.380597, lng: -89.09626 },
  { name: "Crown Point, IN", lat: 41.418873, lng: -87.34298 },
  { name: "Stockton, CA", lat: 37.958723, lng: -121.28805 },
  { name: "Dover, NH", lat: 43.048372, lng: -71.3078 },
  { name: "Monticello, GA", lat: 33.581406, lng: -83.851 },
  { name: "Lafayette, IN", lat: 40.418585, lng: -86.88975 },
  { name: "Central Park, CO", lat: 39.836586, lng: -104.9039 },
  { name: "Broomfield, CO", lat: 39.93404, lng: -105.05454 },
  { name: "Olympia, WA", lat: 47.014718, lng: -122.8819 },
  { name: "Wausau, WI", lat: 44.958382, lng: -89.6693 },
  { name: "Smithtown, NY", lat: 40.946103, lng: -73.06222 },
  { name: "Laurens, SC", lat: 34.926075, lng: -81.87919 },
  { name: "Roseville, CA", lat: 38.731976, lng: -121.2531 },
  { name: "Richmond Hill, GA", lat: 31.828575, lng: -81.61617 },
  { name: "Lakewood-U.P., WA", lat: 47.088719, lng: -122.64326 },
  { name: "Teton, ID", lat: 43.1856, lng: -110.38625 },
  { name: "Edmonds, WA", lat: 47.803668, lng: -122.37096 },
  { name: "Tri-Cities, CA", lat: 37.562218, lng: -121.99433 },
  { name: "Thunderbird, AZ", lat: 33.630497, lng: -112.0521 },
  { name: "Riverside, CA", lat: 33.752886, lng: -116.055617 },
  { name: "Merrick, NY", lat: 40.589538, lng: -73.72915 },
  { name: "Citrus Heights, CA", lat: 38.628371, lng: -121.32702 },
  { name: "Portsmouth, NH", lat: 43.070188, lng: -70.77684 },
  { name: "Hilton Head, SC", lat: 32.312621, lng: -80.915532 },
  { name: "Palm Desert, CA", lat: 33.715271, lng: -116.235 },
  { name: "Seacoast, TX", lat: 33.786594, lng: -118.298662 },
  { name: "Highlands Ranch, CO", lat: 39.599687, lng: -105.00658 },
  { name: "Fort Myers, FL", lat: 26.62365, lng: -81.8727 },
  { name: "Lindale, GA", lat: 34.065792, lng: -85.07227 },
  { name: "Three Rivers, OK", lat: 35.992283, lng: -95.80542 },
  { name: "North Lake County, IL", lat: 42.46617, lng: -88.09995 },
  { name: "West Vancouver, WA", lat: 45.795825, lng: -122.69804 },
  { name: "Fountain Hills, AZ", lat: 33.521433, lng: -111.90944 },
  { name: "St. Augustine, FL", lat: 29.87131, lng: -81.29464 },
  { name: "Palmetto Bay, FL", lat: 25.66558, lng: -80.30688 },
  { name: "Sandy, UT", lat: 40.581595, lng: -111.88821 },
  { name: "Billings, MT", lat: 45.947154, lng: -108.0969 },
  { name: "Ann Arbor, MI", lat: 42.344837, lng: -83.89907 },
  { name: "Westover Hills, TX", lat: 32.75388, lng: -97.32987 },
  { name: "Wexford, PA", lat: 40.652311, lng: -79.93303 },
  { name: "Croydon, PA", lat: 40.108943, lng: -74.85548 },
  { name: "Bellevue South, WA", lat: 47.618371, lng: -122.20308 },
  { name: "Pleasant Grove, UT", lat: 40.394235, lng: -111.79449 },
  { name: "Irvine, CA", lat: 33.73297, lng: -117.76932 },
  { name: "Fig Garden, CA", lat: 36.831723, lng: -119.83198 },
  { name: "Lakewood, CO", lat: 39.795006, lng: -105.0981 },
  { name: "Buffalo Grove, IL", lat: 42.160791, lng: -88.15231 },
  { name: "Oro Valley, AZ", lat: 32.454488, lng: -111.26232 },
  { name: "Rowland Heights, CA", lat: 33.934513, lng: -117.95159 },
  { name: "North Las Vegas, NV", lat: 36.206419, lng: -115.12318 },
  { name: "Land O' Lakes, FL", lat: 28.234624, lng: -82.20022 },
  { name: "Greenville, SC", lat: 34.940921, lng: -81.98682 },
  { name: "Whidbey-Fidalgo Island, WA", lat: 48.495234, lng: -122.61976 },
  { name: "Venice, FL", lat: 27.091783, lng: -82.44846 },
  { name: "Clifton Park, NY", lat: 43.006309, lng: -73.8604 },
  { name: "Issaquah, WA", lat: 47.565642, lng: -121.88638 },
  { name: "Goodyear, AZ", lat: 33.454441, lng: -112.32401 },
  { name: "Chesterfield, MO", lat: 38.646981, lng: -90.63155 },
  { name: "Delaware, OH", lat: 40.295925, lng: -83.06968 },
  { name: "Cedar Lake, IN", lat: 41.36959, lng: -87.44849 },
  { name: "Monmouth, OR", lat: 44.637701, lng: -123.62496 },
  { name: "Englewood, CO", lat: 39.646847, lng: -104.99076 },
  { name: "Southeast Idaho, ID", lat: 42.883214, lng: -112.43968 },
  { name: "Oakville, Missouri", lat: 38.42727, lng: -90.38515 },
  { name: "Auburn, WA", lat: 47.303722, lng: -122.26608 },
  { name: "Evansville, Kentucky", lat: 37.859415, lng: -87.37005 },
  { name: "Bellevue, WA", lat: 47.618371, lng: -122.20308 },
  { name: "Johnstown, CO", lat: 40.160138, lng: -105.01772 },
  { name: "Folsom, CA", lat: 38.672127, lng: -121.15783 },
  { name: "Chandler, AZ", lat: 33.316349, lng: -111.83064 },
  { name: "Visalia, CA", lat: 36.387879, lng: -119.21908 },
  { name: "San Bernardino, CA", lat: 34.198189, lng: -117.35826 },
  { name: "Kingsport-Bristol, TN", lat: 36.534729, lng: -82.37229 },
  { name: "Georgetown, KY", lat: 38.221179, lng: -84.55465 },
  { name: "Noblesville, IN", lat: 40.0617, lng: -86.0555 },
  { name: "Valley Stream, NY", lat: 40.700529, lng: -73.70223 },
  { name: "Sahuarita, AZ", lat: 31.857504, lng: -111.00904 },
  { name: "Murrysville, PA", lat: 40.431034, lng: -79.76526 },
  { name: "Eagle Mountain, TX", lat: 32.905693, lng: -97.54845 },
  { name: "Loganville, GA", lat: 33.888829, lng: -83.96848 },
  { name: "Garden City, NY", lat: 40.7232, lng: -73.70475 },
  { name: "Santa Rosa, CA", lat: 38.457611, lng: -122.69317 },
  { name: "Lake Orion, MI", lat: 42.708151, lng: -83.16584 },
  { name: "Cookeville, TN", lat: 36.000953, lng: -85.97669 },
  { name: "Murfreesboro, TN", lat: 35.791021, lng: -86.34445 },
  { name: "Anderson Township, OH", lat: 39.13786, lng: -84.43426 },
  { name: "Highland, IN", lat: 41.639735, lng: -87.46084 },
  { name: "Prattville, AL", lat: 32.501649, lng: -86.572711 },
  { name: "Porterville, CA", lat: 36.201983, lng: -119.08589 },
  { name: "Dunes, IN", lat: 41.616263, lng: -87.05883 },
  { name: "Providence, RI", lat: 41.835094, lng: -70.95973 },
  { name: "Gainesville, VA", lat: 38.964054, lng: -77.60878 },
  { name: "Southwest Minneapolis, MN", lat: 44.971765, lng: -93.28557 },
  { name: "St George, UT", lat: 37.75164, lng: -113.16557 },
  { name: "Paradise Valley, AZ", lat: 33.544596, lng: -111.95645 },
  { name: "South San Jose, CA", lat: 37.189396, lng: -121.705327 },
  { name: "Greeley, CO", lat: 40.407853, lng: -104.75498 },
  { name: "Carbondale, IL", lat: 38.178395, lng: -89.84183 },
  { name: "Five Valleys, MT", lat: 46.855423, lng: -114.01229 },
  { name: "Medford, OR", lat: 42.676455, lng: -123.324 },
  { name: "West Seattle, WA", lat: 47.60252, lng: -122.32855 },
  { name: "Babylon, NY", lat: 40.687649, lng: -73.32549 },
  { name: "Huntington, NY", lat: 40.890598, lng: -73.37536 },
  { name: "Wheat Ridge, CO", lat: 39.795006, lng: -105.0981 },
  { name: "Westlake, OH", lat: 41.415097, lng: -81.91436 },
  { name: "Fairhope, AL", lat: 30.930065, lng: -88.00103 },
  { name: "Roswell, GA", lat: 34.119177, lng: -84.30292 },
  { name: "Aledo, TX", lat: 32.690922, lng: -97.64013 },
  { name: "Clermont, FL", lat: 28.545742, lng: -81.74805 },
  { name: "Aliante, NV", lat: 36.256479, lng: -115.16139 },
  { name: "Mesa, AZ", lat: 33.432177, lng: -111.84701 },
  { name: "Summerlin, NV", lat: 36.193501, lng: -115.265 },
  { name: "Whatcom, WA", lat: 48.681582, lng: -122.1977 },
  { name: "Lansdale, PA", lat: 40.317473, lng: -75.12854 },
  { name: "Altha, FL", lat: 30.486061, lng: -84.31528 },
  { name: "Foothills, SC", lat: 34.523657, lng: -82.62509 },
  { name: "Mount Vernon, WA", lat: 48.203856, lng: -122.05288 },
  { name: "Green Hills, TN", lat: 36.180507, lng: -86.60111 },
  { name: "St. Charles, MO", lat: 38.808583, lng: -90.50687 },
  { name: "Fort Knox, KY", lat: 38.045982, lng: -85.55467 },
  { name: "Charlottesville, VA", lat: 38.426786, lng: -78.88153 },
  { name: "Roslyn, NY", lat: 40.771082, lng: -73.71819 },
  { name: "West Jordan, UT", lat: 40.563896, lng: -112.1281 },
  { name: "Bradenton, FL", lat: 27.434755, lng: -82.40211 },
  { name: "South Sound, WA", lat: 47.027082, lng: -122.80359 },
  { name: "Tacoma, WA", lat: 47.209021, lng: -122.44498 }
];
export default function FranchisePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [reqData, setReqData] = useState<string | null>(null);
  const [loadingReq, setLoadingReq] = useState(false);

  useEffect(() => {
    if (!selectedState) {
      setReqData(null);
      return;
    }
    
    let isMounted = true;
    const fetchRequirements = async () => {
      setLoadingReq(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/state-requirements`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state: selectedState })
        });
        const data = await res.json();
        
        if (!isMounted) return;

        if (data.success && data.data && data.data.requirements) {
          setReqData(data.data.requirements);
        } else {
          setReqData(`## ${selectedState} Home Inspector Licensing\n\nDetailed licensing steps for ${selectedState} coming soon.`);
        }
      } catch (err) {
        console.error("Failed to fetch requirements", err);
        if (isMounted) setReqData("Failed to load licensing steps. Please try again later.");
      } finally {
        if (isMounted) setLoadingReq(false);
      }
    };
    
    fetchRequirements();
    return () => { isMounted = false; };
  }, [selectedState]);

  const parseMarkdown = (md: string) => {
    if (!md) return { __html: "" };
    let html = md
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-[#005981] mt-8 mb-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-extrabold text-slate-900 mt-2 mb-6 pb-2 border-b border-slate-100">$1</h2>')
      .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-bold text-slate-800 mt-6 mb-3">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
      .replace(/^- (.*$)/gim, '<li class="ml-6 mb-2 list-disc text-slate-600 leading-relaxed">$1</li>');

    html = html.replace(/(<li.*?>.*?<\/li>(\s*<li.*?>.*?<\/li>)*)/gim, '<ul class="mb-6 space-y-1">$1</ul>');

    html = html
      .split('\n\n')
      .map(p => {
        p = p.trim();
        if (!p) return "";
        if (p.startsWith('<h') || p.startsWith('<ul')) return p;
        p = p.replace(/\n(?!<ul|<li)/g, '<br/>');
        return `<p class="text-slate-600 leading-relaxed mb-4">${p}</p>`;
      })
      .join('');

    return { __html: html };
  };

  return (
    <>
      <div className="bg-white">
        <section className="relative py-32 overflow-hidden" style={{ backgroundColor: "#003d5c" }}>
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=2000"
              alt="Business Owner"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #003d5cee, #003d5c99, transparent)" }} />
          </div>
          <div className="container mx-auto max-w-7xl px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <span className="font-bold tracking-wider uppercase text-sm mb-4 block" style={{ color: "#7ecfef" }}>Own Your Future</span>
                <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                  Start Your Own Home Inspection Business
                </h1>
                <p className="text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
                  Leverage your knowledge. Partner with the #1 ranked home inspection franchise.
                  We provide the training, marketing, and technology to help you build a lucrative business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://winfranchising.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#005981] shadow transition-colors hover:bg-white/90"
                  >
                    Visit Official Franchise Page <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-white border border-white/40 transition-colors hover:bg-white/10"
                  >
                    Book a Call
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-[480px] shrink-0 hidden lg:flex items-center justify-center">
                <div className="w-full h-[380px] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 [&_.leaflet-control-attribution]:hidden">
                  <MapContainer
                    center={[39.5, -98.35]}
                    zoom={3}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%" }}
                    zoomControl={true}
                  >
                    <TileLayer
                      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                      attribution=''
                    />
                    {FRANCHISE_LOCATIONS.map((loc) => (
                      <CircleMarker
                        key={loc.name}
                        center={[loc.lat, loc.lng]}
                        radius={7}
                        pathOptions={{ color: "#ffffff", fillColor: "#005981", fillOpacity: 1, weight: 2 }}
                      >
                        <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                          <span className="text-xs font-semibold">{loc.name}</span>
                        </Tooltip>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-slate-50">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose WIN Home Inspection?</h2>
              <p className="text-lg text-slate-600">A proven business model designed for your success, backed by decades of industry leadership.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: BarChart3, title: "Proven Model", text: "Low overhead, high margins, and a resilient industry driven by real estate transactions." },
                { icon: BookOpen, title: "Training & Support", text: "Comprehensive in-house training plus an immersive AI platform dedicated to your mastery." },
                { icon: Users, title: "Marketing Power", text: "Cutting-edge digital marketing support and brand recognition to drive leads directly to you." },
                { icon: ShieldCheck, title: "Market Demand", text: "Every home purchase needs an inspection. Provide a crucial service in a booming market." },
              ].map((feature, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: "#e6f2f7", color: "#005981" }}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="rounded-3xl overflow-hidden flex flex-col md:flex-row relative" style={{ backgroundColor: "#005981" }}>
              <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center text-white relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Build a Business, Build a Life.</h2>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  Take control of your schedule, grow your wealth, and become a trusted advisor in your community.
                  With WIN, you&apos;re in business for yourself, but never by yourself.
                </p>
                <a
                  href="https://winfranchising.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex max-w-max h-12 items-center justify-center rounded-full bg-white px-8 font-bold uppercase tracking-wider text-sm transition-transform hover:scale-105"
                  style={{ color: "#005981" }}
                >
                  Download Free Brochure
                </a>
              </div>
              <div className="md:w-1/2 min-h-[400px] relative">
                <img
                  src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=1000"
                  alt="Happy Business Owner"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Partner ── */}
        <section className="py-24" style={{ backgroundColor: "#f5f0eb" }}>
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-start">

              {/* Left: title + checklist */}
              <div className="flex-1 min-w-0">
                <h2 className="text-4xl font-extrabold text-slate-900 leading-tight mb-10">
                  Why Should You Partner with the{" "}
                  <span style={{ color: "#005981" }}>Best Home Inspection Franchise?</span>
                </h2>
                <ul className="space-y-8">
                  {[
                    { title: "Explosive Growth with 35+ Essential Services", desc: "You scale, you profit, you WIN with a diversified business year-round." },
                    { title: "High Profitability with Minimal Overhead", desc: "No storefront. No inventory. More money stays with you." },
                    { title: "Increased Earnings with Proprietary Technology", desc: "AI-driven automation. More revenue per client. More repeat business." },
                    { title: "Brand Recognition with the #1 Ranked Franchise", desc: "Trusted nationwide. Built-in respect and authority from day one." },
                    { title: "Lowest Franchise Fee with No Hidden Costs", desc: "One-of-a-kind, all-inclusive system. Unlimited training, marketing, and tech usage." },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-4">
                      <div className="mt-1 shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center" style={{ borderColor: "#005981" }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#005981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 mb-1">{item.title}</p>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: staggered photo grid */}
              <div className="w-full lg:w-[420px] shrink-0 hidden lg:grid grid-cols-2 gap-4 items-start">
                <div className="rounded-2xl overflow-hidden shadow-lg col-span-2 h-64">
                  <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Inspector on rooftop" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-44">
                  <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80" alt="Training session" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-44 mt-6">
                  <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" alt="Electrical inspection" className="w-full h-full object-cover" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Revenue Stat + Copy ── */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-3xl overflow-hidden shadow-xl border border-slate-200">

              {/* Left stat card */}
              <div className="flex flex-col items-center justify-center text-center px-12 py-16 bg-white border-b md:border-b-0 md:border-r border-slate-200 md:w-80 lg:w-96 shrink-0" style={{ borderColor: "#005981", borderWidth: 2, borderRadius: "1.5rem 0 0 1.5rem" }}>
                {/* Icon */}
                <div className="mb-6">
                  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="36" cy="24" r="16" stroke="#005981" strokeWidth="2.5" fill="none" />
                    <text x="36" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#005981">$</text>
                    <path d="M12 52 Q20 44 36 46 Q52 48 60 52" stroke="#005981" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M8 56 Q18 50 36 52 Q54 54 64 56" stroke="#005981" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
                  </svg>
                </div>
                <p className="text-6xl font-extrabold mb-1" style={{ color: "#005981" }}>$244,682<sup className="text-2xl align-super">†</sup></p>
                <p className="text-lg font-bold text-slate-900 mt-3 mb-2">Average Gross Revenue</p>
                <p className="text-slate-500 text-sm leading-relaxed">5x higher than the average earnings of home inspectors in the US</p>
              </div>

              {/* Right copy */}
              <div className="flex flex-col justify-center px-10 lg:px-16 py-16 bg-slate-100 flex-1">
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
                  Low-Cost Franchise Opportunity<br />in a Multi-Billion Dollar Industry
                </h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  WIN Home Inspection is the lowest-cost franchise in the home inspection industry. What makes a WIN franchise a high-margin opportunity is an industry with minimal overheads (no storefront, no inventory, no upfront staff) combined with a unique, all-inclusive support model that eliminates hidden costs for you as a business owner.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  WIN is the only franchise in the U.S. offering in-house, end-to-end marketing support, comprehensive training and certification for 35+ services, and the most innovative, proprietary technology to help you build a highly profitable business and create memorable experiences for your clients and REALTORS®. It's this unique blend that enables WIN franchise owners to achieve remarkable success and profitability year-round.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Licensing Requirements Section */}
        <section className="py-20 bg-[#005981] border-t border-white/10">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Home Inspector License Requirements
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Select your state to view the licensing process, requirements, and steps to get certified.
            </p>
          </div>
        </section>

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

        <section className="py-16 bg-white">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {!selectedState ? (
              <div className="text-center py-12 text-slate-400">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-lg font-medium">Select a state to view its license process</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10 transition-all">
                {loadingReq ? (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                    <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#005981]" />
                    <p className="font-medium animate-pulse">Loading {selectedState} requirements...</p>
                  </div>
                ) : (
                  <div 
                    className="text-left max-w-prose mx-auto"
                    dangerouslySetInnerHTML={reqData ? parseMarkdown(reqData) : { __html: `<h2 class="text-2xl font-extrabold text-slate-900 mb-1">${selectedState}</h2><p class="text-slate-500 text-sm italic mt-4">Detailed licensing steps for ${selectedState} coming soon.</p>` }} 
                  />
                )}
              </div>
            )}
          </div>
        </section>

      </div>
      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}