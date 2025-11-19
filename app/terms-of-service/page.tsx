export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: November 18, 2024</p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using EPL Editor & Converter ("the Service"), you accept and agree to be 
              bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 leading-relaxed">
              EPL Editor & Converter is a free online tool that allows you to edit EPL (Eltron Programming Language) 
              code with live preview and convert EPL files to ZPL (Zebra Programming Language), PDF, or PNG formats. 
              The Service provides a code editor, real-time visualization, and uses the Labelary API for rendering labels.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Use License</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Permitted Use</h3>
            <p className="text-gray-700 leading-relaxed mb-3">You are granted a limited, non-exclusive, 
            non-transferable license to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Use the Service for personal or commercial purposes</li>
              <li>Edit EPL code using our online editor</li>
              <li>Preview labels in real-time</li>
              <li>Convert EPL files to supported formats (ZPL, PDF, PNG)</li>
              <li>Download and use edited and converted files</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">3.2 Restrictions</h3>
            <p className="text-gray-700 leading-relaxed mb-3">You agree NOT to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Reverse engineer, decompile, or disassemble the Service</li>
              <li>Use the Service for illegal purposes</li>
              <li>Attempt to overwhelm or disrupt the Service (DoS attacks)</li>
              <li>Use automated scripts or bots excessively</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Upload malicious files or code</li>
              <li>Infringe on intellectual property rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Content</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Your Responsibility</h3>
            <p className="text-gray-700 leading-relaxed">
              You are solely responsible for the EPL files you upload, any edits you make using our editor, 
              and any content you create using the Service. You represent that you own or have the necessary 
              rights to upload, edit, and convert your files.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">4.2 No Storage</h3>
            <p className="text-gray-700 leading-relaxed">
              Files uploaded to the Service and any edits made are processed in real-time and are NOT stored on our servers. 
              EPL editing happens client-side in your browser. After conversion, files are immediately deleted from temporary memory.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              The Service, including its original content, features, code editor, and functionality, is owned by 
              EPL Editor & Converter and is protected by international copyright, trademark, patent, 
              trade secret, and other intellectual property laws.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You retain all rights to your uploaded files, edited content, and converted outputs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              The Service relies on third-party services, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Labelary API</strong> - For ZPL rendering</li>
              <li><strong>Cloud hosting providers</strong></li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              We are not responsible for the availability, functionality, or policies of these third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Disclaimers and Warranties</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 "AS IS" Basis</h3>
            <p className="text-gray-700 leading-relaxed">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, 
              FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-4">7.2 No Guarantee</h3>
            <p className="text-gray-700 leading-relaxed">
              We do not guarantee that:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>The Service will be uninterrupted or error-free</li>
              <li>Conversions will be 100% accurate for all EPL formats</li>
              <li>The Service will meet your specific requirements</li>
              <li>All EPL commands will be supported</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR 
              REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, 
              OR OTHER INTANGIBLE LOSSES RESULTING FROM:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-3">
              <li>Your use or inability to use the Service</li>
              <li>Any unauthorized access to your files</li>
              <li>Errors or inaccuracies in converted files</li>
              <li>Any interruption or cessation of the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify, defend, and hold harmless EPL to ZPL/PDF Converter and its 
              affiliates from any claims, liabilities, damages, losses, and expenses arising from 
              your use of the Service or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Your use of the Service is also governed by our Privacy Policy. Please review our 
              <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 mx-1">Privacy Policy</a>
              to understand our practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Modifications to Service</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue the Service at any time without 
              notice. We will not be liable to you or any third party for any modification, suspension, 
              or discontinuation of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to update these Terms at any time. We will notify users of any 
              material changes by posting the new Terms on this page with an updated "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], 
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these Terms, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-3">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@eplconverter.com<br />
                <strong>Address:</strong> [Your Business Address]
              </p>
            </div>
          </section>

          <section className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              By using the Service, you acknowledge that you have read, understood, and agree to be 
              bound by these Terms of Service.
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

