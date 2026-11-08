import { Link } from "react-router";
import { usePageMeta } from "../hooks/usePageMeta";
import { site } from "../content/site";

export default function NotFound() {
  usePageMeta(`הדף לא נמצא | ${site.name}`, "הדף שחיפשתם לא קיים.");

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">הדף לא נמצא</h2>
        <p className="mt-2 text-muted-foreground">הדף שחיפשתם לא קיים או שהועבר למקום אחר.</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"
        >
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
}
