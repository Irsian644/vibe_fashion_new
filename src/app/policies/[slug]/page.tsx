import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { policies, policySlugs } from "@/lib/policies";
import { InstagramOrderButton } from "@/components/InstagramOrderButton";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return policySlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const policy = policies[params.slug];
  if (!policy) return { title: "Not found" };
  return {
    title: policy.title,
    description: policy.intro,
    alternates: { canonical: `/policies/${policy.slug}` },
  };
}

export default function PolicyPage({ params }: { params: { slug: string } }) {
  const policy = policies[params.slug];
  if (!policy) notFound();

  return (
    <div className="container-luxe py-16">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10">
          <p className="eyebrow mb-2">Policies</p>
          <h1 className="h-display text-5xl text-ink sm:text-6xl">{policy.title}</h1>
          <p className="mt-4 leading-relaxed text-stone">{policy.intro}</p>
        </header>

        <div className="space-y-10">
          {policy.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-serif text-2xl text-ink">{s.heading}</h2>
              <div className="mt-3 space-y-2.5 leading-relaxed text-charcoal">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-ink/10 pt-8">
          <InstagramOrderButton
            message={`Hi ${site.name}! I have a question about ${policy.title.toLowerCase()}.`}
            className="btn-instagram"
          >
            Ask a question
          </InstagramOrderButton>
          <Link href="/faq" className="link-underline text-sm text-charcoal">
            Read the FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
