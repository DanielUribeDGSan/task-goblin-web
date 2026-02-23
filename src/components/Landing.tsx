import { ThemeProvider } from '../contexts/ThemeContext';
import MuiTheme from './MuiTheme';
import Header from './Header';
import HeroPanel from './HeroPanel';
import Footer from './Footer';

export default function Landing() {
  return (
    <ThemeProvider>
      <MuiTheme>
        <div className="min-h-screen flex flex-col">
          <div className="max-w-5xl mx-auto w-full px-4 py-6 flex-1 flex flex-col min-h-0">
            <div
              className="rounded-2xl overflow-hidden flex flex-col flex-1 min-h-[520px] shadow-xl"
              style={{ backgroundColor: 'var(--tg-panel)' }}
            >
              <Header />
              <main className="flex-1 flex min-h-0">
                <HeroPanel />
              </main>
            </div>
          </div>
          <Footer />
        </div>
      </MuiTheme>
    </ThemeProvider>
  );
}
