import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Home, Bot, Search, Lock, Download, HelpCircle, CreditCard, Clock, Mail, ArrowLeft } from "lucide-react";
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";

interface ChatMessage {
    id: string;
    role: "bot" | "user";
    content: string;
    isHtml?: boolean;
}

interface ChatOption {
    id: string;
    label: string;
    action?: () => void;
}

export const FloatingChat: React.FC = () => {
    return (
        <LanguageProvider>
            <FloatingChatContent />
        </LanguageProvider>
    );
};

const FloatingChatContent: React.FC = () => {
    const { t, lang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState<ChatMessage[]>([]);
    const [currentOptions, setCurrentOptions] = useState<ChatOption[]>([]);
    const [viewStack, setViewStack] = useState<string[]>([]);
    const [currentView, setCurrentView] = useState("main");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initialize chat
    useEffect(() => {
        if (isOpen && history.length === 0) {
            showInitialOptions();
        }
    }, [isOpen]);

    // Auto scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    // Update labels when language changes
    useEffect(() => {
        if (history.length > 0) {
            setHistory(prev => prev.map(msg => 
                msg.id === "initial" 
                    ? { ...msg, content: `${t.chat.greeting}\n\n${t.chat.selectApp}` }
                    : msg
            ));
            
            refreshViewOptions(currentView);
        }
    }, [lang]);

    const refreshViewOptions = (view: string) => {
        switch (view) {
            case "main":
                setCurrentOptions([
                    { id: "general", label: t.chat.generalQuestions },
                    { id: "task-goblin", label: "Task Goblin" },
                    { id: "nexo", label: "Nexo" },
                    { id: "floaty", label: "Floaty" },
                    { id: "contact", label: t.chat.contact },
                ]);
                break;
            case "general":
                setCurrentOptions([
                    { id: "q_license", label: t.chat.licenseQuestion },
                    { id: "q_consult", label: t.chat.consultQuestion },
                    { id: "q_prices", label: t.chat.priceQuestion },
                    { id: "q_download", label: t.chat.downloadQuestion },
                    { id: "q_trial", label: t.chat.trialQuestion },
                ]);
                break;
            case "task-goblin":
            case "nexo":
            case "floaty":
                setCurrentOptions([
                    { id: "q_prices", label: t.chat.priceQuestion },
                    { id: "q_download", label: t.chat.downloadQuestion },
                ]);
                break;
            case "contact":
                setCurrentOptions([
                    { id: "email_link", label: t.chat.emailSupport },
                ]);
                break;
            default:
                setCurrentOptions([{ id: "home", label: t.chat.home }]);
        }
    };

    const showInitialOptions = () => {
        setHistory([
            { id: "initial", role: "bot", content: `${t.chat.greeting}\n\n${t.chat.selectApp}` }
        ]);
        setCurrentView("main");
        setViewStack([]);
        refreshViewOptions("main");
    };

    const handleOptionSelect = (option: ChatOption) => {
        // Add user selection to history
        const userMsgId = `user-${Date.now()}`;
        setHistory(prev => [...prev, { id: userMsgId, role: "user", content: option.label }]);

        // Process response based on ID
        setTimeout(() => {
            let response = "";
            let nextView = "";

            switch (option.id) {
                case "general":
                    response = lang === 'es' ? "¿Qué duda general tienes?" : "What general question do you have?";
                    nextView = "general";
                    break;
                case "task-goblin":
                    response = `**Task Goblin**\n\n${t.chat.taskGoblinDetail}\n\n${t.chat.trialResponse}`;
                    nextView = "task-goblin";
                    break;
                case "nexo":
                    response = `**Nexo**\n\n${t.chat.nexoDetail}\n\n${t.chat.trialResponse}`;
                    nextView = "nexo";
                    break;
                case "floaty":
                    response = `**Floaty**\n\n${t.chat.floatyDetail}\n\n${t.chat.trialResponse}`;
                    nextView = "floaty";
                    break;
                case "q_license":
                    response = t.chat.licenseResponse;
                    break;
                case "q_consult":
                    response = t.chat.consultResponse;
                    break;
                case "q_prices":
                    response = t.chat.priceResponse;
                    break;
                case "q_download":
                    response = t.chat.downloadResponse;
                    break;
                case "q_trial":
                    response = t.chat.trialResponse;
                    break;
                case "contact":
                    response = t.chat.contactResponse;
                    nextView = "contact";
                    break;
                case "email_link":
                    globalThis.location.href = "mailto:task.goblin.apps@gmail.com";
                    return;
                default:
                    response = lang === 'es' ? "Lo siento, no entiendo esa opción." : "I'm sorry, I don't understand that option.";
                    break;
            }

            const botMsgId = `bot-${Date.now()}`;
            setHistory(prev => [...prev, { id: botMsgId, role: "bot", content: response }]);
            
            if (nextView) {
                setViewStack(prev => [...prev, currentView]);
                setCurrentView(nextView);
                refreshViewOptions(nextView);
            } else {
                refreshViewOptions(currentView);
            }
        }, 300);
    };

    const handleBack = () => {
        if (viewStack.length > 0) {
            const newStack = [...viewStack];
            const prevView = newStack.pop() || "main";
            setViewStack(newStack);
            setCurrentView(prevView);
            refreshViewOptions(prevView);
        } else {
            showInitialOptions();
        }
    };

    const handleHome = () => {
        showInitialOptions();
    };

    return (
        <div className="fixed bottom-35 right-6 z-9999 font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="mb-4 w-[360px] h-[520px] glass-card rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border border-white/10"
                        style={{
                            background: "linear-gradient(180deg, rgba(25, 25, 28, 0.95) 0%, rgba(15, 15, 18, 0.98) 100%)",
                            backdropFilter: "blur(20px)"
                        }}
                    >
                        {/* Header */}
                        <div className="p-6 pb-4 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-[#5B518D] to-[#8E84C1] flex items-center justify-center text-white shadow-lg">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg leading-tight">Goblin Support</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-white/40 text-[11px] font-medium uppercase tracking-wider">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide safari-flex-shrink"
                        >
                            {history.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, x: msg.role === "bot" ? -10 : 10, y: 5 }}
                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                    className={`flex ${msg.role === "bot" ? "justify-start" : "justify-end"}`}
                                >
                                    <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${msg.role === "bot"
                                        ? "bg-white/5 text-white/90 rounded-tl-none border border-white/5"
                                        : "bg-[#5B518D] text-white rounded-tr-none shadow-lg shadow-[#5B518D]/20"
                                        }`}>
                                        {msg.content.split('\n').map((line, i) => {
                                            const lineKey = `${msg.id}-l-${i}`;
                                            if (line.startsWith('**')) {
                                                return <strong key={lineKey} className="block mb-1 text-white">{line.replaceAll('**', '')}</strong>;
                                            }
                                            if (line.includes('task.goblin.apps@gmail.com')) {
                                                const parts = line.split('task.goblin.apps@gmail.com');
                                                return (
                                                    <span key={lineKey}>
                                                        {parts.map((part, index) => (
                                                            <React.Fragment key={`${lineKey}-p-${index}`}>
                                                                {part}
                                                                {index < parts.length - 1 && (
                                                                    <a 
                                                                        href="mailto:task.goblin.apps@gmail.com" 
                                                                        className="text-[#8E84C1] hover:underline font-medium"
                                                                    >
                                                                        task.goblin.apps@gmail.com
                                                                    </a>
                                                                )}
                                                            </React.Fragment>
                                                        ))}
                                                    </span>
                                                );
                                            }
                                            return <React.Fragment key={lineKey}>{line}{i < msg.content.split('\n').length - 1 && <br />}</React.Fragment>;
                                        })}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Options Footer */}
                        <div className="p-6 pt-2 bg-black/20 border-t border-white/5">
                            <div className="flex flex-wrap gap-2 justify-center">
                                {viewStack.length > 0 && (
                                    <motion.button
                                        whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.12)" }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={handleBack}
                                        className="px-4 py-2.5 rounded-2xl text-[13px] font-medium transition-all cursor-pointer border border-white/10 text-white/60 hover:text-white"
                                    >
                                        <ArrowLeft size={14} className="inline mr-2 -mt-0.5" />
                                        {t.chat.back}
                                    </motion.button>
                                )}
                                {currentOptions.map((opt) => (
                                    <motion.button
                                        key={opt.id}
                                        whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.12)" }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => {
                                            if (opt.id === "home") handleHome();
                                            else handleOptionSelect(opt);
                                        }}
                                        className={`px-4 py-2.5 rounded-2xl text-[13px] font-medium transition-all cursor-pointer border ${opt.id === "home"
                                            ? "border-white/10 text-white/60 hover:text-white"
                                            : "bg-white/5 border-white/10 text-white/80 hover:border-white/20"
                                            }`}
                                    >
                                        {opt.id === "home" && <Home size={14} className="inline mr-2 -mt-0.5" />}
                                        {opt.id === "general" && <HelpCircle size={14} className="inline mr-2 -mt-0.5" />}
                                        {opt.id === "q_license" && <Lock size={14} className="inline mr-2 -mt-0.5" />}
                                        {opt.id === "q_consult" && <Search size={14} className="inline mr-2 -mt-0.5" />}
                                        {opt.id === "q_prices" && <CreditCard size={14} className="inline mr-2 -mt-0.5" />}
                                        {opt.id === "q_download" && <Download size={14} className="inline mr-2 -mt-0.5" />}
                                        {opt.id === "q_trial" && <Clock size={14} className="inline mr-2 -mt-0.5" />}
                                        {opt.id === "contact" && <Mail size={14} className="inline mr-2 -mt-0.5" />}
                                        {opt.id === "email_link" && <Mail size={14} className="inline mr-2 -mt-0.5" />}
                                        {opt.label}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-3xl bg-[#151515] shadow-2xl shadow-[#5B518D]/40 flex items-center justify-center text-white cursor-pointer group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-linear-to-tr from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X size={28} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <MessageCircle size={30} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};
