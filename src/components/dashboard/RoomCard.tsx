import { Armchair, ChevronRight, Maximize2, Thermometer, Droplets, Smile } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface RoomCardProps {
    title: string;
    distance?: string;
    image?: string;
    stats?: {
        temp?: string;
        humidity?: string;
    };
    children?: React.ReactNode;
    className?: string;
}

export const RoomCard = ({ title, distance, image, stats, children, className }: RoomCardProps) => {
    return (
        <div className={cn("glass rounded-[2rem] p-5 flex flex-col gap-4 group transition-all duration-500 hover:bg-white/[0.08]", className)}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl glass flex items-center justify-center text-sh-accent">
                        <Armchair size={18} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white leading-tight">{title}</h2>
                        {distance && <p className="text-[10px] text-sh-text-muted font-medium">{distance}</p>}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {stats && (
                        <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                            <div className="flex items-center gap-1.5">
                                <Thermometer size={14} className="text-sh-text-muted" />
                                <span className="text-xs font-semibold text-white">{stats.temp}</span>
                            </div>
                            <div className="flex items-center gap-1.5 border-l border-white/10 pl-3">
                                <Droplets size={14} className="text-sh-text-muted" />
                                <span className="text-xs font-semibold text-white">{stats.humidity}</span>
                            </div>
                            <Smile size={14} className="text-sh-text-muted ml-1" />
                        </div>
                    )}
                    <button className="text-sh-text-muted hover:text-white transition-colors">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            <div className="relative flex-1">
                {image && (
                    <div className="relative rounded-[1.5rem] overflow-hidden aspect-video shadow-2xl">
                        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                        <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse ring-4 ring-red-500/20" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live</span>
                        </div>

                        <button className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white border border-white/10 transform transition-all group-hover:scale-110">
                            <Maximize2 size={14} />
                        </button>

                        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-white/90 text-[10px] font-bold uppercase tracking-wider">
                            <span className="bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-sm">4 Devices</span>
                            <div className="flex items-center gap-2">
                                <span className="opacity-40 cursor-pointer hover:opacity-100 transition-opacity">❮</span>
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                                </div>
                                <span className="opacity-40 cursor-pointer hover:opacity-100 transition-opacity">❯</span>
                            </div>
                            <span className="bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-sm">1 / 2</span>
                        </div>
                    </div>
                )}
                <div className="mt-3">
                    {children}
                </div>
            </div>
        </div>
    );
};
