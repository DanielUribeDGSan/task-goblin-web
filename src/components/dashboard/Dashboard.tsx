import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { RoomCard } from './RoomCard';
import { DeviceControl } from './DeviceControl';
import { BottomBar } from './BottomBar';
import { useDashboardState } from '../../hooks/useDashboardState.ts';
import { Camera, Zap, Wind } from 'lucide-react';

export const Dashboard = () => {
    const { devices, toggleDevice } = useDashboardState();

    return (
        <div className="flex bg-[#020202] text-white h-screen overflow-hidden p-2 lg:p-4">
            <div className="flex w-full h-full glass rounded-[2.5rem] overflow-hidden shadow-2xl relative">
                <Sidebar />

                <div className="flex-1 flex flex-col min-w-0">
                    <TopBar />

                    <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2 scrollbar-hide">
                        <div className="grid grid-cols-12 gap-3 max-w-[1600px] mx-auto auto-rows-min">

                            {/* Main Area: Living Room */}
                            <div className="col-span-12 lg:col-span-8">
                                <RoomCard
                                    title="Living Room"
                                    distance="41 m"
                                    stats={{ temp: "22°C", humidity: "55%" }}
                                    image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&h=800&auto=format&fit=crop"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-2">
                                        <DeviceControl
                                            icon={<Camera size={18} />}
                                            label="Camera CCTV"
                                            statusText="82%"
                                            percentage={82}
                                            active={devices.livingRoomCamera}
                                            onToggle={() => toggleDevice('livingRoomCamera')}
                                        />
                                        <DeviceControl
                                            icon={<Zap size={18} />}
                                            label="Lightning"
                                            sublabel="Chandelier, Dimmers"
                                            active={devices.livingRoomLighting}
                                            onToggle={() => toggleDevice('livingRoomLighting')}
                                        />
                                        <DeviceControl
                                            icon={<Wind size={18} />}
                                            label="Vacuum Cleaner"
                                            statusText="58%"
                                            percentage={58}
                                            active={devices.livingRoomVacuum}
                                            onToggle={() => toggleDevice('livingRoomVacuum')}
                                        />
                                    </div>
                                </RoomCard>
                            </div>

                            {/* Right Panel: Kitchen */}
                            <div className="col-span-12 lg:col-span-4">
                                <RoomCard
                                    title="Kitchen"
                                    distance="24 m"
                                    image="https://images.unsplash.com/photo-1556911223-e4524c73c480?q=80&w=800&h=1200&auto=format&fit=crop"
                                    className="h-full"
                                >
                                    <DeviceControl
                                        icon={<Camera size={18} />}
                                        label="Camera CCTV"
                                        statusText="82%"
                                        percentage={82}
                                        active={devices.kitchenCamera}
                                        onToggle={() => toggleDevice('kitchenCamera')}
                                    />
                                </RoomCard>
                            </div>

                            {/* Bottom Grid: Bedroom, Cinema, Courtyard */}
                            <div className="col-span-12 lg:col-span-4 lg:row-start-2">
                                <RoomCard
                                    title="Bedroom"
                                    distance="18 m"
                                    image="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=800&h=600&auto=format&fit=crop"
                                />
                            </div>

                            <div className="col-span-12 lg:col-span-4 lg:row-start-2">
                                <RoomCard
                                    title="Cinema"
                                    distance="27 m"
                                    image="https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&h=600&auto=format&fit=crop"
                                />
                            </div>

                            <div className="col-span-12 lg:col-span-4 lg:row-start-2">
                                <RoomCard
                                    title="Courtyard"
                                    distance="160 m"
                                    image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&h=600&auto=format&fit=crop"
                                />
                            </div>

                        </div>
                    </div>

                    <BottomBar />
                </div>
            </div>
        </div>
    );
};
