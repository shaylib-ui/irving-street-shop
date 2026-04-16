import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Irving Street",
  description: "Irving Street privacy policy — how we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-gray-500 mb-10 text-sm">Last updated: April 16, 2026</p>

      <div className="space-y-8 text-gray-700 leading-relaxed text-sm">

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Introduction</h2>
          <p>
            Irving Street (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates
            this website as a curated product directory. This Privacy Policy describes what
            information we collect, how we use it, and the choices you have regarding your
            information. By using this site you agree to the practices described here.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Information we collect</h2>
          <h3 className="font-medium text-gray-800 mb-2">Information you provide</h3>
          <p>
            If you submit your email address to join our notification list, we collect and store
            that address for the sole purpose of sending you the notification you requested.
          </p>
          <h3 className="font-medium text-gray-800 mt-4 mb-2">Information collected automatically</h3>
          <p>
            Like most websites, our server logs may automatically record standard technical
            information when you visit, including your IP address, browser type, operating system,
            referring URL, pages viewed, and the date and time of your visit. This information is
            used for security, troubleshooting, and aggregate analytics only.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">3. Cookies and tracking</h2>
          <p>
            We may use cookies and similar technologies for basic site functionality and to
            understand how visitors use the site in aggregate. We do not use cookies to track
            you personally across other websites.
          </p>
          <p className="mt-3">
            <strong>Third-party cookies:</strong> When you click a product link and visit a
            retailer&rsquo;s site, that retailer and the CJ Affiliate platform may set their own
            cookies to track the referral for commission purposes. Those cookies are governed by
            the respective retailer&rsquo;s and CJ&rsquo;s own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">4. How we use your information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
            <li>Operate and improve this website</li>
            <li>Send you the email notification you requested (if applicable)</li>
            <li>Monitor for and respond to security incidents</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p className="mt-3">
            We do not sell your personal information. We do not share it with third parties
            except as described in this policy or required by law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Affiliate links and third-party sites</h2>
          <p>
            This site contains affiliate links to third-party retailer websites. When you click
            a product link, you leave Irving Street and are subject to the privacy policy of the
            destination site. We are not responsible for the privacy practices of those sites and
            encourage you to review their policies before making a purchase.
          </p>
          <p className="mt-3">
            See our{" "}
            <Link href="/affiliate-disclosure" className="underline text-[var(--brand)] hover:text-[var(--brand-light)]">
              affiliate disclosure
            </Link>{" "}
            for more information about how our affiliate relationships work.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">6. Data retention</h2>
          <p>
            We retain email addresses collected for our notification list until you request
            removal. Server log data is retained for up to 90 days. You may request deletion of
            your data at any time by contacting us at the address below.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">7. Your rights</h2>
          <p>
            Depending on your location, you may have rights under applicable privacy law,
            including the right to access, correct, or delete personal data we hold about you,
            and the right to opt out of certain processing. To exercise any of these rights,
            contact us at{" "}
            <a href="mailto:hello@irvingstreet.shop" className="underline text-[var(--brand)] hover:text-[var(--brand-light)]">
              hello@irvingstreet.shop
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">8. Children&rsquo;s privacy</h2>
          <p>
            This site is not directed to children under the age of 13. We do not knowingly
            collect personal information from children. If you believe a child has provided us
            with personal information, please contact us and we will delete it.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">9. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will update the
            &ldquo;last updated&rdquo; date at the top of this page. Continued use of the site
            after any changes constitutes your acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">10. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at:{" "}
            <a href="mailto:hello@irvingstreet.shop" className="underline text-[var(--brand)] hover:text-[var(--brand-light)]">
              hello@irvingstreet.shop
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}
