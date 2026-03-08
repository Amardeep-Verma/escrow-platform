import { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";

export default function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const initParticles = async () => {
      await loadSlim(tsParticles);
      setInit(true);
    };

    initParticles();
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 z-0"
      options={{
        fullScreen: { enable: false },

        background: {
          color: "transparent",
        },

        fpsLimit: 60,

        particles: {
          number: {
            value: 90,
            density: { enable: true, area: 800 },
          },

          color: { value: "#818cf8" },

          opacity: {
            value: 0.6,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.3,
              sync: false,
            },
          },

          size: {
            value: { min: 1, max: 4 },
          },

          links: {
            enable: true,
            distance: 160,
            color: "#818cf8",
            opacity: 0.35,
            width: 1,
          },

          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
        },

        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
          },
          modes: {
            grab: {
              distance: 160,
              links: {
                opacity: 0.8,
              },
            },
          },
        },

        detectRetina: true,
      }}
    />
  );
}
