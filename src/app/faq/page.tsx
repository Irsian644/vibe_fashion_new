import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Accordion } from "@/components/Accordion";
import { InstagramOrderButton } from "@/components/InstagramOrderButton";

export const metadata: Metadata = {
  title: "FAQ — Shipping, Sizing, Returns",
  description:
    "Answers to common questions about ordering from Vibe Fashion: authenticity, sizing, shipping times, payment and returns.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    q: "Are your branded items authentic?",
    a: "Yes. Every Zara, Guess, Michael Kors and Puma piece is verified in person before it's listed. Items described as 'designer-inspired' are clearly labelled and are not branded originals.",
  },
  {
    q: "How do I place an order?",
    a: "Tap “Order via Instagram” on any product. We copy the item, colour and size to your clipboard and open our DMs — just paste and send, and we'll confirm availability, total and delivery in seconds.",
  },
  {
    q: "How does sizing work?",
    a: "Bags are one-size. For dresses, jackets and shoes we list the exact size available on each product. If you're between sizes, message us — we'll give honest fit advice.",
  },
  {
    q: "How long does shipping take?",
    a: `We ship within ${site.shipping.domestic} and regionally (${site.shipping.region}). Delivery time and shipping cost are confirmed when you order in our DMs.`,
  },
  {
    q: "How can I pay?",
    a: "We'll share payment options and details when we confirm your order in our Instagram DMs.",
  },
  {
    q: "What is your returns policy?",
    a: "Return unworn items with their tags attached. Just message us and we'll arrange it — see the full returns policy for details.",
  },
];

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <div className="container-luxe py-16">
        <div className="mx-auto max-w-3xl">
          <header className="mb-10 text-center">
            <p className="eyebrow mb-2">Help centre</p>
            <h1 className="h-display text-5xl text-ink sm:text-6xl">Questions, answered</h1>
          </header>

          <div id="sizing">
            <Accordion items={faqs.map((f) => ({ title: f.q, content: <p>{f.a}</p> }))} />
          </div>

          <div className="mt-12 rounded-2xl bg-sand/70 p-8 text-center">
            <h2 className="font-serif text-2xl text-ink">Still have a question?</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-stone">
              We&apos;re real people and we love a good chat. Message us and we&apos;ll help you find
              the perfect piece.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <InstagramOrderButton
                message={`Hi ${site.name}! I have a question.`}
                className="btn-instagram w-full sm:w-auto"
              >
                Ask on Instagram
              </InstagramOrderButton>
              <Link href="/contact" className="btn-outline w-full sm:w-auto">
                Other ways to reach us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
