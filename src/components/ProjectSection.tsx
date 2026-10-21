import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './ProjectSection.css';

type ProjectKind = 'gateway' | 'chrono' | 'edumetrics' | 'graph' | 'ecg' | 'emergence';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  kind: ProjectKind;
  githubUrl: string;
  externalUrl?: string;
  externalLabel?: string;
}

const projects: Project[] = [
  {
    id: 'agentic-gateway',
    title: 'Agentic Commerce Gateway',
    description: 'Secure transaction and action broker allowing AI agents to interact with e-commerce environments. Built with high-throughput routing & authentication pipelines.',
    tags: ['Backend', 'GenAI', 'Node.js', 'FastAPI'],
    kind: 'gateway',
    githubUrl: 'https://github.com/ANSHUMANSINGH987/agentic-commerce-gateway',
    externalUrl: 'https://agentic-commerce-gateway-plum.vercel.app/',
    externalLabel: 'Live Demo',
  },
  {
    id: 'mcp-chronoshell',
    title: 'MCP Chronoshell',
    description: 'A state-reverting Model Context Protocol server that equips AI assistants with a robust undo button for destructive terminal and filesystem actions.',
    tags: ['Python', 'MCP', 'Shell', 'CLI'],
    kind: 'chrono',
    githubUrl: 'https://github.com/ANSHUMANSINGH987/mcp-chronoshell',
    externalUrl: 'https://pypi.org/project/mcp-chronoshell/',
    externalLabel: 'View on PyPI',
  },
  {
    id: 'edumetrics',
    title: 'EduMetrics',
    description: 'End-to-end predictive intelligence web app analyzing multidimensional demographic & academic indicators to forecast student performance.',
    tags: ['Python', 'Scikit-Learn', 'FastAPI', 'Analytics'],
    kind: 'edumetrics',
    githubUrl: 'https://github.com/ANSHUMANSINGH987/Student-performance-analysis',
    externalUrl: 'https://edu-metrics.onrender.com/',
    externalLabel: 'Live Demo',
  },
  {
    id: 'neurograph',
    title: 'NeuroGraph',
    description: 'Graph Neural Network pipeline benchmarked for topological anomaly detection and relational pattern analysis.',
    tags: ['PyTorch', 'GNN', 'Graph Theory', 'Streamlit'],
    kind: 'graph',
    githubUrl: 'https://github.com/ANSHUMANSINGH987/NeuroGraph-FakeNews-Analyzer',
    externalUrl: 'https://neurograph-fakenews-analyzer-ursvtxcpzlievduhp6xfdv.streamlit.app/',
    externalLabel: 'Live Demo',
  },
  {
    id: 'ecg-arrhythmia',
    title: 'ECG Arrhythmia Classification',
    description: 'Edge-deployable neural model classifying real-time cardiograms for rapid arrhythmia detection.',
    tags: ['FastAPI', 'Deep Learning', 'PyTorch'],
    kind: 'ecg',
    githubUrl: 'https://github.com/ANSHUMANSINGH987/ECG_Arrhythmia_Detection_Model',
    externalUrl: 'https://ecgarrhythmiadetectionmodel-vuxxp88qyxmrp6yiotpn8h.streamlit.app/',
    externalLabel: 'Live Demo',
  },
  {
    id: 'emergence-ai',
    title: 'EmergenceAI',
    description: 'Dynamic workflow orchestrations enabling multi-agent execution within secure isolated browser environments.',
    tags: ['LLM', 'Agentic', 'AI', 'Autonomous'],
    kind: 'emergence',
    githubUrl: 'https://github.com/ANSHUMANSINGH987/EmergenceAi',
  },
];

const GatewayVisual = () => (
  <div className="project-visual gateway-visual">
    <div className="visual-kicker">TRANSACTION PIPELINE <span className="live-label">LIVE</span></div>
    <div className="pipeline">
      {['User', 'AI Agent', 'Commerce API'].map((node, index) => (
        <React.Fragment key={node}>
          <div className={`pipeline-node node-${index}`}>
            <span className="pipeline-pulse"></span>
            <strong>{node}</strong>
            <small>{index === 0 ? 'request' : index === 1 ? 'controller' : 'confirmed'}</small>
          </div>
          {index < 2 && <span className="pipeline-track"><i></i><i></i></span>}
        </React.Fragment>
      ))}
    </div>
    <div className="inline-tags"><span>Routing</span><span>Auth</span><span>Confirm</span></div>
  </div>
);

const ChronoVisual = () => (
  <div className="project-visual chrono-visual mono">
    <div className="terminal-title"><span className="terminal-lights">● ● ●</span><span>chronoshell / safe-mode</span><b className="terminal-live">●</b></div>
    <div className="terminal-lines">
      <div><em>$</em> mcp restore --target=head</div>
      <div className="terminal-ok">[OK] File changes reverted (-142s)</div>
      <div className="terminal-muted">[--] snapshot integrity verified</div>
      <div><em>$</em> <span className="terminal-cursor"></span></div>
    </div>
  </div>
);

const EduMetricsVisual = () => (
  <div className="project-visual edumetrics-visual mono">
    <div className="visual-kicker">STUDENT ANALYTICS TELEMETRY <span className="live-label">LIVE</span></div>
    <div className="edu-stat-row">
      <span>R² Score: <b>0.88</b></span>
      <span>MAE: <b>3.42</b></span>
    </div>
    <svg className="distribution-chart" viewBox="0 0 420 78" role="img" aria-label="Predicted and actual score distributions">
      <path className="distribution-grid" d="M0 60H420 M0 38H420 M0 16H420" />
      <path className="distribution-area predicted" d="M0 60 C45 59 60 54 86 42 C120 26 139 18 172 24 C205 30 218 51 246 55 C290 62 313 54 340 45 C367 36 390 45 420 60 Z" />
      <path className="distribution-line" d="M0 60 C45 59 60 54 86 42 C120 26 139 18 172 24 C205 30 218 51 246 55 C290 62 313 54 340 45 C367 36 390 45 420 60" />
      <path className="distribution-line actual" d="M0 60 C48 58 72 57 98 48 C128 38 148 20 180 28 C215 36 224 55 257 57 C300 60 325 48 349 42 C378 35 399 52 420 60" />
    </svg>
    <div className="edu-chart-legend"><span><i className="legend-cyan"></i> Predicted</span><span><i className="legend-emerald"></i> Actual</span></div>
    <div className="engine-pill"><span className="engine-dot"></span> Prediction Engine: Active</div>
  </div>
);

const GraphVisual = () => (
  <div className="project-visual graph-visual">
    <svg viewBox="0 0 420 150" role="img" aria-label="Animated interconnected neural graph visualization">
      <g className="graph-links">
        <line x1="210" y1="75" x2="58" y2="35" /><line x1="210" y1="75" x2="105" y2="113" />
        <line x1="210" y1="75" x2="164" y2="24" /><line x1="210" y1="75" x2="265" y2="25" />
        <line x1="210" y1="75" x2="315" y2="40" /><line x1="210" y1="75" x2="360" y2="88" />
        <line x1="210" y1="75" x2="285" y2="125" /><line x1="210" y1="75" x2="145" y2="137" />
        <line x1="58" y1="35" x2="164" y2="24" /><line x1="164" y1="24" x2="265" y2="25" />
        <line x1="265" y1="25" x2="315" y2="40" /><line x1="360" y1="88" x2="285" y2="125" />
      </g>
      <g className="graph-nodes">
        <circle cx="58" cy="35" r="5" /><circle cx="105" cy="113" r="5" /><circle cx="164" cy="24" r="5" />
        <circle cx="265" cy="25" r="5" /><circle cx="315" cy="40" r="5" /><circle cx="360" cy="88" r="5" />
        <circle cx="285" cy="125" r="5" /><circle cx="145" cy="137" r="5" /><circle cx="210" cy="75" r="10" className="graph-core" />
      </g>
      <g className="graph-signals">
        <circle r="2.5"><animateMotion dur="2.4s" repeatCount="indefinite" path="M210 75 L58 35" /></circle>
        <circle r="2.5"><animateMotion dur="2.8s" begin=".4s" repeatCount="indefinite" path="M210 75 L265 25" /></circle>
        <circle r="2.5"><animateMotion dur="2.2s" begin=".8s" repeatCount="indefinite" path="M210 75 L285 125" /></circle>
        <circle r="2.5"><animateMotion dur="2.6s" begin="1.1s" repeatCount="indefinite" path="M58 35 L164 24" /></circle>
      </g>
    </svg>
    <div className="graph-readout mono"><span>Density: <b>0.82</b></span><span>Activity: <b className="cyan-text">HIGH</b></span></div>
  </div>
);

const EcgVisual = () => (
  <div className="project-visual ecg-visual">
    <div className="visual-kicker">CARDIAC TELEMETRY <span>CH: II</span></div>
    <svg viewBox="0 0 420 100" role="img" aria-label="Animated ECG waveform">
      <path className="ecg-grid" d="M0 25H420 M0 50H420 M0 75H420 M70 0V100 M140 0V100 M210 0V100 M280 0V100 M350 0V100" />
      <path className="ecg-wave" d="M0 52 H65 L75 52 L82 45 L90 58 L98 52 H137 L145 52 L154 20 L163 82 L172 52 H235 L244 52 L251 45 L258 58 L266 52 H305 L313 52 L322 27 L331 77 L340 52 H420" />
      <circle className="ecg-pointer" cx="331" cy="52" r="4" />
    </svg>
    <div className="ecg-readout mono"><span>SIN: <b>72 bpm</b></span><span>Accuracy: <b>99.1%</b></span></div>
  </div>
);

const EmergenceVisual = () => (
  <div className="project-visual emergence-visual mono">
    <div className="visual-kicker">SYSTEM LOGS <span className="live-label">STREAMING</span></div>
    <div className="log-feed">
      <span><b>agent_1</b> -&gt; initialized</span><span><b>router</b> -&gt; tool_call / browser</span>
      <span><b>agent_2</b> -&gt; isolated_context</span><span><b>guard</b> -&gt; policy_pass</span>
    </div>
    <div className="emergence-metrics"><span>Tokens/s: <b>140</b></span><span>Tasks Executed: <b>42</b></span></div>
  </div>
);

const visuals: Record<ProjectKind, React.FC> = {
  gateway: GatewayVisual,
  chrono: ChronoVisual,
  edumetrics: EduMetricsVisual,
  graph: GraphVisual,
  ecg: EcgVisual,
  emergence: EmergenceVisual,
};

const ProjectSection: React.FC = () => (
  <section className="container section project-section" id="selected-projects">
    <div className="section-header">
      <h2 className="section-title"><span>01 |</span> SELECTED PROJECTS</h2>
      <a href="https://github.com/ANSHUMANSINGH987" target="_blank" rel="noopener noreferrer" className="section-link">View GitHub <ArrowUpRight size={14} /></a>
    </div>
    <div className="project-grid">
      {projects.map((project, index) => {
        const Visual = visuals[project.kind];
        return (
          <article id={project.id} key={project.id} className={`project-card project-card-${index + 1}`}>
            <div className="project-card-top"><span className="project-index mono">0{index + 1} / 06</span><span className="project-live-dot"></span></div>
            <Visual />
            <div className="project-content">
              <div className="project-heading-row">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-links">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`}><FaGithub size={14} /></a>
                  {project.externalUrl && <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.externalLabel} for ${project.title}`}><ArrowUpRight size={15} /></a>}
                </div>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <a className="project-github-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <FaGithub size={14} /> Open on GitHub <ArrowUpRight size={13} />
              </a>
              {project.externalUrl && <a className="project-external-link" href={project.externalUrl} target="_blank" rel="noopener noreferrer">
                <ArrowUpRight size={13} /> {project.externalLabel}
              </a>}
            </div>
          </article>
        );
      })}
    </div>
    <a className="projects-github-button" href="https://github.com/ANSHUMANSINGH987" target="_blank" rel="noopener noreferrer">
      <FaGithub size={16} /> Explore More on GitHub <ArrowUpRight size={15} />
    </a>
  </section>
);

export default ProjectSection;
