import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Noto+Sans+Tamil:wght@400;500;600&display=swap",
  },
];

// TODO: get the phone no from constants file and use it in meta description
// TODO: add favicon and og:image to public folder
export function meta({}: Route.MetaArgs) {
  return [
    {
      title:
        "Sri Krishna Wooden Furniture — Premium Handcrafted Furniture | Dharmapuri",
    },
    {
      name: "description",
      content:
        "Premium handcrafted teak, rosewood & custom furniture. Sofas, beds, dining sets, wardrobes, pooja temples & more. Call Manogaran: 8838233612",
    },
    {
      name: "keywords",
      content:
        "wooden furniture Dharmapuri, teak furniture Dharmapuri, rosewood furniture, custom furniture Dharmapuri, furniture shop Dharmapuri, Sri Krishna Wooden Furniture",
    },
    {
      name: "og:title",
      content:
        "Sri Krishna Wooden Furniture — Premium Handcrafted Furniture | Dharmapuri",
    },
    {
      name: "og:description",
      content:
        "Premium handcrafted teak, rosewood & custom wooden furniture in Dharmapuri. Custom furniture builder, virtual room designer & wood library.",
    },
    {
      name: "og:type",
      content: "website",
    },
    {
      name: "og:url",
      content: "https://srikrishnawoodenfurniture.com/",
    },
    {
      name: "og:image",
      content: "https://srikrishnawoodenfurniture.com/og_default.png",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:image",
      content: "https://srikrishnawoodenfurniture.com/og_default.png",
    },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
