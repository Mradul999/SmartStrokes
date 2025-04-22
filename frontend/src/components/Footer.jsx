const Footer = () => {
    return (
      <footer className="bg-gray-100 border-t border-gray-300 mt-10">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} <span className="font-semibold text-purple-700">SmartStrokes</span>. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="/about" className="hover:text-purple-700 transition">About</a>
            <a href="/contact" className="hover:text-purple-700 transition">Contact</a>
            <a href="/privacy" className="hover:text-purple-700 transition">Privacy Policy</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  