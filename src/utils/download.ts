import { TASK_GOBLIN_URLS, NEXO_URLS, FLOATY_URLS } from "../constants/app_data";

export const b = (s: string) => (typeof atob !== "undefined" ? atob(s) : "");

export const triggerSecureDownload = (
  index: number, 
  appType: "task-goblin" | "nexo" | "floaty" = "task-goblin"
) => {
  const urls = appType === "nexo" ? NEXO_URLS : appType === "floaty" ? FLOATY_URLS : TASK_GOBLIN_URLS;
  if (!urls[index]) return;
  
  const u = b(urls[index]);
  const a = document.createElement("a");
  a.href = u;
  a.download = "";
  a.rel = "noopener noreferrer";
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  a.remove();
};
