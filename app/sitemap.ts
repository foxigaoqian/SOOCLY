import type { MetadataRoute } from "next";
import { devices, looks } from "@/lib/demo-data";
import { SITE_INDEXABLE, SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_INDEXABLE) return [];

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/looks`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/cameras`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const lookRoutes: MetadataRoute.Sitemap = looks.map((look) => ({
    url: `${SITE_URL}/looks/${look.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const cameraRoutes: MetadataRoute.Sitemap = devices.map((device) => ({
    url: `${SITE_URL}/cameras/${device.brandSlug}/${device.modelSlug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...lookRoutes, ...cameraRoutes];
}
