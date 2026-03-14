import { c as createAstro, d as createComponent, r as renderTemplate, u as unescapeHTML, j as renderComponent, i as renderHead, f as addAttribute } from '../chunks/astro/server_Dxp9Hdrt.mjs';
import 'piccolore';
import { D as Dashboard } from '../chunks/Dashboard_DHgwn3Ug.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://task-goblin.com");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const title = "Task Goblin \u2014 Automatiza tareas en Mac y Windows";
  const description = "Task Goblin es la app que automatiza tu d\xEDa a d\xEDa en Mac y Windows: mover el rat\xF3n (auto clicker), programar mensajes de WhatsApp, Screenshot to Text (OCR), apagado programado, cerrar todas las apps, convertir PDF a Word, extraer colores, y m\xE1s. Desc\xE1rgala ahora.";
  const ogImage = `${Astro2.site}/icon/TaskGoblin.png`;
  const canonical = new URL(Astro2.url.pathname, Astro2.site).toString();
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/icon/TaskGoblin.png"><link rel="icon" href="/icon/TaskGoblin.png"><meta name="viewport" content="width=device-width"><meta name="generator"', "><!-- SEO: Google, Bing (Edge), Safari --><title>", '</title><meta name="description"', '><meta name="keywords" content="Task Goblin, automatizaci\xF3n, Mac, Windows, app, mover rat\xF3n, WhatsApp programado, PDF a Word, extractor de colores, screenshot to text, utilidades, herramientas, auto clicker"><link rel="canonical" href="https://task-goblin.com/task-goblin-app"><!-- Open Graph (Facebook, Safari, muchos buscadores) --><meta property="og:type" content="website"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:url"', '><meta property="og:site_name" content="Task Goblin"><meta property="og:locale" content="es_ES"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Sitemap para buscadores --><link rel="sitemap" href="/sitemap-index.xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">', '</head> <body class="antialiased font-sans bg-black"> ', ' <!-- JSON-LD: ayuda a Google a mostrar la app en resultados (SoftwareApplication, WebSite, Organization) --> <script type="application/ld+json">', "<\/script> </body> </html>"])), addAttribute(Astro2.generator, "content"), title, addAttribute(description, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(canonical, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), renderHead(), renderComponent($$result, "Dashboard", Dashboard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/src/components/dashboard/Dashboard", "client:component-export": "Dashboard" }), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://task-goblin.com/#website",
        url: "https://task-goblin.com/",
        name: "Task Goblin",
        description,
        publisher: {
          "@type": "Organization",
          name: "Task Goblin",
          logo: {
            "@type": "ImageObject",
            url: ogImage
          }
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://task-goblin.com/#software",
        name: "Task Goblin",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "macOS, Windows",
        description,
        image: ogImage,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [
          "Auto mouse mover",
          "WhatsApp scheduler",
          "Screenshot to Text OCR",
          "Schedule shutdown",
          "Close all apps",
          "PDF to Word",
          "Color extractor"
        ]
      }
    ]
  })));
}, "/Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/src/pages/index.astro", void 0);

const $$file = "/Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
