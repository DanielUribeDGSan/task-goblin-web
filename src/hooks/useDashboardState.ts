import { useState } from 'react';

export const useDashboardState = () => {
    const [devices, setDevices] = useState({
        livingRoomCamera: true,
        livingRoomLighting: true,
        livingRoomVacuum: false,
        kitchenCamera: true,
        kitchenLighting: false,
        bedroomCamera: true,
        cinemaCamera: true,
        courtyardCamera: true,
    });

    const [permissions, setPermissions] = useState({
        accessibility: false,
        contacts: false,
        screenRecording: false,
        notifications: false,
        automationWhatsApp: false,
    });

    const toggleDevice = (id: keyof typeof devices) => {
        setDevices(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const togglePermission = (id: keyof typeof permissions) => {
        setPermissions(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return {
        devices,
        toggleDevice,
        permissions,
        togglePermission,
    };
};
