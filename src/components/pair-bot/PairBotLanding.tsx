import React, { useState, useRef, useEffect } from 'react';
import { GalaxyBackground } from './GalaxyBackground';
import { DynamicIslandCard } from './DynamicIslandCard';
import { motion } from 'framer-motion';

const content = {
  en: {
    heroTitle: 'Experience liftoff with the next-gen agent platform',
    download: 'Download App',
    explore: 'Explore use cases',
    freeBadge: '100% Free',
    downloads: {
      macSilicon: 'Mac (Apple Silicon)',
      macSiliconDesc: 'For Macs with M1 to M6 and Neo chips',
      macIntel: 'Mac (Intel)',
      macIntelDesc: 'For older Macs',
      windows: 'Windows (x64)',
      windowsDesc: 'Windows 10 / 11'
    },
    features: [
      {
        image: '/pair-bot/image-2-chat.png',
        title: 'Core AI Interface',
        description: 'Communicate naturally with the agent. The chat interface is the command center where your ideas turn into functional code.',
      },
      {
        image: '/pair-bot/image-3-chat.png',
        title: 'Seamless Workspace',
        description: 'Watch as the agent navigates your files, modifies code, and understands your entire project context in real-time.',
      },
      {
        image: '/pair-bot/image-4-chat-con-navegador.png',
        title: 'Visual DOM Interaction',
        description: 'The agent can visually inspect your application, click buttons, and navigate pages using the integrated browser just like a human.',
      },
      {
        image: '/pair-bot/image-5-chats-dentro-de-servidores.png',
        title: 'Remote SSH Environments',
        description: 'Connect securely to remote servers. The agent can execute commands, manage infrastructure, and debug directly on your servers.',
      },
      {
        image: '/pair-bot/image-6-personalizar.png',
        title: 'Deep Customization',
        description: 'Make it yours. Personalize the interface, manage custom skills, and adapt the behavior of your AI assistant to your workflow.',
      },
      {
        image: '/pair-bot/image-7-configuracion.png',
        title: 'Extensive Settings',
        description: 'Tailor the engine to your needs. Easily configure LLM providers, API keys, and advanced workspace preferences.',
      },
      {
        image: '/pair-bot/image-8-automate.png',
        title: 'Background Automations',
        description: 'Set up autonomous tasks. The agent can monitor repositories, review pull requests, and handle repetitive tasks while you sleep.',
      }
    ]
  },
  es: {
    heroTitle: 'Tu compañero de pair programming impulsado por IA.',
    download: 'Descargar la App',
    explore: 'Explorar casos de uso',
    freeBadge: 'Totalmente Gratis',
    downloads: {
      macSilicon: 'Mac (Apple Silicon)',
      macSiliconDesc: 'Para Macs con chip M1 a M6 y Neo',
      macIntel: 'Mac (Intel)',
      macIntelDesc: 'Para Macs más antiguos',
      windows: 'Windows (x64)',
      windowsDesc: 'Windows 10 / 11'
    },
    features: [
      {
        image: '/pair-bot/image-2-chat.png',
        title: 'Interfaz principal de IA',
        description: 'Comunícate naturalmente con el agente. La interfaz de chat es el centro de control donde tus ideas se convierten en código.',
      },
      {
        image: '/pair-bot/image-3-chat.png',
        title: 'Entorno de trabajo integrado',
        description: 'Observa cómo el agente navega por tus archivos, modifica código y entiende todo el contexto de tu proyecto en tiempo real.',
      },
      {
        image: '/pair-bot/image-4-chat-con-navegador.png',
        title: 'Interacción Visual del DOM',
        description: 'El agente puede inspeccionar visualmente tu aplicación, interactuar y navegar usando el navegador integrado como un usuario humano.',
      },
      {
        image: '/pair-bot/image-5-chats-dentro-de-servidores.png',
        title: 'Entornos Remotos SSH',
        description: 'Conéctate de forma segura a servidores remotos. El agente puede ejecutar comandos, gestionar infraestructura y depurar directamente en tus servidores.',
      },
      {
        image: '/pair-bot/image-6-personalizar.png',
        title: 'Personalización Profunda',
        description: 'Hazlo tuyo. Personaliza la interfaz, gestiona habilidades (skills) y adapta el comportamiento de tu asistente a tu flujo de trabajo.',
      },
      {
        image: '/pair-bot/image-7-configuracion.png',
        title: 'Configuración Extensa',
        description: 'Adapta el motor a tus necesidades. Configura fácilmente proveedores de LLM, claves de API y preferencias avanzadas del espacio de trabajo.',
      },
      {
        image: '/pair-bot/image-8-automate.png',
        title: 'Automatizaciones en segundo plano',
        description: 'Configura tareas autónomas. El agente puede monitorear repositorios, revisar pull requests y hacer tareas repetitivas mientras duermes.',
      }
    ]
  }
};

import { PAIR_BOT_VERSION } from './constants';

export const PairBotLanding: React.FC = () => {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [showDownloads, setShowDownloads] = useState(false);
  const [links, setLinks] = useState({
    macSilicon: `/downloads/pair-bot/mac-arm64/Pair-Bot-${PAIR_BOT_VERSION}-arm64.dmg`,
    macIntel: `/downloads/pair-bot/mac-x64/Pair-Bot-${PAIR_BOT_VERSION}-x64.dmg`,
    windows: `/downloads/pair-bot/win-x64/Pair-Bot-Setup-${PAIR_BOT_VERSION}.exe`
  });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowDownloads(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    // Fetch latest versions dynamically
    const fetchLatestLinks = async () => {
      try {
        const fetchYml = async (url: string, folder: string) => {
          const res = await fetch(url);
          if (res.ok) {
            const text = await res.text();
            // Buscar explícitamente el archivo .dmg o .exe en vez del archivo en "path:" (que suele ser el .zip)
            const match = text.match(/url:\s+([^\r\n]+\.(?:dmg|exe))/i);
            if (match && match[1]) {
              return `/downloads/pair-bot/${folder}/${match[1]}`;
            }
          }
          return null;
        };

        const [macArm, macX64, winX64] = await Promise.all([
          fetchYml('/downloads/pair-bot/mac-arm64/latest-mac.yml', 'mac-arm64'),
          fetchYml('/downloads/pair-bot/mac-x64/latest-mac.yml', 'mac-x64'),
          fetchYml('/downloads/pair-bot/win-x64/latest.yml', 'win-x64')
        ]);

        setLinks(prev => ({
          macSilicon: macArm || prev.macSilicon,
          macIntel: macX64 || prev.macIntel,
          windows: winX64 || prev.windows
        }));
      } catch (e) {
        console.error('Error fetching latest versions:', e);
      }
    };
    fetchLatestLinks();

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const t = content[lang];

  return (
    <div className="relative min-h-screen bg-[#181818] text-[#fafafa] selection:bg-[#34d399] selection:text-[#050505] font-sans">
      <GalaxyBackground />
      
      {/* Header / Language Toggle */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-end z-[60]">
        <div className="bg-[#171717] rounded-full p-1 border border-[#242424] flex items-center shadow-lg">
          <button 
            onClick={() => setLang('es')}
            className={`cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${lang === 'es' ? 'bg-[#242424] text-white' : 'text-[#8c8c8c] hover:text-white'}`}
          >
            ES
          </button>
          <button 
            onClick={() => setLang('en')}
            className={`cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${lang === 'en' ? 'bg-[#242424] text-white' : 'text-[#8c8c8c] hover:text-white'}`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-50 flex flex-col items-center justify-center min-h-[70vh] md:min-h-[90vh] px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-6 inline-block px-4 py-1.5 rounded-full border border-[#34d399]/30 bg-[#34d399]/10 text-[#34d399] text-sm font-semibold tracking-wide"
        >
          {t.freeBadge}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center space-x-4 mb-8"
        >
          <img src="/pair-bot-logo.svg" alt="Pair Bot Logo" className="w-14 h-14 rounded-md object-contain shadow-lg" />
          <span className="text-3xl font-medium tracking-wide">
            Pair Bot - Built with <a href="https://docs.openhands.dev/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#34d399] transition-colors">OpenHands</a>
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter max-w-5xl leading-tight mb-12"
        >
          {t.heroTitle}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 relative"
        >
          <div 
            className="relative" 
            ref={menuRef}
            onMouseEnter={() => setShowDownloads(true)}
          >
            <button 
              onClick={() => setShowDownloads(!showDownloads)}
              className="px-8 py-4 rounded-full bg-[#171717] hover:bg-[#242424] border border-[#3a3a3a] transition-all flex items-center gap-3 shadow-lg shadow-[#000000]"
            >
              <span>{t.download}</span>
              <svg className={`w-4 h-4 transition-transform duration-300 ${showDownloads ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDownloads && (
              <div className="absolute top-full mt-3 w-full bg-[#171717] border border-[#3a3a3a] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <a href={links.macSilicon} download className="cursor-pointer px-6 py-4 hover:bg-[#2a2a2a] transition-colors text-left flex flex-col group">
                  <span className="font-medium text-[#fafafa] group-hover:text-white transition-colors">{t.downloads.macSilicon}</span>
                  <span className="text-xs text-[#8c8c8c]">{t.downloads.macSiliconDesc}</span>
                </a>
                <a href={links.macIntel} download className="cursor-pointer px-6 py-4 hover:bg-[#2a2a2a] transition-colors text-left flex flex-col border-t border-[#2a2a2a] group">
                  <span className="font-medium text-[#fafafa] group-hover:text-white transition-colors">{t.downloads.macIntel}</span>
                  <span className="text-xs text-[#8c8c8c]">{t.downloads.macIntelDesc}</span>
                </a>
                <a href={links.windows} download className="cursor-pointer px-6 py-4 hover:bg-[#2a2a2a] transition-colors text-left flex flex-col border-t border-[#2a2a2a] group">
                  <span className="font-medium text-[#fafafa] group-hover:text-white transition-colors">{t.downloads.windows}</span>
                  <span className="text-xs text-[#8c8c8c]">{t.downloads.windowsDesc}</span>
                </a>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="cursor-pointer px-8 py-4 rounded-full bg-[#fafafa] text-[#050505] hover:bg-[#e5e5e5] transition-all font-medium"
          >
            {t.explore}
          </button>
        </motion.div>
      </div>

      {/* Features Section with Dynamic Island Cards */}
      <div id="features" className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-32 flex flex-col gap-8">
        {t.features.map((feature, idx) => (
          <DynamicIslandCard 
            key={feature.title}
            title={feature.title}
            description={feature.description}
            imageSrc={feature.image}
            reverse={idx % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
};
