import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { createPanel, Panel, NavigateFunction } from './Panels';
import NavigationNode from '../components/NavigationNode';
import DestinationNode from '../components/DestinationNode';
import PageContainer from '../components/PageContainer';
import Connection from '../components/Connection';
import { ConnectionProvider, useConnections } from '../context/ConnectionContext';
import '@/styles.css';

// Wrapper component to access context
const PanelWithConnections: React.FC<{
  id: string;
  content: React.ReactNode;
  position: { x: number; y: number };
}> = ({ id, content, position }) => {
  const { registerNode } = useConnections();
  
  return (
    <div 
      className="panel" 
      key={id}
      style={{
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        left: `${position.x * 100}vw`,
        top: `${-position.y * 100}vh`,
      }}
    >
      {id === 'about' ? (
        content
      ) : (
        <DestinationNode id={id} registerNode={registerNode}>
          {content}
        </DestinationNode>
      )}
    </div>
  );
};

// Content Components
const HomeContent = () => {
  const { registerNode } = useConnections();
  const { navigate } = React.useContext(CanvasContext);
  
  return (
    <PageContainer title="Home">
      <p>Welcome to my website! Learn more <NavigationNode targetId="about" onNavigate={navigate} registerNode={registerNode}>about me</NavigationNode> or 
      <NavigationNode targetId="contact" onNavigate={navigate} registerNode={registerNode}> get in touch</NavigationNode>.</p>
    </PageContainer>
  );
};

const AboutContent = () => {
  const { registerNode } = useConnections();
  const { navigate } = React.useContext(CanvasContext);
  
  return (
    <PageContainer title="About">
      <p>Welcome to my personal page. I'm a software engineer and designer passionate about creating intuitive and impactful digital experiences.</p>
      
      {/* Only this paragraph will be the destination node */}
      <DestinationNode id="about" registerNode={registerNode}>
        <p>This is my story. I began my journey in technology when I was 12 years old, building simple websites and exploring the early internet. Since then, I've evolved into a full-stack developer with expertise in React, TypeScript, and modern web technologies.</p>
      </DestinationNode>
      
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>
      <p>Throughout my career, I've worked on projects ranging from enterprise applications to consumer-facing products. I believe in thoughtful design that addresses real user needs while maintaining technical excellence.</p>

      <p>After reading this, you might want to <NavigationNode targetId="contact" onNavigate={navigate} registerNode={registerNode}>contact me</NavigationNode> 
      or go <NavigationNode targetId="home" onNavigate={navigate} registerNode={registerNode}>back home</NavigationNode>.</p>
    </PageContainer>
  );
};

const ContactContent = () => {
  const { registerNode } = useConnections();
  const { navigate } = React.useContext(CanvasContext);
  
  return (
    <PageContainer title="Contact">
      <p>Reach out to me at example@email.com or return to the <NavigationNode targetId="home" onNavigate={navigate} registerNode={registerNode}>homepage</NavigationNode>.</p>
    </PageContainer>
  );
};

const PositionContent = () => {
  const { registerNode } = useConnections();
  const { navigate } = React.useContext(CanvasContext);
  
  return (
    <PageContainer title="My New Position on Engineering Design">
      <h2>Engineering: Quantitative Foundations and Evolving Toolsets</h2>
      <p>My foundational view of engineering remains rooted in problem reduction. My early experiences—like reframing the “3 candy bars among 4 students” problem into “arranging 3 candy bars and 3 dividers”—taught me the power of leveraging core mathematical tools to reduce problems to solvable components. </p>
      <p>However, my perspective has evolved to emphasize not just mastery of individual tools, but also the commitment to discover existing solutions. Before attempting to “reinvent the wheel,” I now systematically survey prior art—patents, open‑source repositories, and academic case studies—to identify similar problem domains. This practice not only accelerates the problem-solving process but also enriches my toolkit. For example, when I was designing an AI music accompanist project that can adjust its speed live by listening to the soloist, I referenced open-source apps that accomplished some version of that before trying to improve upon it.</p>
      <p>Trial-and-error is helpful for learning, but I believe that trying every possible wrong design on my own is both inefficient learning and a waste of time. Essentially, effective engineering design demands both deep fluency in quantitative techniques and the awareness of how related solutions have been validated elsewhere.</p>
      <h2>Design: From Creative Empathy to Future‑Focused Trend Mastery</h2>
      <p>I still believe that design remains a human‑centered creative endeavor. My time as a band community executive taught me the importance of direct engagement with the community, such as thinking about activity formats until both extroverted and introverted participants felt included. </p>
      <p>My understanding of design deepened when I realized that no matter how empathetic or creative your ideas are, they won’t be relevant unless you’re fluent in the latest technological and cultural currents. I began looking into cutting‑edge papers on generative AI architectures for the upcoming GenAI Genesis Hackathon. When the TRELLIS image-to-3d model came out in 2025, I immediately saw possibilities that simply didn’t exist before—so I sketched a concept for a model that transforms real images into virtual 3D reinforcement learning environments for agents. Had I not been tracking these emerging trends, I would never have conceived of that tool, because the enabling technology wasn’t even available a few days prior. This experience taught me that truly impactful design is tied to relevance to the present. </p>
      <h2>Engineering Design: Integrating Insights for Impactful Solutions</h2>    
      <p>Effective engineering design sits at the nexus of community‑driven problem identification and deep tool fluency. It begins with staying on top of technological and cultural trends and pairing that awareness with a clear sense of what my toolkit can actually achieve. I wish to pursue a path where I know both what needs solving and how to solve it. </p>
      <p>The awareness of problems also hinges on understanding your own capabilities. When I immersed myself in a surge of new machine‑learning concepts, I started experiencing moments of genuine enlightenment. Suddenly, everyday inconveniences transformed into design prompts. For instance, when a friend lamented the lack of a saxophone transcription for a violin score, my first thought wasn’t “too bad” but rather, “could I build an image‑recognition pipeline to ingest sheet music and auto‑transpose it?” Even though such an app already existed, the excitement lay in shifting from passive frustration to active ideation—seeing problems as invitations to create rather than obstacles to accept.</p>
      <p>This interplay—tracking emerging trends, mapping them onto your technical strengths, and engaging empathetically with real community needs—forms the core of engineering design. By combining strategic trendscouting with rigorous tool mastery and a willingness to learn from existing solutions, you position yourself to craft designs that are not only innovative, but immediately impactful. </p>
      
      
      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        <NavigationNode targetId="about" onNavigate={navigate} registerNode={registerNode}>Go to About</NavigationNode>
      </div>
    </PageContainer>
  );
};

// Enhanced panel type with coordinates
interface PanelPosition {
  x: number;
  y: number;
}

// Create a Canvas Context for navigation
interface CanvasContextType {
  navigate: NavigateFunction;
  activePanel: string;
}

const CanvasContext = React.createContext<CanvasContextType>({
  navigate: () => {},
  activePanel: 'home'
});

// Extended createPanel function with position
const createPanelWithPosition = (
  id: string, 
  title: string, 
  content: React.ReactNode,
  position: PanelPosition
): Panel & { position: PanelPosition } => ({
  ...createPanel(id, title, content),
  position
});

// Connection Mapper Component
const ConnectionMapper: React.FC<{panelData: (Panel & {position: PanelPosition})[], activePanel: string}> = 
  ({ panelData, activePanel }) => {
  const visiblePanels = panelData.filter(panel => 
    panel.id === activePanel || 
    panelData.find(p => p.id === activePanel)?.position.x === panel.position.x ||
    panelData.find(p => p.id === activePanel)?.position.y === panel.position.y
  );
  
  return (
    <>
      {visiblePanels.map(panel => (
        <React.Fragment key={`connections-${panel.id}`}>
          {/* Create connections for navigation nodes in this panel */}
          {Array.from(document.querySelectorAll(`.nav-node[data-target]`)).map((node, index) => {
            const target = node.getAttribute('data-target');
            if (!target) return null;
            
            return (
              <Connection 
                key={`connection-${panel.id}-${index}`}
                from={`nav-to-${target}`}
                to={target}
                animated={true}
              />
            );
          })}
        </React.Fragment>
      ))}
    </>
  );
};

const CanvasNavigator: React.FC = () => {
  const [activePanel, setActivePanel] = useState<string>('home');
  
  // Function to navigate between panels
  const navigate: NavigateFunction = useCallback((targetId: string) => {
    setActivePanel(targetId);
  }, []);

  const canvasValue = {
    navigate,
    activePanel
  };

  return (
    <ConnectionProvider>
      <CanvasContext.Provider value={canvasValue}>
        <div className="canvas-container">
          {/* Top navigation (optional) */}
          <nav className="nav">
            {['home', 'about', 'contact', 'position'].map((id) => (
              <button
                key={id}
                onClick={() => navigate(id)}
                disabled={id === activePanel}
                className={id === activePanel ? 'active' : ''}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </nav>

          {/* Define panels */}
          {(() => {
            // We need to define panels in a function to access the context
            const panelsData = [
              createPanelWithPosition('home', 'Home', <HomeContent />, { x: 0, y: 0 }),
              createPanelWithPosition('about', 'About', <AboutContent />, { x: 1, y: 0 }),
              createPanelWithPosition('contact', 'Contact', <ContactContent />, { x: 2, y: 0 }),
              createPanelWithPosition('position', 'Position', <PositionContent />, { x: 1, y: 10 }),
            ];

            // Find current active panel
            const activePanelData = panelsData.find(panel => panel.id === activePanel) || panelsData[0];
            const activePosition = activePanelData.position;

            return (
              <div className="viewport" style={{ position: 'relative', overflow: 'hidden' }}>
                <motion.div
                  className="canvas"
                  animate={{ 
                    x: `-${activePosition.x * 100}vw`,
                    y: `${activePosition.y * 100}vh` 
                  }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  style={{ 
                    position: 'absolute',
                    width: '300vw',  // 3 columns
                    height: '200vh', // 2 rows
                  }}
                >
                  {panelsData.map((p) => (
                    <PanelWithConnections 
                      key={p.id}
                      id={p.id}
                      content={p.content}
                      position={p.position}
                    />
                  ))}
                </motion.div>
                
                {/* Connection lines */}
                <ConnectionMapper panelData={panelsData} activePanel={activePanel} />
              </div>
            );
          })()}
        </div>
      </CanvasContext.Provider>
    </ConnectionProvider>
  );
};

export default CanvasNavigator;
