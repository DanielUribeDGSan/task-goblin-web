import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tag, Lock, Apple, Smartphone, ChevronDown } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useLayout } from "../contexts/LayoutContext";
import { APP_CONFIG } from "../constants/config";
import { PaymentModal } from "./PaymentModal";

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

export const PricingInfoModal = ({ isOpen, onClose, appType = "task-goblin" }: { isOpen: boolean, onClose: () => void, appType?: "task-goblin" | "nexo" | "floaty" }) => {
    const { t, lang } = useLanguage();
    const { isMobile } = useLayout();
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);
    
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const actionButtonRef = useRef<HTMLButtonElement>(null);

    const isNexo = appType === "nexo";
    const isFloaty = appType === "floaty";
    
    const prices = isNexo ? {
        mxn: 149,
        originalMxn: 199,
        usd: 8,
        originalUsd: 11
    } : isFloaty ? {
        mxn: 99,
        originalMxn: 149,
        usd: 5,
        originalUsd: 8
    } : {
        mxn: 249,
        originalMxn: 299,
        usd: 13,
        originalUsd: 16
    };

    const showUsd = lang === "en";

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
            setCanScrollDown(scrollHeight - (scrollTop + clientHeight) > 20);
        }
    };

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(checkScroll, 100);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const scrollToActionButton = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    };

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <div className="absolute inset-0 overflow-y-auto scrollbar-hide pointer-events-none">
                        <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="pointer-events-auto w-full max-w-md relative"
                            >
                                <div 
                                    ref={scrollContainerRef}
                                    onScroll={checkScroll}
                                    className="glass rounded-3xl border border-white/10 p-6 md:p-8 relative"
                                >
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer"
                                    >
                                        <X size={18} />
                                    </button>

                                    <div className="text-center space-y-4">
                                        <div 
                                            className="w-16 h-16 rounded-2xl glass flex items-center justify-center mx-auto mb-4"
                                            style={{ color: 'var(--sh-accent)' }}
                                        >
                                            <Tag size={32} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">{isNexo ? t.nexoAppName : isFloaty ? t.floatyAppName : t.appName}</h2>
                                        <p className="text-sh-text-muted text-sm px-4">
                                            {t.modalInfo.subtitle}
                                        </p>

                                        <div className="glass bg-white/5 border border-white/10 rounded-2xl p-6 my-6">
                                            {showUsd ? (
                                                <p className="text-3xl font-bold text-white">
                                                    <span className="line-through text-sh-text-muted font-normal text-lg mr-2">
                                                        ${prices.originalUsd}
                                                    </span>
                                                    ${prices.usd} <span className="text-lg">USD</span>
                                                </p>
                                            ) : (
                                                <p className="text-3xl font-bold text-white">
                                                    <span className="line-through text-sh-text-muted font-normal text-lg mr-2">
                                                        ${prices.originalMxn}
                                                    </span>
                                                    ${prices.mxn} <span className="text-lg">MXN</span>
                                                </p>
                                            )}
                                            <p 
                                                className="font-semibold mt-2 uppercase text-sm tracking-wider"
                                                style={{ color: 'var(--sh-accent)' }}
                                            >
                                                {t.bottomBar.promotion}
                                            </p>
                                        </div>

                                        {isMobile ? (
                                            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-start gap-3 text-left">
                                                <Smartphone 
                                                    size={24} 
                                                    className="shrink-0" 
                                                    style={{ color: 'var(--sh-accent)' }}
                                                />
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
                                            ref={actionButtonRef}
                                            type="button"
                                            disabled={!APP_CONFIG.ENABLE_LICENSING}
                                            onClick={() => {
                                                setIsPaymentModalOpen(true);
                                            }}
                                            className={`w-full font-bold rounded-xl py-3.5 px-4 transition-all transform flex items-center justify-center gap-2 text-black cursor-pointer ${
                                                APP_CONFIG.ENABLE_LICENSING 
                                                    ? "hover:scale-[1.02] active:scale-[0.98]" 
                                                    : "opacity-50 cursor-not-allowed"
                                            }`}
                                            style={{ backgroundColor: 'var(--sh-accent)' }}
                                        >
                                            <Lock size={18} />
                                            {APP_CONFIG.ENABLE_LICENSING ? t.bottomBar.obtainLicense : t.paymentModal.disabledButton}
                                        </button>

                                        {!APP_CONFIG.ENABLE_LICENSING && (
                                            <p className="text-[10px] text-sh-text-muted mt-2 italic px-4">
                                                {t.paymentModal.disabledMessage}
                                            </p>
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        {canScrollDown && (
                                            <motion.button
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                onClick={scrollToActionButton}
                                                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center text-white shadow-2xl cursor-pointer z-30 hover:scale-110 active:scale-95 transition-transform"
                                                style={{ backgroundColor: 'var(--sh-accent)' }}
                                            >
                                                <motion.div
                                                    animate={{ y: [0, 4, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                                >
                                                    <ChevronDown size={20} className="text-black" />
                                                </motion.div>
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );

    return (
        <>
            {typeof document !== "undefined" ? createPortal(modalContent, document.body) : null}
            <PaymentModal
                isOpen={isPaymentModalOpen}
                appType={appType}
                onClose={() => setIsPaymentModalOpen(false)}
            />
        </>
    );
};
