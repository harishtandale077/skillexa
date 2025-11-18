import Hero from '../components/Hero';
import CallToAction from '../components/CallToAction';
import Testimonials from '../components/Testimonials';
import Features from '../components/Features';
import Footer from '../components/Footer';

export default function LandingPage({ goToLogin, goToRegister }) {
  return (
    <div className="min-h-screen bg-white">
      <Hero goToLogin={goToLogin} goToRegister={goToRegister} />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}