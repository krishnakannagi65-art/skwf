import { Outlet } from "react-router";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";
import { WhatsAppFloat } from "~/components/WhatsAppFloat";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-wood-50">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
