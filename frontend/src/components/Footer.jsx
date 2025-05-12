import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  // Keyboard shortcuts modal
  const showKeyboardShortcuts = () => {
    alert("Keyboard Shortcuts:\n\n• Tab: Restart typing test\n• Enter: Complete typing test\n• Esc: Cancel current test");
  };
  
  // Accessibility modal
  const showAccessibilityOptions = () => {
    alert("Accessibility Options:\n\n• Increase font size: Ctrl/Cmd + Plus\n• Decrease font size: Ctrl/Cmd + Minus\n• Reset font size: Ctrl/Cmd + 0");
  };

  const socialMediaLinks = {
    twitter: "#",
    facebook: "#",
    instagram: "#",
  };

  return (
    <footer className={`${theme === "dark" ? "bg-gradient-to-r from-gray-800 to-gray-900" : "bg-gradient-to-r from-gray-50 to-gray-100"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className={`h-8 w-8 mr-2 ${theme === "dark" ? "text-purple-400" : "text-purple-500"}`}
                >
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
                <span className={`text-xl font-bold ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}>SmartStrokes</span>
              </div>
              <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-4 max-w-md`}>
                Improve your typing speed and accuracy with our interactive typing test and personalized practice sessions.
              </p>
              <div className="flex space-x-4">
                <a 
                  href={socialMediaLinks.twitter}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full ${theme === "dark" ? "bg-gray-700 text-purple-400 hover:bg-gray-600" : "bg-purple-100 text-purple-600 hover:bg-purple-200"} flex items-center justify-center transition-colors`}
                  aria-label="Twitter"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a 
                  href={socialMediaLinks.facebook}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full ${theme === "dark" ? "bg-gray-700 text-purple-400 hover:bg-gray-600" : "bg-purple-100 text-purple-600 hover:bg-purple-200"} flex items-center justify-center transition-colors`}
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a 
                  href={socialMediaLinks.instagram}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-full ${theme === "dark" ? "bg-gray-700 text-purple-400 hover:bg-gray-600" : "bg-purple-100 text-purple-600 hover:bg-purple-200"} flex items-center justify-center transition-colors`}
                  aria-label="Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className={`text-sm font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-400"} uppercase tracking-wider mb-4`}>Navigation</h3>
              <ul className="space-y-3">
                <li>
                  <NavLink to="/" className={({isActive}) => `${theme === "dark" ? "text-gray-300 hover:text-purple-400" : "text-gray-600 hover:text-purple-600"} transition-colors ${isActive ? (theme === "dark" ? 'text-purple-400 font-medium' : 'text-purple-600 font-medium') : ''}`}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard" className={({isActive}) => `${theme === "dark" ? "text-gray-300 hover:text-purple-400" : "text-gray-600 hover:text-purple-600"} transition-colors ${isActive ? (theme === "dark" ? 'text-purple-400 font-medium' : 'text-purple-600 font-medium') : ''}`}>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/" className={({isActive}) => `${theme === "dark" ? "text-gray-300 hover:text-purple-400" : "text-gray-600 hover:text-purple-600"} transition-colors ${isActive ? (theme === "dark" ? 'text-purple-400 font-medium' : 'text-purple-600 font-medium') : ''}`}>
                    Practice Typing
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={({isActive}) => `${theme === "dark" ? "text-gray-300 hover:text-purple-400" : "text-gray-600 hover:text-purple-600"} transition-colors ${isActive ? (theme === "dark" ? 'text-purple-400 font-medium' : 'text-purple-600 font-medium') : ''}`}>
                    About Us
                  </NavLink>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className={`text-sm font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-400"} uppercase tracking-wider mb-4`}>Legal</h3>
              <ul className="space-y-3">
                <li>
                  <NavLink to="/privacy" className={({isActive}) => `${theme === "dark" ? "text-gray-300 hover:text-purple-400" : "text-gray-600 hover:text-purple-600"} transition-colors ${isActive ? (theme === "dark" ? 'text-purple-400 font-medium' : 'text-purple-600 font-medium') : ''}`}>
                    Privacy Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/terms" className={({isActive}) => `${theme === "dark" ? "text-gray-300 hover:text-purple-400" : "text-gray-600 hover:text-purple-600"} transition-colors ${isActive ? (theme === "dark" ? 'text-purple-400 font-medium' : 'text-purple-600 font-medium') : ''}`}>
                    Terms of Service
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className={({isActive}) => `${theme === "dark" ? "text-gray-300 hover:text-purple-400" : "text-gray-600 hover:text-purple-600"} transition-colors ${isActive ? (theme === "dark" ? 'text-purple-400 font-medium' : 'text-purple-600 font-medium') : ''}`}>
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          
          <div className={`pt-8 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"} flex flex-col md:flex-row justify-between items-center`}>
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-sm mb-4 md:mb-0`}>
              © {new Date().getFullYear()} <span className={`font-semibold ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}>SmartStrokes</span>. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button 
                onClick={showAccessibilityOptions}
                className={`${theme === "dark" ? "text-gray-400 hover:text-purple-400" : "text-gray-400 hover:text-purple-600"} transition-colors`}
                aria-label="Accessibility Options"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 8v8"></path>
                  <path d="M8 12h8"></path>
                </svg>
              </button>
              <button 
                onClick={showKeyboardShortcuts}
                className={`${theme === "dark" ? "text-gray-400 hover:text-purple-400" : "text-gray-400 hover:text-purple-600"} transition-colors`}
                aria-label="Keyboard Shortcuts"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                  <path d="M6 8h.001"></path>
                  <path d="M10 8h.001"></path>
                  <path d="M14 8h.001"></path>
                  <path d="M18 8h.001"></path>
                  <path d="M8 12h.001"></path>
                  <path d="M12 12h.001"></path>
                  <path d="M16 12h.001"></path>
                  <path d="M7 16h10"></path>
                </svg>
              </button>
              <button 
                onClick={toggleTheme}
                className={`${theme === "dark" ? "text-gray-400 hover:text-purple-400" : "text-gray-400 hover:text-purple-600"} transition-colors`}
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
  
export default Footer;
  