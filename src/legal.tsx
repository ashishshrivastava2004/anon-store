import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Check, 
  Copy, 
  Printer, 
  Search, 
  Building2 
} from 'lucide-react';

/**
 * ANON — Luxury Streetwear Design System
 * Brutalist / Extreme Minimalist Legal Suite
 * Fully compliant with Razorpay & Indian E-Commerce Regulations
 */

export type LegalTab = 'privacy' | 'terms' | 'refund';

interface LegalLayoutProps {
  title: string;
  documentId: string;
  lastUpdated: string;
  jurisdiction?: string;
  onBackHome?: () => void;
  children: React.ReactNode;
  activeTab?: LegalTab;
  onTabChange?: (tab: LegalTab) => void;
}

/**
 * 1. SHARED <LegalLayout> COMPONENT
 */
export const LegalLayout: React.FC<LegalLayoutProps> = ({
  title,
  documentId,
  lastUpdated,
  jurisdiction = 'NEW DELHI, REPUBLIC OF INDIA',
  onBackHome,
  children,
  activeTab,
  onTabChange,
}) => {
  const [copiedDoc, setCopiedDoc] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedDoc(true);
      setTimeout(() => setCopiedDoc(false), 2000);
    }
  };

  return (
    <div id="anon-legal-root" className="min-h-screen bg-black text-white font-sans antialiased selection:bg-white selection:text-black">
      <header id="anon-top-bar" className="w-full border-b border-neutral-800 text-[10px] uppercase tracking-[0.25em] text-neutral-400">
        <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <span className="font-bold text-white tracking-[0.35em]">ANON.</span>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <span className="hidden sm:inline">LEGAL COMPLIANCE ARCHIVE</span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="hidden md:inline font-mono">CODE: {documentId}</span>
            <span className="hidden md:inline text-neutral-600">|</span>
            <span className="text-neutral-300">RAZORPAY VERIFIED</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 sm:px-8 py-16 md:py-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12 border-b border-neutral-800">
          <button
            id="back-to-home-btn"
            onClick={onBackHome}
            type="button"
            className="group inline-flex items-center text-xs uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer w-fit"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            <span>Return to Index</span>
          </button>

          <div className="flex items-center gap-3 text-xs tracking-wider">
            <button
              id="copy-link-btn"
              onClick={handleCopyLink}
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-neutral-800 hover:border-neutral-500 bg-neutral-950 text-neutral-300 hover:text-white text-[11px] uppercase tracking-[0.15em] transition-colors rounded-none cursor-pointer"
              title="Copy Page Link"
            >
              {copiedDoc ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5 text-white" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  <span>Share URL</span>
                </>
              )}
            </button>

            <button
              id="print-btn"
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center px-3 py-1.5 border border-neutral-800 hover:border-neutral-500 bg-neutral-950 text-neutral-300 hover:text-white text-[11px] uppercase tracking-[0.15em] transition-colors rounded-none cursor-pointer"
              title="Print Document"
            >
              <Printer className="w-3.5 h-3.5 mr-1.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {onTabChange && (
          <nav id="legal-tabs-nav" aria-label="Legal Documents" className="pt-8 pb-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-neutral-800 bg-black">
              <button
                id="tab-privacy-btn"
                type="button"
                onClick={() => onTabChange('privacy')}
                className={`py-3.5 px-4 text-left text-xs uppercase tracking-[0.2em] font-medium transition-all duration-150 rounded-none cursor-pointer border-b sm:border-b-0 sm:border-r border-neutral-800 ${
                  activeTab === 'privacy'
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>01. Privacy</span>
                  {activeTab === 'privacy' && <span className="text-[9px] font-mono tracking-normal">ACTIVE</span>}
                </div>
              </button>

              <button
                id="tab-terms-btn"
                type="button"
                onClick={() => onTabChange('terms')}
                className={`py-3.5 px-4 text-left text-xs uppercase tracking-[0.2em] font-medium transition-all duration-150 rounded-none cursor-pointer border-b sm:border-b-0 sm:border-r border-neutral-800 ${
                  activeTab === 'terms'
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>02. Terms</span>
                  {activeTab === 'terms' && <span className="text-[9px] font-mono tracking-normal">ACTIVE</span>}
                </div>
              </button>

              <button
                id="tab-refund-btn"
                type="button"
                onClick={() => onTabChange('refund')}
                className={`py-3.5 px-4 text-left text-xs uppercase tracking-[0.2em] font-medium transition-all duration-150 rounded-none cursor-pointer ${
                  activeTab === 'refund'
                    ? 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-950'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>03. Refund & Shipping</span>
                  {activeTab === 'refund' && <span className="text-[9px] font-mono tracking-normal">ACTIVE</span>}
                </div>
              </button>
            </div>
          </nav>
        )}

        <header className="mb-14 pt-4">
          <div className="inline-block mb-3 px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase">
            Official E-Commerce Disclosure • India
          </div>
          <h1 
            id="legal-page-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white font-display leading-[1.05]"
          >
            {title}
          </h1>

          <div className="mt-6 pt-4 border-t border-neutral-900 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs text-neutral-400 font-mono">
            <div>
              <span className="text-neutral-600 uppercase tracking-wider">Effective:</span>{' '}
              <span className="text-neutral-300">{lastUpdated}</span>
            </div>
            <div>
              <span className="text-neutral-600 uppercase tracking-wider">Jurisdiction:</span>{' '}
              <span className="text-neutral-300">{jurisdiction}</span>
            </div>
            <div>
              <span className="text-neutral-600 uppercase tracking-wider">Entity:</span>{' '}
              <span className="text-neutral-300">ANON APPAREL PVT LTD</span>
            </div>
          </div>
        </header>

        <article className="prose prose-invert max-w-none text-neutral-300 leading-relaxed font-sans text-[15px] sm:text-base">
          {children}
        </article>

        <footer className="mt-20 pt-10 border-t border-neutral-800 text-xs text-neutral-400 space-y-6">
          <div className="p-5 border border-neutral-800 bg-neutral-950 space-y-3">
            <div className="flex items-center space-x-2 text-white font-medium uppercase tracking-wider text-[11px]">
              <Building2 className="w-4 h-4 text-neutral-400" />
              <span>Registered Corporate Entity & Nodal Contact (India)</span>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              <strong>ANON APPEREAL PRIVATE LIMITED</strong><br />
              Plot No. 1282, kailash Industrial Area Phase-I, Chhatisgarh, 490042, India.<br />
              Corporate Identity Number (CIN): U18101DL2024PTC987654<br />
              GSTIN: 07AAACA9876Q1Z2<br />
              Nodal / Grievance Officer: Raghav Mehra | Email:{' '}
              <a href="mailto:grievance@anon.in" className="text-white underline underline-offset-4 hover:text-neutral-300">
                grievance@anon.in
              </a>
            </p>
            <p className="text-[11px] text-neutral-400">
              Compliant with Section 5(9) of Consumer Protection (E-Commerce) Rules, 2020 and Information Technology Act, 2000.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] uppercase tracking-widest text-neutral-400">
            <div>© {new Date().getFullYear()} ANON. ALL RIGHTS RESERVED.</div>
            <div className="flex items-center space-x-4">
              <span>SECURED VIA RAZORPAY 256-BIT SSL</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export const PrivacyPolicy: React.FC = () => {
  return (
    <div id="privacy-policy-body" className="space-y-12">
      <section className="space-y-4">
        <p className="text-white font-medium text-lg leading-relaxed">
          At ANON (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;, operated by ANON Apparel Private Limited), we operate an invite-first, archival apparel release model. We recognize the uncompromising importance of digital privacy and data sovereignty.
        </p>
        <p className="text-neutral-300">
          This Privacy Policy outlines how your personal data is collected, utilized, encrypted, and shared when you visit, browse, or initiate a transaction on <span className="text-white font-mono">anon.in</span> (the &quot;Platform&quot;), in strict compliance with the <strong>Digital Personal Data Protection Act, 2023 (India)</strong> and the <strong>Information Technology Rules, 2011</strong>.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-neutral-900">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display flex items-center">
          <span className="text-neutral-600 font-mono text-sm mr-3">01.</span>
          Email-First Architecture & Data Collected
        </h2>
        <p className="text-neutral-300">
          ANON prioritizes minimal data footprinting. We employ an <strong>email-first approach</strong> for authentication and transactional integrity, eliminating unneeded third-party tracking profilers.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-neutral-300 marker:text-neutral-500">
          <li>
            <strong className="text-white">Direct Customer Data:</strong> Electronic mail address (used for drop announcements, magic sign-in links, and tax invoices), full recipient name, physical shipping address with PIN code, and mobile phone number (mandatory under Indian courier regulations for delivery PIN OTP verification).
          </li>
          <li>
            <strong className="text-white">Log & Telemetry Data:</strong> Public IP address, browser build identifier, timestamp of access, localized time zone, and referring URL paths.
          </li>
          <li>
            <strong className="text-white">Exclusion of Payment Credentials:</strong> ANON <em>never</em> captures, logs, or stores full debit/credit card numbers, CVV cryptograms, or UPI PINs on our servers. All transactional credentialing is offloaded directly to PCI-DSS certified payment orchestrators.
          </li>
        </ul>
      </section>

      <section className="space-y-4 pt-6 border-t border-neutral-900">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display flex items-center">
          <span className="text-neutral-600 font-mono text-sm mr-3">02.</span>
          Payment Processing & Razorpay Compliance
        </h2>
        <p className="text-neutral-300">
          All financial transactions on our Platform are routed through <strong>Razorpay Software Private Limited</strong>.
        </p>
        <div className="p-4 border border-neutral-800 bg-neutral-950 font-mono text-xs text-neutral-300 space-y-2">
          <p className="text-white uppercase font-bold tracking-wider">[PAYMENT TOKENIZATION PROTOCOL]</p>
          <p>
            Your payment instrument details are tokenized in compliance with the Reserve Bank of India (RBI) circular on Card-on-File Tokenisation (CoFT). Your raw financial identifiers reside strictly within Razorpay&apos;s Level 1 PCI-DSS vault.
          </p>
        </div>
      </section>

      <section className="space-y-4 pt-6 border-t border-neutral-900">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display flex items-center">
          <span className="text-neutral-600 font-mono text-sm mr-3">03.</span>
          Cookies & Minimal Trackers
        </h2>
        <p className="text-neutral-300">
          We use strictly necessary technical cookies to maintain persistent bag states during limited-edition drops, enforce CSRF defense tokens, and analyze anonymous aggregated throughput.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-neutral-900">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display flex items-center">
          <span className="text-neutral-600 font-mono text-sm mr-3">04.</span>
          Third-Party Data Disclosures (Logistics & Tax)
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-neutral-300 marker:text-neutral-500">
          <li><strong className="text-white">Logistics & 3PL Partners:</strong> Secure transmission to courier partners (Delhivery, Blue Dart Express, Shiprocket) for physical door delivery and AWB generation.</li>
          <li><strong className="text-white">Communication Gateways:</strong> Automated transactional SMS/WhatsApp updates for tracking and OTP delivery verification.</li>
        </ul>
      </section>

      <section className="space-y-4 pt-6 border-t border-neutral-900">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display flex items-center">
          <span className="text-neutral-600 font-mono text-sm mr-3">05.</span>
          Data Retention, Rights & Grievance Redressal
        </h2>
        <p className="text-neutral-300">
          You hold the unconditional right to request an extract of all personal information or mandate permanent erasure of your account registry by transmitting an email to <a href="mailto:privacy@anon.in" className="text-white underline">privacy@anon.in</a>.
        </p>
      </section>
    </div>
  );
};

export const TermsOfService: React.FC = () => {
  return (
    <div id="terms-of-service-body" className="space-y-12">
      <section className="space-y-4">
        <p className="text-white font-medium text-lg leading-relaxed">
          Welcome to ANON. These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Client&quot;, &quot;User&quot;) and ANON Studios Private Limited (&quot;ANON&quot;).
        </p>
        <p className="text-neutral-300">
          By accessing <span className="text-white font-mono">anon.in</span>, you acknowledge and agree to these Terms under the <strong>Indian Contract Act, 1872</strong> and <strong>Information Technology Act, 2000</strong>.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-neutral-900">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display flex items-center">
          <span className="text-neutral-600 font-mono text-sm mr-3">01.</span>
          User Accounts & Eligibility
        </h2>
        <p className="text-neutral-300">
          You must be at least 18 years of age or possess legal parental consent. You are responsible for maintaining the confidentiality of your account credentials.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-neutral-900">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display flex items-center">
          <span className="text-neutral-600 font-mono text-sm mr-3">02.</span>
          Pricing, GST Invoicing & Drop Availability
        </h2>
        <p className="text-neutral-300">
          All catalog prices are quoted in <strong>Indian Rupees (INR ₹)</strong> and include applicable <strong>GST</strong>. Allocating an item into your bag does not reserve stock during limited drops.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-neutral-900">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display flex items-center">
          <span className="text-neutral-600 font-mono text-sm mr-3">03.</span>
          Payment Gateway (Razorpay) Terms
        </h2>
        <p className="text-neutral-300">
          Supported modes include UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards (Visa, MasterCard, RuPay, Amex), and 50+ Netbanking options.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-neutral-900">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display flex items-center">
          <span className="text-neutral-600 font-mono text-sm mr-3">04.</span>
          Intellectual Property & Garment Design Rights
        </h2>
        <p className="text-neutral-300">
          All silhouettes, cuts, typographic prints, and branding are the exclusive IP of ANON Studios Private Limited.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-neutral-900">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display flex items-center">
          <span className="text-neutral-600 font-mono text-sm mr-3">05.</span>
          Modifications, Liability & Jurisdiction
        </h2>
        <p className="text-neutral-300">
          Governed exclusively by the laws of India, subject to the jurisdiction of competent courts in <strong>New Delhi, India</strong>.
        </p>
      </section>
    </div>
  );
};

export const RefundPolicy: React.FC = () => {
  return (
    <div id="refund-shipping-policy-body" className="space-y-12">
      <section className="space-y-4">
        <p className="text-white font-medium text-lg leading-relaxed">
          ANON builds heavyweight apparel engineered to endure. In alignment with Consumer Protection (E-Commerce) Rules 2020 and Razorpay compliance:
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-neutral-900">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display flex items-center">
          <span className="text-neutral-600 font-mono text-sm mr-3">01.</span>
          The 7-Day Return & Exchange Window
        </h2>
        <div className="p-5 border-2 border-white bg-black space-y-2">
          <div className="text-xs uppercase font-mono tracking-[0.25em] text-neutral-400">
            MANDATORY STATUTORY CLAUSE
          </div>
          <div className="text-lg font-bold text-white uppercase font-display">
            7 Calendar Days From Courier Delivery
          </div>
          <p className="text-sm text-neutral-300 leading-relaxed">
            We provide a strict <strong>7-day return or exchange window</strong> for unused, unworn, unwashed apparel with all original security tags, barcodes, and dust bags intact.
          </p>
        </div>
      </section>

      <section className="space-y-4 pt-6 border-t border-neutral-900">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display flex items-center">
          <span className="text-neutral-600 font-mono text-sm mr-3">02.</span>
          Refund Disbursals (Razorpay & COD)
        </h2>
        <p className="text-neutral-300">
          Prepaid order refunds are credited through Razorpay within 5–7 banking days. COD returns are refunded via Direct Bank Transfer (NEFT/IMPS) or UPI handle upon warehouse QC approval.
        </p>
      </section>

      <section className="space-y-4 pt-6 border-t border-neutral-900">
        <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display flex items-center">
          <span className="text-neutral-600 font-mono text-sm mr-3">03.</span>
          Dispatch Timelines & Cash on Delivery (COD)
        </h2>
        <p className="text-neutral-300">
          Orders dispatch within 24–48 hours. Transit takes 2–4 days in Tier-1 metros and 4–7 days pan-India. COD requires phone/WhatsApp OTP confirmation and incurs a non-refundable ₹99 handling fee.
        </p>
      </section>
    </div>
  );
};

// Yahan pe onBack as a prop add kar diya gaya hai
interface LegalPagesContainerProps {
  onBack?: () => void;
}

export const LegalPagesContainer: React.FC<LegalPagesContainerProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<LegalTab>('privacy');

  const docDetails: Record<LegalTab, { title: string; code: string; updated: string }> = {
    privacy: { title: 'Privacy Policy', code: 'ANON-LEG-PRV-2026', updated: 'FEBRUARY 24, 2026' },
    terms: { title: 'Terms of Service', code: 'ANON-LEG-TOS-2026', updated: 'JANUARY 15, 2026' },
    refund: { title: 'Refund & Shipping Policy', code: 'ANON-LEG-REF-2026', updated: 'FEBRUARY 18, 2026' },
  };

  const currentDoc = docDetails[activeTab];

  return (
    <LegalLayout
      title={currentDoc.title}
      documentId={currentDoc.code}
      lastUpdated={currentDoc.updated}
      jurisdiction="NEW DELHI, REPUBLIC OF INDIA"
      activeTab={activeTab}
      onTabChange={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      onBackHome={onBack} // <--- Pehle yahan alert hardcoded tha, ab yahan prop pass kar diya hai
    >
      {activeTab === 'privacy' && <PrivacyPolicy />}
      {activeTab === 'terms' && <TermsOfService />}
      {activeTab === 'refund' && <RefundPolicy />}
    </LegalLayout>
  );
};

export default LegalPagesContainer;