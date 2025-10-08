"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export function TermsClient() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>

            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-sm text-muted-foreground">
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
                <p>
                  By accessing or using Arabdevs services, you agree to be bound by these Terms of Service. If you
                  disagree with any part of these terms, you may not access our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Services Description</h2>
                <p>
                  Arabdevs provides professional digital services including VPS hosting, premium accounts, and platform
                  bots. The specific scope of services will be defined in individual agreements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>
                <p>When using our services, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Use our services in compliance with all applicable laws</li>
                  <li>Not engage in any activity that interferes with our services</li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Payment Terms</h2>
                <p>Payment terms will be specified in individual agreements. Generally:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payments are due according to the agreed schedule</li>
                  <li>Late payments may result in service suspension</li>
                  <li>All fees are non-refundable unless otherwise specified</li>
                  <li>Additional services may incur extra charges</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Service Availability</h2>
                <p>
                  We strive to maintain high service availability but cannot guarantee uninterrupted service. Scheduled
                  maintenance will be communicated in advance when possible.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Warranties and Disclaimers</h2>
                <p>We strive to deliver high-quality services but make no warranties regarding:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Uninterrupted or error-free operation</li>
                  <li>Specific results or outcomes</li>
                  <li>Compatibility with all systems or platforms</li>
                </ul>
                <p className="mt-4">
                  Our services are provided "as is" without warranties of any kind, either express or implied.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Arabdevs shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages resulting from your use of our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Termination</h2>
                <p>
                  Either party may terminate services with written notice. Upon termination, the client is responsible
                  for payment of all services rendered up to the termination date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Confidentiality</h2>
                <p>
                  We respect the confidentiality of client information and will not disclose confidential information to
                  third parties without consent, except as required by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                  posting. Your continued use of our services constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">11. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with applicable laws, without regard to
                  conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Information</h2>
                <p>For questions about these Terms of Service, please contact us at:</p>
                <p className="mt-2">
                  Email:{" "}
                  <a href="mailto:mohamedeldony3@gmail.com" className="text-primary hover:underline">
                    mohamedeldony3@gmail.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
