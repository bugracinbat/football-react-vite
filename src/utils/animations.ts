import { keyframes } from "@mui/system";

// Gradient animations
export const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Floating animations
export const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// Pulse animations
export const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Glow animations
export const glowAnimation = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(0, 112, 243, 0.2);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 112, 243, 0.4);
  }
  100% {
    box-shadow: 0 0 5px rgba(0, 112, 243, 0.2);
  }
`;

// Fade in animations
export const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Slide in animations
export const slideInAnimation = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Scale in animations
export const scaleInAnimation = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// Shimmer animation
export const shimmerAnimation = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

// Common animation styles
export const commonAnimationStyles = {
  gradient: {
    background: "linear-gradient(45deg, #0070f3, #7928ca, #0070f3)",
    backgroundSize: "200% 200%",
    animation: `${gradientAnimation} 15s ease infinite`,
  },
  float: {
    animation: `${floatAnimation} 3s ease-in-out infinite`,
  },
  pulse: {
    animation: `${pulseAnimation} 2s ease-in-out infinite`,
  },
  glow: {
    animation: `${glowAnimation} 3s ease-in-out infinite`,
  },
  fadeIn: {
    animation: `${fadeInAnimation} 0.5s ease-out forwards`,
  },
  slideIn: {
    animation: `${slideInAnimation} 0.5s ease-out forwards`,
  },
  scaleIn: {
    animation: `${scaleInAnimation} 0.5s ease-out forwards`,
  },
  shimmer: {
    background:
      "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)",
    backgroundSize: "1000px 100%",
    animation: `${shimmerAnimation} 2s infinite linear`,
  },
};
