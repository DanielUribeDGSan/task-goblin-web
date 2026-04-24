// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBwfXJP6m6CRTXAtX_CrrK8wiqWtL_RS0",
  authDomain: "desarrollo-web-5da60.firebaseapp.com",
  projectId: "desarrollo-web-5da60",
  storageBucket: "desarrollo-web-5da60.appspot.com",
  messagingSenderId: "831087627514",
  appId: "1:831087627514:web:190677d942f51a41220d43",
  measurementId: "G-WP7X7WDHC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Helper for analytics that handles SSR (Astro)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

/**
 * Log a download event with specific metadata
 * @param appName The name of the app being downloaded (task-goblin, nexo, floaty)
 * @param platform The platform (mac, windows)
 * @param architecture The architecture (silicon, intel, x64)
 * @param source The location of the click (bottom_bar, modal)
 */
export const logDownloadEvent = (
  appName: string,
  platform: string,
  architecture: string,
  source: 'bottom_bar' | 'modal'
) => {
  if (analytics) {
    logEvent(analytics, 'app_download_click', {
      app_name: appName,
      platform: platform,
      architecture: architecture,
      source: source,
      event_category: 'download'
    });
  }
};