import ep51Cover from "../assets/images/ep_51_cover_1779395571919.png";
import ep50Cover from "../assets/images/ep_50_cover_1779395588831.png";
import ep49Cover from "../assets/images/ep_49_cover_1779395604581.png";
import ep42Cover from "../assets/images/ep_42_cover_1779395624503.png";

export interface GuestInfo {
  name: string;
  role: string;
  company: string;
  avatarUrl?: string;
  bio: string;
  linkedinUrl?: string;
}

export interface TranscriptLine {
  speaker: string;
  time: string;
  text: string;
}

export interface SentimentSegment {
  intensity: number; // 0 to 1
  density: number; // 0 to 1
}

export interface Episode {
  id: string;
  episodeNumber: number;
  title: string;
  date: string;
  duration: string;
  category: string;
  summary: string;
  extendedDescription: string;
  sourceUrl: string;
  imageUrl?: string;
  fullShowNotes?: string[];
  guests?: GuestInfo[];
  transcript?: TranscriptLine[];
  sentimentMap?: SentimentSegment[];
  likes?: number;
  shares?: number;
}

export const EPISODES_DATA: Episode[] = [
  {
    id: "ep-51",
    episodeNumber: 51,
    title: "The Four Scenarios Shaping Insurance 2040 by SAS and The Economist",
    date: "July 04, 2025",
    duration: "45 mins",
    category: "InsurTech & Risk",
    summary: "Exploring long-range strategic scenarios, climate risks, and systemic technology shifts shaping the next decades of global underwriting.",
    extendedDescription: "In this comprehensive session, Sabine VanderLinden unpacks SAS and The Economist's landmark research on the future of risk underwriting. We analyze climate volatility, cyber resiliency, decentralized custody, and the four mathematical scenarios governing commercial premiums through 2040.",
    sourceUrl: "https://www.alchemycrew.ventures/podcasts/beyond-tech-frontiers/episodes/2149058453",
    imageUrl: ep51Cover,
    fullShowNotes: [
      "Deconstruction of the latest 200-page joint actuarial research publication with The Economist Intelligence Unit.",
      "The four core mathematical corridors defined: The Fragmented Ledger, The Sovereign Sanctuary, The Climate Chaos Pool, and The Interoperable Ledger.",
      "Deep-dive into cyber liability and why cloud service-outage correlations are breaking conventional historical reinsurance curves.",
      "Practical advice for corporate risk officers looking to introduce triple-loop scenario testing inside their standard quarterly disclosures."
    ],
    guests: [
      {
        name: "Dr. Helen Vance",
        role: "Chief Risk Actuary",
        company: "Risk Futures Lab",
        bio: "Dr. Vance is a veteran actuarial theorist who previously headed quantitative forecasting at Lloyds. She holds a PhD in Statistical Topology from Oxford and leads global risk scenario modeling.",
        linkedinUrl: "https://linkedin.com/in/helen-vance-risk-futures"
      },
      {
        name: "Marcus Sterling",
        role: "Senior Scenario Architect",
        company: "SAS Global",
        bio: "Marcus designs macro-economic projection frameworks and cloud stress-testing systems. He is the principal computational author of the SAS Insurance 2040 handbook.",
        linkedinUrl: "https://linkedin.com/in/marcus-sterling-sas"
      }
    ],
    transcript: [
      { speaker: "Sabine VanderLinden", time: "00:15", text: "Welcome back to Beyond Tech Frontiers. Today, we are opening a dense actuarial notebook. We're looking at the joint foresight research by SAS and The Economist regarding the four global scenarios shaping insurance portfolios up to the year 2040." },
      { speaker: "Dr. Helen Vance", time: "01:22", text: "It is a pleasure to join you, Sabine. When we embarked on this research, our main objective was to challenge the status quo. Static historical underwriting models are no longer fit for a world with multi-point non-linear climate triggers." },
      { speaker: "Sabine VanderLinden", time: "02:40", text: "Fascinating. Marcus, from the SAS technological perspective, how do we begin translating these highly chaotic scenarios into code and computational data models?" },
      { speaker: "Marcus Sterling", time: "03:15", text: "Sabine, the key is continuous stochastic testing. Instead of running a simulation once a year prior to reinsurance renewal, modern setups run thousands of simulated market shocks every hour over distributed ledgers." },
      { speaker: "Dr. Helen Vance", time: "05:40", text: "Yes, and the results show something very stark: if carriers don't integrate real-time sensor loops and algorithmic pricing adjustment mechanisms, close to 35% of commercial lines might become completely uninsurable by the mid-2030s." }
    ],
    sentimentMap: [
      { intensity: 0.2, density: 0.1 }, { intensity: 0.4, density: 0.3 }, { intensity: 0.6, density: 0.8 }, { intensity: 0.3, density: 0.6 },
      { intensity: 0.7, density: 0.4 }, { intensity: 0.9, density: 0.2 }, { intensity: 0.5, density: 0.7 }, { intensity: 0.4, density: 0.9 },
      { intensity: 0.8, density: 0.5 }, { intensity: 0.6, density: 0.3 }, { intensity: 0.3, density: 0.7 }, { intensity: 0.5, density: 0.8 },
      { intensity: 0.9, density: 0.9 }, { intensity: 0.4, density: 0.4 }, { intensity: 0.2, density: 0.1 }, { intensity: 0.6, density: 0.6 }
    ]
  },
  {
    id: "ep-50",
    episodeNumber: 50,
    title: "How Will Agentic AI Transform Industries",
    date: "July 03, 2025",
    duration: "38 mins",
    category: "Agentic AI",
    summary: "Analyzing the shift from conversational copilots to autonomous multi-agent systems executing complex client-side enterprise actions.",
    extendedDescription: "Copilots were merely the transition state. Sabine and expert guests trace the emergence of true Agentic Workforces—dynamic ensembles of self-correcting neural agents capable of managing cross-border transactions, contract routing, and live compliance verification without human-in-the-loop dependencies.",
    sourceUrl: "https://www.alchemycrew.ventures/podcasts/beyond-tech-frontiers/episodes/2149058454",
    imageUrl: ep50Cover,
    fullShowNotes: [
      "Defining the key difference between interactive, prompt-based LLM assistants and self-directed agent chains.",
      "The architecture of Multi-Agent Orchestrators: memory pooling, state caching, and the 'debate loop' paradigm.",
      "Addressing secure backend authentication: How agents can interact securely with SAP and Salesforce via locked OAuth wrappers.",
      "The emerging legal framework for machine-negotiated contracts and financial sub-delegation limits."
    ],
    guests: [
      {
        name: "Dr. Aaron Chen",
        role: "Director of Neural Workforces",
        company: "Tenured AI",
        bio: "Aaron leads the engineering team building sovereign Multi-Agent ensembles. He’s a former DeepMind senior scientist and holds a PhD in Machine Learning from Stanford.",
        linkedinUrl: "https://linkedin.com/in/aaron-chen-tenured"
      }
    ],
    transcript: [
      { speaker: "Sabine VanderLinden", time: "00:10", text: "Welcome to Episode 50! We're talking about Agentic AI. For the last two years, we've had chat interfaces. But we are now moving to autonomous agents that talk to other agents to execute heavy industry work." },
      { speaker: "Dr. Aaron Chen", time: "00:54", text: "Exactly, Sabine. If you ask an LLM to 'write an email,' that's a tool. If you give an Ensemble Agent the objective 'reduce our freight carriage delays by 10%,' it writes, critiques, inspects, queries logistics APIs, and coordinates directly." },
      { speaker: "Sabine VanderLinden", time: "02:10", text: "And that requires an intensive change of governance. How does a corporate operations manager maintain authority when thousands of machine micro-negotiations are occurring offline?" },
      { speaker: "Dr. Aaron Chen", time: "03:45", text: "We use locked consensus boundaries. Each agent has an operation envelope. Any transaction touching a real ledger above a certain risk threshold triggers a standard cryptographic sign-off for a human guardian." }
    ],
    sentimentMap: [
      { intensity: 0.3, density: 0.2 }, { intensity: 0.5, density: 0.4 }, { intensity: 0.8, density: 0.1 }, { intensity: 0.4, density: 0.3 },
      { intensity: 0.2, density: 0.9 }, { intensity: 0.6, density: 0.8 }, { intensity: 0.9, density: 0.7 }, { intensity: 0.5, density: 0.5 },
      { intensity: 0.4, density: 0.6 }, { intensity: 0.7, density: 0.4 }, { intensity: 0.8, density: 0.3 }, { intensity: 0.3, density: 0.2 }
    ]
  },
  {
    id: "ep-49",
    episodeNumber: 49,
    title: "A Journey into Ergo Scalehub: A Personal Reflection in Düsseldorf",
    date: "June 27, 2025",
    duration: "32 mins",
    category: "Enterprise Innovation",
    summary: "Insights from the European innovation capital on corporate scalehub acceleration and enterprise partnership models.",
    extendedDescription: "A first-hand field report from Sabine VanderLinden in Düsseldorf. Unveiling the operational mechanics of the Ergo Scalehub, this episode details the real-world friction of corporate venture clienting, mapping tech startup agility onto dense institutional insurance architectures.",
    sourceUrl: "https://www.alchemycrew.ventures/podcasts/beyond-tech-frontiers/episodes/2149058455",
    imageUrl: ep49Cover,
    fullShowNotes: [
      "An insider physical tour of the Ergo innovation scaled hubs based in Germany's insurance heartland.",
      "Why standard startup incubators fail: The mismatch between startup cash runways and corporate procurement timetables.",
      "The 'Venture Client' model: Why buying products as an active customer beats equity-focused investing in early validation stages.",
      "Key takeaways from Sabine's high-level executive roundtable with German underwriting boards."
    ],
    guests: [
      {
        name: "Dietrich Müller",
        role: "Head of Venture Acceleration",
        company: "Ergo Scalehub",
        bio: "Dietrich leads business development and external startup programs across the Ergo Group, specializing in bridging legacy AS400 core architectures with Web3 and AI tools.",
        linkedinUrl: "https://linkedin.com/in/dietrich-mueller-ergo"
      }
    ],
    transcript: [
      { speaker: "Sabine VanderLinden", time: "00:20", text: "Broadcasting live from the beautifully rain-swept Rhine embankment in Düsseldorf, just steps away from Ergo's innovation lab. I am joined by Dietrich Müller." },
      { speaker: "Dietrich Müller", time: "01:05", text: "Willkommen, Sabine! It is fantastic to have you on-site. The Scalehub was designed specifically because standard venture capital programs did not deliver rapid, functional core integrations." },
      { speaker: "Sabine VanderLinden", time: "03:12", text: "Absolutely. I've always advocated for Venture Clienting. Instead of wasting twelve months due diligence on a 1% equity stake, simply issue a paid PoC on a sandbox server." }
    ],
    sentimentMap: [
      { intensity: 0.5, density: 0.5 }, { intensity: 0.6, density: 0.3 }, { intensity: 0.4, density: 0.7 }, { intensity: 0.8, density: 0.4 },
      { intensity: 0.3, density: 0.2 }, { intensity: 0.7, density: 0.8 }, { intensity: 0.9, density: 0.5 }, { intensity: 0.5, density: 0.9 }
    ]
  },
  {
    id: "ep-48",
    episodeNumber: 48,
    title: "AI Titans Double Down on Enterprise: Key Moves from April to June 2025",
    date: "June 19, 2025",
    duration: "41 mins",
    category: "Disruptive Tech",
    summary: "Behind-the-scenes analysis of strategic capital allocations and infrastructure deployments by the dominant artificial intelligence laboratories.",
    extendedDescription: "As regulatory standards crystallize, OpenAI, Anthropic, and Google deepmind are deploying massive enterprise sovereign clouds. Sabine breaks down the key architectural moves, contract models, and fine-tuning protections negotiated by global consortia during the second quarter of 2025.",
    sourceUrl: "https://www.alchemycrew.ventures/podcasts/beyond-tech-frontiers/episodes/2149058456",
    fullShowNotes: [
      "The rush toward Private Sovereignty clouds and isolated parameter-tuning data warehouses.",
      "Evaluating key enterprise SLA commitments around privacy, zero-data-retention, and intellectual indemnity.",
      "Regulatory alignment: Mapping the latest drafts of global AI governance acts onto corporate infrastructure maps."
    ],
    guests: [
      {
        name: "Sienna Caldwell",
        role: "Lead Regulatory counsel",
        company: "Frontier Policy Alliance",
        bio: "Sienna acts as an advisory counsel for Fortune 100 councils navigating EU AI Act compliance and model boundary negotiations.",
        linkedinUrl: "https://linkedin.com/in/sienna-caldwell-policy"
      }
    ],
    transcript: [
      { speaker: "Sabine VanderLinden", time: "00:30", text: "The capital race is shifting. Organizations are no longer just looking for the coolest chatbot; they want absolute assurances regarding weight sovereignty and zero-retention compliance. Sienna, welcome." },
      { speaker: "Sienna Caldwell", time: "01:10", text: "Thank you, Sabine. What we've observed in the last 90 days is a radical renegotiation of enterprise contracts by the top labs. They are offering full copyright indemnity because they know insurance pools demand it." }
    ]
  },
  {
    id: "ep-47",
    episodeNumber: 47,
    title: "Latest News on Artificial Intelligence: Breakthroughs and Challenges",
    date: "June 18, 2025",
    duration: "29 mins",
    category: "Disruptive Tech",
    summary: "A granular review of weekly model architectures, benchmark leaks, and the evolving technical friction of frontier scale.",
    extendedDescription: "Keeping pace with accelerating hyper-development. This episode focuses on the emerging memory capacity boundaries, reasoning tokens performance on formal logic underwriting, and the systemic challenges of synthetic data loop degeneration.",
    sourceUrl: "https://www.alchemycrew.ventures/podcasts/beyond-tech-frontiers/episodes/2149058457",
    fullShowNotes: [
      "Deciphering technical architecture updates and the limitations of deep attention-mechanism scaling.",
      "The hazard of recursive synthetic training loops: Why AI trained on AI data degrades with mathematical certainty.",
      "Benchmarking legal reasoning bounds in current generation large-scale reasoning models."
    ]
  },
  {
    id: "ep-46",
    episodeNumber: 46,
    title: "Transforming Insurance: Ethical AI, Talent Strategies, and Customer-Centric Innovations",
    date: "June 16, 2025",
    duration: "52 mins",
    category: "InsurTech & Risk",
    summary: "Re-engineering risk assessment corridors and human underwriter roles to support trust, explainability, and strategic oversight.",
    extendedDescription: "How do we future-proof our workforce in an era of model dominance? Sabine outlines actionable frameworks for retraining technical underwriters, establishing model ethics boards, and designing consumer-facing AI systems that build persistent cognitive trust.",
    sourceUrl: "https://www.alchemycrew.ventures/podcasts/beyond-tech-frontiers/episodes/2149058458",
    fullShowNotes: [
      "Transitioning the classical insurance broker into a dynamic 'Systemic Risk Auditor' supervisor.",
      "The corporate board's guide to setting up explainable AI rules that pass rigorous audit inspections.",
      "Designing customer journeys that honor agency while benefiting from high-precision risk segmentation."
    ]
  },
  {
    id: "ep-45",
    episodeNumber: 45,
    title: "Algorithmic Underwriting 2.0: Revolutionizing Risk Assessment",
    date: "May 18, 2025",
    duration: "46 mins",
    category: "InsurTech & Risk",
    summary: "Moving past static statistical scoring to continuous real-time ledger audits governing sovereign data corridors.",
    extendedDescription: "A deep technical exploration into Continuous Underwriting. We detail how API-first data feeds, real-time sensor metrics, and automated risk scoring engines compile risk dynamic vectors, rendering old annual renewal models obsolete.",
    sourceUrl: "https://www.alchemycrew.ventures/podcasts/beyond-tech-frontiers/episodes/2149058459",
    fullShowNotes: [
      "From discrete batches to linear flow: why annual policy renewals are a relic of paper registers.",
      "Analyzing telemetry and connected smart-contract ledgers in modern marine transport.",
      "Ensuring dynamic compliance: What happens when risk variables shift mid-journey under extreme maritime weather."
    ]
  },
  {
    id: "ep-44",
    episodeNumber: 44,
    title: "The Evolution of the Corporate Innovation Model in 2025: Collaboration, Investment, and Venture Development",
    date: "May 17, 2025",
    duration: "48 mins",
    category: "Enterprise Innovation",
    summary: "Understanding modern corporate investing, incubator structures, and early-stage venture validation strategies.",
    extendedDescription: "The absolute standard of corporate venture capital is shifting. In this episode, Sabine maps the decay of general corporate labs and the rise of hyper-focused Venture Clienting—enabling multinationals to consume outside tech at 10x velocity and zero equity load.",
    sourceUrl: "https://www.alchemycrew.ventures/podcasts/beyond-tech-frontiers/episodes/2149058460",
    fullShowNotes: [
      "The systemic mortality rate of internal corporate 'labs' that fail to prove P&L impact after 18 months.",
      "Developing an external validation funnel using rapid sandboxes instead of high-stakes capital investitures.",
      "Setting up high-velocity pilot schemes with strict key performance indicators."
    ]
  },
  {
    id: "ep-43",
    episodeNumber: 43,
    title: "Reflections From Reuters Future of Insurance Europe 2025",
    date: "May 10, 2025",
    duration: "30 mins",
    category: "InsurTech & Risk",
    summary: "Hot-takes and strategic trends from the premier gathering of digital underwriting executives and industry pioneers in Europe.",
    extendedDescription: "Directly from the show floor. Sabine crystallizes the three core talking points from Reuters Future of Insurance Europe 10, outlining the major battles in carrier tech consolidation and dynamic market expansion strategies.",
    sourceUrl: "https://www.alchemycrew.ventures/podcasts/beyond-tech-frontiers/episodes/2149058461",
    fullShowNotes: [
      "Immediate hot-takes gathered from the corridor roundtables in Munich.",
      "Consolidation waves: How major legacy tier-1 carriers are buying out medium-sized software platforms.",
      "Climate tech’s rising prominence: Actuarial teams are hiring climatologists faster than software engineers."
    ]
  },
  {
    id: "ep-42",
    episodeNumber: 42,
    title: "Vibe Coding for Visionary Founders: How Sara Simeone and NoCodeLab Are Empowering Entrepreneurs",
    date: "May 03, 2025",
    duration: "39 mins",
    category: "Disruptive Tech",
    summary: "Examining how natural language development, high-productivity builders, and generative loops are lowering raw entry friction.",
    extendedDescription: "Vibe coding is the ultimate expression of creative focus. Sabine interviews Sara Simeone on how NoCodeLab utilizes AI agents to instantiate consumer web applications from sheer verbal descriptions, drastically compressing the journey from raw concept to sovereign revenue.",
    sourceUrl: "https://www.alchemycrew.ventures/podcasts/beyond-tech-frontiers/episodes/2149058462",
    imageUrl: ep42Cover,
    fullShowNotes: [
      "The definition of 'Vibe Coding': When code compiles autonomously from intent and the human acts purely as director.",
      "How Sara Simeone enabled over 300 non-technical founders to launch active SaaS nodes in 2024.",
      "The future of software architecture: Will all backend setups eventually collapse into self-generating transient scripts?"
    ],
    guests: [
      {
        name: "Sara Simeone",
        role: "Founder & AI Catalyst",
        company: "NoCodeLab",
        bio: "Sara is an eminent digital transformation expert, pioneer of no-code enterprise engineering, and serial entrepreneur helping visionary founders deploy complex workflows globally.",
        linkedinUrl: "https://linkedin.com/in/sara-simeone-nocodelab"
      }
    ],
    transcript: [
      { speaker: "Sabine VanderLinden", time: "00:15", text: "Today we have Sara Simeone. Sara and her team have popularized a concept close to my heart: fast, agile, sovereign prototyping, or as a lot of young developers like to call it, 'Vibe Coding'." },
      { speaker: "Sara Simeone", time: "00:58", text: "Hi, Sabine! Beautiful to connect. Vibe coding gets a laugh, but it represents a profound paradigm shift. It means the bottleneck is no longer syntax; it is clarity of imagination and crisp system workflow thinking." }
    ],
    sentimentMap: [
      { intensity: 0.8, density: 0.1 }, { intensity: 0.9, density: 0.3 }, { intensity: 0.7, density: 0.5 }, { intensity: 0.6, density: 0.8 },
      { intensity: 0.5, density: 0.9 }, { intensity: 0.4, density: 0.7 }, { intensity: 0.3, density: 0.5 }, { intensity: 0.2, density: 0.2 }
    ]
  },
  {
    id: "ep-41",
    episodeNumber: 41,
    title: "Leading the Gen AI Ecosystem: 4 Roles Shaping Tomorrow’s Decentralized Enterprise",
    date: "May 02, 2025",
    duration: "44 mins",
    category: "Agentic AI",
    summary: "A framework detailing the critical architectural archetypes required to manage scaling machine agents within global workforces.",
    extendedDescription: "Sabine presents a mandatory leadership checklist for the sovereign enterprise. We delineate four core human-in-the-loop roles—Guardians, Orchestrators, Curators, and Auditors—required to anchor agentic networks to operational and ethical reality.",
    sourceUrl: "https://www.alchemycrew.ventures/podcasts/beyond-tech-frontiers/episodes/2149058463",
    fullShowNotes: [
      "The organizational blueprint of the decentralized enterprise in an AI-dominant ecosystem.",
      "Defining the 4 core roles of human oversight: Guardians (safety/policy), Orchestrators (workflow design), Curators (data selection), and Auditors (compliance/ledger verification).",
      "How to retrain mid-tier corporate administrators to become elite multi-agent system directors."
    ]
  },
  {
    id: "ep-40",
    episodeNumber: 40,
    title: "Four Futures of Risk: Strategic Scenarios for Insurance and Climate Tech in 2035",
    date: "April 12, 2025",
    duration: "50 mins",
    category: "InsurTech & Risk",
    summary: "Assessing micro-correlations, sovereign capacity, and adaptive insurance policies under rapid climate volatility.",
    extendedDescription: "Climate tech and actuarial forecasting are merging. Sabine maps out the four strategic realities that risk planners are modeling for the year 2035, centering on alternative energy grids resilience, automated transition bonds, and systemic catastrophic risks.",
    sourceUrl: "https://www.alchemycrew.ventures/podcasts/beyond-tech-frontiers/episodes/2149058464",
    fullShowNotes: [
      "How climate macro-trends are driving the convergence of insurance tech and climate tech.",
      "The role of smart, parametric insurance bonds: Automatically payout claim capital the millisecond wind speed or temperature registers above absolute thresholds on weather sensors.",
      "Building resilient alternative energy transmission grids through decentralized hedging."
    ]
  }
];

export const CATEGORIES = [
  "All",
  "Agentic AI",
  "InsurTech & Risk",
  "Enterprise Innovation",
  "Disruptive Tech"
];
