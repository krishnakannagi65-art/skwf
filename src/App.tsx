import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { LanguageProvider } from "@/context/LanguageContext";
import { useRoute } from "@/lib/router";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { CustomBuilderPage } from "@/pages/CustomBuilderPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { HomePage } from "@/pages/HomePage";
import { MadeForHomePage } from "@/pages/MadeForHomePage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { RoomDesignerPage } from "@/pages/RoomDesignerPage";
import { ShowroomPage } from "@/pages/ShowroomPage";
import { WoodLibraryPage } from "@/pages/WoodLibraryPage";
import type { Route } from "@/types";

function renderPage(route: Route) {
  switch (route.name) {
    case "home":
      return <HomePage />;
    case "showroom":
      return <ShowroomPage />;
    case "product":
      return <ProductDetailPage slug={route.slug} />;
    case "custom-builder":
      return <CustomBuilderPage />;
    case "room-designer":
      return <RoomDesignerPage />;
    case "wood-library":
      return <WoodLibraryPage />;
    case "gallery":
      return <GalleryPage />;
    case "made-for-home":
      return <MadeForHomePage />;
    case "contact":
      return <ContactPage />;
    case "about":
      return <AboutPage />;
    default:
      return <HomePage />;
  }
}

function AppContent() {
  const route = useRoute();
  return (
    <div className="min-h-screen flex flex-col bg-wood-50">
      <Header />
      <main className="flex-1">{renderPage(route)}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
