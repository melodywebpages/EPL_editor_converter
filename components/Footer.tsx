export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">EPL Editor & Converter</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Free online EPL editor with live preview. Edit EPL code and convert to ZPL, PDF, or PNG formats. 
              Fast, secure, and easy to use.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact & FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/report-bug" className="hover:text-white transition-colors">
                  Report a Bug
                </a>
              </li>
              <li>
                <a href="mailto:melodywebpages@gmail.com" className="hover:text-white transition-colors">
                  Email Support
                </a>
              </li>
            </ul>
            <p className="text-xs text-gray-400 mt-4">
              Response time: 24-48 hours
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} EPL Editor & Converter. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="/terms-of-service" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="/contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          {/* Created by section */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <p className="text-sm text-gray-400">
              Created with love by <span className="text-white font-semibold">MelodyWebPages</span>
            </p>
            <svg 
              className="w-5 h-5 text-purple-400" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              aria-label="Solana"
            >
              <path d="M5.93 17.57a.75.75 0 0 1 .53-.22h15.08a.38.38 0 0 1 .26.65l-3.54 3.54a.75.75 0 0 1-.53.22H2.65a.38.38 0 0 1-.26-.65l3.54-3.54Zm0-15.34L9.47.69a.75.75 0 0 1 .53-.22h15.08a.38.38 0 0 1 .26.65l-3.54 3.54a.75.75 0 0 1-.53.22H2.65a.38.38 0 0 1-.26-.65l3.54-3.54ZM18.07 12l3.54-3.54a.38.38 0 0 0-.26-.65H6.27a.75.75 0 0 0-.53.22L2.2 11.57a.38.38 0 0 0 .26.65h15.08a.75.75 0 0 0 .53-.22Z"/>
            </svg>
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            This site uses cookies for analytics and advertising. By using this site, you agree to our use of cookies.
          </p>
        </div>
      </div>
    </footer>
  );
}

