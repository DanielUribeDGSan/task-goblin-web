import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export const Switch = ({ checked, onChange }: SwitchProps) => {
    return (
        <button
            onClick={() => onChange(!checked)}
            className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                checked ? "bg-brand-cyan" : "bg-white/10"
            )}
        >
            <span
                className={cn(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    checked ? "translate-x-5" : "translate-x-0"
                )}
            />
        </button>
    );
};

interface DeviceControlProps {
    icon: React.ReactNode;
    label: string;
    sublabel?: string;
    active: boolean;
    onToggle: () => void;
    statusText?: string;
    percentage?: number;
}

export const DeviceControl = ({ icon, label, sublabel, active, onToggle, statusText, percentage }: DeviceControlProps) => {
    return (
        <div className="flex items-center justify-between gap-3 group min-w-0">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <div className={cn(
                    "w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl flex items-center justify-center transition-colors shadow-inner",
                    active ? "bg-white/10 text-white" : "bg-white/5 text-sh-text-muted"
                )}>
                    {icon}
                </div>
                <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-white leading-tight break-words">{label}</h4>
                    {statusText && (
                        <div className="flex items-center gap-2 mt-0.5">
                            <div className="w-8 h-2 bg-white/10 rounded-full overflow-hidden shrink-0">
                                <div className="h-full bg-brand-cyan transition-all duration-500" style={{ width: `${percentage}%` }} />
                            </div>
                            <span className="text-[10px] font-bold text-sh-text-muted uppercase tracking-wider shrink-0">{percentage}%</span>
                        </div>
                    )}
                    {sublabel && <p className="text-xs text-sh-text-muted break-words">{sublabel}</p>}
                </div>
            </div>
            <span className="shrink-0">
                <Switch checked={active} onChange={onToggle} />
            </span>
        </div>
    );
};
