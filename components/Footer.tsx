export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">EPL Editor & Converter</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Free online EPL editor with live preview. Edit EPL code and convert to ZPL, PDF, or PNG formats. 
              Fast, secure, and easy to use.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
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
                  GDPR Compliance
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Report Bug
                </a>
              </li>
              <li>
                <a href="mailto:support@eplconverter.com" className="hover:text-white transition-colors">
                  Email Support
                </a>
              </li>
            </ul>
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
          <p className="text-xs text-gray-500 text-center mt-4">
            This site uses cookies for analytics and advertising. By using this site, you agree to our use of cookies.
          </p>
        </div>
      </div>
    </footer>
  );
}

