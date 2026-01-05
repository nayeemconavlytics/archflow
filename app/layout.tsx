import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import ScrollProgress from "../components/ScrollProgress";
import ScrollToTop from "../components/ScrollToTop";
import ThreeBackground from "../components/ThreeBackground";

export const metadata = {
  title: "ArchFlow — Architecture-Led Engineering",
  description:
    "ArchFlow builds scalable software systems, automation platforms, and modern digital products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        

        {/* UI Layers */}
        <Cursor />
        <ScrollProgress />
        

        {children}

        <Footer />
        <ScrollToTop />
        <div id="shockwave" />
<div id="wave-container" />

      </body>
    </html>
  );
}
