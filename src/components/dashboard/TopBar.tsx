import { Search, Cloud, Droplets, MapPin, MoreVertical } from 'lucide-react';

export const TopBar = () => {
    return (
        <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl overflow-hidden glass">
                    <img src="https://images.unsplash.com/photo-1558211583-d28f630b9b8b?q=80&w=200&h=200&auto=format&fit=crop" alt="Smart Home" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white leading-none">Smart House</h1>
                    <p className="text-xs text-sh-text-muted mt-1">12 Sep 2025</p>
                </div>
                <button className="text-sh-text-muted hover:text-white transition-colors">
                    <MoreVertical size={18} />
                </button>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-6 px-6 py-2 rounded-2xl glass">
                    <div className="flex items-center gap-2 text-white">
                        <Cloud size={18} className="text-sh-text-muted" />
                        <span className="font-medium text-sm">11°C</span>
                    </div>
                    <div className="flex items-center gap-2 text-white border-l border-white/10 pl-6">
                        <Droplets size={18} className="text-sh-text-muted" />
                        <span className="font-medium text-sm">67%</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-white">
                    <span className="text-sh-text-muted text-sm uppercase tracking-wider font-medium">20:31</span>
                </div>

                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 rounded-xl glass flex items-center justify-center text-sh-text-muted hover:text-white transition-colors">
                        <Search size={18} />
                    </button>
                    <div className="w-10 h-10 rounded-xl overflow-hidden glass ring-2 ring-white/10 ring-offset-2 ring-offset-black">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop" alt="User Profile" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
};
