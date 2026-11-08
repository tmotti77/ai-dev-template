import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "../content/site";

/** כפתור וואטסאפ צף בפינה */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="וואטסאפ"
      className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-soft"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
