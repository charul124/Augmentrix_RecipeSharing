import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-rose-950 mt-20 text-white py-4 text-center">
        <div className="mt-2 text-sm">
        <a href="#" className="text-white hover:text-gray-300 mx-2">
          Privacy Policy
        </a>
        <a href="#" className="text-white hover:text-gray-300 mx-2">
          Terms of Service
        </a>
        <a href="#" className="text-white hover:text-gray-300 mx-2">
          Contact Us
        </a>
      </div>
      <p className="text-sm mt-3">
        © {new Date().getFullYear()} Eat's&Share's. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
