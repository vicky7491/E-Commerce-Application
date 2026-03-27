const SITEMAP_URL = encodeURIComponent("https://beautifulmolds.com/sitemap.xml");

await fetch(`https://www.google.com/ping?sitemap=${SITEMAP_URL}`);
