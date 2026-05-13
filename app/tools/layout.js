import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-omni-headline",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-omni-body",
  display: "swap",
});

export default function ToolsLayout({ children }) {
  return (
    <div className={`${plusJakarta.variable} ${inter.variable}`}>
      {children}
    </div>
  );
}
