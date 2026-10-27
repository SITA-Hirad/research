/**
 * SITA Research Maturity Model — playbook content.
 * Built around SITA's 9 Core Criteria across People, Impact, and Process.
 */

export type CriterionPillar = "People" | "Impact" | "Process"

export type CriterionKey =
  | "capacity_enablement"
  | "leadership_buyin"
  | "metrics_kpis"
  | "decision_influence"
  | "operations_governance"
  | "capacity"
  | "sponsorship"
  | "enablement"
  | "metrics"
  | "influence"
  | "operations"
  | "repository"
  | "governance"
  | "ai_integration"

export type Criterion = {
  key: CriterionKey
  pillar: CriterionPillar
  name: string
  subCriteria: string
  description: string
  roadmapFocus: string
}

export type CriterionScore = {
  key: CriterionKey
  name: string
  pillar: CriterionPillar
  score: number // 1–5 maturity score
  summary: string
}

export type Step = {
  title: string
  body: string
}

export type Quote = {
  text: string
  name: string
  role: string
}

export type Level = {
  id: string
  level: number
  name: string
  tagline: string
  scoreRange: string
  overview: string
  criteriaScores: CriterionScore[]
  characteristics: string[]
  reachThisLevel: string[]
  strengths: string[]
  weaknesses: string[]
  roadmap: Step[]
  prepareNext: Step[]
  topImpact: { label: string; value: number }[]
  quote?: Quote
  isTop?: boolean
}

/* ----------------------------------------------------------------------------
   The six SITA Core Criteria structured by 3 Pillars (People, Impact, Process)
---------------------------------------------------------------------------- */
export const sitaCriteria: Criterion[] = [
  // People
  {
    key: "capacity",
    pillar: "People",
    name: "Research capacity",
    subCriteria: "Dedicated user researchers / research community of practice",
    description: "Dedicated user researchers / research community of practice",
    roadmapFocus: "Evolving from zero dedicated roles to establishing specialized UXR talent, practice leads, and scaling a federated Community of Practice across squads.",
  },
  {
    key: "sponsorship",
    pillar: "People",
    name: "Leadership buy-in",
    subCriteria: "Leadership sponsorship, participation, and recognition of ResearchOps as a strategic function",
    description: "Leadership sponsorship, participation, and recognition of ResearchOps as a strategic function",
    roadmapFocus: "Securing executive sponsorship, routine VP/director attendance in synthesis and co-creation sessions, and formal recognition of user research as a strategic advantage.",
  },
  {
    key: "enablement",
    pillar: "People",
    name: "Research enablement",
    subCriteria: "Research quality + Researcher training & development + extend organizational understanding of UX research",
    description: "Research quality + Researcher training & development + extend organizational understanding of UX research",
    roadmapFocus: "Continuous researcher skill growth, onboarding programs, democratized training packs for PMs and designers, and expanding organization-wide research literacy.",
  },
  // Impact
  {
    key: "metrics",
    pillar: "Impact",
    name: "Metrics & KPIs",
    subCriteria: "Research impact measurement, connection to business ROI, risk reduction, etc.",
    description: "Research impact measurement, connection to business ROI, risk reduction, etc.",
    roadmapFocus: "Connecting discovery directly to strategic KPIs—measurable ROI, customer retention, time-to-market reduction, risk mitigation, and product adoption.",
  },
  {
    key: "influence",
    pillar: "Impact",
    name: "Decision influence",
    subCriteria: "Adoption of research insights in product development",
    description: "Adoption of research insights in product development",
    roadmapFocus: "Ensuring insights actively steer portfolio priorities, roadmap bets, product scoping, and executive decisions rather than serving as post-design justification.",
  },
  // Process
  {
    key: "operations",
    pillar: "Process",
    name: "Research operations",
    subCriteria: "Toolchain, templates, best practices, insight generation automation, participant access rate",
    description: "Toolchain, templates, best practices, insight generation automation, participant access rate",
    roadmapFocus: "Standardized toolchains, automated participant recruiting, self-serve templates, AI-assisted transcription/synthesis, and seamless operational support.",
  },
  {
    key: "repository",
    pillar: "Process",
    name: "Research repository",
    subCriteria: "Knowledge management: centralized database for all research insights",
    description: "Knowledge management: centralized database for all research insights",
    roadmapFocus: "Creating an easily searchable, tagged, centralized knowledge base where historical user findings, videos, and evidence are universally accessible and reused across teams.",
  },
  {
    key: "governance",
    pillar: "Process",
    name: "Governance",
    subCriteria: "Transparent ethical & legal standards protecting participants and organization",
    description: "Transparent ethical & legal standards protecting participants and organization",
    roadmapFocus: "Enterprise-grade consent protocols, GDPR/privacy compliance, participant data protection, ethical guardrails, and secure insight lifecycle management.",
  },
  {
    key: "ai_integration",
    pillar: "Process",
    name: "AI Integration",
    subCriteria: "AI-accelerated workflows, ethical AI synthesis, automated clustering, and intelligent intelligence retrieval",
    description: "AI-accelerated workflows, ethical AI synthesis, automated clustering, and intelligent intelligence retrieval",
    roadmapFocus: "Scaling from isolated ad-hoc experimentation to fully embedded, ethically governed AI copilots for interview transcription, thematic synthesis, automated tagging, and cross-study knowledge retrieval.",
  },
]

export const sixCriteria: Criterion[] = [
  { key: "capacity_enablement", pillar: "People", name: "Research capacity and enablement", subCriteria: "Dedicated research capacity, quality standards, training, and research literacy", description: "Dedicated research capacity, quality standards, training, and research literacy", roadmapFocus: "Build dedicated research capacity and a culture of enablement through shared standards, training, and a Community of Practice." },
  { key: "leadership_buyin", pillar: "People", name: "Leadership buy-in", subCriteria: "Leadership sponsorship, participation, and recognition of research as a strategic function", description: "Leadership sponsorship, participation, and recognition of research as a strategic function", roadmapFocus: "Secure visible executive sponsorship and make research a recognized strategic capability." },
  { key: "metrics_kpis", pillar: "Impact", name: "Metrics and KPIs", subCriteria: "Research impact measurement, business ROI, risk reduction, and customer outcomes", description: "Research impact measurement, business ROI, risk reduction, and customer outcomes", roadmapFocus: "Connect research to measurable business outcomes and decision-quality indicators." },
  { key: "decision_influence", pillar: "Impact", name: "Decision influence", subCriteria: "Adoption of research insights in product and strategic decisions", description: "Adoption of research insights in product and strategic decisions", roadmapFocus: "Ensure evidence shapes priorities, roadmaps, product scope, and strategic choices." },
  { key: "operations_governance", pillar: "Process", name: "Operations and governance", subCriteria: "Tooling, participant access, repositories, templates, automation, ethics, and privacy", description: "Tooling, participant access, repositories, templates, automation, ethics, and privacy", roadmapFocus: "Create scalable ResearchOps with secure knowledge management, participant protection, and responsible processes." },
  { key: "ai_integration", pillar: "Process", name: "AI integration", subCriteria: "Responsible AI-accelerated workflows, synthesis, retrieval, and automation", description: "Responsible AI-accelerated workflows, synthesis, retrieval, and automation", roadmapFocus: "Embed governed AI into transcription, synthesis, tagging, and insight retrieval." },
]

export const glossary = [
  {
    term: "SITA Research Maturity",
    def: "The extent to which research activities, infrastructure, and culture are established and strategically leveraged across SITA.",
  },
  {
    term: "6 SITA Core Criteria",
    def: "The benchmark criteria defining capability across People (Capacity, Leadership buy-in, Enablement), Impact (Metrics & KPIs, Decision influence), and Process (Operations, Repository, Governance, AI Integration).",
  },
  {
    term: "Community of Practice (CoP)",
    def: "The network of dedicated researchers and cross-functional partners who share practices, review research rigor, and elevate research craft.",
  },
  {
    term: "ResearchOps",
    def: "The operational backbone managing recruiting, platforms, tooling, repositories, templates, and governance so researchers and squads move with velocity.",
  },
]

/* ----------------------------------------------------------------------------
   The 5 Maturity Levels (Spider Chart scores strictly verified from Figma designs)
   Axes in clockwise order:
   Capacity -> Sponsorship -> Enablement -> Metrics -> Influence -> Operations -> Repository -> Governance -> AI Integration
---------------------------------------------------------------------------- */
export const levels: Level[] = [
  {
    id: "limited",
    level: 1,
    name: "Limited",
    tagline: "Research is purely ad hoc and reactive, mainly used to monitor post-release feedback.",
    scoreRange: "0–19",
    overview:
      "Level 1 organizations have minimal dedicated research infrastructure. Insights are sourced from passive streams like customer support logs or sporadic post-launch reviews. Executives lack awareness of research ROI, resulting in no dedicated budget, informal tooling, and siloed decision-making with high risks of building the wrong features.",
    criteriaScores: [
      { key: "capacity", name: "Research capacity", pillar: "People", score: 20, summary: "No dedicated researchers; research is nobody's explicit responsibility or is handled as an informal afterthought." },
      { key: "sponsorship", name: "Leadership buy-in", pillar: "People", score: 20, summary: "Leadership has minimal awareness of user research; no executive sponsor or dedicated operational budget." },
      { key: "enablement", name: "Research enablement", pillar: "People", score: 5, summary: "No formalized training or guidelines; teams rely on instinct and ad-hoc questioning." },
      { key: "metrics", name: "Metrics & KPIs", pillar: "Impact", score: 5, summary: "Zero measurement of research impact or business ROI; feedback is anecdotal." },
      { key: "influence", name: "Decision influence", pillar: "Impact", score: 5, summary: "Insights rarely reach decision-makers; roadmap is driven purely by technical or stakeholder assumptions." },
      { key: "operations", name: "Research operations", pillar: "Process", score: 20, summary: "No standardized toolchain, participant recruiting process, or shared templates." },
      { key: "repository", name: "Research repository", pillar: "Process", score: 5, summary: "No central database; past notes are lost in personal drives, chat channels, or slide decks." },
      { key: "governance", name: "Governance", pillar: "Process", score: 5, summary: "Informal or nonexistent participant consent, privacy management, or ethical protocols." },
      { key: "ai_integration", name: "AI Integration", pillar: "Process", score: 5, summary: "No AI tooling in research; ad-hoc personal experimentation without governance or integration." },
    ],
    characteristics: [
      "Insights come exclusively from passive, post-launch signals: support tickets, bug logs, and informal feedback.",
      "No dedicated researchers; no budget line for research talent, platforms, or participant recruiting.",
      "Executives view research as a cosmetic design review rather than a strategic business asset.",
      "Findings are fragmented in local documents, with zero cross-squad visibility or reuse.",
    ],
    reachThisLevel: [
      "A product or service exists in market generating usage metrics or support feedback.",
      "A product team recognizes the need to understand why certain features fail to gain adoption.",
      "Initial acknowledgement that customer feedback should inform future product iterations.",
    ],
    strengths: [
      "Zero overhead and fast execution cycles without approval gates.",
      "Direct access to raw customer support issues and immediate bug triage.",
      "Baseline signal exists to justify the creation of early research practices.",
    ],
    weaknesses: [
      "Completely reactive—flaws and mismatches are uncovered only after costly engineering cycles.",
      "Lack of qualitative customer understanding leads to risky roadmap assumptions.",
      "Zero institutional memory: identical questions are repeatedly debated without evidence.",
      "No executive advocacy or protection during resource allocation.",
    ],
    roadmap: [
      { title: "Establish research capacity fundamentals", body: "Identify existing advocates among designers and product managers to form an initial Research Working Group and pilot small-scale user sessions." },
      { title: "Educate stakeholders on research value", body: "Frame early testing around de-risking engineering investment and reducing post-launch support volume to secure early management interest." },
      { title: "Introduce lightweight operations & basic consent", body: "Create a standardized participant consent form and a simple shared workspace folder for storing usability test recordings." },
      { title: "Connect findings to immediate sprint decisions", body: "Share 2-minute video highlights in sprint reviews to demonstrate user friction directly to developers and product owners." },
    ],
    prepareNext: [
      { title: "Secure initial leadership sponsorship", body: "Present quick-win usability findings to directors to demonstrate that testing saved engineering rework." },
      { title: "Establish a baseline usability testing toolkit", body: "Adopt a shared testing platform and provide reusable script templates for product discovery." },
      { title: "Formalize participant access procedures", body: "Define standard communication guidelines for contacting customers while respecting privacy." },
    ],
    topImpact: [
      { label: "Product usability", value: 45 },
      { label: "Reduced support requests", value: 27 },
      { label: "Feature adoption", value: 20 },
      { label: "Customer retention", value: 18 },
      { label: "Time-to-market", value: 12 },
    ],
    quote: {
      text: "Be intentional in learning about the research needs of your cross-functional partners, listen to their perspectives, and seek out broader patterns. These conversations will help demonstrate craft thought leadership, build trust, and showcase the value research brings to strategic discussions.",
      name: "Jessica Pavia",
      role: "Director of UX Research & Design Operations",
    },
  },
  {
    id: "sporadic",
    level: 2,
    name: "Sporadic",
    tagline: "Research is conducted on an ad-hoc basis, primarily to validate pre-determined design solutions.",
    scoreRange: "20–39",
    overview:
      "Organizations at Level 2 have recognized the value of testing, but research happens sporadically. Cross-functional champions (designers or PMs) conduct usability tests when time permits, mostly as an evaluative checkpoint right before engineering handoff. Process, tooling, and governance remain localized, with limited organizational reuse.",
    criteriaScores: [
      { key: "capacity", name: "Research capacity", pillar: "People", score: 20, summary: "Designers or PMs act as part-time champions conducting studies alongside their primary role; no dedicated full-time researchers yet." },
      { key: "sponsorship", name: "Leadership buy-in", pillar: "People", score: 40, summary: "Mid-level managers support research for design validation, though executives still see it as tactical testing rather than strategic guidance." },
      { key: "enablement", name: "Research enablement", pillar: "People", score: 40, summary: "Informal knowledge sharing and basic templates exist, but formal training programs are not yet established." },
      { key: "metrics", name: "Metrics & KPIs", pillar: "Impact", score: 20, summary: "Impact is tracked locally via usability scores (SUS, task completion), with weak ties to core business metrics." },
      { key: "influence", name: "Decision influence", pillar: "Impact", score: 20, summary: "Insights validate UI flows and interaction details, but rarely change strategic roadmaps or business priorities." },
      { key: "operations", name: "Research operations", pillar: "Process", score: 40, summary: "Basic testing software and participant screener templates are shared within individual teams." },
      { key: "repository", name: "Research repository", pillar: "Process", score: 20, summary: "Teams store reports in local wiki pages or shared drives; no unified indexing or cross-team search." },
      { key: "governance", name: "Governance", pillar: "Process", score: 20, summary: "Standard consent forms are used, but compliance tracking and participant database management are manual." },
      { key: "ai_integration", name: "AI Integration", pillar: "Process", score: 20, summary: "Basic AI transcription tools used informally by individuals; no standardized AI synthesis or data protection." },
    ],
    characteristics: [
      "A few passionate design or PM champions advocate for research and run studies during active sprints.",
      "Usability testing, wireframe walkthroughs, and user interviews occur, but almost exclusively for late validation.",
      "Insights remain siloed within the specific project team that executed the study.",
      "Research is treated as a tactical checklist gatekeeper rather than an ongoing discovery partner.",
    ],
    reachThisLevel: [
      "Product champions introduce prototype testing into the design process.",
      "Teams recognize that validating early mockups prevents costly engineering mistakes.",
      "Management agrees to fund basic remote testing subscriptions and participant incentives.",
    ],
    strengths: [
      "Critical UI flaws and usability hurdles are identified and resolved before code is deployed.",
      "Early organizational empathy for user pain points begins to take root in engineering and design.",
      "Visible proof points demonstrate the return on investment from customer engagement.",
    ],
    weaknesses: [
      "High dependency on individual advocates—research stops if the champion leaves or changes projects.",
      "Insights remain trapped in silos, leading other squads to duplicate identical research questions.",
      "Studies are compressed into tight sprint deadlines, restricting work to shallow evaluative testing.",
      "Lack of centralized participant management risks customer fatigue and GDPR inconsistencies.",
    ],
    roadmap: [
      { title: "Establish an operational ResearchOps foundation", body: "Deploy a unified participant recruiting channel and standard consent protocol across all active product lines." },
      { title: "Develop a centralized knowledge repository", body: "Consolidate past study decks, recording highlights, and key findings into a structured, searchable knowledge repository." },
      { title: "Launch a Research Enablement Program", body: "Build a 'Research Starter Kit' with interview guides, survey templates, and analysis checklists for non-researchers." },
      { title: "Shift from validation to discovery", body: "Partner with product leads to allocate discovery time before roadmaps are finalized, testing underlying problem spaces." },
    ],
    prepareNext: [
      { title: "Hire the first dedicated research lead", body: "Build the business case for a dedicated UXR specialist to oversee research quality and establish standard operations." },
      { title: "Engage leadership in discovery readouts", body: "Host interactive executive playback sessions focused on unmet customer needs and market opportunities." },
      { title: "Establish regular cadence of cross-squad sharing", body: "Organize monthly research showcases to highlight insights that cross multiple product domains." },
    ],
    topImpact: [
      { label: "Product usability", value: 82 },
      { label: "Customer satisfaction", value: 51 },
      { label: "Customer engagement & adoption", value: 41 },
      { label: "Product-market fit", value: 37 },
      { label: "Reduced development cost", value: 33 },
    ],
    quote: {
      text: "Learning and seeking insights is everyone's responsibility. Every team should be able to gather information or feedback on what they're building. This shift in mindset is vital to getting more people on board and elevating research maturity.",
      name: "Dalia El-Shimy",
      role: "Director of UX Research",
    },
  },
  {
    id: "developing",
    level: 3,
    name: "Developing",
    tagline: "Research enters early discovery to explore problem spaces and shape roadmap priorities.",
    scoreRange: "40–59",
    overview:
      "Level 3 organizations embrace dual-track agile discovery and delivery. Dedicated researchers guide cross-functional squads, balancing generative discovery with evaluative testing. Research operations begin to formalize with shared repositories, training packs, and structured participant pipelines. Research is recognized as an essential driver of product roadmap decisions.",
    criteriaScores: [
      { key: "capacity", name: "Research capacity", pillar: "People", score: 40, summary: "Dedicated UX researchers are embedded within key product domains, complemented by active community sessions." },
      { key: "sponsorship", name: "Leadership buy-in", pillar: "People", score: 60, summary: "Product leadership and engineering managers regularly consult research before approving quarter-ahead roadmap commitments." },
      { key: "enablement", name: "Research enablement", pillar: "People", score: 60, summary: "Standardized research training programs, office hours, and peer review sessions are active across squads." },
      { key: "metrics", name: "Metrics & KPIs", pillar: "Impact", score: 40, summary: "Research findings are tracked alongside UX benchmarks and feature-level adoption/retention metrics." },
      { key: "influence", name: "Decision influence", pillar: "Impact", score: 40, summary: "Insights influence feature prioritization and problem definition, though company-wide strategic bets remain separate." },
      { key: "operations", name: "Research operations", pillar: "Process", score: 60, summary: "Dedicated recruiting panels, streamlined software licenses, and automated participant compensation workflows are live." },
      { key: "repository", name: "Research repository", pillar: "Process", score: 40, summary: "Centralized database with standardized taxonomy is established, making past studies discoverable." },
      { key: "governance", name: "Governance", pillar: "Process", score: 40, summary: "Clear compliance procedures, non-disclosure handling, and data privacy safeguards are strictly enforced." },
      { key: "ai_integration", name: "AI Integration", pillar: "Process", score: 40, summary: "AI-assisted transcription, automated interview notes, and early AI clustering tools deployed within squads." },
    ],
    characteristics: [
      "Dual-track discovery and delivery: user research informs projects before specifications and code are written.",
      "Teams combine qualitative generative interviews, field studies, and rigorous evaluative usability tests.",
      "The organization invests in dedicated full-time researchers while actively training designers and PMs.",
      "Shared repositories and templates ensure findings are documented with structured tagging.",
    ],
    reachThisLevel: [
      "Leadership hires dedicated researchers and funds institutional ResearchOps tooling.",
      "Cross-functional discovery sprints become standard practice prior to engineering delivery.",
      "A Community of Practice is established to mentor non-researchers running evaluative tests.",
    ],
    strengths: [
      "Discovery explores the root customer problem space rather than blindly iterating flawed concepts.",
      "Roadmaps reflect validated user needs, substantially reducing mid-flight pivots and wasted dev sprints.",
      "Democratic access to research guidance empowers squads to make evidence-based decisions with confidence.",
      "Measurable lift in core user engagement, adoption, and overall customer satisfaction.",
    ],
    weaknesses: [
      "Operations can become bottlenecked if researcher-to-product squad ratios remain stretched.",
      "Research synthesis quality can vary widely among non-researchers conducting independent discovery.",
      "Longitudinal insights are not yet fully integrated into enterprise C-level executive dashboards.",
      "Tooling and repositories require continuous maintenance to prevent metadata decay and duplicate entries.",
    ],
    roadmap: [
      { title: "Standardize enterprise research toolchains", body: "Unify licensing for remote unmoderated testing, transcription tools, and customer survey infrastructure under ResearchOps." },
      { title: "Institute clear Democratization Guardrails", body: "Define which study types (usability, preference) squads can run independently vs. strategic generative work requiring lead researchers." },
      { title: "Tie discovery outcomes directly to business KPIs", body: "Partner with product analytics to correlate research recommendations with customer retention, ARR, and task completion speed." },
      { title: "Establish a scalable repository taxonomy", body: "Adopt atomic research principles (facts, insights, recommendations) to allow easy cross-domain synthesis." },
    ],
    prepareNext: [
      { title: "Form a dedicated ResearchOps function", body: "Transition from ad-hoc operational tasks to a dedicated ResearchOps specialist overseeing tooling, panels, and compliance." },
      { title: "Expand research into strategic foresight", body: "Initiate proactive foundational studies on macro aviation trends, airline passenger journeys, and airport operational shifts." },
      { title: "Implement executive research digests", body: "Publish quarterly insights reports highlighting strategic customer friction points for VP and executive review." },
    ],
    topImpact: [
      { label: "Product usability", value: 92 },
      { label: "Customer satisfaction", value: 73 },
      { label: "Customer engagement & adoption", value: 57 },
      { label: "Product-market fit", value: 50 },
      { label: "Customer retention", value: 45 },
    ],
    quote: {
      text: "Executives need to be involved in research to understand its value and why the organization should invest in it. Having leaders who advocate for research at higher levels is one of the biggest catalysts for growing maturity and building a user-centric company.",
      name: "Gene Kamenez",
      role: "Co-Founder and CEO",
    },
  },
  {
    id: "systematic",
    level: 4,
    name: "Systematic",
    tagline: "Research runs continuously across the product lifecycle to inform product and business strategy.",
    scoreRange: "60–79",
    overview:
      "At Level 4, research is a systemic operational capability. A specialized research team operates alongside a dedicated ResearchOps arm. Studies occur continuously across the full lifecycle, from strategic exploratory discovery to post-launch optimization. Insights systematically inform executive strategy, portfolio planning, and competitive positioning.",
    criteriaScores: [
      { key: "capacity", name: "Research capacity", pillar: "People", score: 60, summary: "Dedicated research team with specialized roles across qualitative discovery, quantitative analytics, and ResearchOps." },
      { key: "sponsorship", name: "Leadership buy-in", pillar: "People", score: 80, summary: "VPs and Directors actively sponsor research initiatives, fund proactive exploratory studies, and champion user data." },
      { key: "enablement", name: "Research enablement", pillar: "People", score: 80, summary: "Comprehensive enablement programs, certification tracks for PWDRs, and dedicated mentorship for product teams." },
      { key: "metrics", name: "Metrics & KPIs", pillar: "Impact", score: 60, summary: "Clear attribution models connecting user research findings to business ROI, churn reduction, and development efficiency." },
      { key: "influence", name: "Decision influence", pillar: "Impact", score: 60, summary: "Insights actively shape multi-year product visions, market expansion choices, and architectural investments." },
      { key: "operations", name: "Research operations", pillar: "Process", score: 80, summary: "Enterprise-wide participant panel management, automated incentive delivery, AI-powered transcription, and self-serve tooling." },
      { key: "repository", name: "Research repository", pillar: "Process", score: 55, summary: "Widely adopted repository with automated tagging, executive summaries, and search integration into daily squad tools." },
      { key: "governance", name: "Governance", pillar: "Process", score: 60, summary: "Rigorous ethical protocols, legal data management, automated retention policies, and cross-border regulatory compliance." },
      { key: "ai_integration", name: "AI Integration", pillar: "Process", score: 65, summary: "AI copilots integrated into synthesis pipelines; automated theme clustering, semantic search, and summary generation with human-in-the-loop oversight." },
    ],
    characteristics: [
      "A dedicated, multi-disciplinary research team conducts strategic work while supporting squad discovery.",
      "Continuous research habits exist across all stages of the product lifecycle—explore, test, launch, and optimize.",
      "Organization-wide alignment: leadership uses research insights to set roadmap direction and product vision.",
      "ResearchOps manages recruitment, platform administration, governance, and insights democratization at scale.",
    ],
    reachThisLevel: [
      "Research operations are formalized into a dedicated, funded team function.",
      "Executives actively budget for longitudinal studies, generative discovery, and specialized research tooling.",
      "Non-researchers are certified through structured enablement programs to conduct routine testing safely.",
    ],
    strengths: [
      "Lifecycle-wide research reduces business risk and development waste at every milestone.",
      "High researcher specialization yields deep, strategic insights that unlock new commercial opportunities.",
      "Broad executive sponsorship protects research investments and guarantees an audience for customer truths.",
      "Scalable operations enable rapid turnaround for both tactical questions and strategic inquiries.",
    ],
    weaknesses: [
      "Insight discoverability across vast multi-domain enterprise repositories requires constant curation.",
      "Balancing rapid squad delivery with deep foundational generative research creates resource friction.",
      "High volume of distributed research necessitates tight governance to maintain rigor and data compliance.",
      "Connecting qualitative discoveries to quarterly financial metrics demands continuous advocacy.",
    ],
    roadmap: [
      { title: "Scale ResearchOps into an internal strategic service", body: "Automate participant recruiting pipelines with global enterprise customers, maintaining strict ethical compliance." },
      { title: "Integrate AI-accelerated workflows responsibly", body: "Deploy approved AI synthesis tooling for automated tagging, thematic clustering, and multi-lingual customer interview transcription." },
      { title: "Embed research metrics into organizational scorecards", body: "Include customer insight metrics, usability benchmark trends, and study reuse rates in department leadership reviews." },
      { title: "Foster enterprise-wide insight democratization", body: "Provide cross-departmental access to customer recordings, tagged insights, and journey maps for sales, marketing, and support." },
    ],
    prepareNext: [
      { title: "Elevate research representation to the executive table", body: "Appoint dedicated research leadership at VP/Director level to influence company-wide strategy and capital allocation." },
      { title: "Evolve from project support to business strategy", body: "Partner with corporate strategy and product leadership to conduct industry foresight and long-term customer trend analysis." },
      { title: "Establish an enterprise Insights Lake", body: "Unify telemetry, behavioral analytics, customer support data, and qualitative research into a single holistic intelligence layer." },
    ],
    topImpact: [
      { label: "Product usability", value: 94 },
      { label: "Customer satisfaction", value: 84 },
      { label: "Customer engagement & adoption", value: 68 },
      { label: "Product-market fit", value: 66 },
      { label: "Customer retention", value: 57 },
    ],
    quote: {
      text: "I believe that democratization is our job and that by educating, enabling, and empowering others to play a more active role in research, we build better products and practices. We'll have the right people focused on the right activities and increase the voices involved in how we learn.",
      name: "Behzod Sirjani",
      role: "Founder of Yet Another Studio",
    },
  },
  {
    id: "strategic",
    level: 5,
    name: "Strategic",
    tagline: "Research informs strategic company direction, long-term goals, and foundational business models.",
    scoreRange: "5",
    isTop: true,
    overview:
      "Level 5 is the pinnacle of research maturity. Customer insights drive long-term business strategy, M&A evaluations, product investments, and C-suite decisions. Research is represented at the highest leadership levels. A mature ResearchOps infrastructure powers seamless, democratized discovery across every division, backed by an enterprise knowledge repository and automated governance.",
    criteriaScores: [
      { key: "capacity", name: "Research capacity", pillar: "People", score: 75, summary: "World-class research organization featuring specialized domains (Generative UXR, Quant, Strategy, ResearchOps) across all business units." },
      { key: "sponsorship", name: "Leadership buy-in", pillar: "People", score: 90, summary: "C-suite and VP leadership consider user research non-negotiable, with permanent research representation at the executive table." },
      { key: "enablement", name: "Research enablement", pillar: "People", score: 90, summary: "Continuous learning culture; every employee understands how to access, interpret, and leverage user insights responsibly." },
      { key: "metrics", name: "Metrics & KPIs", pillar: "Impact", score: 90, summary: "Research directly influences company-level revenue, customer retention, market share, and product-market fit metrics." },
      { key: "influence", name: "Decision influence", pillar: "Impact", score: 100, summary: "No major product, architectural bet, or strategic market expansion occurs without foundational user insight and validation." },
      { key: "operations", name: "Research operations", pillar: "Process", score: 80, summary: "State-of-the-art ResearchOps system handling global participant access, automated panel compliance, and integrated toolchains." },
      { key: "repository", name: "Research repository", pillar: "Process", score: 90, summary: "Universal, AI-indexed research repository connecting qualitative insights with quantitative product telemetry." },
      { key: "governance", name: "Governance", pillar: "Process", score: 90, summary: "Gold-standard ethical, legal, and security frameworks protecting participant privacy and company intellectual property." },
      { key: "ai_integration", name: "AI Integration", pillar: "Process", score: 100, summary: "Enterprise AI knowledge intelligence layer with real-time insight synthesis, conversational queries, and automated predictive UX discovery." },
    ],
    characteristics: [
      "Research leadership holds a permanent seat at the top level of the organization (VP/Director/C-Suite).",
      "Customer insights guide core business decisions, brand positioning, roadmap investments, and new market discovery.",
      "An enterprise knowledge repository ensures customer insights are discoverable, searchable, and reused indefinitely.",
      "Every function—engineering, product, sales, marketing, and leadership—actively consults research evidence.",
    ],
    reachThisLevel: [
      "User research is embedded as an executive discipline alongside Engineering, Product, and Finance.",
      "A culture of curiosity and evidence-based decision-making is sustained across every division.",
      "Continuous investment in ResearchOps, automated intelligence, and ethical governance standards.",
    ],
    strengths: [
      "Research directly drives multi-million dollar business bets, market positioning, and strategic priorities.",
      "Insights are accessible, democratized, and continuously compounded across the global organization.",
      "Dramatic competitive advantage through accelerated time-to-market, superior retention, and unmatched brand loyalty.",
      "Highest observed business performance: 4.3x time-to-market, 4.2x revenue, and 3.0x brand perception lift.",
    ],
    weaknesses: [
      "Maintaining Level 5 excellence requires relentless vigilance and proactive executive alignment.",
      "Risk of research dogma or analysis paralysis if processes become overly bureaucratic.",
      "Continuous platform investment is required to manage growing enterprise repository scale.",
      "Ongoing mentorship is needed to preserve research craft rigor as teams expand globally.",
    ],
    roadmap: [
      { title: "Institutionalize foresight and future research", body: "Direct research toward multi-year industry horizons, passenger autonomy, AI adoption, and systemic aerospace transformations." },
      { title: "Maintain continuous executive stakeholder alignment", body: "Conduct bi-annual executive learning summits where cross-functional teams review longitudinal customer trends directly with leadership." },
      { title: "Drive continuous ResearchOps optimization", body: "Benchmark research velocity, time-to-insight, and study reuse metrics, continuously eliminating operational friction." },
      { title: "Pioneer advanced ethical AI integration", body: "Lead the industry in transparent, ethical AI synthesis, maintaining participant trust and data integrity at enterprise scale." },
    ],
    prepareNext: [
      { title: "Keep leadership actively invested in research", body: "Continually tie research findings to core corporate KPIs, customer retention, and brand differentiation." },
      { title: "Continually benchmark against industry leaders", body: "Participate in global research consortiums and audit organizational practices against top-tier tech benchmarks." },
      { title: "Nurture career growth and research craft innovation", body: "Offer masterclasses, publish internal research case studies, and sponsor advanced craft specializations." },
    ],
    topImpact: [
      { label: "Product usability", value: 87 },
      { label: "Customer satisfaction", value: 87 },
      { label: "Revenue", value: 80 },
      { label: "Active users", value: 67 },
      { label: "Brand perception", value: 67 },
    ],
    quote: {
      text: "To ensure research can truly drive significant business outcomes, it's crucial for researchers to have a seat at the table to influence the organization from a top-down perspective. This way, we contribute to shaping strategic decisions and prioritizing where to invest.",
      name: "Edie Cao",
      role: "Sr. UX Researcher",
    },
  },
]

// The source level narratives historically used nine 0–100 axes. Keep those
// narratives, but expose the six-axis, 1–5 model everywhere in the UI.
const toFive = (score: number) => Math.max(1, Math.min(5, Math.round(score / 20)))
const sixAxis = (level: Level): CriterionScore[] => {
  const byKey = Object.fromEntries(level.criteriaScores.map((c) => [c.key, c])) as Record<string, CriterionScore>
  const merge = (key: CriterionKey, name: string, pillar: CriterionPillar, keys: string[], summary: string) => ({
    key, name, pillar, score: Math.max(1, Math.min(5, Math.round(keys.reduce((sum, k) => sum + (byKey[k]?.score ?? 0), 0) / keys.length / 20))), summary,
  })
  return [
    merge("capacity_enablement", "Research capacity and enablement", "People", ["capacity", "enablement"], "Dedicated capacity, research quality, training, and organizational research literacy."),
    merge("leadership_buyin", "Leadership buy-in", "People", ["sponsorship"], byKey.sponsorship?.summary ?? "Leadership sponsorship and recognition of research as a strategic function."),
    merge("metrics_kpis", "Metrics and KPIs", "Impact", ["metrics"], byKey.metrics?.summary ?? "Research impact is connected to measurable business outcomes."),
    merge("decision_influence", "Decision influence", "Impact", ["influence"], byKey.influence?.summary ?? "Research evidence shapes product and strategic decisions."),
    merge("operations_governance", "Operations and governance", "Process", ["operations", "repository", "governance"], "Scalable operations, knowledge management, participant access, ethics, and privacy."),
    merge("ai_integration", "AI integration", "Process", ["ai_integration"], byKey.ai_integration?.summary ?? "Responsible AI accelerates research workflows and insight retrieval."),
  ]
}
levels.forEach((level) => {
  level.criteriaScores = sixAxis(level)
  level.scoreRange = `${Math.max(1, Math.round((level.level - 1) + 1))}–${Math.min(5, level.level)}`
})

/* What sets insights-led organizations apart — high vs low maturity. */
export const businessOutcomes = [
  { outcome: "Time-to-market", low: 7, high: 28, mult: "4.3x" },
  { outcome: "Revenue", low: 11, high: 47, mult: "4.2x" },
  { outcome: "Brand perception", low: 14, high: 44, mult: "3.0x" },
  { outcome: "Customer retention", low: 24, high: 58, mult: "2.4x" },
  { outcome: "Active users", low: 26, high: 51, mult: "2.0x" },
  { outcome: "Product-market fit", low: 33, high: 66, mult: "2.0x" },
  { outcome: "Customer satisfaction", low: 46, high: 84, mult: "1.9x" },
  { outcome: "Customer engagement", low: 38, high: 66, mult: "1.8x" },
  { outcome: "Support requests", low: 24, high: 42, mult: "1.7x" },
  { outcome: "Sales win rates", low: 12, high: 20, mult: "1.6x" },
  { outcome: "Development cost savings", low: 31, high: 48, mult: "1.6x" },
  { outcome: "Product usability", low: 78, high: 94, mult: "1.2x" },
]

/* Distribution of organizations across the five levels. */
export const distribution = [
  { level: "Level 1: Limited", pct: 2, range: "1" },
  { level: "Level 2: Sporadic", pct: 17, range: "2" },
  { level: "Level 3: Developing", pct: 45, range: "3" },
  { level: "Level 4: Systematic", pct: 33, range: "4" },
  { level: "Level 5: Strategic", pct: 3, range: "5" },
]

export const researchMethods = [
  { method: "Generative", desc: "Understand a broad problem space and identify new opportunities to tackle within it.", low: 13.3, high: 68.6, mult: "5.1x" },
  { method: "Descriptive", desc: "Deep dive into a problem space to better understand a specific audience or phenomenon.", low: 21.1, high: 74.4, mult: "3.5x" },
  { method: "Causal", desc: "Explain why an unexpected event or a longer-term trend in behavior happened.", low: 14.4, high: 45.9, mult: "3.2x" },
  { method: "Evaluative", desc: "Test a product or concept and collect data that helps improve your solution.", low: 38.9, high: 87.8, mult: "2.3x" },
  { method: "Foresight", desc: "Assess how industry trends are changing to anticipate the future and remain competitive.", low: 16.7, high: 31.4, mult: "1.9x" },
]

/* ----------------------------------------------------------------------------
   Knowledge check — 10 multiple-choice questions updated to reflect the
   Six SITA Core Criteria, their 3 pillars, and maturity roadmap principles.
---------------------------------------------------------------------------- */
export type QuizQuestion = {
  id: string
  question: string
  options: string[]
  answer: number
  explanation: string
  sectionId: string
  sectionLabel: string
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "How many core criteria does SITA use to measure research maturity across its pillars?",
    options: ["Three criteria", "Five criteria", "Six criteria", "Nine criteria"],
    answer: 2,
    explanation: "SITA evaluates research maturity using six criteria: capacity and enablement, leadership buy-in, metrics and KPIs, decision influence, operations and governance, and AI integration.",
    sectionId: "criteria",
    sectionLabel: "The 6 SITA criteria",
  },
  {
    id: "q2",
    question: "Which criteria belong under the 'People' pillar in the SITA Research Maturity Model?",
    options: [
      "Research capacity, Leadership buy-in, and Research enablement",
      "Metrics & KPIs, Decision influence, and Governance",
      "Research operations, Repository, and Capacity",
      "Budget, Headcount, and Tooling",
    ],
    answer: 0,
    explanation: "The People pillar encompasses Research capacity (dedicated roles/CoP), Leadership buy-in (executive sponsorship), and Research enablement (training & quality).",
    sectionId: "criteria",
    sectionLabel: "The 6 SITA criteria",
  },
  {
    id: "q3",
    question: "What criteria define the 'Process' pillar in SITA's framework?",
    options: [
      "Research operations, Research repository, Governance, and AI Integration",
      "Usability testing, Prototyping, Customer surveys, and Sprint review",
      "Capacity, Enablement, Leadership sponsorship, and Metrics",
      "Sprint planning, Backlog grooming, QA testing, and CI/CD",
    ],
    answer: 0,
    explanation: "Process covers Research operations (toolchain & recruiting), Research repository (knowledge management), Governance (ethical & legal standards), and AI Integration (accelerated synthesis & workflows).",
    sectionId: "criteria",
    sectionLabel: "The 6 SITA criteria",
  },
  {
    id: "q4",
    question: "At which maturity level does Decision Influence score 100 on the SITA radar chart?",
    options: ["Level 2: Sporadic", "Level 3: Developing", "Level 4: Systematic", "Level 5: Strategic"],
    answer: 3,
    explanation: "At Level 5 (Strategic), Decision Influence reaches 100, meaning user insights guide company strategy, portfolio priorities, and major bets.",
    sectionId: "strategic",
    sectionLabel: "Level 5: Strategic",
  },
  {
    id: "q5",
    question: "In the SITA model, what best characterizes the 'Research repository' at Level 1 (Limited)?",
    options: [
      "A centralized, AI-indexed knowledge base",
      "No central database; past notes are lost in personal drives, chat threads, or slide decks",
      "A fully tagged wiki searchable by all product managers",
      "An automated repository integrated with product analytics",
    ],
    answer: 1,
    explanation: "At Level 1, there is no centralized repository; findings are siloed, anecdotal, and frequently lost after a project concludes.",
    sectionId: "limited",
    sectionLabel: "Level 1: Limited",
  },
  {
    id: "q6",
    question: "What is the primary role of Research Operations (ResearchOps) in SITA's Process pillar?",
    options: [
      "Managing toolchains, participant access, templates, automation, and best practices",
      "Replacing all dedicated UX researchers with automated bots",
      "Writing production frontend code for engineering teams",
      "Monitoring server downtime and infrastructure stability",
    ],
    answer: 0,
    explanation: "ResearchOps manages the infrastructure: toolchains, templates, best practices, insight automation, and participant recruiting pipelines.",
    sectionId: "criteria",
    sectionLabel: "The 6 SITA criteria",
  },
  {
    id: "q7",
    question: "Roughly what share of surveyed organizations have achieved Level 5 (Strategic)?",
    options: ["3%", "17%", "33%", "45%"],
    answer: 0,
    explanation: "Only about 3% reach Level 5, demonstrating that strategic, insights-led maturity remains an extraordinary competitive advantage.",
    sectionId: "state",
    sectionLabel: "The current state",
  },
  {
    id: "q8",
    question: "How does 'Leadership buy-in' evolve between Level 2 (Sporadic) and Level 3 (Developing)?",
    options: [
      "Leadership stops participating in any research activities",
      "From ad-hoc validation support to product leaders consulting research before setting roadmap priorities",
      "Executives only look at sales data and ignore user testing",
      "Buy-in decreases as dedicated researchers are hired",
    ],
    answer: 1,
    explanation: "In Level 3 (Developing), leadership actively consults research before roadmap commitments, advancing beyond tactical late-stage validation.",
    sectionId: "developing",
    sectionLabel: "Level 3: Developing",
  },
  {
    id: "q9",
    question: "What is the core purpose of the 'Governance' criterion in SITA's framework?",
    options: [
      "Transparent ethical and legal standards protecting participants and the organization",
      "Setting strict quotas on how many user interviews can be conducted",
      "Restricting access to research findings to executive leadership only",
      "Charging product squads internal fees for participant recruiting",
    ],
    answer: 0,
    explanation: "Governance establishes ethical, consent, GDPR, and data protection standards that safeguard participants and SITA.",
    sectionId: "criteria",
    sectionLabel: "The 6 SITA criteria",
  },
  {
    id: "q10",
    question: "What business outcome shows the highest performance multiplier (4.3x lift) in insights-led organizations?",
    options: [
      "Product usability",
      "Time-to-market",
      "Customer support requests",
      "Sales win rates",
    ],
    answer: 1,
    explanation: "High-maturity organizations achieve a 4.3x lift in time-to-market because early discovery eliminates wasted engineering rework.",
    sectionId: "insights-led",
    sectionLabel: "What sets them apart",
  },
]
