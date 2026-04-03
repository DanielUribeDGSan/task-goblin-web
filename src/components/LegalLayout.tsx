"use client";

import React from "react";
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";
import { Languages, ArrowLeft } from "lucide-react";
import { FloatingChat } from "./FloatingChat";

import { PrivacyPolicyContent, UserAgreementContent } from "./LegalTexts";

interface LegalLayoutProps {
  children?: React.ReactNode;
  type?: "privacy" | "agreement";
  title: { en: string; es: string };
  lastUpdated: { en: string; es: string };
}

export const LegalLayout = ({ children, type, title, lastUpdated }: LegalLayoutProps) => {
  return (
    <LanguageProvider>
      <LegalContent type={type} title={title} lastUpdated={lastUpdated}>
        {children}
      </LegalContent>
    </LanguageProvider>
  );
};

const LegalContent = ({ children, type, title, lastUpdated }: LegalLayoutProps) => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 font-sans relative pb-20">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-100 flex items-center gap-2">
        <Languages size={18} className="text-white/40" />
        <div className="flex rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setLang("es")}
            className={`px-3 py-1.5 text-xs font-bold transition-all ${
              lang === "es"
                ? "bg-white text-black"
                : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            ES
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`px-3 py-1.5 text-xs font-bold transition-all ${
              lang === "en"
                ? "bg-white text-black"
                : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            EN
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 pt-20">
        <header className="mb-16">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8 group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            {lang === "es" ? "Volver al inicio" : "Back to home"}
          </a>
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white to-purple-400 bg-clip-text text-transparent">
            {lang === "es" ? title.es : title.en}
          </h1>
          <p className="text-gray-400 mt-4">
            {lang === "es" ? "Última actualización: " : "Last updated: "}
            {lang === "es" ? lastUpdated.es : lastUpdated.en}
          </p>
        </header>

        <div className="space-y-12 text-gray-300 leading-relaxed">
          {type === "privacy" && <PrivacyPolicyContent lang={lang} />}
          {type === "agreement" && <UserAgreementContent lang={lang} />}
          {children}
        </div>
      </main>

      <FloatingChat />

      <style dangerouslySetInnerHTML={{ __html: `
        body {
          background-color: #000 !important;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(91, 81, 141, 0.15), transparent 50%), 
            radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1), transparent 50%) !important;
          background-attachment: fixed;
        }
      `}} />
    </div>
  );
};
