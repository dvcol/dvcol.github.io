import type { ParticlesProps } from 'solid-particles';

export const TriangleParticles: ParticlesProps['options'] = {
  fpsLimit: 60,
  delay: 0,
  particles: {
    number: {
      value: 5,
      density: {
        enable: true,
        area: 100,
      },
    },
    color: {
      value: '#fff',
      animation: {
        enable: true,
        speed: 10,
        sync: true,
      },
    },
    stroke: {
      width: 0,
    },
    opacity: {
      value: 0.5,
      random: false,
      animation: {
        enable: false,
        speed: 3,
        minimumValue: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      animation: {
        enable: false,
        speed: 20,
        minimumValue: 0.1,
        sync: false,
      },
    },
    links: {
      enable: true,
      distance: 200,
      color: 'rgba(255,255,255,0.2)',
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: 'none',
      random: false,
      straight: false,
      outMode: 'out',
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onHover: {
        enable: true,
        mode: 'grab',
      },
      onClick: {
        enable: true,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 200,
        links: {
          opacity: 0.5,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 0.8,
      },
      repulse: {
        distance: 100,
      },
      push: {
        quantity: 4,
      },
      remove: {
        quantity: 2,
      },
    },
  },
  fullScreen: {
    enable: false,
  },
  detectRetina: true,
};
