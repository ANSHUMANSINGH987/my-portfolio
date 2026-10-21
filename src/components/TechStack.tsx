import React, { useEffect, useRef, useState } from 'react';
import type { IconType } from 'react-icons';
import {
  SiAnthropic,
  SiBun,
  SiClerk,
  SiCloudflare,
  SiCursor,
  SiDigitalocean,
  SiDrizzle,
  SiDocker,
  SiExpress,
  SiFramer,
  SiGit,
  SiGo,
  SiGithub,
  SiGithubactions,
  SiGooglegemini,
  SiHono,
  SiJavascript,
  SiLinux,
  SiNeon,
  SiNextdotjs,
  SiNodedotjs,
  SiNginx,
  SiNpm,
  SiNotion,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiReactrouter,
  SiRedis,
  SiShadcnui,
  SiSolana,
  SiSocketdotio,
  SiStrapi,
  SiTailwindcss,
  SiTrpc,
  SiTurborepo,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
import { Braces, Cloud } from 'lucide-react';
import './TechStack.css';

const RESUME_URL = 'https://drive.google.com/file/d/16rdAEjke3ueGtOwGnjLIBktlESSN2fzl/view?usp=sharing';
const LINKEDIN_URL = 'https://www.linkedin.com/in/anshuman-singh-258245371';
const EMAIL = 'singhanshuman584@gmail.com';

interface TerminalEntry {
  command?: string;
  output: string;
}

interface Technology {
  name: string;
  icon?: IconType;
}

interface TechnologyGroup {
  label: string;
  technologies: Technology[];
}

const TECH_STACK: TechnologyGroup[] = [
  {
    label: 'Languages',
    technologies: [
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Go', icon: SiGo },
      { name: 'Python', icon: SiPython },
    ],
  },
  {
    label: 'Frontend / UI',
    technologies: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'React', icon: SiReact },
      { name: 'Motion', icon: SiFramer },
      { name: 'React Router', icon: SiReactrouter },
      { name: 'Shadcn UI', icon: SiShadcnui },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Zustand', icon: Braces },
    ],
  },
  {
    label: 'Backend & APIs',
    technologies: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Bun', icon: SiBun },
      { name: 'BetterAuth', icon: Braces },
      { name: 'Clerk', icon: SiClerk },
      { name: 'Drizzle', icon: SiDrizzle },
      { name: 'Express', icon: SiExpress },
      { name: 'Hono', icon: SiHono },
      { name: 'NPM', icon: SiNpm },
      { name: 'Prisma', icon: SiPrisma },
      { name: 'Redis', icon: SiRedis },
      { name: 'Socket.io', icon: SiSocketdotio },
      { name: 'Solana', icon: SiSolana },
      { name: 'Strapi', icon: SiStrapi },
      { name: 'tRPC', icon: SiTrpc },
    ],
  },
  {
    label: 'Cloud & Databases',
    technologies: [
      { name: 'Turborepo', icon: SiTurborepo },
      { name: 'NeonDB', icon: SiNeon },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'DigitalOcean', icon: SiDigitalocean },
      { name: 'Oracle', icon: Cloud },
      { name: 'AWS', icon: Cloud },
      { name: 'Cloudflare', icon: SiCloudflare },
    ],
  },
  {
    label: 'DevOps & Tools',
    technologies: [
      { name: 'Docker', icon: SiDocker },
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Linux', icon: SiLinux },
      { name: 'Nginx', icon: SiNginx },
      { name: 'Vercel', icon: SiVercel },
      { name: 'GitHub Actions', icon: SiGithubactions },
      { name: 'Cursor', icon: SiCursor },
      { name: 'Gemini AI', icon: SiGooglegemini },
      { name: 'Notion', icon: SiNotion },
      { name: 'Claude', icon: SiAnthropic },
    ],
  },
];

const totalTechnologies = TECH_STACK.reduce((total, group) => total + group.technologies.length, 0);

const welcomeEntry: TerminalEntry = {
  output: 'Welcome to anshuman-os. Type "help" to see available commands.',
};

const commandOutput = (command: string): string => {
  switch (command) {
    case 'help':
      return 'Available commands:\n  about     background and focus\n  projects  selected work\n  skills    core languages and tools\n  contact   email and LinkedIn\n  resume    open resume PDF\n  clear     clear terminal history';
    case 'about':
      return 'Anshuman Singh is a Computer Science and AI undergraduate focused on building reliable AI systems, machine learning products, and backend infrastructure.\nHe enjoys turning complex ideas into practical, observable software with clean interfaces and strong engineering fundamentals.';
    case 'projects':
      return 'Selected projects:\n  Agentic Commerce Gateway   secure AI transaction broker\n  MCP Chronoshell            reversible terminal execution\n  EduMetrics                 predictive student analytics\n  NeuroGraph                 graph neural network benchmarks';
    case 'skills':
      return 'CORE TOOLCHAIN\n────────────────────────────────\n  Languages   C++ · Python · TypeScript · JavaScript · SQL · Bash\n  AI / ML     PyTorch · TensorFlow · OpenCV · Scikit-learn\n  Backend     FastAPI · Node.js · PostgreSQL · MongoDB\n  Systems     MCP · Docker · Linux · Git';
    case 'contact':
      return `EMAIL      ${EMAIL}\nLINKEDIN   ${LINKEDIN_URL}`;
    case 'resume':
      window.open(RESUME_URL, '_blank', 'noopener,noreferrer');
      return 'Opening resume in a new tab...';
    default:
      return `command not found: ${command}. Type "help" for available commands.`;
  }
};

const TerminalPlayground: React.FC = () => {
  const [entries, setEntries] = useState<TerminalEntry[]>([welcomeEntry]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const output = outputRef.current;
    if (output) {
      output.scrollTo({ top: output.scrollHeight, behavior: 'smooth' });
    }
  }, [entries]);

  const runCommand = (rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase();
    if (!command) return;

    setCommandHistory((previous) => [command, ...previous.filter((item) => item !== command)].slice(0, 30));
    setHistoryIndex(-1);

    if (command === 'clear') {
      setEntries([]);
      setInput('');
      return;
    }

    setEntries((previous) => [...previous, { command, output: commandOutput(command) }]);
    setInput('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      runCommand(input);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex] || '');
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(nextIndex);
      setInput(nextIndex === -1 ? '' : commandHistory[nextIndex]);
    }
  };

  return (
    <>
      <section className="container section tech-stack-section" id="tech-stack">
        <div className="tech-stack-shell">
          <div className="tech-stack-heading-row">
            <h2>Tech Stack</h2>
            <span className="tech-stack-count mono">{totalTechnologies} tools</span>
          </div>
          <div className="tech-stack-cloud">
            {TECH_STACK.flatMap((group) => group.technologies).map((technology) => {
              const TechIcon = technology.icon || Braces;
              return (
                <span className="tech-stack-pill" key={technology.name} title={technology.name}>
                  <TechIcon aria-hidden="true" />
                  {technology.name}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container section terminal-section" id="terminal-playground">
        <div className="terminal-section-header">
          <h2 className="section-title"><span>03 //</span> TERMINAL PLAYGROUND</h2>
          <p>Explore the portfolio from a shell built for curious visitors.</p>
        </div>

      <div className="terminal-quick-actions" aria-label="Quick terminal commands">
        {['about', 'skills', 'projects', 'resume', 'clear'].map((command) => (
          <button key={command} type="button" onClick={() => runCommand(command)}>
            [{command}]
          </button>
        ))}
      </div>

      <div className="terminal-window" onClick={() => inputRef.current?.focus()}>
        <div className="terminal-window-bar">
          <div className="terminal-window-dots" aria-hidden="true"><i className="terminal-dot red"></i><i className="terminal-dot yellow"></i><i className="terminal-dot green"></i></div>
          <span className="terminal-window-title mono">guest@anshuman: ~ (zsh)</span>
          <span className="terminal-window-status mono">online</span>
        </div>
        <div className="terminal-output mono" ref={outputRef} role="log" aria-live="polite">
          {entries.map((entry, index) => (
            <div className="terminal-entry" key={`${entry.command || 'welcome'}-${index}`}>
              {entry.command && (
                <div className="terminal-command"><span className="terminal-prompt">visitor@anshuman-os:~$</span> {entry.command}</div>
              )}
              <pre className="terminal-response">{entry.output}</pre>
            </div>
          ))}
          <form className="terminal-input-line" onSubmit={(event) => { event.preventDefault(); runCommand(input); }}>
            <label htmlFor="terminal-command" className="terminal-prompt">visitor@anshuman-os:~$</label>
            <input
              ref={inputRef}
              id="terminal-command"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Terminal command"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="terminal-caret" aria-hidden="true"></span>
          </form>
        </div>
      </div>
        <p className="terminal-hint mono">↑ ↓ history <span>·</span> enter to run <span>·</span> try <b>help</b></p>
      </section>
    </>
  );
};

export default TerminalPlayground;
