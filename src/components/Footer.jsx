import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaAmilia,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-20 pb-10 border-t border-base-300">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-xl text-white transition-transform group-hover:scale-110">
              <FaAmilia size={24} />
            </div>
            <span className="font-extrabold text-2xl tracking-tight">Artify</span>
          </Link>
          <p className="text-base-content/70 max-w-xs text-sm leading-relaxed">
            The world's premier platform for digital and traditional artists to showcase their masterpieces and connect with collectors worldwide.
          </p>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <FaXTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-6">Quick Links</h2>
          <ul className="space-y-4">
            <li><Link to="/" className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2">Home</Link></li>
            <li><Link to="/arts" className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2">Explore Artworks</Link></li>
            <li><Link to="/about" className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2">About Us</Link></li>
            <li><Link to="/contact" className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2">Contact</Link></li>
            <li><Link to="/dashboard" className="text-base-content/70 hover:text-primary transition-colors flex items-center gap-2">My Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-6">Support</h2>
          <ul className="space-y-4">
            <li><Link to="/help" className="text-base-content/70 hover:text-primary transition-colors">Help Center</Link></li>
            <li><Link to="/privacy" className="text-base-content/70 hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-base-content/70 hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link to="/faq" className="text-base-content/70 hover:text-primary transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-bold mb-6">Contact Info</h2>
          <div className="space-y-4 text-sm text-base-content/70">
            <p className="flex items-center gap-3">
              <span className="text-primary font-bold">Address:</span> 123 Art Lane, Creative City
            </p>
            <p className="flex items-center gap-3">
              <span className="text-primary font-bold">Email:</span> support@artify.com
            </p>
            <p className="flex items-center gap-3">
              <span className="text-primary font-bold">Phone:</span> +1 (555) 123-4567
            </p>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto mt-16 pt-8 border-t border-base-300 text-center">
        <p className="text-base-content/50 text-xs">
          &copy; {new Date().getFullYear()} Artify. All rights reserved. Created with passion for the art community.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
