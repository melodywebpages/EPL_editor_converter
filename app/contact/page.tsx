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

          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="text-blue-600 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-700">
                <strong>General Inquiries:</strong><br />
                info@eplconverter.com
              </p>
              <p className="text-gray-700 mt-3">
                <strong>Support:</strong><br />
                support@eplconverter.com
              </p>
              <p className="text-gray-700 mt-3">
                <strong>Legal/Privacy:</strong><br />
                legal@eplconverter.com
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
              <div className="text-purple-600 mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-700">
                [Your Company Name]<br />
                [Street Address]<br />
                [City, State ZIP]<br />
                [Country]
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">What file formats do you support?</h3>
                <p className="text-gray-700">
                  Our EPL editor supports EPL (Eltron Programming Language) files with live editing and preview. 
                  You can convert/export to ZPL (Zebra Programming Language), PDF, and PNG formats.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Are my files and edits stored on your servers?</h3>
                <p className="text-gray-700">
                  No. All editing happens client-side in your browser, and conversions are processed in real-time. 
                  Files are immediately deleted after conversion. We do not store any uploaded files, edited content, or converted outputs.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Is the service free?</h3>
                <p className="text-gray-700">
                  Yes, our EPL editor and converter is completely free to use for both personal and 
                  commercial purposes. Edit, preview, and convert unlimited files.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">What if my conversion doesn't work correctly?</h3>
                <p className="text-gray-700">
                  Please contact us at support@eplconverter.com with details about the issue and a sample 
                  of your EPL file (if possible). We'll investigate and help resolve the problem.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Do you support all EPL commands?</h3>
                <p className="text-gray-700">
                  We support the most common EPL commands including text (A), barcodes (B), lines (LO, LS), 
                  label dimensions (Q, q), and print quantity (P). Some complex or proprietary commands may 
                  not be fully supported.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Business Hours</h2>
            <p className="text-gray-700 leading-relaxed">
              We typically respond to emails within 24-48 hours during business days.
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM (EST)<br />
              <strong>Saturday - Sunday:</strong> Closed
            </p>
          </section>

          <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Report a Bug or Suggest a Feature</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Help us improve! If you've found a bug or have a feature request, please email us with:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Detailed description of the issue or feature</li>
              <li>Steps to reproduce (for bugs)</li>
              <li>Browser and operating system information</li>
              <li>Screenshots if applicable</li>
            </ul>
          </section>
        </div>

        <div className="mt-8">
          <a 
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Converter
          </a>
        </div>
      </div>
    </main>
  );
}

