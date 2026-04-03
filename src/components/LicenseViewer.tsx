import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, CheckCircle, AlertCircle, Home, Mail, Search } from "lucide-react";
import { useLanguage, LanguageProvider } from "../contexts/LanguageContext";

export const LicenseViewer: React.FC = () => {
    const { t } = useLanguage();
    const [email, setEmail] = useState("");
    const [paymentId, setPaymentId] = useState("");
    const [step, setStep] = useState<"search" | "loading" | "success" | "error" | "checkout-success">("search");
    const [errorMessage, setErrorMessage] = useState("");
    const [licenseKeys, setLicenseKeys] = useState<{ key: string; app: string }[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    React.useEffect(() => {
        const params = new URLSearchParams(globalThis.location.search);
        const emailParam = params.get("email");
        const statusParam = params.get("status");
        const paymentIdParam = params.get("payment_id") || params.get("collection_id");

        if (paymentIdParam) {
            setPaymentId(paymentIdParam);
        }

        if (statusParam === "approved") {
            setStep("checkout-success");
            // User will enter email to "associate/confirm" and view license
        } else if (emailParam) {
            setEmail(emailParam);
            performSearch(emailParam);
        }
    }, []);

    const performSearch = async (targetEmail: string, targetPaymentId?: string) => {
        setStep("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/get-license", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    email: targetEmail || undefined, 
                    paymentId: targetPaymentId || paymentId || undefined 
                })
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
        } catch (error: any) {
            console.error(error);
            setErrorMessage(error.message || t.licensePage.errorGeneric);
            setStep("error");
        }
    };

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) return;
        await performSearch(email, paymentId);
    };

    const copyToClipboard = async (text: string, index: number) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 3000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto" style={{ viewTransitionName: 'license-card' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-3xl overflow-hidden border border-white/10 p-6 md:p-8 relative"
            >
                <button
                    onClick={() => window.location.href = '/'}
                    className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title={t.licensePage.backToHome}
                >
                    <Home size={18} />
                </button>

                <div className="text-center space-y-2 mt-4 mb-8">
                    <div 
                        className="w-12 h-12 rounded-2xl glass flex items-center justify-center mx-auto mb-4"
                        style={{ color: '#5B518D' }}
                    >
                        <Search size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                        {step === "checkout-success" ? t.licensePage.checkoutSuccessTitle : t.licensePage.title}
                    </h2>
                    <p className="text-sh-text-muted text-sm px-4">
                        {step === "checkout-success" ? t.licensePage.checkoutSuccessSubtitle : t.licensePage.subtitle}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {(step === "search" || step === "checkout-success") && (
                        <motion.form
                            key={step}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleSearch}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-white/80">
                                    {t.licensePage.emailLabel}
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={t.licensePage.emailPlaceholder}
                                        className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 transition-all"
                                        style={{ focusRingColor: '#5B518D50', focusBorderColor: '#5B518D' } as any}
                                    />
                                </div>
                            </div>

                                <button
                                    type="submit"
                                    disabled={!email.includes('@')}
                                    className="w-full text-black font-bold rounded-xl py-3.5 px-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2"
                                    style={{ backgroundColor: '#5B518D' }}
                                >
                                {step === "checkout-success" ? <CheckCircle size={18} /> : <Search size={18} />}
                                {step === "checkout-success" ? t.licensePage.associateButton : t.licensePage.searchButton}
                            </button>
                        </motion.form>
                    )}

                    {step === "loading" && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-12 flex flex-col items-center justify-center space-y-4"
                        >
                            <div 
                                className="w-10 h-10 border-4 border-white/10 rounded-full animate-spin" 
                                style={{ borderTopColor: '#5B518D' }}
                            />
                            <p className="text-white/70 font-medium">{t.licensePage.searching}</p>
                        </motion.div>
                    )}

                    {step === "success" && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-6"
                        >
                            <div className="glass bg-black/20 border border-white/5 rounded-2xl p-4 space-y-4 relative overflow-hidden">
                                {/* Decorative accent */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-cyan to-blue-500 opacity-50"></div>

                                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                                    <span className="text-sm text-white/60">{t.licensePage.emailLabel}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-white max-w-[150px] truncate" title={email}>{email}</span>
                                        <button 
                                            onClick={() => copyToClipboard(email, -1)}
                                            className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                                            title="Copy Email"
                                        >
                                            {copiedIndex === -1 ? <CheckCircle size={14} className="text-green-400" /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <span 
                                        className="text-sm font-medium block"
                                        style={{ color: '#5B518D' }}
                                    >
                                        {licenseKeys.length > 1 ? t.licensePage.licenseKeyLabel + " (" + licenseKeys.length + ")" : t.licensePage.licenseKeyLabel}
                                    </span>

                                    <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                                        {licenseKeys.map((item, i) => (
                                            <div key={item.key} className="flex bg-black/40 rounded-xl border border-white/10 items-center justify-between group overflow-hidden">
                                                <div className="flex flex-col py-3 px-4 min-w-0 flex-1">
                                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5B518D] mb-1">
                                                        {item.app.replace('-', ' ')}
                                                    </span>
                                                    <code className="text-sm text-white/90 font-mono tracking-wider truncate">
                                                        {item.key}
                                                    </code>
                                                </div>
                                                <button
                                                    onClick={() => copyToClipboard(item.key, i)}
                                                    className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors border-l border-white/10 flex items-center justify-center shrink-0 self-stretch"
                                                    title="Copy"
                                                >
                                                    {copiedIndex === i ? <CheckCircle size={18} className="text-green-400" /> : <Copy size={18} />}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="glass bg-white/5 rounded-xl p-4 text-sm">
                                <h4 className="font-semibold text-white/90 mb-2 flex items-center gap-2">
                                    <AlertCircle size={16} style={{ color: '#5B518D' }} />
                                    {t.licensePage.instructionHeading}
                                </h4>
                                <ul className="list-disc list-inside text-white/70 space-y-1 text-xs">
                                    <li>{t.licensePage.instruction1}</li>
                                    <li>{t.licensePage.instruction2}</li>
                                </ul>
                            </div>

                            <button
                                onClick={() => setStep("search")}
                                className="w-full glass hover:bg-white/10 text-white font-medium rounded-xl py-3 transition-colors text-sm"
                            >
                                {t.licensePage.searchButton}
                            </button>
                        </motion.div>
                    )}

                    {step === "error" && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="text-center space-y-4 py-4"
                        >
                            <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-red-400 mx-auto mb-4">
                                <AlertCircle size={32} />
                            </div>
                            <p className="text-red-400 text-sm glass bg-red-500/10 border-red-500/20 p-4 rounded-xl">
                                {errorMessage}
                            </p>
                            <button
                                onClick={() => setStep("search")}
                                className="mt-6 w-full glass hover:bg-white/10 text-white font-medium rounded-xl py-3 transition-colors"
                            >
                                {t.licensePage.searchButton}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Toast for Copy Success */}
            <AnimatePresence>
                {copiedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 20, x: "-50%" }}
                        className="fixed bottom-8 left-1/2 glass border border-green-500/30 bg-green-500/10 text-white px-4 py-3 rounded-xl flex items-center gap-3 shadow-lg z-50 text-sm font-medium"
                    >
                        <CheckCircle size={18} className="text-green-400" />
                        {copiedIndex === -1 ? t.licensePage.emailCopied : t.licensePage.licenseCopied}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const LicenseApp: React.FC = () => {
    return (
        <LanguageProvider>
            <LicenseViewer />
        </LanguageProvider>
    );
};
