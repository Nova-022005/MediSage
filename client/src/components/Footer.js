import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-[#1A1A1A] text-white py-16 mt-0">
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo & Description */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold"> MediSage</h3>
          <p className="text-[#9CA3AF] max-w-xs leading-relaxed">
            Secure, open source framework for storing, managing and interacting with medical records. Built to protect your privacy with full end-to-end encryption.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <Link to="/" className="text-[#9CA3AF] hover:text-white transition duration-300">Home</Link>
            </li>
            <li>
              <a href="#how-it-works" className="text-[#9CA3AF] hover:text-white transition duration-300">How it works</a>
            </li>
            <li>
              <a href="#features" className="text-[#9CA3AF] hover:text-white transition duration-300">Features</a>
            </li>
            <li>
              <Link to="/dashboard" className="text-[#9CA3AF] hover:text-white transition duration-300">Use Cases</Link>
            </li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Connect With Us</h4>
          <p className="text-[#9CA3AF] text-sm">Let's revolutionize healthcare with intelligent data and care.</p>
          <div className="flex space-x-6 text-2xl">
            <a href="https://github.com/Nova-022005/MediSage" target="_blank" rel="noopener noreferrer" className="text-[#9CA3AF] hover:text-white transition duration-300"><Github className="w-6 h-6" /></a>
            <a href="#" className="text-[#9CA3AF] hover:text-white transition duration-300"><Linkedin className="w-6 h-6" /></a>
            <a href="#" className="text-[#9CA3AF] hover:text-white transition duration-300"><Twitter className="w-6 h-6" /></a>
            <a href="mailto:support@medisage.ai" className="text-[#9CA3AF] hover:text-white transition duration-300"><Mail className="w-6 h-6" /></a>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-2">Made with  by MediSage Team</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t border-[#374151] pt-6 text-center text-[#9CA3AF] text-sm"> {new Date().getFullYear()} MediSage. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
