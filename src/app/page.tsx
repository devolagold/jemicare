import { DonateCta, Footer } from "@/components/layout";
import {
  FaqSection,
  GetInvolved,
  Governance,
  Hero,
  ImpactSection,
  Intro,
  NominateHighlight,
  PartnershipsHighlight,
  TestimonyHighlight,
  Transparency,
} from "@/components/sections/home";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <Intro />
        <GetInvolved />
        <NominateHighlight />
        <Governance />
        <Transparency />
        <PartnershipsHighlight />
        <ImpactSection />
        <TestimonyHighlight />
        <FaqSection />
        <DonateCta />
      </main>
      <Footer />
    </>
  );
}
