import { permanentRedirect } from "next/navigation";

/** Canonical terms live at /terms-of-service — avoid duplicate thin/duplicate legal URLs. */
export default function TermsAndConditionsPage() {
  permanentRedirect("/terms-of-service");
}
