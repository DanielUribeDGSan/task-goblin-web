import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, CreditCard } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { APP_CONFIG } from "../constants/config";

interface PaymentModalProps {
    isOpen: boolean;
    appType?: "task-goblin" | "nexo" | "floaty";
    onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, appType = "task-goblin", onClose }) => {
    const { t } = useLanguage();
    const [step, setStep] = useState<"email" | "processing" | "success" | "error">("email");
    const [errorMessage, setErrorMessage] = useState("");
    
    // Simple Mexico detection based on Timezone
    const isMexico = typeof Intl !== 'undefined' && Intl.DateTimeFormat().resolvedOptions().timeZone.includes("Mexico");

    const handleCheckout = async (gateway: "mercadopago" | "paypal") => {
        if (!APP_CONFIG.ENABLE_LICENSING) {
            alert(t.paymentModal.disabledMessage);
            return;
        }

        setStep("processing");

        try {
            const endpoint = gateway === "mercadopago" ? "/api/checkout/mercadopago" : "/api/checkout/paypal";
            
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    appType: appType,
                    isMexico: isMexico
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || t.paymentModal.errorMessage);
            }

            const checkoutData = await response.json();
            const checkoutUrl = checkoutData.url;

            if (checkoutUrl) {
                globalThis.location.href = checkoutUrl;
            } else {
                throw new Error("No checkout URL received from server.");
            }

        } catch (error: any) {
            console.error(error);
            setErrorMessage(error.message || t.paymentModal.errorMessage);
            setStep("error");
        }
    };

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-11000 flex items-center justify-center p-4 overflow-y-auto scrollbar-hide">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md z-10 my-auto"
                    >
                        <div className="glass rounded-3xl overflow-hidden border border-white/10 p-6 md:p-8 relative">
                            <button
                                type="button"
                                onClick={onClose}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer"
                                aria-label={t.paymentModal.closeButton}
                            >
                                <X size={18} />
                            </button>

                            {step === "email" && (
                                <div className="space-y-6">
                                    <div className="text-center space-y-2">
                                        <div 
                                            className="w-12 h-12 rounded-2xl glass flex items-center justify-center mx-auto mb-4"
                                            style={{ color: 'var(--sh-accent)' }}
                                        >
                                            <CreditCard size={24} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">{t.paymentModal.title}</h2>
                                        <p className="text-sh-text-muted text-sm px-4">
                                            {t.paymentModal.description}
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-xs font-semibold text-white/40 uppercase tracking-wider text-center">
                                            {t.paymentModal.selectPaymentMethod}
                                        </p>
                                        
                                        {isMexico && (
                                            <button
                                                onClick={() => handleCheckout("mercadopago")}
                                                className="w-full flex items-center justify-between bg-[#009EE3] hover:bg-[#0086c3] text-white font-bold rounded-2xl py-4 px-6 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
                                            >
                                                <div className="flex flex-col items-start">
                                                    <span className="text-sm opacity-80 font-medium">{t.paymentModal.mercadoPagoButton}</span>
                                                    <span className="text-[10px] uppercase tracking-tighter opacity-60">{t.paymentModal.mexicoNotice}</span>
                                                </div>
                                                <img src="https://http2.mlstatic.com/frontend-assets/mp-web-navigation/ui-navigation/5.34.0/mercadopago/logo__small.png" alt="MP" className="h-5" />
                                            </button>
                                        )}

                                        <button
                                            onClick={() => handleCheckout("paypal")}
                                            className="w-full flex items-center justify-between bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold rounded-2xl py-4 px-6 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                                        >
                                            <div className="flex flex-col items-start text-left">
                                                <span className="text-sm font-medium">{t.paymentModal.paypalButton}</span>
                                                <span className="text-[10px] uppercase tracking-tighter opacity-60">
                                                    PayPal {isMexico 
                                                        ? `${APP_CONFIG.PRODUCTS[appType].price} MXN` 
                                                        : `${APP_CONFIG.PRODUCTS[appType].priceUSD} USD`}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-xs font-black italic text-white/90">PayPal</span>
                                            </div>
                                        </button>
                                    </div>

                                    <div 
                                        className="glass rounded-2xl p-4 flex gap-3"
                                        style={{ backgroundColor: 'var(--sh-accent-muted)', borderColor: 'var(--sh-panel-border)' }}
                                    >
                                        <div className="shrink-0" style={{ color: 'var(--sh-accent)' }}>
                                            <AlertCircle size={20} />
                                        </div>
                                        <p className="text-xs text-white/70 leading-relaxed text-left">
                                            {APP_CONFIG.ENABLE_LICENSING ? t.paymentModal.emailWarning : t.paymentModal.disabledMessage}
                                        </p>
                                    </div>

                                    <p className="text-xs text-center text-white/20 mt-4 italic">
                                        Powered by Secure Payment Gateways
                                    </p>
                                </div>
                            )}

                            {step === "processing" && (
                                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                                    <div 
                                        className="w-10 h-10 border-4 border-white/10 rounded-full animate-spin" 
                                        style={{ borderTopColor: 'var(--sh-accent)' }}
                                    />
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
                                    <button
                                        onClick={onClose}
                                        className="mt-6 w-full glass hover:bg-white/10 text-white font-medium rounded-xl py-3 transition-colors cursor-pointer"
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
                                        className="mt-6 w-full glass hover:bg-white/10 text-white font-medium rounded-xl py-3 transition-colors cursor-pointer"
                                    >
                                        Volver a intentar
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    if (typeof document === "undefined") return null;
    return createPortal(modalContent, document.body);
};
