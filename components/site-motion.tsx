"use client";

import { useEffect } from "react";

export function SiteMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>(".site-header--v5");
    const heroMedia = document.querySelector<HTMLElement>(".brand-hero__media");
    const footer = document.querySelector<HTMLElement>(".site-footer");
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".look-card"));
    const cameras = Array.from(document.querySelectorAll<HTMLElement>(".brand-camera-tile"));

    root.dataset.motionReady = "true";

    if (reduceMotion) {
      footer?.classList.add("is-inview");
      cards.forEach((card) => card.classList.add("is-inview"));
      cameras.forEach((card) => card.classList.add("is-inview"));
      return () => {
        delete root.dataset.motionReady;
      };
    }

    let frame = 0;
    const updateScroll = () => {
      frame = 0;
      const y = window.scrollY;
      header?.classList.toggle("is-scrolled", y > 28);

      if (heroMedia) {
        const rect = heroMedia.getBoundingClientRect();
        const viewport = window.innerHeight || 1;
        if (rect.bottom > 0 && rect.top < viewport) {
          const progress = Math.max(-1, Math.min(1, (viewport * 0.5 - rect.top) / viewport));
          heroMedia.style.setProperty("--hero-parallax-y", `${progress * 34}px`);
          heroMedia.style.setProperty("--hero-parallax-scale", `${1 + Math.abs(progress) * 0.012}`);
        }
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.classList.add("is-inview");
          observer.unobserve(target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -7% 0px" },
    );

    if (footer) observer.observe(footer);
    cards.forEach((card) => observer.observe(card));
    cameras.forEach((card) => observer.observe(card));

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      delete root.dataset.motionReady;
    };
  }, []);

  return null;
}
