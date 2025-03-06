import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import FallingImages from "@/components/FallingImages";

export default function Home() {
  return (
    <main className="min-h-screen mx-auto">
      <Hero />
      <FeaturesSection />
      <FallingImages />
    </main>
  );
}