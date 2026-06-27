import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  link,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  link?: { href: string; label: string };
  center?: boolean;
}) {
  return (
    <Reveal
      className={`flex items-end justify-between gap-6 ${center ? "flex-col text-center" : ""}`}
    >
      <div className={center ? "mx-auto" : ""}>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="h-display text-4xl text-ink sm:text-5xl">{title}</h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="group hidden shrink-0 items-center gap-1.5 text-sm font-medium uppercase tracking-[0.12em] text-ink sm:inline-flex"
        >
          {link.label}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </Reveal>
  );
}
