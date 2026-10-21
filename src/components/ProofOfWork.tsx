import React, { useState } from 'react';
import { ArrowUpRight, Award, Check, Copy, ExternalLink, Package, Trophy } from 'lucide-react';
import './ProofOfWork.css';

const PYPI_COMMAND = 'pip install mcp-chronoshell';

const ProofOfWork: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyInstallCommand = async () => {
    try {
      await navigator.clipboard.writeText(PYPI_COMMAND);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.warn('Could not copy install command:', error);
    }
  };

  return (
    <section className="container section proof-section" id="proof-of-work">
      <div className="proof-header">
        <div>
          <h2 className="section-title"><span>04 //</span> PROOF OF WORK</h2>
          <h3 className="proof-main-heading">Shipped &amp; Recognized.</h3>
        </div>
      </div>

      <div className="proof-grid">
        <article className="proof-card proof-card-wins">
          <div className="proof-card-heading">
            <div className="proof-icon"><Trophy size={17} /></div>
            <span className="proof-micro-label mono proof-micro-cyan">HACKATHONS // PODIUMS</span>
            <span className="proof-status-dot proof-status-emerald" />
          </div>
          <div className="proof-items">
            <div className="proof-item">
              <span className="proof-badge proof-badge-emerald">1st Place / Winner</span>
              <h4>MLH Hacktoberfest Hackday</h4>
              <p>Built IssuePilot (AI first-PR navigator with AST analysis)</p>
              <span className="proof-meta mono">VIT Bhopal // Oct 2026</span>
            </div>
            <div className="proof-item">
              <span className="proof-badge proof-badge-cyan">National Finalist</span>
              <h4>Hacksagon 2026 (ABV-IIITM Gwalior &amp; IEEE MP)</h4>
              <p>Developed Carbon-Kisan / Agri-Vators (Satellite AI + Soil Carbon)</p>
              <span className="proof-meta mono">ABV-IIITM Gwalior // Apr 2026</span>
            </div>
            <div className="proof-item">
              <span className="proof-badge proof-badge-violet">State Finalist</span>
              <h4>OpenAI Academy X NxtWave Buildathon</h4>
              <p>Built EduPlan AI (Adaptive scheduling with RAG)</p>
              <span className="proof-meta mono">Noida // Nov 2025</span>
            </div>
          </div>
          <a className="proof-card-link mono" href="https://github.com/ANSHUMANSINGH987" target="_blank" rel="noopener noreferrer">
            View engineering work <ArrowUpRight size={14} />
          </a>
        </article>

        <article className="proof-card proof-card-certifications">
          <div className="proof-card-heading">
            <div className="proof-icon"><Award size={17} /></div>
            <span className="proof-micro-label mono proof-micro-violet">ACCREDITATIONS // CREDENTIALS</span>
            <span className="proof-status-dot proof-status-violet" />
          </div>
          <div className="proof-items">
            <div className="proof-item">
              <span className="proof-org mono">Oracle Cloud Infrastructure (OCI)</span>
              <h4>OCI Generative AI Professional &amp; Vector AI Search</h4>
              <p className="proof-focus">LLM Architectures <span>•</span> Vector Embeddings <span>•</span> OCI Search</p>
            </div>
            <div className="proof-item">
              <span className="proof-org mono">IIRS, ISRO</span>
              <h4>Advances in Remote Sensing for Geological Applications</h4>
              <p className="proof-focus">Satellite Data Processing <span>•</span> Spatial Analytics</p>
            </div>
            <div className="proof-item">
              <span className="proof-org mono">IIT Kharagpur (NPTEL)</span>
              <h4>Cloud Computing Certification</h4>
              <p className="proof-focus">Distributed Systems <span>•</span> Cloud Architecture</p>
            </div>
            <div className="proof-item">
              <span className="proof-org mono">Google Cloud / SmartBridge</span>
              <h4>Generative AI &amp; Cloud Career Launchpad</h4>
              <p className="proof-focus">GCP <span>•</span> Prompt Pipelines <span>•</span> Multi-Agent Workflows</p>
            </div>
          </div>
          <a className="proof-card-link mono" href="https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fisrolms.iirs.gov.in%2Fmod%2Fcustomcert%2Fverify_certificate.php&urlhash=AMZh&mt=q5PPsH_Hi0TAb6Oil4F4-xSCFoI5_0-CtFhNRP5WHpaW-ptkNKK-epcoPp0Y8BCHBMpWmd6oBqY81oC9kDvlbzI--LCf&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bs1%2BZuzUJQbmS3gsIJJ471A%3D%3D" target="_blank" rel="noopener noreferrer">
            Verify Credentials <ArrowUpRight size={14} />
          </a>
        </article>

        <article className="proof-card proof-card-package">
          <div className="proof-card-heading">
            <div className="proof-icon"><Package size={17} /></div>
            <span className="proof-micro-label mono proof-micro-amber">OPEN SOURCE // PYPI</span>
            <span className="proof-status-dot proof-status-amber" />
          </div>
          <div className="proof-package-name mono">mcp-chronoshell</div>
          <div className="proof-version mono">Python Package <span>•</span> Model Context Protocol Server</div>
          <p className="proof-description">Published Python package enabling AI agent state-reverting workspace snapshots and safe terminal execution.</p>
          <div className="proof-telemetry">
            <button type="button" className="proof-install-command mono" onClick={copyInstallCommand} aria-label="Copy pip install command">
              <span>$ {PYPI_COMMAND}</span>
              {copied ? <span className="proof-copy-feedback"><Check size={13} /> Copied!</span> : <Copy size={13} />}
            </button>
          </div>
          <div className="proof-link-row">
            <a className="proof-card-link mono" href="https://github.com/ANSHUMANSINGH987/mcp-chronoshell" target="_blank" rel="noopener noreferrer">
              GitHub <ExternalLink size={14} />
            </a>
            <a className="proof-card-link mono" href="https://pypi.org/project/mcp-chronoshell/" target="_blank" rel="noopener noreferrer">
              PyPI <ExternalLink size={14} />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ProofOfWork;
