import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import {
  Hero, Stats, Features, Roles, Modules, ContentShowcase,
  Assessments, VideoLearning, Notifications, Governance,
  Architecture, WhyChoose, Testimonials, Pricing, FAQ, CTA, Footer,
} from "@/components/lms-sections";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Xebia Enterprise LMS — One Platform for Learning at Scale" },
      { name: "description", content: "Enterprise-grade Learning Management System for universities, organisations and enterprises. Identity, courses, assessments, video learning, notifications and reporting on one multi-tenant platform." },
      { property: "og:title", content: "Xebia Enterprise LMS" },
      { property: "og:description", content: "One multi-tenant platform for identity, courses, video learning, assessments and analytics." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Roles />
        <Modules />
        <ContentShowcase />
        <Assessments />
        <VideoLearning />
        <Notifications />
        <Governance />
        <Architecture />
        <WhyChoose />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="ring-focus fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full btn-hero grid place-items-center"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
