import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/SectionHead";
import { CONTACT } from "@/data/site";
import { SITE_ORIGIN } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () => {
    const canonical = `${SITE_ORIGIN}/privacy-policy`;
    const title = "Privacy Policy | Shubh Estate Brokers";
    const description =
      "Privacy policy for Shubh Estate Brokers covering website enquiries, Meta lead forms, WhatsApp, calls, email and property advisory interactions.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonical },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: PrivacyPolicy,
});

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
    <h2 className="font-display text-2xl text-foreground">{title}</h2>
    <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">{children}</div>
  </section>
);

function PrivacyPolicy() {
  return (
    <>
      <PageHero
        eyebrow="Privacy & Data"
        title="Privacy Policy"
        body="How Shubh Estate Brokers collects, uses and protects information shared through our website, Meta lead forms, WhatsApp, phone, email and property advisory services."
      />

      <div className="container-page py-16">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="rounded-2xl border border-gold/30 bg-secondary/40 p-6 text-sm leading-7 text-muted-foreground md:p-8">
            <p><strong className="text-foreground">Effective date:</strong> 15 September 2026</p>
            <p className="mt-2">
              This policy applies to Shubh Estate Brokers, Gurugram, and to information submitted through
              shubhestatebroker.in, Facebook and Instagram lead forms, WhatsApp, telephone, email, property
              enquiry forms, consultation requests and site-visit requests.
            </p>
          </div>

          <Section title="1. Information we may collect">
            <p>Depending on how you contact us, we may collect:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Name, phone or WhatsApp number and email address.</li>
              <li>Current country or city, preferred Gurgaon location, project or corridor.</li>
              <li>Budget range, purchase or sale timeline, end-use or investment objective and property preferences.</li>
              <li>Property details shared by owners, landlords, buyers or tenants for an enquiry or transaction.</li>
              <li>Financing information voluntarily shared when home-loan or mortgage assistance is requested.</li>
              <li>Documents voluntarily provided for transaction coordination, title/document review, valuation or lending support.</li>
              <li>Technical and usage information collected through website analytics, cookies and advertising technologies where enabled.</li>
            </ul>
          </Section>

          <Section title="2. How we use information">
            <p>We use information only for legitimate business and service purposes, including to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Respond to property, project, resale, rental, selling, landlord or advisory enquiries.</li>
              <li>Prepare relevant property shortlists and arrange calls, video consultations or site visits.</li>
              <li>Coordinate valuation, documentation, due diligence, transaction steps and mortgage assistance when requested.</li>
              <li>Contact you about the enquiry you submitted and provide requested follow-up.</li>
              <li>Improve our website, advertising, content, lead quality and service experience.</li>
              <li>Prevent misuse, maintain records and comply with applicable legal, tax, accounting or regulatory obligations.</li>
            </ul>
            <p>
              We do not use documents or financial information supplied for a specific transaction for unrelated public marketing.
            </p>
          </Section>

          <Section title="3. Meta, Facebook and Instagram lead forms">
            <p>
              If you submit a form on Facebook or Instagram, Meta may provide us the information you entered in that form.
              We use it to respond to your real-estate enquiry, qualify your requirements and arrange the requested follow-up.
            </p>
            <p>
              Submitting a lead form does not guarantee property availability, investment returns, loan approval or any particular
              transaction outcome. Project, price, inventory, RERA, financing and legal details are reconfirmed before a material commitment.
            </p>
            <p>
              Meta also processes information under its own terms and privacy policies. You should review the privacy settings and
              terms provided by Meta for Facebook and Instagram.
            </p>
          </Section>

          <Section title="4. WhatsApp, calls and email">
            <p>
              When you contact us through WhatsApp, telephone or email, the relevant service provider may process your information
              under its own terms. We use the conversation and contact details to respond to your request and maintain appropriate
              follow-up records.
            </p>
            <p>
              You can ask us to stop non-essential promotional follow-up at any time. Transactional or service-related communication
              may continue where needed to complete an active request or meet legal obligations.
            </p>
          </Section>

          <Section title="5. When information may be shared">
            <p>We may share limited information when necessary to provide a service you requested, for example with:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Property owners, authorised representatives, developers or other transaction parties where relevant.</li>
              <li>Banks, housing-finance institutions, valuation professionals or mortgage partners when financing support is requested.</li>
              <li>Lawyers, chartered accountants, tax professionals, document specialists or other advisers involved at your direction.</li>
              <li>Technology, hosting, CRM, analytics, communications and advertising service providers that support our operations.</li>
              <li>Government or regulatory authorities where disclosure is required by applicable law.</li>
            </ul>
            <p>
              We do not sell your personal information to third parties. We aim to share only what is reasonably necessary for the stated purpose.
            </p>
          </Section>

          <Section title="6. Cookies, analytics and advertising technology">
            <p>
              Our website may use cookies and analytics or advertising tools, including services provided by Google, Meta and other
              technology providers, to measure visits, enquiry actions, campaign performance and website usability. These providers may
              process device, browser, referral and interaction data under their own privacy terms.
            </p>
            <p>
              Where browser or platform controls are available, you can use them to manage cookies, advertising preferences and similar technologies.
            </p>
          </Section>

          <Section title="7. Data retention and security">
            <p>
              We retain information for as long as reasonably necessary to handle your enquiry, provide requested services, manage an active
              transaction, resolve disputes and meet legitimate record-keeping or legal requirements. Information that is no longer needed may
              be deleted, de-identified or archived subject to applicable obligations.
            </p>
            <p>
              We use reasonable organisational and technical safeguards, but no internet transmission or electronic storage method can be guaranteed
              to be completely secure. Please avoid sending passwords, PINs or unnecessary sensitive information through ordinary enquiry channels.
            </p>
          </Section>

          <Section title="8. Your choices and requests">
            <p>You may contact us to request access to, correction of or deletion of personal information we hold about you, or to withdraw consent for optional marketing.</p>
            <p>
              Some records may need to be retained where required for legal, regulatory, accounting, fraud-prevention or dispute-resolution purposes.
            </p>
          </Section>

          <Section title="9. International enquiries">
            <p>
              Shubh Estate Brokers is based in Gurugram, Haryana, India. If you contact us from another country, information you submit may be processed
              in India and by service providers operating in other jurisdictions. By requesting our services, you understand that cross-border processing
              may occur where necessary to handle your enquiry.
            </p>
          </Section>

          <Section title="10. Children">
            <p>
              Our property advisory and lead forms are intended for adults. We do not knowingly seek personal information from children for real-estate
              transactions or marketing enquiries.
            </p>
          </Section>

          <Section title="11. Changes to this policy">
            <p>
              We may update this policy when our services, technology or legal obligations change. The current version and effective date will be published
              on this page.
            </p>
          </Section>

          <Section title="12. Contact us about privacy">
            <p>
              For privacy questions or requests, contact Shubh Estate Brokers using the details below.
            </p>
            <address className="not-italic">
              <strong className="text-foreground">Shubh Estate Brokers</strong><br />
              {CONTACT.address}<br />
              Phone: <a href={CONTACT.phoneHref} className="text-gold hover:underline">{CONTACT.phone}</a><br />
              Email: <a href={`mailto:${CONTACT.email}`} className="text-gold hover:underline">{CONTACT.email}</a>
            </address>
          </Section>
        </div>
      </div>
    </>
  );
}
