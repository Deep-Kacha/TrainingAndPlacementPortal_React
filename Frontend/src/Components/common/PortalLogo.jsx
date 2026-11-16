import React from "react";
import logo from "../../assets/images/logo.png";
import { PORTAL_BRANDING } from "../../demo/demoConfig";

/**
 * Displays the campus institutional logo identically across local dev and production.
 */
const PortalLogo = ({ className = "h-12" }) => {
  return (
    <img
      src={logo}
      alt={PORTAL_BRANDING.institutionName}
      className={className}
    />
  );
};

export default PortalLogo;
