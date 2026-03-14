import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tag, Lock, Apple, Smartphone } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useLayout } from "../contexts/LayoutContext";
import { PaymentModal } from "./PaymentModal";

// Constants from BottomBar
const PRICE_MXN = 249;
const PRICE_ORIGINAL_MXN = 299;
const PRICE_USD = 13;
const PRICE_ORIGINAL_USD = 16;

const WindowsIcon = ({ size = 24 }: { size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
    >
        <path d="M3 3h8.5v8.5H3V3zm0 9.5H11.5V21H3v-8.5zM12.5 3H21v8.5H12.5V3zm0 9.5H21V21h-8.5v-8.5z" />
    </svg>
);

export const PricingInfoModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const { t, lang } = useLanguage();
    const { isMobile } = useLayout();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const showUsd = lang === "en";

    return (
        <AnimatePresence>
            {isOpen && (
                <React.Fragment>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-9998"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-9999"
                    >
                        <div className="glass rounded-3xl overflow-hidden border border-white/10 p-6 md:p-8 relative">
                            <button
                                type="button"
                                onClick={onClose}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X size={18} />
                            </button>

                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center text-brand-cyan mx-auto mb-4">
                                    <Tag size={32} />
                                </div>
                                <h2 className="text-2xl font-bold text-white">{t.appName}</h2>
                                <p className="text-sh-text-muted text-sm px-4">
                                    {t.modalInfo.subtitle}
                                </p>

                                <div className="glass bg-white/5 border border-white/10 rounded-2xl p-6 my-6">
                                    {showUsd ? (
                                        <p className="text-3xl font-bold text-white">
                                            <span className="line-through text-sh-text-muted font-normal text-lg mr-2">
                                                ${PRICE_ORIGINAL_USD}
                                            </span>
                                            ${PRICE_USD} <span className="text-lg">USD</span>
                                        </p>
                                    ) : (
                                        <p className="text-3xl font-bold text-white">
                                            <span className="line-through text-sh-text-muted font-normal text-lg mr-2">
                                                ${PRICE_ORIGINAL_MXN}
                                            </span>
                                            ${PRICE_MXN} <span className="text-lg">MXN</span>
                                        </p>
                                    )}
                                    <p className="text-brand-cyan font-semibold mt-2 uppercase text-sm tracking-wider">
                                        {t.bottomBar.promotion}
                                    </p>
                                </div>

                                {isMobile ? (
                                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-start gap-3 text-left">
                                        <Smartphone size={24} className="text-brand-cyan shrink-0" />
                                        <p className="text-xs text-sh-text-muted leading-relaxed">
                                            {t.bottomBar.mobileDownloadNotice}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex justify-center gap-4 text-white/50 mb-6">
                                        <div className="flex flex-col items-center gap-1">
                                            <Apple size={24} />
                                            <span className="text-[10px]">{t.bottomBar.mac}</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            <WindowsIcon size={24} />
                                            <span className="text-[10px]">{t.bottomBar.windows}</span>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsPaymentModalOpen(true);
                                    }}
                                    className="w-full bg-brand-cyan hover:bg-brand-cyan/90 text-black font-bold rounded-xl py-3.5 px-4 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                                >
                                    <Lock size={18} />
                                    {t.bottomBar.obtainLicense}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </React.Fragment>
            )}

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
            />
        </AnimatePresence>
    );
};
