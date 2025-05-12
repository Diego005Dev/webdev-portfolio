"use client"

import { useEffect, useState } from "react"

interface PreloaderProps {
  currentEra: "8bit" | "16bit" | "32bit"
}

export function Preloader({ currentEra }: PreloaderProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time (you can replace this with actual loading logic)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {currentEra === "8bit" && (
        <div className="text-center">
          <div className="pacman-container">
            <div className="pacman">
              <div className="pacman-top"></div>
              <div className="pacman-bottom"></div>
            </div>
            <div className="dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
          <p className="mt-4 text-white pixel-text">Loading...</p>

          <style jsx>{`
            .pacman-container {
              position: relative;
              width: 200px;
              height: 60px;
            }
            
            .pacman {
              position: absolute;
              left: 0;
              top: 0;
              animation: move-pacman 3s linear infinite;
            }
            
            .pacman-top, .pacman-bottom {
              width: 0px;
              height: 0px;
              border-right: 30px solid transparent;
              border-top: 30px solid yellow;
              border-left: 30px solid yellow;
              border-bottom: 30px solid yellow;
              border-top-left-radius: 30px;
              border-top-right-radius: 30px;
              border-bottom-left-radius: 30px;
              border-bottom-right-radius: 30px;
              position: absolute;
            }
            
            .pacman-top {
              transform: rotate(0deg);
              animation: pacman-top 0.5s ease infinite;
            }
            
            .pacman-bottom {
              transform: rotate(0deg);
              animation: pacman-bottom 0.5s ease infinite;
            }
            
            .dots {
              display: flex;
              position: absolute;
              left: 60px;
              top: 30px;
              transform: translateY(-50%);
              gap: 20px;
            }
            
            .dot {
              width: 10px;
              height: 10px;
              background-color: white;
              border-radius: 50%;
              animation: dot-disappear 3s linear infinite;
            }
            
            .dot:nth-child(2) {
              animation-delay: 0.5s;
            }
            
            .dot:nth-child(3) {
              animation-delay: 1s;
            }
            
            .dot:nth-child(4) {
              animation-delay: 1.5s;
            }
            
            .dot:nth-child(5) {
              animation-delay: 2s;
            }
            
            @keyframes pacman-top {
              0%, 100% {
                transform: rotate(0deg);
              }
              50% {
                transform: rotate(-45deg);
              }
            }
            
            @keyframes pacman-bottom {
              0%, 100% {
                transform: rotate(0deg);
              }
              50% {
                transform: rotate(45deg);
              }
            }
            
            @keyframes move-pacman {
              0% {
                left: 0;
              }
              100% {
                left: 140px;
              }
            }
            
            @keyframes dot-disappear {
              0% {
                opacity: 1;
              }
              20% {
                opacity: 1;
              }
              21% {
                opacity: 0;
              }
              100% {
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}

      {currentEra === "16bit" && (
        <div className="text-center">
          <div className="pacman-16bit-container">
            <div className="maze"></div>

            {/* Pellets that Pac-Man will eat */}
            <div className="pellet pellet-1"></div>
            <div className="pellet pellet-2"></div>
            <div className="pellet pellet-3"></div>
            <div className="pellet pellet-4"></div>
            <div className="pellet pellet-5"></div>
            <div className="pellet pellet-6"></div>
            <div className="pellet pellet-7"></div>
            <div className="power-pellet"></div>

            {/* Pac-Man character */}
            <div className="pacman-16bit">
              <div className="pacman-16bit-body"></div>
              <div className="pacman-16bit-eye"></div>
            </div>
          </div>
          <p className="mt-4 text-white semi-pixel-text">Loading...</p>

          <style jsx>{`
            .pacman-16bit-container {
              position: relative;
              width: 300px;
              height: 150px;
              background-color: #000;
              border: 3px solid #4a6cd4;
              border-radius: 4px;
              overflow: hidden;
            }
            
            .pacman-16bit {
              position: absolute;
              left: 20px;
              top: 75px;
              transform: translateY(-50%);
              width: 40px;
              height: 40px;
              animation: pacman-16bit-move 6s linear infinite;
              z-index: 10;
            }
            
            .pacman-16bit-body {
              width: 40px;
              height: 40px;
              background-color: #ffff00;
              border-radius: 50%;
              clip-path: polygon(100% 0, 50% 50%, 100% 100%, 0 100%, 0 0);
              animation: pacman-16bit-chomp 0.3s linear infinite;
            }
            
            .pacman-16bit-eye {
              position: absolute;
              top: 8px;
              left: 12px;
              width: 6px;
              height: 6px;
              background-color: #000;
              border-radius: 50%;
            }
            
            .pellet {
              position: absolute;
              width: 8px;
              height: 8px;
              background-color: #ffb8de;
              border-radius: 50%;
              top: 75px;
              transform: translateY(-50%);
              z-index: 5;
            }
            
            .pellet-1 { left: 80px; }
            .pellet-2 { left: 120px; }
            .pellet-3 { left: 160px; }
            .pellet-4 { left: 200px; }
            .pellet-5 { left: 240px; }
            .pellet-6 { left: 280px; }
            .pellet-7 { left: 320px; }
            
            .power-pellet {
              position: absolute;
              width: 16px;
              height: 16px;
              background-color: #ffb8de;
              border-radius: 50%;
              top: 75px;
              left: 200px;
              transform: translateY(-50%);
              z-index: 5;
              animation: power-pellet-blink 0.5s ease-in-out infinite;
            }
            
            .maze {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-image: 
                linear-gradient(to right, #2c3cd4 2px, transparent 2px),
                linear-gradient(to bottom, #2c3cd4 2px, transparent 2px);
              background-size: 30px 30px;
              opacity: 0.3;
            }
            
            @keyframes pacman-16bit-move {
              0% {
                left: 20px;
                transform: translateY(-50%) scaleX(1);
              }
              45% {
                left: 240px;
                transform: translateY(-50%) scaleX(1);
              }
              50% {
                left: 240px;
                transform: translateY(-50%) scaleX(-1);
              }
              95% {
                left: 20px;
                transform: translateY(-50%) scaleX(-1);
              }
              100% {
                left: 20px;
                transform: translateY(-50%) scaleX(1);
              }
            }
            
            @keyframes pacman-16bit-chomp {
              0%, 100% {
                clip-path: polygon(100% 0, 50% 50%, 100% 100%, 0 100%, 0 0);
              }
              50% {
                clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
              }
            }
            
            @keyframes power-pellet-blink {
              0%, 100% {
                opacity: 1;
                transform: translateY(-50%) scale(1);
              }
              50% {
                opacity: 0.7;
                transform: translateY(-50%) scale(0.8);
              }
            }
            
            /* Precise pellet disappearing animations */
            .pellet-1 {
              animation: pellet-1-disappear 6s linear infinite;
            }
            
            .pellet-2 {
              animation: pellet-2-disappear 6s linear infinite;
            }
            
            .pellet-3 {
              animation: pellet-3-disappear 6s linear infinite;
            }
            
            .pellet-4 {
              animation: pellet-4-disappear 6s linear infinite;
            }
            
            .pellet-5 {
              animation: pellet-5-disappear 6s linear infinite;
            }
            
            .pellet-6 {
              animation: pellet-6-disappear 6s linear infinite;
            }
            
            .pellet-7 {
              animation: pellet-7-disappear 6s linear infinite;
            }
            
            .power-pellet {
              animation: power-pellet-disappear 6s linear infinite, power-pellet-blink 0.5s ease-in-out infinite;
            }
            
            @keyframes pellet-1-disappear {
              0% { opacity: 1; }
              10% { opacity: 1; }
              10.1% { opacity: 0; }
              50% { opacity: 0; }
              50.1% { opacity: 0; }
              90% { opacity: 0; }
              90.1% { opacity: 1; }
              100% { opacity: 1; }
            }
            
            @keyframes pellet-2-disappear {
              0% { opacity: 1; }
              16.6% { opacity: 1; }
              16.7% { opacity: 0; }
              50% { opacity: 0; }
              50.1% { opacity: 0; }
              83.3% { opacity: 0; }
              83.4% { opacity: 1; }
              100% { opacity: 1; }
            }
            
            @keyframes pellet-3-disappear {
              0% { opacity: 1; }
              23.3% { opacity: 1; }
              23.4% { opacity: 0; }
              50% { opacity: 0; }
              50.1% { opacity: 0; }
              76.6% { opacity: 0; }
              76.7% { opacity: 1; }
              100% { opacity: 1; }
            }
            
            @keyframes pellet-4-disappear {
              0% { opacity: 1; }
              30% { opacity: 1; }
              30.1% { opacity: 0; }
              50% { opacity: 0; }
              50.1% { opacity: 0; }
              70% { opacity: 0; }
              70.1% { opacity: 1; }
              100% { opacity: 1; }
            }
            
            @keyframes pellet-5-disappear {
              0% { opacity: 1; }
              36.6% { opacity: 1; }
              36.7% { opacity: 0; }
              50% { opacity: 0; }
              50.1% { opacity: 0; }
              63.3% { opacity: 0; }
              63.4% { opacity: 1; }
              100% { opacity: 1; }
            }
            
            @keyframes pellet-6-disappear {
              0% { opacity: 1; }
              43.3% { opacity: 1; }
              43.4% { opacity: 0; }
              50% { opacity: 0; }
              50.1% { opacity: 0; }
              56.6% { opacity: 0; }
              56.7% { opacity: 1; }
              100% { opacity: 1; }
            }
            
            @keyframes pellet-7-disappear {
              0% { opacity: 1; }
              50% { opacity: 1; }
              50.1% { opacity: 0; }
              100% { opacity: 1; }
            }
            
            @keyframes power-pellet-disappear {
              0% { opacity: 1; }
              30% { opacity: 1; }
              30.1% { opacity: 0; }
              50% { opacity: 0; }
              50.1% { opacity: 0; }
              70% { opacity: 0; }
              70.1% { opacity: 1; }
              100% { opacity: 1; }
            }
          `}</style>
        </div>
      )}

      {currentEra === "32bit" && (
        <div className="text-center">
          <div className="pacman-32bit-container">
            <div className="pacman-32bit-background"></div>
            <div className="pacman-32bit-world">
              <div className="pacman-32bit-grid"></div>

              {/* Pellets with adjusted spacing for 5% margin */}
              <div className="pellet-32bit pellet-1"></div>
              <div className="pellet-32bit pellet-2"></div>
              <div className="pellet-32bit pellet-3"></div>
              <div className="pellet-32bit pellet-4"></div>
              <div className="pellet-32bit pellet-5"></div>
              <div className="power-pellet-32bit"></div>

              {/* Modern Pac-Man with 5% margin movement */}
              <div className="pacman-track">
                <div className="pacman-wrapper">
                  <div className="pacman-32bit">
                    <div className="pacman-eye"></div>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="progress-container">
                <div className="progress-bar"></div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-white font-medium">Loading...</p>

          <style jsx>{`
            .pacman-32bit-container {
              position: relative;
              width: 320px;
              height: 180px;
              perspective: 800px;
              overflow: hidden;
              border-radius: 12px;
              border: 3px solid #ff7b00;
              box-shadow: 0 0 15px #ff7b00, 0 0 25px rgba(255, 123, 0, 0.5);
            }
            
            /* Full background to prevent black gaps */
            .pacman-32bit-background {
              position: absolute;
              top: -5px;
              left: -5px;
              right: -5px;
              bottom: -5px;
              background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
              z-index: 1;
            }
            
            .pacman-32bit-world {
              position: relative;
              width: 100%;
              height: 100%;
              transform-style: preserve-3d;
              transform: rotateX(5deg); /* Reduced angle to minimize gaps */
              z-index: 2;
              overflow: hidden;
            }
            
            .pacman-32bit-grid {
              position: absolute;
              top: -10px; /* Extended to cover top gap */
              left: -10px; /* Extended to cover left gap */
              right: -10px; /* Extended to cover right gap */
              bottom: -10px; /* Extended to cover bottom gap */
              background-image: 
                linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
              background-size: 40px 40px;
              transform: translateZ(0);
              animation: grid-move 8s linear infinite;
            }
            
            @keyframes grid-move {
              0% {
                background-position: 0 0;
              }
              100% {
                background-position: 40px 40px;
              }
            }
            
            /* Track for Pac-Man movement with 5% margin */
            .pacman-track {
              position: absolute;
              top: 50%;
              left: 0;
              width: 100%;
              height: 1px;
              z-index: 5;
            }
            
            /* Wrapper to handle the horizontal movement with 5% margin */
            .pacman-wrapper {
              position: absolute;
              top: 0;
              left: 0;
              width: 40px;
              height: 40px;
              z-index: 10;
              transform: translateY(-50%);
              animation: pacman-wrapper-move 6s linear infinite;
            }
            
            .pacman-32bit {
              position: absolute;
              width: 40px;
              height: 40px;
              top: 0;
              left: 0;
              background-color: #ffff00;
              border-radius: 50%;
              animation: pacman-direction 6s linear infinite, pacman-32bit-chomp 0.3s linear infinite;
            }
            
            .pacman-eye {
              position: absolute;
              top: 8px;
              left: 12px;
              width: 6px;
              height: 6px;
              background-color: #000;
              border-radius: 50%;
              z-index: 11;
              animation: eye-move 6s linear infinite;
            }
            
            /* Uniform pellet positioning with 5% margin */
            .pellet-32bit {
              position: absolute;
              width: 12px;
              height: 12px;
              background: #ffffff;
              border-radius: 50%;
              top: 50%;
              transform: translateY(-50%);
              z-index: 5;
            }
            
            /* Evenly spaced pellets with 5% margin */
            .pellet-1 { left: 56px; }
            .pellet-2 { left: 112px; }
            .pellet-3 { left: 160px; }
            .pellet-4 { left: 208px; }
            .pellet-5 { left: 264px; }
            
            .power-pellet-32bit {
              position: absolute;
              width: 20px;
              height: 20px;
              background: #00ffff;
              border-radius: 50%;
              top: 50%;
              left: 160px;
              transform: translateY(-50%);
              animation: power-pellet-pulse 1s linear infinite alternate;
              z-index: 5;
            }
            
            @keyframes power-pellet-pulse {
              0% {
                transform: translateY(-50%) scale(0.9);
              }
              100% {
                transform: translateY(-50%) scale(1.1);
              }
            }
            
            /* 5% margin movement */
            @keyframes pacman-wrapper-move {
              0% {
                left: 16px;
              }
              45% {
                left: 264px;
              }
              50% {
                left: 264px;
              }
              95% {
                left: 16px;
              }
              100% {
                left: 16px;
              }
            }
            
            @keyframes eye-move {
              0% {
                left: 12px;
              }
              45% {
                left: 12px;
              }
              50% {
                left: 22px;
              }
              95% {
                left: 22px;
              }
              100% {
                left: 12px;
              }
            }
            
            @keyframes pacman-32bit-chomp {
              0%, 100% {
                clip-path: polygon(100% 0, 50% 50%, 100% 100%, 0 100%, 0 0);
              }
              50% {
                clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
              }
            }
            
            /* Direction change for Pac-Man */
            @keyframes pacman-direction {
              0%, 45% {
                transform: scaleX(1); /* Facing right */
              }
              50%, 95% {
                transform: scaleX(-1); /* Facing left */
              }
              100% {
                transform: scaleX(1); /* Back to facing right */
              }
            }
            
            /* Pellet disappearing animations with adjusted timing for 5% margin */
            .pellet-1 {
              animation: pellet-1-disappear 6s linear infinite;
            }
            
            .pellet-2 {
              animation: pellet-2-disappear 6s linear infinite;
            }
            
            .pellet-3 {
              animation: pellet-3-disappear 6s linear infinite;
            }
            
            .pellet-4 {
              animation: pellet-4-disappear 6s linear infinite;
            }
            
            .pellet-5 {
              animation: pellet-5-disappear 6s linear infinite;
            }
            
            .power-pellet-32bit {
              animation: power-pellet-32bit-disappear 6s linear infinite, power-pellet-pulse 1s linear infinite alternate;
            }
            
            /* Recalculated timing for 5% margin pellets */
            @keyframes pellet-1-disappear {
              0% { opacity: 1; }
              8% { opacity: 1; }
              9% { opacity: 0; }
              50% { opacity: 0; }
              91% { opacity: 0; }
              92% { opacity: 1; }
              100% { opacity: 1; }
            }
            
            @keyframes pellet-2-disappear {
              0% { opacity: 1; }
              17% { opacity: 1; }
              18% { opacity: 0; }
              50% { opacity: 0; }
              82% { opacity: 0; }
              83% { opacity: 1; }
              100% { opacity: 1; }
            }
            
            @keyframes pellet-3-disappear {
              0% { opacity: 1; }
              25% { opacity: 1; }
              26% { opacity: 0; }
              50% { opacity: 0; }
              74% { opacity: 0; }
              75% { opacity: 1; }
              100% { opacity: 1; }
            }
            
            @keyframes pellet-4-disappear {
              0% { opacity: 1; }
              33% { opacity: 1; }
              34% { opacity: 0; }
              50% { opacity: 0; }
              66% { opacity: 0; }
              67% { opacity: 1; }
              100% { opacity: 1; }
            }
            
            @keyframes pellet-5-disappear {
              0% { opacity: 1; }
              42% { opacity: 1; }
              43% { opacity: 0; }
              50% { opacity: 0; }
              57% { opacity: 0; }
              58% { opacity: 1; }
              100% { opacity: 1; }
            }
            
            @keyframes power-pellet-32bit-disappear {
              0% { opacity: 1; }
              25% { opacity: 1; }
              26% { opacity: 0; }
              50% { opacity: 0; }
              74% { opacity: 0; }
              75% { opacity: 1; }
              100% { opacity: 1; }
            }
            
            /* Progress bar */
            .progress-container {
              position: absolute;
              bottom: 20px;
              left: 50%;
              transform: translateX(-50%);
              width: 200px;
              height: 6px;
              background-color: rgba(255, 255, 255, 0.2);
              border-radius: 3px;
              overflow: hidden;
            }
            
            .progress-bar {
              height: 100%;
              width: 0%;
              background: linear-gradient(to right, #00ffff, #ffff00);
              border-radius: 3px;
              animation: progress 2s linear infinite;
              box-shadow: 0 0 10px rgba(0, 255, 255, 0.7);
            }
            
            @keyframes progress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}
