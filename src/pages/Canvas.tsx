import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createPanel, Panel, NavigateFunction } from './Panels';
import NavigationNode from '../components/NavigationNode';
import DestinationNode from '../components/DestinationNode';
import PageContainer from '../components/PageContainer';
import Connection from '../components/Connection';
import { ConnectionProvider, useConnections } from '../context/ConnectionContext';
import '@/styles.css';
import NavigationSidebar from '../components/NavigationSidebar';

import bike1 from '../assets/bike1.png';
import bike2 from '../assets/bike2.png';
import hanger1 from '../assets/hanger1.png';
import hanger2 from '../assets/hanger2.png';
import bridge1 from '../assets/bridge1.png';
import bridge2 from '../assets/bridge2.png';

import dfx1 from "../assets/PraxisIIDesignPortfolio/dfx1.png"
import dfx2 from "../assets/PraxisIIDesignPortfolio/dfx2.png"
import dfx3 from "../assets/PraxisIIDesignPortfolio/dfx3.png"
import pairwise1 from "../assets/PraxisIIDesignPortfolio/pairwise1.png"
import pairwise2 from "../assets/PraxisIIDesignPortfolio/pairwise2.png"
import pairwise3 from "../assets/PraxisIIDesignPortfolio/pairwise3.png"
import measurement from "../assets/PraxisIIDesignPortfolio/measurement.png"
import scamper from "../assets/PraxisIIDesignPortfolio/scamper.png"
import biomi from "../assets/PraxisIIDesignPortfolio/biomi.png"
import morph from "../assets/PraxisIIDesignPortfolio/morph.png"
import prototype from "../assets/PraxisIIDesignPortfolio/prototype.jpg"
import reference1 from "../assets/PraxisIIDesignPortfolio/reference1.png"
import reference2 from "../assets/PraxisIIDesignPortfolio/reference2.png"
import stakeholder from "../assets/PraxisIIDesignPortfolio/stakeholder.png";

// Wrapper component to access context
const PanelWithConnections: React.FC<{
  id: string;
  content: React.ReactNode;
  position: { x: number; y: number };
}> = ({ id, content, position }) => {
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
      {content}
    </div>
  );
};

// Content Components for CTMF panels
const Scamper: React.FC = () => {
  const { registerNode } = useConnections();
  const { navigate } = React.useContext(CanvasContext);
  
  return (
    <PageContainer title="CTMF#1 Scamper (Diverging)">
      <p>SCAMPER is a structured brainstorming technique built around seven prompts—Substitute, Combine, Adapt, Modify (or Magnify/Minify), Put to other uses, Eliminate, and Reverse—that guide teams in systematically tweaking existing products or processes to spark fresh ideas [1].</p>
      
      <p>In our project to prevent right‑hook collisions for cyclists, SCAMPER was instrumental. We began by cataloging existing interventions—infrastructure, hardware, software—and then ran each through the SCAMPER technique.</p>
      
      <DestinationNode id="scamper-approach" registerNode={registerNode}>
        <p>This is consistent with my position of reducing problems to solvable components. By tackling one small problem at a time, we have the potential to construct concepts of ideas that can  
        <NavigationNode targetId="morphChart" destinationId="morph-scamper" onNavigate={navigate} registerNode={registerNode}>
          morph into
        </NavigationNode>
          better combined ideas. During this process, we created the GPS concept of the BikerAlert App, and also reinforced our bike horn, which both became crucial components in our final design.</p>
        <NavigationNode targetId="position" destinationId="position-reduce-components" onNavigate={navigate} registerNode={registerNode}>
          How does it tie to my position?
        </NavigationNode>
      </DestinationNode>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <img src={scamper} alt="SCAMPER Application Example" style={{ width: '90%', maxWidth: '800px' }} />
      </div>
      <p>As a diverging method, SCAMPER is useful when you're facing a difficult problem with some obvious solutions but no perfect solutions: it forces you to establish a solid baseline of what's already out there, and then explore targeted modifications. By throwing out ideas onto the table for further diverging, it prevents premature convergence of ideas, and prevents "idea droughts", where all viable ideas have gone to dead ends.</p>
    </PageContainer>
  );
};

const Biomimicry: React.FC = () => {
  const { registerNode } = useConnections();
  const { navigate } = React.useContext(CanvasContext);
  
  return (
    <PageContainer title="CTMF#3 Biomimicry (Diverging)">
        <p>Biomimicry is an approach to innovation that seeks solutions by taking inspiration from nature's patterns [2].</p>
        
        <p>In our Praxis II project, we looked to the howler monkey's powerful, far‑reaching call as inspiration for our bike horn, aiming to startle or alert drivers much like a prey's warning cry. This developed into the Bike Horn idea, which ultimately remained as part of our final, integrated system of Soteria.</p>
        
        <DestinationNode id="biomimicry-approach" registerNode={registerNode}>
          <p>This example highlights my position in two ways. Firstly, being able to see connections across domains represents a solid understanding of engineering tools. Secondly, treating nature as the ultimate reference design can prove to be beneficial, because billions of years of evolution have probably solved some of the problems we encounter. By recognizing the predator‑prey dynamic between car and cyclist, we borrowed nature's signaling mechanism to enhance rider safety.</p>
          <NavigationNode targetId="position" destinationId="position-capability-awareness" onNavigate={navigate} registerNode={registerNode}>
            How does this tie into my position?
          </NavigationNode>
        </DestinationNode>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
          <img src={biomi} alt="Biomimicry Application Example" style={{ width: '90%', maxWidth: '800px' }} />
        </div>
        
        <p>That said, biomimicry is best used opportunistically rather than forced. Engineers often stumble upon natural analogues—sometimes without even realizing it—but it only becomes valuable when a genuine parallel emerges. If I naturally spot a relevant solution, it can serve as a powerful reference; if not, there would be no need to shoehorn the concept into the process. In this way, biomimicry remains a flexible tool in the designer's toolkit, reinforcing my broader principle that relevance should always guide our innovation.</p>
    </PageContainer>
  );
};

const MorphChart: React.FC = () => {
  const { registerNode } = useConnections();
  const { navigate } = React.useContext(CanvasContext);
  
  return (
    <PageContainer title="CTMF#2 Morph Chart (Diverging/Converging)">
        <p>The Morph Chart provides a structured way to break down a design problem into its core functions and then systematically brainstorm various approaches to achieve those functions [3].</p>
        
        <DestinationNode id="morph-scamper" registerNode={registerNode}>
        <p>We took the best methods of how each of our final 3 designs addressed each problem, and combined it into the complete system Soteria. The horn was the best at communicating to the drivers, the GPS + phone software was best at remaining feasible for bikers, and the computer vision was the most accurate in aiding danger detection.</p>
        </DestinationNode>

        <DestinationNode id="morphChart-approach" registerNode={registerNode}>
          <p>We used this for converging instead of diverging. This connects to my position because it shows an in-depth understanding of engineering tools, demonstrating flexibility in using it instead of strictly only allowing it for a certain part of the FDCR process.</p>
          <NavigationNode targetId="position" destinationId="position-capability-awareness" onNavigate={navigate} registerNode={registerNode}>
            How does this relate to my position?
          </NavigationNode>
        </DestinationNode>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
          <img src={morph} alt="Morph Chart Example" style={{ width: '90%', maxWidth: '800px' }} />
        </div>
        
        <p>This is used best when your designs may have serious limitations due to feasibility that will not work in the end even if it is the best at every other evaluation criteria. This tool is useful for all design spaces, since our goal is to converge on a single final concept. Integrating the strongest elements of each design into one solution—without adding unnecessary complexity—would be ideal.</p>
        </PageContainer>
  );
};

const Prototypes: React.FC = () => {
  const { registerNode } = useConnections();
  const { navigate } = React.useContext(CanvasContext);
  
  return (
    <PageContainer title="CTMF#3 Prototypes (Representation)">
        <p>A Praxis prototype is a preliminary model of a product or system so that ideas can be explored, tested, and refined before full-scale development.</p>
        
        <p>We required a physical prototype to be tested under the weights as our final task. We cut and glued together matboards, creating our best replica of what our theoretically optimal bridge would look like. When we were attempting to fold the 15mm flaps without creating additional creases, we learned that not all theoretical designs can be achieved physically.</p>
        
        <DestinationNode id="prototypes-approach" registerNode={registerNode}>
          <p>This insistence on prototyping aligns directly with my belief in design relevance. It's not enough to prove on paper that a bridge can carry X tons; the true test is whether it does so in practice. In every engineering endeavor, a well‑executed prototype should transform our abstract calculations into tangible confidence that our solution will perform when it matters most.</p>
          <NavigationNode targetId="position" destinationId="position-design-relevance" onNavigate={navigate} registerNode={registerNode}>
            How does this tie into my position?
          </NavigationNode>
        </DestinationNode>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
          <img src={prototype} alt="Prototype Example" style={{ width: '90%', maxWidth: '800px' }} />
        </div>
        
        <p>I think a working prototype is important for any type of design. While constructing the real product, the process will introduce variability that no theoretical model can predict. For example, the imperfect cuts of the matboard and dimension inconsistencies due to matboard folding caused our bridge to perform significantly less than our predicted weight limit. Therefore, a working prototype is crucial to prove that the design concept works.</p>
    </PageContainer>
  );
};

const ReferenceDesigns: React.FC = () => {
  const { registerNode } = useConnections();
  const { navigate } = React.useContext(CanvasContext);
  
  return (
    <PageContainer title="CTMF#2 Reference Designs (Framing/Diverging)">
      <p>Reference design is an existing design that aims to address the current opportunity [4].</p>
      
      <p>We referred to the design given in the assignment, and built off our optimization off of that. Although we experimented with other designs of bridges, we settled for this one in the end for its reliability. Our final bridge optimizes the dimensions of the bridge based on that design, and we won our tutorial group for highest weight held.</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <img src={reference1} alt="Reference Design Example 1" style={{ width: '50%', maxWidth: '800px' }} />
        <p>Drawing by Baron Liu, using the reference design.[5]</p>
      </div>

      <DestinationNode id="referenceDesigns-approach" registerNode={registerNode}>
        <p>This experience validates my core position: designers shouldn't waste time reinventing fundamental principles when reliable solutions already exist. Instead, we should learn from previous work—standing on the shoulders of others' successes and avoiding their pitfalls—to accelerate innovation. Reference designs aren't just a shortcut; they're an essential tool that channels creative effort into meaningful improvements rather than rediscovery.</p>
        <NavigationNode targetId="position" destinationId="position-footer" onNavigate={navigate} registerNode={registerNode}>
          How does this tie into my position?
        </NavigationNode>
      </DestinationNode>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <img src={reference2} alt="Reference Design Example 2" style={{ width: '50%', maxWidth: '800px' }} />

      </div>
      
      <p>This concept should always be used. No matter what type of design space we are in, we should always look at the existing designs before thinking about progress forward. Using this principle has allowed me to both learn faster and also create more impactful projects in hackathons and in general.</p>
    </PageContainer>
  );
};

const Stakeholders: React.FC = () => {
  const { registerNode } = useConnections();
  const { navigate } = React.useContext(CanvasContext);
  
  return (
    <PageContainer title="CTMF#1 Stakeholders (Framing)">
        <p>Stakeholders are people who are affected by the opportunity.</p>
        
        <DestinationNode id="stakeholders-main" registerNode={registerNode}>
          <p>We began by asking ourselves the question, who are the stakeholders that affect the evaluation criteria of our bridge? In our bridge‑building assignment, that question has a surprisingly narrow answer: the teaching assistants and professor, who evaluate success solely on the maximum weight supported. By defining the TAs as our only stakeholders, we immediately recognized that factors like material efficiency or aesthetic appeal are irrelevant here. A lighter bridge that fails under load is objectively worse than a heavier bridge that holds more weight, regardless of how elegantly it's constructed or how little material it uses.</p>
        </DestinationNode>
        
        <DestinationNode id="stakeholders-approach" registerNode={registerNode}>
          <p>This stakeholder‑first mindset reflects my core belief in beginning every project by fully understanding the opportunity itself, rather than jumping straight to a favored solution. In our bridge assignment, that meant resisting any preconceived notion of "what a bridge should look like" and instead asking, "What exactly are we being asked to achieve?" Once we recognized that success would be judged solely on the maximum load our structure could bear, every design choice served for that sole purpose. In other words, our bridge was only optimal if, and only if, it outperformed all other entries according to the TAs' evaluation criterion.</p>
          <NavigationNode targetId="position" destinationId="position-design-relevance" onNavigate={navigate} registerNode={registerNode}>
            How does this tie to my new position?
          </NavigationNode>
        </DestinationNode>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
          <img src={stakeholder} alt="Stakeholder Analysis Example" style={{ width: '70%', maxWidth: '800px' }} />
        </div>
        
        <p>This concept is always important and is highly effective. We won our tutorial group's competition by withstanding the largest weight by 200N. Our bridge had no aesthetic appeal and used up all the matboard and glue, but it was the best design. I think our focus on the stakeholders was one of the keys to our success, and I believe that stakeholders should come first in any design space, because that is the only way to evaluate a design.</p>
    </PageContainer>
  );
};

const DfX: React.FC = () => {
  const { registerNode } = useConnections();
  const { navigate } = React.useContext(CanvasContext);
  
  return (
    <PageContainer title="CTMF#1 DfX (Framing)">
        <p>This design project is a perfect example of how understanding different DfXs can help designers focus on what design decisions and requirements to prioritize [6].</p>
        
        <DestinationNode id="dfx-stakeholders" registerNode={registerNode}>
          <p>We categorized our requirements into three different DfXs, Design for Sustainability, Design for Durability, and Design for Usability. Our decision to treat some requirements as graded evaluations and others as strict pass–fail checks depended entirely on how we interpreted each DfX and the weight those criteria carried for our
          <NavigationNode targetId="stakeholders" destinationId="stakeholders-main" onNavigate={navigate} registerNode={registerNode}>
            stakeholders.
          </NavigationNode>
          </p> 
        </DestinationNode>
        
        
        <DestinationNode id="dfx-approach" registerNode={registerNode}>
          <p>This approach reflects my core belief in design relevance: you must focus on what truly matters, not optimize for the wrong objectives. By understanding DfXs, we not only got a better sense of how professional engineers defined 'quality' design, we also learned how to define our scope to focus our designs on. </p>
          <NavigationNode targetId="position" destinationId="position-design-relevance" onNavigate={navigate} registerNode={registerNode}>
            How does it tie to my new position?
          </NavigationNode>
        </DestinationNode>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '20px' }}>
          <img src={dfx1} alt="DfX Example 1" style={{ width: '30%' }} />
          <img src={dfx2} alt="DfX Example 2" style={{ width: '30%' }} />
          <img src={dfx3} alt="DfX Example 3" style={{ width: '30%' }} />
        </div>
        
        <p>Applying DfX helped our team internalize what makes a good engineered solution. It taught us that "good" isn't about maximizing every metric simultaneously, but about selecting the right metrics and rigorously enforcing those most critical to stakeholder value. Considering this, we immediately prioritized sustainability and durability less, and began investigating more into the codes and standards of usability. In doing so, we emerged not just with a better hanger, but with a deeper, more disciplined understanding of how to frame and solve design challenges.</p>
    </PageContainer>
  );
};

const PairwiseComparison: React.FC = () => {
  const { registerNode } = useConnections();
  const { navigate } = React.useContext(CanvasContext);
  
  return (
    <PageContainer title="CTMF#2 Pairwise Comparison (Converging)">
      <p>Pairwise comparison is a method used to determine the relative importance of different criteria by comparing them against each other in pairs. This technique helps prioritize design requirements or evaluate options when multiple factors must be considered [7].</p>
      
      <p>A Pairwise Comparison matrix is a systematic way to compare each pair of designs against a specific requirement.</p>
      
      <p>In Praxis I, we deployed the pairwise matrix across three key usability metrics—removal time, attaching time, and implementation time—all of which directly support our primary DfX of Usability. We gathered insight that the HoopNet emerged victorious in two of the three critical evaluation metrics: time to attach a hanger and time to remove a hanger.</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '20px' }}>
        <img src={pairwise1} alt="Pairwise Comparison Example 1" style={{ width: '30%' }} />
        <img src={pairwise2} alt="Pairwise Comparison Example 2" style={{ width: '30%' }} />
        <img src={pairwise3} alt="Pairwise Comparison Example 3" style={{ width: '30%' }} />
      </div>
      <DestinationNode id="pairwise-approach" registerNode={registerNode}>
          <p>The usage of pairwise comparison matrices is consistent with my perspective that we should break problems down into smaller components, and this applies to evaluation too. Instead of covering a broad range of requirements at once, we target specific ones and determine the relationships between the different designs.</p>
          <NavigationNode targetId="position" destinationId="position-reduce-components" onNavigate={navigate} registerNode={registerNode}>
            How does this tie into my position?
          </NavigationNode>
      </DestinationNode>
      <DestinationNode id="pairwise-measurement" registerNode={registerNode}>
          <p>Pairwise comparison is useful when multiple concepts<NavigationNode targetId="measurementMatrix" destinationId="measurement-pairwise" onNavigate={navigate} registerNode={registerNode}>
          already satisfy your "must‑have" requirements
          </NavigationNode>
          (like preventing entanglement) and you need to compare their relative strengths on secondary criteria. Rather than relying on gut feelings or unmeaningful test data, you get a coherent, quantitative ranking that illustrates trade-offs. In our case, the pairwise matrix became our best tool in defending our design choice.
          </p>
      </DestinationNode>
    </PageContainer>
  );
};

const MeasurementMatrix: React.FC = () => {
  const { registerNode } = useConnections();
  const { navigate } = React.useContext(CanvasContext);
  
  return (
    <PageContainer title="CTMF#3 Measurement Matrix (Converging)">
        <p>A Measurement Matrix is a quantitative converging tool used to objectively compare design alternatives based on specific metrics derived from evaluation criteria [8].</p>
        
        <p>We used it to perform validity checks on our designs to make sure that they passed the requirements, which are determined by research. Furthermore, we perform calculations and simulations in the cases where we don't have the means to perform the tests or when calculations yield sufficient results easier.</p>
        
        <DestinationNode id="measurementMatrix-approach" registerNode={registerNode}>
          <p>This is consistent with my perspective of using existing methodologies to facilitate the process while achieving even better results. Through this project, we learned that there were two advantages to using research and calculations as opposed to testing. Firstly, scientists can provide more accurate measurements for certain properties using more professional equipment. Secondly, it saves time. This demonstrates the importance of searching for existing resources before trying to accomplish everything ourselves.</p>
          <NavigationNode targetId="position" destinationId="position-footer" onNavigate={navigate} registerNode={registerNode}>
            How does this tie into my position?
          </NavigationNode>
        </DestinationNode>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
          <img src={measurement} alt="Measurement Matrix Example" style={{ width: '90%', maxWidth: '800px' }} />
        </div>
        <DestinationNode id="measurement-pairwise" registerNode={registerNode}>
        <p>A measurement matrix excels at establishing these objective baselines, but it isn't the best tool for ranking alternatives once they all pass. The limitation of the measurement matrix is its reliance on feasible test methods. If a metric can't be reasonably approximated using research, you must craft a proxy test, which introduces uncertainty. For example, we proxy-tested the weight requirements using hoodies, which might not accurately represent the weight target that research suggests we aim for. For first‑year engineers, this means balancing rigor with practicality, ensuring that tests are both meaningful and executable in a classroom setting.</p>
        </DestinationNode>
    </PageContainer>
  );
};

const PositionContent = () => {
  const { registerNode } = useConnections();
  
  return (
    <PageContainer title="My New Position on Engineering Design">

      <p>I would like to reflect upon how my perspective towards engineering design has evolved during the past year, and offer new insights about how I think I should approach this problem. I wish to show the connection between different concepts using connections from node to node, which is inspired by my interest in neural networks. Then, I hope to present various examples where I reflect upon the effectiveness and relevance of the CTMFs I used.</p>
      <h2>Evolving Toolkits in Engineering</h2>
      <DestinationNode id="position-reduce-components" registerNode={registerNode}>
        <div style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'left' }}>
          <p>My foundational view of engineering remains rooted in problem reduction. My early experiences—like reframing the "3 candy bars among 4 students" problem into "arranging 3 candy bars and 3 dividers"—taught me the power of leveraging core mathematical tools to reduce problems to solvable components. </p>
        </div>
      </DestinationNode>
      <DestinationNode id="position-footer" registerNode={registerNode}>
        <div style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'left' }}>
          <p>However, my perspective has evolved to emphasize not just mastery of individual tools, but also the commitment to discover existing solutions. Before attempting to "reinvent the wheel," I now systematically survey prior art—patents, open‑source repositories, and academic case studies—to identify similar problem domains. This practice not only accelerates the problem-solving process but also enriches my toolkit. Trial-and-error is helpful for learning, but I believe that trying every possible wrong design on my own is both inefficient learning and a waste of time.</p>
        </div>
      </DestinationNode>
      <p>For example, when I was designing an AI music accompanist project that can adjust its speed live by listening to the soloist, I referenced open-source apps that accomplished some version of my goal [9] before trying to improve upon it. My main focus was to develop the machine learning component of it, and wished to explore further into these aspects as opposed to the sound engineering side of things. It was logical for me to implement existing algorithms for beat detection and soloist step-tracking.</p>
      <h2>Relevance in Design</h2>
      <p>I still believe that design remains a human‑centered creative endeavor. My time as a band community executive taught me the importance of direct engagement with the community, such as thinking about activity formats until both extroverted and introverted participants felt included. </p>
      <DestinationNode id="position-design-relevance" registerNode={registerNode}>
        <div style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'left' }}>
          <p>My understanding of design deepened when I realized that no matter how empathetic or creative your ideas are, they need to be relevant. Often, this means that it should build off of cutting-edge technology and current trends. </p>
        </div>
      </DestinationNode>
      <p>I began looking into cutting‑edge papers on generative AI architectures for the upcoming GenAI Genesis Hackathon. When the TRELLIS image-to-3d model came out in 2025 [10], I immediately saw possibilities that simply didn't exist before—so I sketched a concept for a model that transforms real images into virtual 3D reinforcement learning environments for agents. Had I not been tracking these emerging trends, I would never have conceived of that tool, because the enabling technology wasn't even available a few days prior. This experience taught me that truly impactful design is tied to relevance to the present. </p>
      <h2>Engineering Design: How Solutions Become Impactful</h2>    
      <p>Effective engineering design relies on the combination of community‑driven problem identification and deep tool fluency. It begins with staying on top of technological and cultural trends and pairing that awareness with a clear sense of what my toolkit can actually achieve. As before, I wish to pursue a path where I know both what needs solving and how to solve it. </p>
      <DestinationNode id="position-capability-awareness" registerNode={registerNode}>
        <div style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'left' }}>
          <p>The awareness of problems also depends on your mastery and intuition of tools. </p>
        </div>
      </DestinationNode>
      <p>When I immersed myself in a surge of new machine‑learning concepts, I started experiencing moments of genuine enlightenment. Suddenly, everyday inconveniences transformed into design prompts. For instance, when a friend lamented the lack of a saxophone transcription for a violin score, my first thought wasn't "too bad" but rather, "could I build an image‑recognition pipeline to ingest sheet music and auto‑transpose it?" Even though such an app already existed, the excitement lay in shifting from passive frustration to active ideation—seeing problems as invitations to create rather than obstacles to accept.</p>
      <p>At its core, engineering design is about mapping previous experiences to solve new challenges, much like the neural network that forms my design portfolio. As I explore new concepts throughout this portfolio, I will link them back to my position statement and other CTMFs along the way. By combining rigorous tool mastery and a willingness to learn from existing solutions, I learned to craft designs that are not only innovative, but immediately impactful.       </p>
    </PageContainer>
  );
};

const BikeContent = () => {
  return (
    <PageContainer title="Bike">
      <div className="image-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={bike1} alt="Bike Part 1" style={{ width: '100%', maxWidth: '800px', marginBottom: '20px' }} />
        <img src={bike2} alt="Bike Part 2" style={{ width: '100%', maxWidth: '800px' }} />
        <p>Created by Rooney Cheung, Oscar Low, Junhee Park, Paul Dong</p>
      </div>
    </PageContainer>
  );
};

const HangerContent = () => {
  return (
    <PageContainer title="Hanger">
      <div className="image-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={hanger1} alt="Hanger Part 1" style={{ width: '100%', maxWidth: '800px', marginBottom: '20px' }} />
        <img src={hanger2} alt="Hanger Part 2" style={{ width: '100%', maxWidth: '800px' }} />
        <p>Created by Jeff Luo, Baron Liu, Luke Payant, Paul Dong</p>
      </div>
    </PageContainer>
  );
};

const BridgeContent = () => {
  return (
    <PageContainer title="Bridge">
      <div className="image-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={bridge1} alt="Bridge Part 1" style={{ width: '100%', maxWidth: '800px', marginBottom: '20px' }} />
        <img src={bridge2} alt="Bridge Part 2" style={{ width: '100%', maxWidth: '800px' }} />
        <p>Created by Baron Liu, Luke Payant, Veer Dharma, Paul Dong</p>
      </div>
    </PageContainer>
  );
};

const ReferencesContent: React.FC = () => {
  
  return (
    <PageContainer title="References">
      <div style={{ padding: '20px' }}>
        <h2>References & Further Reading</h2>
        
        <p>[1] "SCAMPER Technique: Drive Innovation & Creativity," SixSigma.us, Jul. 15, 2024. [Online]. Available: https://www.6sigma.us/lean-tools/scamper-technique/ [Accessed: Apr. 12, 2025].</p>
        
        <p>[2] "What is Biomimicry?," Biomimicry 3.8. [Online]. Available: https://biomimicry.net/what-is-biomimicry/ [Accessed: Apr. 12, 2025].</p>
        
        <p>[3] "Morphological charts," Institute for Manufacturing, University of Cambridge, Cambridge, UK, 2016. [Online]. Available: https://www.ifm.eng.cam.ac.uk/research/dmg/tools-and-techniques/morphological-charts/[Accessed: Apr. 12, 2025].</p>
        
        <p>[4] "Definition of reference design," PCMag Encyclopedia, The Computer Language Co Inc., n.d. [Online]. Available: https://www.pcmag.com/encyclopedia/term/reference-design [Accessed: Apr. 12, 2025].</p>
        
        <p>[5] E. Bentz, CIV102 Bridge Project Code Repository. GitHub, 2024. [Online]. Available: https://github.com/nelonmelons/civ102</p>
        
        <p>[6] "Design for X," ScienceDirect Topics, Elsevier. [Online]. Available: https://www.sciencedirect.com/topics/engineering/design-for-x [Accessed: Apr. 12, 2025].</p>
        
        <p>[7] Z. Szádoczki et al., "Incomplete pairwise comparison matrices based on graphs with average degree approximately 3," Ann. Oper. Res., vol. 326, pp. 783–807, July 2023. [Online]. Available: https://doi.org/10.1007/s10479-022-04819-9 [Accessed: Apr. 12, 2025].</p>
        
        <p>[8] R. Carrick and J. Lofgreen , "ESC101 2024 26," Lecture slides for ESC101: Praxis I, University of Toronto, ON, CA, Apr. 10, 2025.</p>
        
        <p>[9] C. Cancino‑Chacón, "tempo_models_evaluation.py," CPJKU/accompanion GitHub repository Nov. 27, 2023. [Online]. Available: https://github.com/CPJKU/accompanion/blob/main/accompanion/accompanist/tempo_models_evaluation.py [Accessed: Apr. 12, 2025].</p>
        
        <p>[10] J. Xiang, Z. Lv, S. Xu, Y. Deng, R. Wang, B. Zhang, D. Chen, X. Tong, and J. Yang, "Structured 3D Latents for Scalable and Versatile 3D Generation," arXiv preprint arXiv:2412.01506, Dec. 2024. [Online]. Available: https://arxiv.org/abs/2412.01506 [Accessed: Apr. 12, 2025].</p>
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
  activePanel: 'position'
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
  const [connections, setConnections] = useState<Array<{from: string, to: string}>>([]);
  
  // Use useEffect to query the DOM after render
  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      const foundConnections: Array<{from: string, to: string}> = [];
      
      // Find all navigation nodes
      Array.from(document.querySelectorAll(`.nav-node[data-target][data-destination]`)).forEach((node) => {
        const targetPanel = node.getAttribute('data-target');
        const targetDestination = node.getAttribute('data-destination');
        
        if (!targetPanel || !targetDestination) return;
        
        // Extract the parent destination node's ID
        const parentDestinationEl = node.closest('.destination-node');
        const fromDestination = parentDestinationEl?.id.replace('destination-', '') || '';
        
        if (fromDestination) {
          foundConnections.push({
            from: fromDestination,
            to: targetDestination
          });
        }
      });
      
      setConnections(foundConnections);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [activePanel, panelData]); // Refresh when panel changes
  
  
  return (
    <>
      {connections.map((connection, index) => (
        <Connection 
          key={`connection-${index}-${connection.from}-${connection.to}`}
          from={connection.from}
          to={connection.to}
          animated={true}
        />
      ))}
    </>
  );
};

const CanvasNavigator: React.FC = () => {
  const [activePanel, setActivePanel] = useState<string>('position');
  const [activeDestination, setActiveDestination] = useState<string | null>(null);
  
  // Function to navigate between panels and optionally to a specific destination node
  const navigate: NavigateFunction = useCallback((targetId: string, destinationId?: string) => {
    setActivePanel(targetId);
    if (destinationId) {
      setActiveDestination(destinationId);
    } else {
      setActiveDestination(null);
    }
  }, []);

  // Effect for scrolling to destination node
  useEffect(() => {
    if (activeDestination) {
      // Small timeout to ensure panel transition has completed
      const timer = setTimeout(() => {
        const destinationElement = document.getElementById(`destination-${activeDestination}`);
        if (destinationElement) {
          // Find the panel element to scroll
          const panelElement = destinationElement.closest('.panel');
          if (panelElement) {
            // Calculate scroll position with offset to avoid hiding content behind potential headers
            const scrollOffset = 120; // Adjust this value based on your UI
            
            // Calculate the scroll position - element's top position relative to the panel
            // minus offset to show some content above the destination
            const elementPosition = destinationElement.offsetTop;
            const scrollPosition = Math.max(0, elementPosition - scrollOffset);
            
            // Scroll smoothly to the position
            panelElement.scrollTo({
              top: scrollPosition,
              behavior: 'smooth'
            });
            
            // Highlight effect (optional)
            destinationElement.style.transition = 'background-color 0.5s ease';
            destinationElement.style.backgroundColor = 'rgba(0, 102, 204, 0.2)';
            setTimeout(() => {
              destinationElement.style.backgroundColor = 'rgba(0, 102, 204, 0.05)';
            }, 1500);
          }
        }
        // Clear active destination after scrolling
        setActiveDestination(null);
      }, 650); // Wait slightly longer than the animation duration (0.6s)
      
      return () => clearTimeout(timer);
    }
  }, [activePanel, activeDestination]);

  const canvasValue = {
    navigate,
    activePanel
  };

  return (
    <ConnectionProvider>
      <CanvasContext.Provider value={canvasValue}>
        <div className="layout-container">
          {/* Navigation Sidebar */}
          <NavigationSidebar 
            activePanel={activePanel}
            navigate={navigate}
          />
          
          <div className="canvas-container">
            {/* Define panels */}
            {(() => {
              // Define panels with their positions
              const panelsData = [
                createPanelWithPosition('scamper', 'CTMF#1 Scamper', <Scamper />, { x: 5 + -3, y: 1 }),
                createPanelWithPosition('biomimicry', 'CTMF#3 Biomimicry', <Biomimicry />, { x: 5 + -5, y: 5.5 }),
                createPanelWithPosition('morphChart', 'CTMF#2 Morph Chart', <MorphChart />, { x: 5 + -4, y: 3 }),
                createPanelWithPosition('prototypes', 'CTMF#3 Prototypes', <Prototypes />, { x: 5, y: -10 }),
                createPanelWithPosition('referenceDesigns', 'CTMF#2 Reference Designs', <ReferenceDesigns />, { x: 5, y: -8 }),
                createPanelWithPosition('stakeholders', 'CTMF#1 Stakeholders', <Stakeholders />, { x: 5, y: -5 }),
                createPanelWithPosition('dfx', 'CTMF#1 DfX', <DfX />, { x: 5 + 3, y: 1 }),
                createPanelWithPosition('pairwiseComparison', 'CTMF#2 Pairwise Comparison', <PairwiseComparison />, { x: 5 + 4, y: 3 }),
                createPanelWithPosition('measurementMatrix', 'CTMF#3 Measurement Matrix', <MeasurementMatrix />, { x: 5 + 5, y: 5.5 }),
                createPanelWithPosition('position', 'Position', <PositionContent />, { x: 5 + 0, y: 0 }),
                createPanelWithPosition('bike', 'Bike', <BikeContent />, { x: 5 + -2, y: -2 }),
                createPanelWithPosition('hanger', 'Hanger', <HangerContent />, { x: 5 + 2, y: -2.5 }),
                createPanelWithPosition('bridge', 'Bridge', <BridgeContent />, { x: 5 + 0, y: -3 }),
                createPanelWithPosition('references', 'References', <ReferencesContent />, { x: 5 + 0, y: 6 }), // Add this line
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
                      width: '1000vw',  // Expanded to accommodate wider range
                      height: '1000vh', // Expanded to accommodate taller range
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
        </div>
      </CanvasContext.Provider>
    </ConnectionProvider>
  );
};

export default CanvasNavigator;
