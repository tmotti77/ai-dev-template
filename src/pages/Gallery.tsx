import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { CtaSection } from "../components/CtaSection";
import { PageHeader } from "../components/PageHeader";
import { usePageMeta } from "../hooks/usePageMeta";
import { gallery } from "../content/gallery";
import { site } from "../content/site";

export default function Gallery() {
  usePageMeta(
    `גלריית עבודות | ${site.name}`,
    "תמונות מעבודות שיפוץ, גבס, צבע, התקנות והרכבות של חיים הנדימן.",
  );

  const [active, setActive] = useState<number | null>(null);

  // סגירת התמונה המוגדלת במקש Escape
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <PageHeader title="גלריית עבודות" subtitle="מבחר עבודות שבוצעו עבור לקוחות פרטיים ועסקיים." />

      <section className="mx-auto max-w-6xl columns-1 gap-4 px-4 py-16 sm:columns-2 lg:columns-3">
        {gallery.map((g, i) => (
          <button
            key={g.title}
            onClick={() => setActive(i)}
            className="group relative mb-4 block w-full overflow-hidden rounded-2xl"
          >
            <img
              src={g.src}
              alt={g.title}
              loading="lazy"
              className="w-full transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-4 text-right font-bold text-ink-foreground">
              {g.title}
            </span>
          </button>
        ))}
      </section>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={gallery[active].title}
        >
          <button className="absolute top-4 right-4 text-ink-foreground" aria-label="סגור">
            <X className="h-8 w-8" />
          </button>
          <img
            src={gallery[active].src}
            alt={gallery[active].title}
            className="max-h-[85vh] rounded-2xl"
          />
        </div>
      )}

      <CtaSection />
    </>
  );
}
