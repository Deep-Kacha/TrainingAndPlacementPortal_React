import React from "react";
import { useNavigate } from "react-router-dom";
import PortalLogo from "./PortalLogo";
import { PORTAL_BRANDING } from "../../demo/demoConfig";

const AuthHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-100 border-b">
      <div className="flex justify-between items-center gap-2 px-4 sm:px-6 py-3">

        {/* Left: Logo + Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <PortalLogo className="h-9 sm:h-10 flex-shrink-0" variant="header" />
          <div className="min-w-0">
            <h1 className="text-red-600 font-bold text-xs sm:text-sm">T&amp;P Portal</h1>
            <p className="text-[11px] sm:text-xs text-gray-600 truncate">
              {PORTAL_BRANDING.shortName} Training &amp; Placement Management
            </p>
          </div>
        </div>

        {/* Right: Back to Home */}
        <button
          onClick={() => navigate("/")}
          className="flex-shrink-0 flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-700
                     border border-gray-300 bg-white hover:bg-gray-50
                     px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all shadow-sm"
        >
          ← Home
        </button>

      </div>
    </header>
  );
};

export default AuthHeader;