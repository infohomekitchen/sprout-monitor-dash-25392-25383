import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import growthAnimation from "@/assets/growth-animation.json";
import { useNavigate } from "react-router-dom";

export const LoadingScreen = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setShowButton(true);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(progressTimer);
  }, []);

  if (!showWelcome) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4">
      <div className="flex flex-col items-center gap-4 sm:gap-8 max-w-md w-full">
        <div className="w-48 h-48 sm:w-64 sm:h-64">
          <Lottie animationData={growthAnimation} loop={true} />
        </div>
        <div className="text-center space-y-3 sm:space-y-4 w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">Aero Growth Squad</h1>
          <div className="space-y-2 w-full max-w-xs mx-auto">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">Loading {progress}%</p>
          </div>
          {showButton && (
            <Button 
              size="lg" 
              className="mt-4 animate-in fade-in duration-500 w-full sm:w-auto"
              onClick={() => {
                setShowWelcome(false);
                navigate("/");
              }}
            >
              Get Started with Aeroponics
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
