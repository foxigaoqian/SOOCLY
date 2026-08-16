import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SOOCLY — Camera Looks",
    short_name: "SOOCLY",
    description: "Choose the Look before you shoot. Camera Looks made for your gear.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F5F2EA",
    theme_color: "#F5F2EA",
  };
}
