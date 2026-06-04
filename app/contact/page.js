import { permanentRedirect } from "next/navigation";

export const metadata = {
  robots: { index: false, follow: true },
};

/** Canonical contact URL lives at /contact-us. */
export default function ContactPage() {
  permanentRedirect("/contact-us");
}
