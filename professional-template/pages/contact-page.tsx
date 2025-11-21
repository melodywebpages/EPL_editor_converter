// File: app/contact/page.tsx
// Copy this entire file to your app/contact/ directory

export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We'd love to hear from you! Whether you have questions, feedback, or need support, 
              feel free to reach out to us through any of the channels below.
            </p>
          </section>

          <section className="flex justify-center">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 max-w-md w-full">
              <div className="text-blue-600 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-700">
                For all inquiries, support requests, bug reports, and feature suggestions:
              </p>
              <p className="text-gray-700 mt-4">
                <a href="mailto:melodywebpages@gmail.com" className="text-blue-600 hover:text-blue-800 font-semibold text-lg">
                  melodywebpages@gmail.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {/* CUSTOMIZE THESE FAQ ITEMS BASED ON YOUR APP */}
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">[Common question about your app's main feature]</h3>
                <p className="text-gray-700">
                  [Answer that explains how your app handles this feature]
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Is my data stored on your servers?</h3>
                <p className="text-gray-700">
                  [Explain your data storage policy - customize based on your actual app behavior]
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Is the service free?</h3>
                <p className="text-gray-700">
                  [Explain your pricing model - free, freemium, paid, etc.]
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">[Another common question]</h3>
                <p className="text-gray-700">
                  [Relevant answer for your app]
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">[Technical question about functionality]</h3>
                <p className="text-gray-700">
                  [Technical answer with details about your app's capabilities or limitations]
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Response Time</h2>
            <p className="text-gray-700 leading-relaxed">
              We typically respond to emails within 24-48 hours during business days.
            </p>
          </section>

          <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Report a Bug or Suggest a Feature</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Help us improve! If you've found a bug, please visit our <a href="/report-bug" className="text-blue-600 hover:text-blue-800 font-semibold">Bug Report page</a> for detailed instructions.
            </p>
            <p className="text-gray-700">
              Have a feature request? Email us at <a href="mailto:melodywebpages@gmail.com" className="text-blue-600 hover:text-blue-800 font-semibold">melodywebpages@gmail.com</a> with your suggestion!
            </p>
          </section>
        </div>

        <div className="mt-8">
          <a 
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to [Your App Name]
          </a>
        </div>
      </div>
    </main>
  );
}

