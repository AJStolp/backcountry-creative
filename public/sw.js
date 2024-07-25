import { registerRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";

// Handle API routes
registerRoute(
  ({ url }) => url.pathname.startsWith("/api/"),
  new NetworkFirst()
);

// Optionally handle other routes or assets
