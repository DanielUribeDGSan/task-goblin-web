import { TASK_NOTCH_URLS, TASK_GOBLIN_URLS, NEXO_URLS, FLOATY_URLS } from "../constants/app_data";


export const triggerSecureDownload = (
  index: number, 
  appType: "task-goblin" | "nexo" | "floaty" | "task-notch" = "task-goblin"
) => {
  const urlMap = {
    "task-notch": TASK_NOTCH_URLS,
    "task-goblin": TASK_GOBLIN_URLS,
    "nexo": NEXO_URLS,
    "floaty": FLOATY_URLS
  };
  const urls = urlMap[appType];
  if (!urls[index]) return;
  
  const u = urls[index];
  const a = document.createElement("a");
  a.href = u;
  a.download = "";
  a.rel = "noopener noreferrer";
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  a.remove();
};
