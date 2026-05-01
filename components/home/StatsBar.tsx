"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";

const STATS = [
  { value: "500+", label: "Students Placed" },
  { value: "10+", label: "Partner Universities" },
  { value: "6", label: "Years of Experience" },
  { value: "98%", label: "Visa Success Rate" },
] as const;

function parseStat(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  return match ? { num: parseInt(match[1]), suffix: match[2] } : { num: 0, suffix: "" };
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);
  const { num, suffix } = parseStat(value);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    let start: number | null = null;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(num);
    };

    requestAnimationFrame(tick);
  }, [isInView, num]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="bg-gold py-12 md:py-14" aria-label="Key statistics">
      <div className="container-padded">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STATS.map(({ value, label }) => (
            <StaggerItem key={label} className="flex flex-col items-center gap-1 text-center">
              <span className="font-display text-3xl md:text-4xl font-bold text-white">
                <CountUp value={value} />
              </span>
              <span className="text-white/80 text-sm font-medium">{label}</span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
