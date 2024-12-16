import { TitleWithGradient } from "@/components/ui/title";

const heroText = "Your dog's home away from home";

export function Hero() {
  return (
    <div className="motion-preset-blur-down-lg motion-delay-500 motion-loop-once pointer-events-none absolute bottom-20 left-0 right-0 z-10 flex select-none items-center justify-center p-8 md:bottom-10">
      <TitleWithGradient className="text-center leading-[1.2] [font-size:var(--font-size-fluid-1)] md:[font-size:var(--font-size-fluid-2)]">
        {heroText}
      </TitleWithGradient>
    </div>
  );
}
