import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { PortalCards } from "@/components/landing/PortalCards";
import { StatsSection } from "@/components/landing/StatsSection";
import { HighlightsSection } from "@/components/landing/HighlightsSection";
import { AboutUsSection } from "@/components/landing/AboutUsSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import logoPurple from "@/assets/logo-purple.png";
import logoWhite from "@/assets/logo-white.png";

export const Route = createFileRoute("/")({
  component: WelcomePage,
});

function WelcomePage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const logoSrc = isDark ? logoWhite : logoPurple;

  return (
    <div className="min-h-screen bg-white dark:bg-[#110515] transition-colors duration-500 font-sans relative overflow-hidden">
      
      {/* Custom Animations for Floating Logos */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatSlow {
          0% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-40px) rotate(15deg) scale(1.1); }
          100% { transform: translateY(0px) rotate(0deg) scale(1); }
        }
        @keyframes floatReverse {
          0% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(40px) rotate(-15deg) scale(0.9); }
          100% { transform: translateY(0px) rotate(0deg) scale(1); }
        }
        @keyframes floatDelayed {
          0% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-30px) rotate(10deg) scale(1.05); }
          100% { transform: translateY(0px) rotate(0deg) scale(1); }
        }
      `}} />

      {/* Interactive Background Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen"
      >
        <div 
          className="absolute w-[800px] h-[800px] rounded-full blur-[150px] transition-transform duration-75 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(108,29,95,0.1) 0%, rgba(1,172,159,0.05) 100%)',
            transform: `translate(${mousePos.x - 400}px, ${mousePos.y - 400}px)`,
          }}
        />
      </div>

      {/* Animated Xebia Logos Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.03] dark:opacity-[0.02]">
        <img 
          src={logoSrc} 
          alt="" 
          className="absolute top-[10%] left-[5%] w-64 md:w-96 filter grayscale"
          style={{ animation: 'floatSlow 18s ease-in-out infinite' }}
        />
        <img 
          src={logoSrc} 
          alt="" 
          className="absolute top-[40%] right-[10%] w-72 md:w-[400px] filter grayscale"
          style={{ animation: 'floatReverse 22s ease-in-out infinite' }}
        />
        <img 
          src={logoSrc} 
          alt="" 
          className="absolute -bottom-[10%] left-[30%] w-80 md:w-[500px] filter grayscale"
          style={{ animation: 'floatDelayed 25s ease-in-out infinite' }}
        />
      </div>

      <div className="relative z-10">
        <LandingHeader />
        <main>
          <HeroSection />
          <PortalCards />
          <StatsSection />
          <HighlightsSection />
          <AboutUsSection />
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}
