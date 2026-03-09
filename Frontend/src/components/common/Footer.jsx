import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#d8cfc2] ">
      <div className="max-w-7xl mx-auto px-8 py-10 grid md:grid-cols-4 gap-8">
        
        {/* Column 1 */}
        <div>
          <h2 className="font-bold text-black">
            RK University <span className="text-red-600">T&P Portal</span>
          </h2>
          <p className="text-sm mt-3 text-gray-700">
            Empowering students with career opportunities
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-red-600 font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>About T&P Cell</li>
            <li>Placement Statistics</li>
            <li>Recruiters</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-red-600 font-semibold mb-3">For Students</h3>
          <ul className="space-y-2 text-sm">
            <li>Register</li>
            <li>Login</li>
            <li>Guidelines</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-red-600 font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>tpo@rku.ac.in</li>
            <li>+91 2827 255734</li>
            <li>Rajkot, Gujarat</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-400 text-sm py-4 px-8 flex justify-between">
        <p>© 2026 RK University. All rights reserved.</p>
        <div className="space-x-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;