"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

/**
 * Custom interactive, draggable right-edge scrollbar replacing the native browser scrollbar.
 * Supports click-to-jump anywhere on the track and smooth pointer dragging of the thumb.
 */
export function ScrollRail() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const dragOffsetRef = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const sync = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 4) {
        setScrollable(false);
        return;
      }
      setScrollable(true);

      const track = trackRef.current;
      const thumb = thumbRef.current;
      const fill = fillRef.current;
      if (!track || !thumb || !fill) return;

      const trackH = track.clientHeight;
      const ratio = window.innerHeight / doc.scrollHeight;
      const thumbH = Math.max(44, Math.min(trackH * 0.45, trackH * ratio));
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      const maxTop = trackH - thumbH;
      const top = progress * maxTop;

      thumb.style.height = `${thumbH}px`;
      thumb.style.transform = `translate3d(0, ${top}px, 0)`;
      fill.style.height = `${top + thumbH * 0.5}px`;
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(document.documentElement);
    ro.observe(document.body);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      ro.disconnect();
    };
  }, []);

  const scrollToTrackY = (clientY: number, offsetFromThumbTop: number) => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;
    const rect = track.getBoundingClientRect();
    const thumbH = thumb.clientHeight;
    const maxTop = Math.max(1, rect.height - thumbH);
    const clampedTop = Math.min(maxTop, Math.max(0, clientY - rect.top - offsetFromThumbTop));
    const progress = clampedTop / maxTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: progress * maxScroll, behavior: "instant" as ScrollBehavior });
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      scrollToTrackY(e.clientY, dragOffsetRef.current);
    };

    const onUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setDragging(false);
      document.body.style.userSelect = "";
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const handleTrackPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const thumb = thumbRef.current;
    if (!thumb) return;
    e.preventDefault();
    const thumbRect = thumb.getBoundingClientRect();
    const hitThumb = e.clientY >= thumbRect.top && e.clientY <= thumbRect.bottom;
    dragOffsetRef.current = hitThumb ? e.clientY - thumbRect.top : thumbRect.height / 2;
    draggingRef.current = true;
    setDragging(true);
    document.body.style.userSelect = "none";
    if (!hitThumb) {
      scrollToTrackY(e.clientY, dragOffsetRef.current);
    }
  };

  return (
    <div
      ref={trackRef}
      role="scrollbar"
      aria-label="Page scrollbar"
      aria-orientation="vertical"
      aria-controls="main"
      aria-valuenow={0}
      onPointerDown={handleTrackPointerDown}
      data-cursor="Scroll"
      className={`group fixed right-1 top-2 bottom-2 z-[75] w-3.5 cursor-pointer select-none touch-none transition-opacity duration-300 ${
        scrollable ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Slim background rail */}
      <div
        aria-hidden
        className={`absolute right-1 inset-y-0 rounded-full bg-sand/15 transition-all duration-200 ${
          dragging ? "w-1.5 bg-sand/25" : "w-[3px] group-hover:w-1.5 group-hover:bg-sand/25"
        }`}
      />

      {/* Crimson progress trail */}
      <div
        ref={fillRef}
        aria-hidden
        className={`pointer-events-none absolute right-1 top-0 rounded-full bg-signal/45 transition-[width] duration-200 ${
          dragging ? "w-1.5" : "w-[3px] group-hover:w-1.5"
        }`}
      />

      {/* Draggable thumb */}
      <div
        ref={thumbRef}
        aria-hidden
        className={`absolute right-[2px] top-0 rounded-full bg-signal shadow-[0_0_14px_rgba(228,9,8,0.65)] transition-[width,background-color,box-shadow] duration-200 ${
          dragging
            ? "w-2 bg-[#ff2a29] shadow-[0_0_20px_rgba(228,9,8,0.95)]"
            : "w-[5px] group-hover:w-2 group-hover:bg-[#ff2a29]"
        }`}
      />
    </div>
  );
}
