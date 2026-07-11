<script lang="ts">
  import { SPECTRUM_FLASH_EVENT } from "$lib/utils/spectrum-flash";
  import { onMount } from "svelte";

  const hueStep = 10;
  const hues = Array.from(
    { length: 360 / hueStep + 1 },
    (_, index) => index * hueStep,
  );

  const spectrumStops = hues.map((hue) => `hsl(${hue} 50% 52%)`).join(", ");
  const glowStops = hues.map((hue) => `hsl(${hue} 50% 72%)`).join(", ");

  let flashing = $state(false);
  let flashTimer: ReturnType<typeof setTimeout> | undefined;

  onMount(() => {
    const onFlash = () => {
      flashing = true;
      clearTimeout(flashTimer);
      flashTimer = setTimeout(() => {
        flashing = false;
      }, 1400);
    };

    window.addEventListener(SPECTRUM_FLASH_EVENT, onFlash);
    return () => {
      window.removeEventListener(SPECTRUM_FLASH_EVENT, onFlash);
      clearTimeout(flashTimer);
    };
  });
</script>

<div class="spectrum-bg" class:spectrum-bg--flash={flashing} aria-hidden="true">
  <div
    class="spectrum-bg__wheel spectrum-bg__wheel--primary"
    style:background={`conic-gradient(from 0deg, ${spectrumStops})`}
  ></div>
  <div
    class="spectrum-bg__wheel spectrum-bg__wheel--secondary"
    style:background={`conic-gradient(from 120deg, ${glowStops})`}
  ></div>
  <div class="spectrum-bg__veil"></div>
</div>

<style>
  .spectrum-bg {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
    background: hsl(200 20% 97%);
  }

  .spectrum-bg__wheel {
    position: absolute;
    border-radius: 50%;
    filter: blur(72px);
    opacity: 0.55;
    will-change: transform;
    transition: opacity 0.45s ease;
  }

  .spectrum-bg__wheel--primary {
    width: min(140vmax, 1600px);
    height: min(140vmax, 1600px);
    top: -35%;
    left: -20%;
    animation: spectrum-drift-primary 48s linear infinite;
  }

  .spectrum-bg__wheel--secondary {
    width: min(120vmax, 1400px);
    height: min(120vmax, 1400px);
    right: -25%;
    bottom: -30%;
    opacity: 0.45;
    animation: spectrum-drift-secondary 64s linear infinite reverse;
  }

  .spectrum-bg__veil {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        ellipse 90% 70% at 50% 0%,
        rgba(255, 255, 255, 0.92),
        rgba(255, 255, 255, 0.55) 45%,
        rgba(255, 255, 255, 0.35) 100%
      ),
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.75) 0%,
        rgba(250, 250, 250, 0.88) 100%
      );
    transition: opacity 0.45s ease;
  }

  .spectrum-bg--flash .spectrum-bg__wheel {
    opacity: 0.88;
    animation-duration: 5s;
  }

  .spectrum-bg--flash .spectrum-bg__wheel--secondary {
    opacity: 0.75;
  }

  .spectrum-bg--flash .spectrum-bg__veil {
    opacity: 0.55;
  }

  @keyframes spectrum-drift-primary {
    from {
      transform: rotate(0deg) scale(1);
    }

    to {
      transform: rotate(360deg) scale(1.05);
    }
  }

  @keyframes spectrum-drift-secondary {
    from {
      transform: rotate(0deg) scale(1.05);
    }

    to {
      transform: rotate(-360deg) scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .spectrum-bg__wheel {
      animation: none;
      transition: opacity 0.3s ease;
    }

    .spectrum-bg--flash .spectrum-bg__wheel {
      animation: none;
      opacity: 0.72;
    }
  }
</style>
