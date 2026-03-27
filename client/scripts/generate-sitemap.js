// scripts/generate-sitemap.js
import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL = "https://beautifulmolds.com";
const OUTPUT_PATH = resolve(__dirname, "../public/sitemap.xml");

// ─── Static routes ────────────────────────────────────────────────────────────
const STATIC_ROUTES = [
  { url: "/",        changefreq: "weekly",  priority: 1.0 },
  { url: "/shop/listing", changefreq: "weekly", priority: 0.8 },
  { url: "/shop/search", changefreq: "weekly", priority: 0.8 },
  { url: "/shop/faqs", changefreq: "monthly", priority: 0.6 },
  { url: "/shop/contactus", changefreq: "monthly", priority: 0.6 },
  { url: "/shop/aboutus", changefreq: "monthly", priority: 0.6 },
  { url: "/shop/shipping-delivery-policies", changefreq: "monthly", priority: 0.6 },
  { url: "/shop/privacy-policy", changefreq: "monthly", priority: 0.6 },
  { url: "/shop/terms-and-conditions", changefreq: "monthly", priority: 0.6 },
  { url: "/shop/testimonials", changefreq: "monthly", priority: 0.6 },
  { url: "/shop/CastingKit", changefreq: "monthly", priority: 0.6 },
  { url: "/unauth-page", changefreq: "monthly", priority: 0.3 }
];


// ─── Build and write sitemap ──────────────────────────────────────────────────
async function generateSitemap() {
  const allRoutes = [...STATIC_ROUTES];

  const stream = new SitemapStream({ hostname: BASE_URL });
  const writeStream = createWriteStream(OUTPUT_PATH);

  stream.pipe(writeStream);

  for (const route of allRoutes) {
    stream.write(route);
  }

  stream.end();

  await streamToPromise(stream);
}

generateSitemap().catch((err) => {
  console.error("❌ Sitemap generation failed:", err);
  process.exit(1);
});