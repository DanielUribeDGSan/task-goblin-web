import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

const MOBILE_BREAKPOINT = 768;

interface LayoutContextValue {
  isMobile: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  bottomBarOpen: boolean;
  setBottomBarOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  toggleSidebar: () => void;
  toggleBottomBar: () => void;
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bottomBarOpen, setBottomBarOpen] = useState(false);

  useEffect(() => {
    const mql = globalThis.matchMedia?.(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const toggleBottomBar = useCallback(() => {
    setBottomBarOpen((prev) => !prev);
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        isMobile,
        sidebarOpen,
        setSidebarOpen,
        bottomBarOpen,
        setBottomBarOpen,
        toggleSidebar,
        toggleBottomBar,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return ctx;
}
