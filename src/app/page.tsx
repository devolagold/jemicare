import { DonateCta, Footer } from "@/components/layout";
import {
  FaqSection,
  GetInvolved,
  Governance,
  Hero,
  ImpactSection,
  Intro,
  Transparency,
} from "@/components/sections/home";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <Intro />
        <GetInvolved />
        <Governance />
        <Transparency />
        <ImpactSection />
        <FaqSection />
        <DonateCta />
      </main>
      <Footer />
    </>
  );
}
