import { Link } from "react-router";
import logo from "../assets/logo.png";
import { navLinks, site } from "../content/site";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="tool-stripe h-2" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="h-12 w-12 rounded-lg bg-ink-foreground p-1" />
            <span className="font-display text-xl font-bold">{site.brand}</span>
          </div>
          <p className="mt-3 opacity-75">{site.tagline}</p>
        </div>

        <div>
          <h3 className="mb-3 font-bold">ניווט</h3>
          <ul className="space-y-2 opacity-80">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-bold">יצירת קשר</h3>
          <p className="opacity-80">
            <a href={`tel:${site.phone}`}>{site.phone}</a>
          </p>
          <p className="opacity-80">
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </div>
      <p className="pb-6 text-center text-sm opacity-60">
        © {new Date().getFullYear()} {site.name}. כל הזכויות שמורות.
      </p>
    </footer>
  );
}
