"use client";

import dynamic from "next/dynamic";

const FaultyTerminal = dynamic(
  () => import("@/components/ui/Backgrounds/FaultyTerminal/FaultyTerminal"),
  { ssr: false }
);

export default function FaultyTerminalBg() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }} className="fixed inset-0 -z-20">
      <FaultyTerminal
        scale={1.5}
        gridMul={[2, 1]}
        digitSize={1.2}
        timeScale={1}
        pause={false}
        scanlineIntensity={1}
        glitchAmount={1}
        flickerAmount={1}
        noiseAmp={1}
        chromaticAberration={0}
        dither={0}
        curvature={0}
        tint="#808080"
        mouseReact={false}
        mouseStrength={0}
        pageLoadAnimation={false}
        brightness={0.7}
      />
    </div>
  );
}
