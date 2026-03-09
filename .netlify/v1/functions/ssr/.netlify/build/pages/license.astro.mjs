import { c as createAstro, d as createComponent, f as addAttribute, i as renderHead, j as renderComponent, r as renderTemplate } from '../chunks/astro/server_Dxp9Hdrt.mjs';
import 'piccolore';
import { jsxs, jsx } from 'react/jsx-runtime';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Search, Mail, CheckCircle, Copy, AlertCircle } from 'lucide-react';
import { u as useLanguage } from '../chunks/LanguageContext_Dlz_OKNW.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const LicenseViewer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("search");
  const [errorMessage, setErrorMessage] = useState("");
  const [licenseKeys, setLicenseKeys] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
      performSearch(emailParam);
    }
  }, []);
  const performSearch = async (targetEmail) => {
    setStep("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/get-license", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: targetEmail })
      });
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(t.licensePage.errorNotFound);
        }
        throw new Error(t.licensePage.errorGeneric);
      }
      const data = await response.json();
      setLicenseKeys(data.licenseKeys || []);
      setStep("success");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || t.licensePage.errorGeneric);
      setStep("error");
    }
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!email) return;
    await performSearch(email);
  };
  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 3e3);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md mx-auto", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "glass rounded-3xl overflow-hidden border border-white/10 p-6 md:p-8 relative",
        children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/",
              className: "absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors",
              title: t.licensePage.backToHome,
              children: /* @__PURE__ */ jsx(Home, { size: 18 })
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "text-center space-y-2 mt-4 mb-8", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl glass flex items-center justify-center text-brand-cyan mx-auto mb-4", children: /* @__PURE__ */ jsx(Search, { size: 24 }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: t.licensePage.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sh-text-muted text-sm px-4", children: t.licensePage.subtitle })
          ] }),
          /* @__PURE__ */ jsxs(AnimatePresence, { mode: "wait", children: [
            step === "search" && /* @__PURE__ */ jsxs(
              motion.form,
              {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 20 },
                onSubmit: handleSearch,
                className: "space-y-4",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-white/80", children: t.licensePage.emailLabel }),
                    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-white/40", size: 18 }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          id: "email",
                          type: "email",
                          required: true,
                          value: email,
                          onChange: (e) => setEmail(e.target.value),
                          placeholder: t.licensePage.emailPlaceholder,
                          className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan transition-all"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "submit",
                      disabled: !email.includes("@"),
                      className: "w-full bg-brand-cyan hover:bg-brand-cyan/90 text-black font-bold rounded-xl py-3.5 px-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx(Search, { size: 18 }),
                        t.licensePage.searchButton
                      ]
                    }
                  )
                ]
              },
              "search-form"
            ),
            step === "loading" && /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                className: "py-12 flex flex-col items-center justify-center space-y-4",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 border-4 border-white/10 border-t-brand-cyan rounded-full animate-spin" }),
                  /* @__PURE__ */ jsx("p", { className: "text-white/70 font-medium", children: t.licensePage.searching })
                ]
              },
              "loading"
            ),
            step === "success" && /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.95 },
                className: "space-y-6",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "glass bg-black/20 border border-white/5 rounded-2xl p-4 space-y-4 relative overflow-hidden", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-blue-500 opacity-50" }),
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pb-2 border-b border-white/10", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-sm text-white/60", children: t.licensePage.emailLabel }),
                      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-white max-w-[200px] truncate", title: email, children: email })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-sm text-brand-cyan/80 font-medium block", children: licenseKeys.length > 1 ? t.licensePage.licenseKeyLabel + " (" + licenseKeys.length + ")" : t.licensePage.licenseKeyLabel }),
                      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar", children: licenseKeys.map((key, i) => /* @__PURE__ */ jsxs("div", { className: "flex bg-black/40 rounded-xl border border-white/10 items-center justify-between group overflow-hidden", children: [
                        /* @__PURE__ */ jsx("code", { className: "px-4 py-3 text-sm text-white/90 font-mono tracking-wider truncate w-full", children: key }),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: () => copyToClipboard(key, i),
                            className: "px-4 py-3 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors border-l border-white/10 flex items-center justify-center shrink-0",
                            title: "Copy",
                            children: copiedIndex === i ? /* @__PURE__ */ jsx(CheckCircle, { size: 18, className: "text-green-400" }) : /* @__PURE__ */ jsx(Copy, { size: 18 })
                          }
                        )
                      ] }, key)) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "glass bg-white/5 rounded-xl p-4 text-sm", children: [
                    /* @__PURE__ */ jsxs("h4", { className: "font-semibold text-white/90 mb-2 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(AlertCircle, { size: 16, className: "text-brand-cyan" }),
                      t.licensePage.instructionHeading
                    ] }),
                    /* @__PURE__ */ jsxs("ul", { className: "list-disc list-inside text-white/70 space-y-1 text-xs", children: [
                      /* @__PURE__ */ jsx("li", { children: t.licensePage.instruction1 }),
                      /* @__PURE__ */ jsx("li", { children: t.licensePage.instruction2 })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setStep("search"),
                      className: "w-full glass hover:bg-white/10 text-white font-medium rounded-xl py-3 transition-colors text-sm",
                      children: t.licensePage.searchButton
                    }
                  )
                ]
              },
              "success"
            ),
            step === "error" && /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.95 },
                className: "text-center space-y-4 py-4",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full glass flex items-center justify-center text-red-400 mx-auto mb-4", children: /* @__PURE__ */ jsx(AlertCircle, { size: 32 }) }),
                  /* @__PURE__ */ jsx("p", { className: "text-red-400 text-sm glass bg-red-500/10 border-red-500/20 p-4 rounded-xl", children: errorMessage }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setStep("search"),
                      className: "mt-6 w-full glass hover:bg-white/10 text-white font-medium rounded-xl py-3 transition-colors",
                      children: t.licensePage.searchButton
                    }
                  )
                ]
              },
              "error"
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: copiedIndex !== null && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 50, x: "-50%" },
        animate: { opacity: 1, y: 0, x: "-50%" },
        exit: { opacity: 0, y: 20, x: "-50%" },
        className: "fixed bottom-8 left-1/2 glass border border-green-500/30 bg-green-500/10 text-white px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg z-50 text-sm font-medium",
        children: [
          /* @__PURE__ */ jsx(CheckCircle, { size: 18, className: "text-green-400" }),
          t.licensePage.licenseCopied
        ]
      }
    ) })
  ] });
};

const $$Astro = createAstro("https://task-goblin.com");
const $$License = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$License;
  const title = "License Recovery | Task Goblin";
  const description = "Recover your Task Goblin license key using your purchased email address.";
  const canonical = new URL(Astro2.url.pathname, Astro2.site).toString();
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/icon/TaskGoblin.png"><link rel="icon" href="/icon/TaskGoblin.png"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- SEO --><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonical, "href")}><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="antialiased font-sans bg-black"> <main class="min-h-screen bg-[#060606] relative overflow-hidden flex items-center justify-center p-4"> <div class="absolute inset-0 z-0"> <div class="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-brand-cyan/10 rounded-full blur-[120px] mix-blend-screen animate-blob"></div> <div class="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000"></div> </div> <div class="z-10 w-full relative"> ${renderComponent($$result, "LicenseViewer", LicenseViewer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/src/components/LicenseViewer", "client:component-export": "LicenseViewer" })} </div> </main> </body></html>`;
}, "/Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/src/pages/license.astro", void 0);

const $$file = "/Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/src/pages/license.astro";
const $$url = "/license";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$License,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
