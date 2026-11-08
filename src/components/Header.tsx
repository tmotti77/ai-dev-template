import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, Phone, X } from "lucide-react";
import logo from "../assets/logo.png";
import { navLinks, site } from "../content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // סוגר את התפריט במובייל כשעוברים דף
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt={`לוגו ${site.name}`} className="h-11 w-11 object-contain" />
          <span className="font-display text-xl font-bold">{site.brand}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-foreground underline decoration-primary decoration-4 underline-offset-8"
                  : "font-medium text-muted-foreground hover:text-foreground"
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={`tel:${site.phone}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 font-semibold text-ink-foreground"
          >
            <Phone className="h-4 w-4" /> {site.phone}
          </a>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="תפריט"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-lg font-medium hover:bg-muted"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
