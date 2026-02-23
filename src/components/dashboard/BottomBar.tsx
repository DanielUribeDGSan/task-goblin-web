import { Play, SkipBack, SkipForward, Pause, Lock, Unlock } from 'lucide-react';

export const BottomBar = () => {
    return (
        <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
                {[
                    { name: 'Robert T.', atHome: true, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop' },
                    { name: 'Bessie S.', atHome: true, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop' },
                    { name: 'Devon O.', atHome: true, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop' },
                    { name: 'Annette I.', atHome: true, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop' },
                ].map((user) => (
                    <div key={user.name} className="flex items-center gap-3 px-4 py-2 rounded-2xl glass hover:bg-white/10 transition-colors cursor-pointer group">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                            <img src={user.img} alt={user.name} className="w-full h-full object-cover" />
                            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">{user.name}</p>
                            <p className="text-[10px] text-green-500 font-medium">At home</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-12">
                <div className="flex items-center gap-6 glass rounded-[1.5rem] p-2 pr-8">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg">
                        <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=100&h=100&auto=format&fit=crop" alt="Song cover" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-brand-cyan leading-tight">I Took A Ride</h4>
                        <p className="text-xs text-sh-text-muted">Caroline Rose</p>
                    </div>
                    <div className="flex items-center gap-3 text-sh-text-muted ml-4">
                        <SkipBack size={20} className="hover:text-white cursor-pointer" />
                        <SkipForward size={20} className="hover:text-white cursor-pointer" />
                        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            <Pause size={18} fill="currentColor" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-sh-text-muted hover:text-sh-accent transition-all group">
                        <Unlock size={20} className="group-hover:hidden" />
                        <Lock size={20} className="hidden group-hover:block" />
                    </button>
                    <span className="text-[10px] font-bold text-sh-text-muted uppercase tracking-widest">Unlocked</span>
                </div>
            </div>
        </div>
    );
};
