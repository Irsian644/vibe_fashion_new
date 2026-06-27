import { StarRating } from "./StarRating";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const testimonials = [
  {
    quote:
      "Ordered the MK crossbody through their DMs and it arrived in two days, exactly as pictured. 100% authentic — I'm obsessed.",
    name: "Elira K.",
    location: "Prishtinë",
  },
  {
    quote:
      "The aviator jacket is even better in person. The shearling is so soft and the fit is perfectly oversized. My new winter staple.",
    name: "Donjeta M.",
    location: "Tiranë",
  },
  {
    quote:
      "Such a smooth experience — they helped me pick the right size over Instagram. The beige saddle bag goes with literally everything.",
    name: "Sara H.",
    location: "Shkup",
  },
];

export function Testimonials() {
  return (
    <section aria-label="Customer reviews" className="bg-ink py-20 text-cream">
      <div className="container-luxe">
        <Reveal className="mb-12 text-center">
          <p className="eyebrow mb-2 text-gold-soft">Loved by 2,000+ customers</p>
          <h2 className="h-display text-4xl sm:text-5xl">The Vibe community</h2>
        </Reveal>

        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem
              key={t.name}
              className="flex flex-col rounded-2xl border border-cream/10 bg-charcoal/40 p-7"
            >
              <StarRating rating={5} size="md" />
              <p className="mt-4 flex-1 font-serif text-xl leading-relaxed text-cream/90">
                “{t.quote}”
              </p>
              <p className="mt-5 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="text-cream/50"> · {t.location}</span>
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
