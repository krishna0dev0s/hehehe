"use client";

import FaultyTerminal from "./FaultyTerminal.js";

export default function FaultyTerminalWrapper() {
  return (
    <FaultyTerminal
      scale={1.1}
      gridMul={[2.2, 1.3]}
      digitSize={1.6}
      timeScale={0.4}
      scanlineIntensity={0.35}
      glitchAmount={1.1}
      flickerAmount={0.6}
      noiseAmp={0.6}
      chromaticAberration={0.002}
      dither={0.3}
      curvature={0.12}
      tint="#c8c8c8"
      mouseReact={false}
      mouseStrength={0}
      pageLoadAnimation={true}
      brightness={1.0}
    />
  );
}
