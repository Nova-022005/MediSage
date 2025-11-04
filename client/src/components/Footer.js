import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-teal-800 text-white py-16 mt-0 border-t-4 border-teal-900">
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo & Description */}
        <div className="space-y-4">
          <h3 className="text-3xl font-bold">MediSage</h3>
          <p className="text-teal-100 max-w-xs leading-relaxed">
            Manage and analyze your medical records intelligently with AI —
            secure storage, insights, and personalized recommendations.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links 💡</h4>
          <ul className="space-y-3">
            <li>
              <Link
                to="/"
                className="hover:text-white hover:underline transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-white hover:underline transition duration-300"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/upload"
                className="hover:text-white hover:underline transition duration-300"
              >
                Upload Records
              </Link>
            </li>
            <li>
              <Link
                to="/insights"
                className="hover:text-white hover:underline transition duration-300"
              >
                AI Insights
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div className="space-y-4">
          <h4 className="text-xl font-semibold">
            Connect With Us <span className="animate-pulse">💙</span>
          </h4>
          <p className="text-teal-100 text-sm">
            Let’s revolutionize healthcare with intelligent data and care.
          </p>
          <div className="flex space-x-6 text-2xl">
            <a
              href="#"
              className="hover:scale-125 hover:text-white hover:drop-shadow-[0_0_8px_white] transition duration-300"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="hover:scale-125 hover:text-white hover:drop-shadow-[0_0_8px_white] transition duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="hover:scale-125 hover:text-white hover:drop-shadow-[0_0_8px_white] transition duration-300"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="mailto:support@medisage.ai"
              className="hover:scale-125 hover:text-white hover:drop-shadow-[0_0_8px_white] transition duration-300"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
          <p className="text-xs text-teal-100 mt-2">
            Made with <span className="animate-pulse">💚</span> by MediSage Team
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-teal-400/50 pt-6 text-center text-teal-100 text-sm">
        © {new Date().getFullYear()} MediSage. All rights reserved. 🩺
      </div>
    </footer>
  );
};

export default Footer;
