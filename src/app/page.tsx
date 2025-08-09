import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import CurrentProject from "@/components/CurrentProject/CurrentProject";
import Experience from "@/components/Experience/Experience";
import Contact from "@/components/Contact/Contact";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <CurrentProject />
      <Experience />
      <Contact />
    </main>
  );
}
