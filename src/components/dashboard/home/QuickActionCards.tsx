import { Link } from "react-router-dom";
import { ClipboardList } from "lucide-react";
import { AnimatedLogo } from "@/components/brand/AnimatedLogo";

export function QuickActionCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* AI Coach */}
      <Link 
        to="/dashboard/coach" 
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group"
      >
        <div className="h-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-teal-400" />
        <div className="p-5">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <AnimatedLogo size={24} />
          </div>
          <h3 className="font-semibold text-black mb-1">AI Coach</h3>
          <p className="text-sm text-gray-500">Ask anything about your blueprint</p>
        </div>
      </Link>

      {/* My Plan */}
      <Link 
        to="/dashboard/plan" 
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group"
      >
        <div className="h-1 bg-gradient-to-r from-orange-300 to-orange-400" />
        <div className="p-5">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <ClipboardList className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="font-semibold text-black mb-1">My Plan</h3>
          <p className="text-sm text-gray-500">Peptides, schedule & guides</p>
        </div>
      </Link>
    </div>
  );
}
