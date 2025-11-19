export default function ReportBug() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Report a Bug</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Found a Bug?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We appreciate you taking the time to report bugs and help us improve the EPL Editor & Converter. 
              Your feedback helps us make the tool better for everyone!
            </p>
          </section>

          <section className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border border-red-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">How to Report a Bug</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Please email us at <a href="mailto:melodywebpages@gmail.com" className="text-blue-600 hover:text-blue-800 font-semibold">melodywebpages@gmail.com</a> with the following information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-3 ml-4">
              <li>
                <strong>Description:</strong> Detailed explanation of what went wrong
              </li>
              <li>
                <strong>Steps to Reproduce:</strong> What actions led to the bug?
              </li>
              <li>
                <strong>Expected Behavior:</strong> What should have happened?
              </li>
              <li>
                <strong>Actual Behavior:</strong> What actually happened?
              </li>
              <li>
                <strong>Browser & OS:</strong> Which browser and operating system are you using?
              </li>
              <li>
                <strong>Screenshots:</strong> If applicable, include screenshots showing the issue
              </li>
              <li>
                <strong>EPL File:</strong> If possible, include the EPL file that caused the issue
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common Issues</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Preview not updating</h3>
                <p className="text-gray-700">
                  Try refreshing the preview manually using the refresh button, or reload the page. 
                  If the issue persists, please report it.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Conversion fails or produces incorrect output</h3>
                <p className="text-gray-700">
                  Some complex or proprietary EPL commands may not be fully supported. Please send us 
                  your EPL file so we can investigate and improve our conversion logic.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">File upload not working</h3>
                <p className="text-gray-700">
                  Make sure you're uploading a valid .epl file. The file should contain EPL commands. 
                  If you're still having issues, try a different browser or contact us.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Response Time</h2>
            <p className="text-gray-700 leading-relaxed">
              We typically respond to bug reports within 24-48 hours during business days. 
              Critical bugs affecting many users will be prioritized.
            </p>
          </section>

          <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Want to Suggest a Feature Instead?</h2>
            <p className="text-gray-700 leading-relaxed">
              Have an idea for a new feature? Email us at <a href="mailto:melodywebpages@gmail.com" className="text-blue-600 hover:text-blue-800 font-semibold">melodywebpages@gmail.com</a> with 
              your feature request. We love hearing from our users!
            </p>
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

