import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectSection from './components/ProjectSection';
import TerminalPlayground from './components/TechStack';
import ProofOfWork from './components/ProofOfWork';
import VisitorAnalytics from './components/EngineeringDNA';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';

function App() {
  return (
    <>
      <div className="grid-bg-overlay"></div>
      <Navbar />
      <main>
        <Hero />
        <ProjectSection />
        <TerminalPlayground />
        <ProofOfWork />
        <VisitorAnalytics />
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}

export default App;
