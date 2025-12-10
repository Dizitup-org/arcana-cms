import { useState, useEffect } from "react";
import { FileText } from "lucide-react";

interface WelcomeAnimationProps {
  onComplete: () => void;
}

const WelcomeAnimation = ({ onComplete }: WelcomeAnimationProps) => {
  const [phase, setPhase] = useState<"logo" | "fadeOut" | "complete">("logo");

  useEffect(() => {
    // Show logo animation
    const logoTimer = setTimeout(() => {
      setPhase("fadeOut");
    }, 1500);

    // Complete animation
    const completeTimer = setTimeout(() => {
      setPhase("complete");
      onComplete();
    }, 2200);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (phase === "complete") return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 ${
        phase === "fadeOut" ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(199 80% 25% / 0.4) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 100% 50%, hsl(217 70% 30% / 0.3) 0%, transparent 40%), linear-gradient(180deg, hsl(217 33% 8%) 0%, hsl(217 40% 6%) 50%, hsl(220 45% 4%) 100%)"
      }}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, hsl(199 89% 48% / 0.4) 0%, transparent 70%)",
            animation: "pulse 2s ease-in-out infinite"
          }}
        />
      </div>

      {/* Logo and text */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Animated logo */}
        <div 
          className="relative"
          style={{
            animation: "logoEntry 0.8s ease-out forwards"
          }}
        >
          <div 
            className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl"
            style={{
              boxShadow: "0 0 60px hsl(199 89% 48% / 0.5), 0 0 100px hsl(217 91% 60% / 0.3)"
            }}
          >
            <FileText className="h-10 w-10 text-primary-foreground" />
          </div>
          
          {/* Orbiting ring */}
          <div 
            className="absolute inset-0 rounded-2xl border-2 border-primary/30"
            style={{
              animation: "spin 3s linear infinite"
            }}
          />
        </div>

        {/* Text */}
        <div 
          className="text-center"
          style={{
            animation: "textEntry 0.8s ease-out 0.3s forwards",
            opacity: 0
          }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">ModernCMS</h1>
          <p className="text-muted-foreground">Loading your experience...</p>
        </div>

        {/* Loading bar */}
        <div 
          className="w-48 h-1 bg-muted/30 rounded-full overflow-hidden"
          style={{
            animation: "textEntry 0.8s ease-out 0.5s forwards",
            opacity: 0
          }}
        >
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            style={{
              animation: "loadingBar 1.2s ease-out forwards"
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes logoEntry {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes textEntry {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes loadingBar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg) scale(1.2);
          }
          100% {
            transform: rotate(360deg) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default WelcomeAnimation;
