/** הרצועה הכהה בראש כל דף פנימי */
export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <span className="inline-block h-2 w-16 rounded-full bg-primary" />
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-lg opacity-80">{subtitle}</p>
      </div>
    </section>
  );
}
