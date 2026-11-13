import type { CSSProperties } from "react";

/** The brochure poster (1024x1536) and named regions of it, so sections can reuse real artwork as collage pieces. */
export const POSTER = { src: "/images/hero/kernel-hero.jpg", w: 1024, h: 1536 };

/** Where the poster's red column sits, as fractions of the poster. The hero flood starts from exactly this rectangle. */
export const BAR = { x1: 0.3955, x2: 0.6104, y1: 0.0625, y2: 0.856 };

export interface Crop { x: number; y: number; w: number; h: number }

export const CROPS = {
  statue: { x: 235, y: 545, w: 395, h: 495 },
  building: { x: 625, y: 615, w: 280, h: 385 },
  crowd: { x: 155, y: 930, w: 445, h: 360 },
  rock: { x: 600, y: 985, w: 240, h: 380 },
  title: { x: 100, y: 205, w: 830, h: 210 }
} satisfies Record<string, Crop>;

/** Style that shows one region of the poster inside a box with the same aspect ratio as the region. */
export function cropStyle(c: Crop): CSSProperties {
  return {
    aspectRatio: `${c.w} / ${c.h}`,
    backgroundImage: `url(${POSTER.src})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${(POSTER.w / c.w) * 100}% auto`,
    backgroundPosition: `${(c.x / (POSTER.w - c.w)) * 100}% ${(c.y / (POSTER.h - c.h)) * 100}%`
  };
}
