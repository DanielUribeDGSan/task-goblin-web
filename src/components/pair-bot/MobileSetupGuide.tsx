import React, { useState, useEffect, useRef } from 'react';
import { Drawer } from 'vaul';
import { Smartphone, Download, Database, Settings, Github, X, ChevronDown } from 'lucide-react';

interface MobileSetupGuideProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileSetupGuide({ open, onOpenChange }: MobileSetupGuideProps) {
  const [showScrollHint, setShowScrollHint] = useState(true);
  const step1Ref = useRef<HTMLLIElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      setShowScrollHint(true);
      return;
    }
    
    // Pequeño timeout para asegurar que el DOM está listo en el bottom sheet
    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShowScrollHint(false);
          } else {
            // Reaparecer si hacemos scroll muy hacia arriba
            setShowScrollHint(true);
          }
        },
        {
          root: scrollContainerRef.current,
          threshold: 0.1,
        }
      );

      if (step1Ref.current) {
        observer.observe(step1Ref.current);
      }
      return () => observer.disconnect();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [open]);

  const handleScrollClick = () => {
    if (step1Ref.current) {
      step1Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>

        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" />
        <Drawer.Content className="bg-[#111] flex flex-col rounded-t-[20px] mt-24 h-[90vh] fixed bottom-0 left-0 right-0 z-[60] border-t border-[#333]">
          {/* Handle para arrastrar */}
          <div className="p-4 bg-[#111] rounded-t-[20px] flex-1 flex flex-col min-h-0">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-600 mb-6" />
            
            <div ref={scrollContainerRef} className="max-w-2xl mx-auto w-full flex-1 overflow-y-auto pb-20 px-2">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <Drawer.Title className="font-semibold text-2xl text-white mb-2">
                    Conectar App Móvil
                  </Drawer.Title>
                  <Drawer.Description className="text-gray-400 text-sm">
                    Sigue esta guía paso a paso para sincronizar tu aplicación móvil Pair Bot con el entorno de escritorio.
                  </Drawer.Description>
                </div>
                <Drawer.Close className="p-2 rounded-full hover:bg-[#222] transition-colors cursor-pointer">
                  <X className="w-5 h-5 text-gray-400" />
                </Drawer.Close>
              </div>

              <div className="space-y-8 mt-4">
                

                {/* Repositorio */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#1a1a1a] border border-[#333] rounded-xl gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#222] rounded-lg">
                      <Github className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Clona el Repositorio</h3>
                      <p className="text-gray-400 text-sm">El código fuente de la app móvil está en GitHub</p>
                    </div>
                  </div>
                  <a 
                    href="https://github.com/DanielUribeDGSan/pair-bot-mobile" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                  >
                    Ver en GitHub
                  </a>
                </div>

                {/* Imagen */}
                <div className="max-w-[280px] mx-auto w-full overflow-hidden rounded-2xl border border-[#333] bg-[#1a1a1a] p-2">
                  <img 
                    src="/pair-bot/pair-mobile.png" 
                    alt="Pair Bot Mobile App" 
                    className="w-full h-auto rounded-xl object-contain" 
                  />
                </div>

                {/* Pasos */}
                <ol className="relative border-l border-[#333] ml-3 space-y-8">
                  <li ref={step1Ref} className="mb-8 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-[#222] rounded-full -left-4 ring-4 ring-[#111]">
                      <Download className="w-4 h-4 text-gray-300" />
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-white">1. Instalar la App</h3>
                    <p className="mb-2 text-base font-normal text-gray-400">
                      Instala las dependencias y corre el servidor de desarrollo local usando Expo.
                    </p>
                    <div className="bg-[#1a1a1a] border border-[#333] p-4 rounded-xl text-sm font-mono text-gray-300 mt-3">
                      <p className="mb-2"><span className="text-green-400">git</span> clone https://github.com/DanielUribeDGSan/pair-bot-mobile.git</p>
                      <p className="mb-2"><span className="text-green-400">cd</span> pair-bot-mobile</p>
                      <p className="mb-2"><span className="text-green-400">npm</span> install</p>
                      <p><span className="text-green-400">npx</span> expo start</p>
                    </div>
                  </li>

                  <li className="mb-8 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-[#222] rounded-full -left-4 ring-4 ring-[#111]">
                      <Database className="w-4 h-4 text-gray-300" />
                    </span>
                    <h3 className="mb-1 text-lg font-semibold text-white">2. Configurar Supabase en Escritorio</h3>
                    <p className="mb-2 text-base font-normal text-gray-400">
                      Abre tu aplicación de Pair Bot de escritorio, ve a Ajustes y configura tus credenciales de Supabase.
                    </p>
                    <div className="bg-[#1a1a1a] border border-[#333] p-4 rounded-xl text-sm text-gray-300 mt-3 space-y-2">
                      <p>Asegúrate de rellenar los siguientes campos:</p>
                      <ul className="list-disc list-inside text-gray-400 ml-2">
                        <li>Supabase URL</li>
                        <li>Supabase Anon Key</li>
                        <li>Storage Bucket Name</li>
                      </ul>
                    </div>
                  </li>

                  <li className="ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-[#222] rounded-full -left-4 ring-4 ring-[#111]">
                      <Smartphone className="w-4 h-4 text-gray-300" />
                    </span>
                    <h3 className="mb-1 text-lg font-semibold text-white">3. Exportar e Importar en Móvil</h3>
                    <p className="text-base font-normal text-gray-400">
                      Desde los ajustes de escritorio, desplázate hasta abajo y haz clic en <strong>Exportar JSON</strong>. Luego, abre ese archivo desde la pantalla inicial de la aplicación móvil para sincronizar todo automáticamente.
                    </p>
                  </li>
                </ol>

              </div>
            </div>
          </div>

          {/* Botón Flotante para Leer Instrucciones */}
          {showScrollHint && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[70] animate-bounce pointer-events-auto">
              <button 
                onClick={handleScrollClick}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2a] text-gray-300 rounded-full border border-[#444] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:bg-[#333] transition-all cursor-pointer"
              >
                <span className="text-sm font-medium">Leer instrucciones</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}

        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
