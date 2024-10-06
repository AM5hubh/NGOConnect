import React from "react";
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* College Information */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-semibold mb-2 flex flex-col items-center">
              <span className="text-xl font-bold mb-4"><img src='/shortw.png' className=' h-12'/></span>
              <span> NGOConnect </span>
            <p className="mb-2 text-xl font-normal">Bridging gap between NGO's and Donors</p>
            </h3>
            <address className="not-italic">
              <p className="flex items-center mb-1">
                <MapPin size={16} className="mr-2" />
                K.T. Marg, Vasai Road (W), Dist. Palghar, Maharashtra, India -
                401202
              </p>
              <p className="flex items-center mb-1">
                <Phone size={16} className="mr-2" />
                +91-250-2338234
              </p>
              <p className="flex items-center">
                <Mail size={16} className="mr-2" />
                principal@vcet.edu.in
              </p>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Academics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Admissions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Research
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Placements
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Alumni
                </a>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex flex-wrap space-x-4 mb-4">
              <a href="#" className="hover:text-blue-300" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-blue-300" aria-label="Twitter">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-blue-300" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
              <a
                href="#"
                className="hover:text-blue-300"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-blue-300" aria-label="YouTube">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <h4 className="text-lg font-semibold mb-2">Newsletter</h4>
      </div>
      <form className="flex items-start  md:justify-start">
        <input
          type="email"
          placeholder="Your email"
          className="px-3 py-2 bg-blue-800 ml-[13%] text-white md:mb-10  placeholder-blue-300 rounded-md mb-12 md:rounded-l-md md:mr-2 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-700 px-4 py-2  mr-[13%] rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Subscribe
        </button>
      </form>
      <footer className="bg-blue-900 text-white p-4 text-center">
        <p>&copy; 2024 NGOConnect</p>
      </footer>
    </footer>
  );
}

export default Footer;
