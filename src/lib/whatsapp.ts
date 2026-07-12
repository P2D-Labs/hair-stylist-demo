import { site } from "@/config/site";

/** Builds a wa.me deep link using the studio's number and a pre-filled message. */
export function getWhatsAppHref(message: string = site.contact.whatsappMessage): string {
  const digits = site.contact.phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
