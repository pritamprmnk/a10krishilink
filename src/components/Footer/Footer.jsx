import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo + Description */}
        <div>
          <h2 className="flex items-center gap-2 cursor-pointer">
          <img src="/assets/logo.png" alt="logo" className="w-11 h-11 object-contain" />
          <h1 className="font-semibold text-xl text-black">KrishiLink</h1>
          </h2>
          <p className="text-gray-600 mt-3">
            KrishiLink is a modern web application that connects people in the agricultural sector such as farmers, traders, and consumers in one digital space.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-green-600 cursor-pointer">About Us</li>
            <li className="hover:text-green-600 cursor-pointer">Careers</li>
            <li className="hover:text-green-600 cursor-pointer">News</li>
            <li className="hover:text-green-600 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Platform */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Platform</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-green-600 cursor-pointer">How it Works</li>
            <li className="hover:text-green-600 cursor-pointer">Buy Crops</li>
            <li className="hover:text-green-600 cursor-pointer">Sell Crops</li>
            <li className="hover:text-green-600 cursor-pointer">FAQ</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Legal</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-green-600 cursor-pointer">Terms of Service</li>
            <li className="hover:text-green-600 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
      </div>

      <div className="border-t py-5">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <p className="text-gray-600 text-sm">
            © 2025 KrishiLink. All rights reserved.
          </p>

          <div className="flex gap-5 text-gray-600">
            <FaFacebookF className="cursor-pointer hover:text-green-600" size={20} />
            <FaTwitter className="cursor-pointer hover:text-green-600" size={20} />
            <FaLinkedin className="cursor-pointer hover:text-green-600" size={20} />
            <FaInstagram className="cursor-pointer hover:text-green-600" size={20} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
