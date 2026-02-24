import { Search, Cloud, Droplets, MapPin, MoreVertical } from "lucide-react";

export const TopBar = () => {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl overflow-hidden glass">
          <img
            src="/icon/TaskGoblin.png"
            alt="Smart Home"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white leading-none">
            Task Goblin
          </h1>
        </div>
      </div>
    </div>
  );
};
