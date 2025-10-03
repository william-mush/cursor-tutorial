import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { TutorialOverview } from "@/components/TutorialOverview";
import { GettingStarted } from "@/components/GettingStarted";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <TutorialOverview />
      <GettingStarted />
    </div>
  );
}