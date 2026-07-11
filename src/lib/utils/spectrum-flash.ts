/** Custom event: logo easter egg → spectrum background flash. */
export const SPECTRUM_FLASH_EVENT = "spectrum-flash";

export function requestSpectrumFlash(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(SPECTRUM_FLASH_EVENT));
}
