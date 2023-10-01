import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 h-20">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <p>&copy; {new Date().getFullYear()} Vester.AI</p>
          </div>
          <div>
            <ul className="flex space-x-4 text-sm">
              <li>
                <a href="#" className="text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
