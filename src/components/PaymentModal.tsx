import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, CreditCard, Mail } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { APP_CONFIG } from "../constants/config";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    const [email, setEmail] = useState("");
    const [step, setStep] = useState<"email" | "processing" | "success" | "error">("email");
    const [errorMessage, setErrorMessage] = useState("");

    // Placeholder for Lemon Squeezy Product/Variant ID
    const LEMON_VARIANT_ID = "1382179";

    useEffect(() => {
        // Load Lemon.js script dynamically
        const script = document.createElement("script");
        script.src = "https://app.lemonsqueezy.com/js/lemon.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!APP_CONFIG.ENABLE_LICENSING) {
            alert(t.paymentModal.disabledMessage);
            return;
        }
        if (!email) return;

        setStep("processing");

        try {
            // En un entorno de producción seguro, la creación del checkout se hace en un backend.
            // Como LemonSqueezy no permite procesar tarjetas de crédito directamente por API sin PCI Compliance,
            // la forma recomendada es generar un enlace de Checkout usando la API y abrirlo con Lemon.js.

            // API Call to Astro internal endpoint to handle backend request securely
            const response = await fetch("/api/create-checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    variantId: LEMON_VARIANT_ID
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || t.paymentModal.errorMessage);
            }

            const checkoutData = await response.json();
            const checkoutUrl = checkoutData.url;

            // Usar Lemon.js para abrir el modal de pago nativo de ellos
            // @ts-ignore
            if (window.LemonSqueezy) {
                // @ts-ignore
                window.LemonSqueezy.Url.Open(checkoutUrl);
                // Setup LemonSqueezy Event listener to detect successful payment
                // @ts-ignore
                window.LemonSqueezy.Setup({
                    eventHandler: (event: any) => {
                        if (event.event === "Checkout.Success") {
                            setStep("success");
                            // Registration in Supabase is handled by the backend Lemon Squeezy webhook now.
                        }
                    }
                });
            } else {
                // Fallback
                window.open(checkoutUrl, "_blank");
                setStep("email");
                alert("Se ha abierto el pago en una nueva pestaña. Por favor completa la compra y revisa tu correo.");
            }

        } catch (error: any) {
            console.error(error);
            setErrorMessage(error.message || t.paymentModal.errorMessage);
            setStep("error");
        }
    };



    return (
        <AnimatePresence>
            {isOpen && (
                <React.Fragment>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-[10000]"
                    >
                        <div className="glass rounded-3xl overflow-hidden border border-white/10 p-6 md:p-8 relative">
                            <button
                                type="button"
                                onClick={onClose}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                                aria-label={t.paymentModal.closeButton}
                            >
                                <X size={18} />
                            </button>

                            {step === "email" && (
                                <div className="space-y-6">
                                    <div className="text-center space-y-2">
                                        <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-brand-cyan mx-auto mb-4">
                                            <CreditCard size={24} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">{t.paymentModal.title}</h2>
                                        <p className="text-sh-text-muted text-sm px-4">
                                            {t.paymentModal.description}
                                        </p>
                                    </div>

                                    <div className="glass bg-brand-cyan/5 border border-brand-cyan/20 rounded-2xl p-4 flex gap-3">
                                        <div className="text-brand-cyan shrink-0">
                                            <AlertCircle size={20} />
                                        </div>
                                        <p className="text-xs text-white/70 leading-relaxed text-left">
                                            {APP_CONFIG.ENABLE_LICENSING ? t.paymentModal.emailWarning : t.paymentModal.disabledMessage}
                                        </p>
                                    </div>

                                    <form onSubmit={handleCheckout} className="space-y-4">
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="block text-sm font-medium text-white/80">
                                                {t.paymentModal.emailLabel}
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                                <input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder={t.paymentModal.emailPlaceholder}
                                                    className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan transition-all"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={!email.includes('@')}
                                            className="w-full bg-brand-cyan hover:bg-brand-cyan/90 text-black font-bold rounded-xl py-3.5 px-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            {t.paymentModal.checkoutButton}
                                        </button>

                                        <p className="text-xs text-center text-white/40 mt-4">
                                            Secured by Lemon Squeezy integration
                                        </p>
                                    </form>
                                </div>
                            )}

                            {step === "processing" && (
                                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                                    <div className="w-10 h-10 border-4 border-white/10 border-t-brand-cyan rounded-full animate-spin" />
                                    <p className="text-white/70 font-medium">{t.paymentModal.processing}</p>
                                </div>
                            )}

                            {step === "success" && (
                                <div className="text-center space-y-4 py-4">
                                    <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-green-400 mx-auto mb-6">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">{t.paymentModal.successTitle}</h2>
                                    <div className="glass bg-green-500/10 border-green-500/20 text-green-400 p-4 rounded-xl text-sm leading-relaxed">
                                        {t.paymentModal.successMessage}
                                    </div>
                                    <p className="text-sm text-sh-text-muted mt-6">
                                        Hemos enviado tu licencia a <strong className="text-white">{email}</strong>.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="mt-6 w-full glass hover:bg-white/10 text-white font-medium rounded-xl py-3 transition-colors"
                                    >
                                        {t.paymentModal.closeButton}
                                    </button>
                                </div>
                            )}

                            {step === "error" && (
                                <div className="text-center space-y-4 py-4">
                                    <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-red-400 mx-auto mb-6">
                                        <AlertCircle size={32} />
                                    </div>
                                    <h2 className="text-xl font-bold text-white">Error</h2>
                                    <p className="text-red-400 text-sm glass bg-red-500/10 border-red-500/20 p-4 rounded-xl">
                                        {errorMessage}
                                    </p>
                                    <button
                                        onClick={() => setStep("email")}
                                        className="mt-6 w-full glass hover:bg-white/10 text-white font-medium rounded-xl py-3 transition-colors"
                                    >
                                        Volver a intentar
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </React.Fragment>
            )}
        </AnimatePresence>
    );
};
