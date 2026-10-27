import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router"
import * as RadixSlider from "@radix-ui/react-slider"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Users,
  Award,
  GraduationCap,
  LineChart,
  Target,
  Sliders,
  Database,
  ShieldCheck,
  BrainCircuit,
  RotateCcw,
  Gauge,
  Clock,
  ListChecks,
  X,
} from "lucide-react"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts"
import { levels, type CriterionKey } from "./data"
import {
  saveSurvey,
  getAggregate,
  scoreToResult,
  type SurveyAnswers,
  type SurveyAggregate,
  type SurveyResult,
} from "./lib/survey"

/* ----------------------------------------------------------------------------
   Survey question model for SITA's 9 Core Criteria
---------------------------------------------------------------------------- */
type Question = {
  key: CriterionKey
  criterionName: string
  pillar: "People" | "Impact" | "Process"
  icon: typeof Users
  title: string
  subCriteria: string
  description: string
  lowLabel: string
  highLabel: string
}

const legacyQuestions: Question[] = [
  // People
  {
    key: "capacity",
    criterionName: "Research capacity",
    pillar: "People",
    icon: Users,
    title: "How developed is your research capacity and Community of Practice?",
    subCriteria: "Dedicated user researchers / research community of practice",
    description: "Consider whether there are dedicated full-time researchers, if research is supported by a federated Community of Practice, or if squads rely entirely on informal ad-hoc efforts.",
    lowLabel: "No dedicated researchers",
    highLabel: "Dedicated team & active CoP",
  },
  {
    key: "sponsorship",
    criterionName: "Leadership buy-in",
    pillar: "People",
    icon: Award,
    title: "How strong is leadership sponsorship and executive buy-in?",
    subCriteria: "Leadership sponsorship, participation, and recognition of ResearchOps as a strategic function",
    description: "Consider executive engagement: do leaders attend research debriefs, allocate sustained budget for research talent and operations, and advocate for user insights at the C-suite level?",
    lowLabel: "Little executive awareness",
    highLabel: "Active executive championing",
  },
  {
    key: "enablement",
    criterionName: "Research enablement",
    pillar: "People",
    icon: GraduationCap,
    title: "How effectively are teams enabled, trained, and educated in research?",
    subCriteria: "Research quality + Researcher training & development + extend organizational understanding of UX research",
    description: "Consider craft quality standards, continuous learning for researchers, and onboarding/training programs that empower product teams to conduct and consume research confidently.",
    lowLabel: "No training or guidance",
    highLabel: "Enterprise-wide enablement",
  },
  // Impact
  {
    key: "metrics",
    criterionName: "Metrics & KPIs",
    pillar: "Impact",
    icon: LineChart,
    title: "How clearly is research connected to business KPIs and measured impact?",
    subCriteria: "Research impact measurement, connection to business ROI, risk reduction, etc.",
    description: "Consider whether research tracks concrete outcomes—time-to-market acceleration, risk mitigation, customer retention, revenue lift—or relies purely on qualitative anecdotes.",
    lowLabel: "Untracked / anecdotal",
    highLabel: "Direct ROI & KPI alignment",
  },
  {
    key: "influence",
    criterionName: "Decision influence",
    pillar: "Impact",
    icon: Target,
    title: "How much does research influence roadmap and strategic decisions?",
    subCriteria: "Adoption of research insights in product development",
    description: "Consider whether insights directly shape multi-year vision, portfolio prioritization, and feature scoping—or if research is limited to validating pre-determined UI mockups.",
    lowLabel: "Late cosmetic validation",
    highLabel: "Drives strategic direction",
  },
  // Process
  {
    key: "operations",
    criterionName: "Research operations",
    pillar: "Process",
    icon: Sliders,
    title: "How mature are your ResearchOps workflows and toolchains?",
    subCriteria: "Toolchain, templates, best practices, insight generation automation, participant access rate",
    description: "Consider participant recruiting pipelines, standardized templates, testing tools, AI-assisted transcription, and operational automation supporting researchers and squads.",
    lowLabel: "Manual / fragmented tools",
    highLabel: "Automated, scalable ResearchOps",
  },
  {
    key: "repository",
    criterionName: "Research repository",
    pillar: "Process",
    icon: Database,
    title: "How accessible and centralized are research insights across SITA?",
    subCriteria: "Knowledge management: centralized database for all research insights",
    description: "Consider whether past research is indexed, searchable, and discoverable in a centralized knowledge repository—or trapped in disparate slide decks and local folders.",
    lowLabel: "Siloed in personal folders",
    highLabel: "Centralized, searchable database",
  },
  {
    key: "governance",
    criterionName: "Governance",
    pillar: "Process",
    icon: ShieldCheck,
    title: "How robust are your legal, ethical, and participant data standards?",
    subCriteria: "Transparent ethical & legal standards protecting participants and organization",
    description: "Consider consent management, GDPR/data privacy protection, ethical interview protocols, and participant data lifecycle management.",
    lowLabel: "Informal / unstandardized",
    highLabel: "Gold-standard compliance",
  },
  {
    key: "ai_integration",
    criterionName: "AI Integration",
    pillar: "Process",
    icon: BrainCircuit,
    title: "How thoroughly is AI integrated into research workflows and insight synthesis?",
    subCriteria: "AI-accelerated workflows, ethical AI synthesis, automated clustering, and intelligent intelligence retrieval",
    description: "Consider AI adoption across transcription, automated thematic clustering, pattern detection, repository indexing, and responsible data governance for generative discovery.",
    lowLabel: "No AI tooling / ad-hoc",
    highLabel: "Enterprise-wide AI synthesis",
  },
]

const questions: Question[] = [
  { ...legacyQuestions[0], key: "capacity_enablement", criterionName: "Research capacity and enablement", title: "How developed are your research capacity and enablement practices?", subCriteria: "Dedicated capacity, quality standards, training, and research literacy" },
  { ...legacyQuestions[1], key: "leadership_buyin", criterionName: "Leadership buy-in" },
  { ...legacyQuestions[3], key: "metrics_kpis", criterionName: "Metrics and KPIs" },
  { ...legacyQuestions[4], key: "decision_influence", criterionName: "Decision influence" },
  { ...legacyQuestions[5], key: "operations_governance", criterionName: "Operations and governance", title: "How mature are your research operations and governance?", subCriteria: "Tooling, repositories, participant access, ethics, privacy, and standards" },
  { ...legacyQuestions[8], key: "ai_integration", criterionName: "AI integration" },
]

function MaturitySlider({
  value,
  onChange,
}: {
  value: number
  onChange: (v: number) => void
}) {
  return (
    <RadixSlider.Root
      className="relative flex h-6 w-full touch-none select-none items-center"
      value={[value]}
      max={5}
      min={1}
      step={1}
      onValueChange={(v) => onChange(v[0])}
    >
      <RadixSlider.Track className="relative h-2 w-full grow overflow-hidden rounded-[var(--radius-input)] bg-foreground/10">
        <RadixSlider.Range className="absolute h-full rounded-[var(--radius-input)] bg-accent" />
      </RadixSlider.Track>
      <RadixSlider.Thumb
        aria-label="Maturity score"
        className="block size-6 rounded-full border-2 border-accent bg-card shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-accent/40"
      />
    </RadixSlider.Root>
  )
}

/* Radar chart showing the 9 criteria self-assessed scores */
function ResultRadar({ answers }: { answers: SurveyAnswers }) {
  const [expanded, setExpanded] = useState(false)
  const data = [
    { axis: "Capacity & enablement", score: answers.capacity_enablement ?? 3 },
    { axis: "Leadership buy-in", score: answers.leadership_buyin ?? 3 },
    { axis: "Metrics & KPIs", score: answers.metrics_kpis ?? 3 },
    { axis: "Decision influence", score: answers.decision_influence ?? 3 },
    { axis: "Operations & governance", score: answers.operations_governance ?? 3 },
    { axis: "AI integration", score: answers.ai_integration ?? 3 },
  ]
  const chart = (expandedView = false) => (
    <div className={`sita-green-surface relative w-full overflow-hidden rounded-[var(--radius-card)] p-4 text-primary-foreground ${expandedView ? "max-w-3xl" : ""}`}>
      {expandedView && (
        /* The kit has no icon-button component; this is the required modal close control placed inside the top-right of the card. */
        <button
          type="button"
          onClick={() => setExpanded(false)}
          aria-label="Close radar chart"
          className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-[var(--radius-input)] bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 cursor-pointer"
        >
          <X className="size-5" strokeWidth={2} />
        </button>
      )}
      <div className={`${expandedView ? "h-[min(68vh,620px)]" : "h-[280px]"} w-full [&_.recharts-surface]:cursor-pointer [&_.recharts-wrapper]:cursor-pointer [&_svg]:cursor-pointer`}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid
              polarRadius={[20, 40, 60, 80, 100]}
              stroke="rgba(255,255,255,0.18)"
            />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fill: "rgba(255,255,255,0.85)", fontSize: expandedView ? 14 : 12, fontFamily: "var(--font-family-saans)" }}
            />
            <PolarRadiusAxis
              domain={[0, 5]}
              tick={false}
              tickCount={5}
              axisLine={false}
            />
            <Radar
              dataKey="score"
              stroke="var(--on-primary-accent)"
              fill="var(--on-primary-accent)"
              fillOpacity={0.35}
              strokeWidth={2.5}
              animationDuration={expandedView ? 325 : 1500}
              animationEasing={expandedView ? "ease-in" : "ease"}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between border-t border-primary-foreground/10 px-2 pt-2 text-[11px] text-primary-foreground/70">
        <span>SITA 6-Criteria Radar</span>
        <span className="text-on-primary-accent font-semibold">Your Self-Assessment</span>
      </div>
    </div>
  )

  return (
    <>
      {/* The kit has no chart-card component; this button provides the accessible chart trigger. */}
      <button
        type="button"
        className="block w-full text-left cursor-pointer"
        onClick={() => setExpanded(true)}
        aria-label="Open your self-assessment radar chart"
      >
        {chart()}
      </button>
      {expanded && (
        /* The kit exposes no dialog primitive, so this modal uses the kit's surface tokens. */
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-6"
          role="presentation"
          onMouseDown={() => setExpanded(false)}
        >
          <div
            className="relative w-full max-w-4xl"
            role="dialog"
            aria-modal="true"
            aria-label="Your self-assessment radar chart"
            onMouseDown={(event) => event.stopPropagation()}
          >
            {chart(true)}
          </div>
        </div>
      )}
    </>
  )
}

const initialAnswers: SurveyAnswers = {
  capacity_enablement: 3, leadership_buyin: 3, metrics_kpis: 3,
  decision_influence: 3, operations_governance: 3, ai_integration: 3,
}

export function Survey() {
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<SurveyAnswers>(initialAnswers)
  const [result, setResult] = useState<SurveyResult | null>(null)
  const [aggregate, setAggregate] = useState<SurveyAggregate | null>(null)
  const [saving, setSaving] = useState(false)

  const isResult = step === questions.length
  const q = questions[step]
  const progress = isResult ? 100 : Math.round(((step + 1) / questions.length) * 100)

  const preview = useMemo(() => scoreToResult(answers), [answers])

  useEffect(() => {
    if (isResult) getAggregate().then(setAggregate)
  }, [isResult])

  async function submit() {
    setSaving(true)
    const saved = await saveSurvey(answers)
    setResult(saved)
    setSaving(false)
    setStep(questions.length)
  }

  function restart() {
    setAnswers(initialAnswers)
    setResult(null)
    setStep(0)
    setStarted(false)
  }

  const resultLevel = levels.find((l) => l.id === (result?.levelId ?? preview.levelId)) ?? levels[0]

  return (
    <div className="min-h-full bg-card text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="flex items-center gap-3 transition hover:opacity-90">
            <span className="flex size-8 items-center justify-center rounded-[var(--radius-input)] bg-primary text-primary-foreground">
              <Compass className="size-4" strokeWidth={2} />
            </span>
            <div className="leading-tight">
              <span className="application-title block">SITA Research Maturity Model</span>
              <span className="block text-muted-foreground text-xs">9-Criteria Self-Assessment</span>
            </div>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-[var(--radius-input)] border border-border px-3 py-2 text-muted-foreground text-xs transition hover:text-foreground font-medium"
          >
            <ArrowLeft className="size-4" strokeWidth={2} />
            Back to playbook
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[800px] px-6 py-12">
        {/* Introduction */}
        {!started && !isResult && (
          <section>
            <span className="block navigation-text tracking-[0.14em] text-accent">Assessment</span>
            <h1 className="mt-3 max-w-xl text-2xl md:text-3xl font-bold">Benchmark Your Organization Against SITA's 6 Criteria</h1>
            <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed text-sm">
              Evaluate your current research practices across SITA's 6 criteria in People, Impact, and Process.
              Your answers will generate a tailored radar spider chart and identify your placement on SITA's 5-level maturity ladder.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: ListChecks, t: "6 Criteria", d: "Sliders for capacity and enablement, leadership buy-in, metrics and KPIs, decision influence, operations and governance, and AI integration." },
                { icon: Clock, t: "2–3 Minutes", d: "Fast, honest perception check across current squad practices." },
                { icon: Gauge, t: "Instant Radar", d: "Immediate radar chart benchmark mapped to SITA levels." },
              ].map((c) => (
                <div key={c.t} className="rounded-[var(--radius-card)] border border-border bg-card p-5">
                  <c.icon className="size-5 text-accent" strokeWidth={1.75} />
                  <h4 className="mt-3 font-semibold text-sm text-foreground">{c.t}</h4>
                  <p className="mt-1 text-muted-foreground text-xs leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStarted(true)}
              className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-accent px-6 py-3 text-accent-foreground font-semibold text-sm transition hover:opacity-90 active:opacity-80"
            >
              Start the assessment
              <ArrowRight className="size-4" strokeWidth={2} />
            </button>
          </section>
        )}

        {/* Progress bar */}
        {(started || isResult) && (
          <div className="mb-10">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="navigation-text text-muted-foreground">
                {isResult ? "Your result" : `Criterion ${step + 1} of ${questions.length} • ${q.pillar}`}
              </span>
              <span className="text-muted-foreground font-semibold">{progress}%</span>
            </div>
            <div className="h-[var(--progress-bar-height)] w-full overflow-hidden rounded-[var(--radius-input)] bg-foreground/10">
              <div
                className="progress-bar-fill-vibrant-blue h-full rounded-[var(--radius-input)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Question Step */}
        {started && !isResult && q && (
          <section>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex size-10 items-center justify-center rounded-[var(--radius-input)] bg-accent/10 text-accent">
                <q.icon className="size-5" strokeWidth={2} />
              </span>
              <div>
                <span className="block navigation-text tracking-[0.14em] text-accent text-[11px] uppercase font-bold">{q.pillar} • {q.criterionName}</span>
                <span className="text-xs text-muted-foreground font-medium">{q.subCriteria}</span>
              </div>
            </div>

            <h2 className="mt-4 max-w-xl text-xl md:text-2xl font-bold">{q.title}</h2>
            <p className="mt-3 max-w-xl text-muted-foreground text-xs md:text-sm leading-relaxed">{q.description}</p>

            {/* Slider */}
            <div className="mt-10 rounded-[var(--radius-card)] border border-border bg-card p-8">
              <div className="mb-5 rounded-[var(--radius-input)] bg-accent/10 px-4 py-3 text-xs leading-relaxed text-foreground">
                <span className="font-semibold">Score {(answers as Record<string, number>)[q.key] ?? 3}: </span>
                {(answers as Record<string, number>)[q.key] === 1 ? q.lowLabel : (answers as Record<string, number>)[q.key] === 5 ? q.highLabel : `A developing level of ${q.criterionName.toLowerCase()} maturity.`}
              </div>
              <div className="mb-8 flex items-baseline justify-between">
                <span className="navigation-text text-muted-foreground text-xs">Current maturity score</span>
                <span className="text-accent">
                  <span className="text-2xl font-bold">{(answers as Record<string, number>)[q.key] ?? 3}</span>
                  <span className="text-muted-foreground text-sm"> / 5</span>
                </span>
              </div>
              <MaturitySlider
                value={(answers as Record<string, number>)[q.key] ?? 3}
                onChange={(v) => setAnswers((a) => ({ ...a, [q.key]: v }))}
              />
              <div className="mt-4 flex justify-between text-muted-foreground text-xs">
                <span>{q.lowLabel}</span>
                <span>{q.highLabel}</span>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => (step === 0 ? setStarted(false) : setStep((s) => s - 1))}
                className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-border px-5 py-2.5 text-foreground transition hover:bg-accent/10 text-xs font-semibold"
              >
                <ArrowLeft className="size-4" strokeWidth={2} />
                Back
              </button>
              {step < questions.length - 1 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-accent px-5 py-2.5 text-accent-foreground transition hover:opacity-90 text-xs font-semibold"
                >
                  Next criterion
                  <ArrowRight className="size-4" strokeWidth={2} />
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-accent px-5 py-2.5 text-accent-foreground transition hover:opacity-90 disabled:opacity-60 text-xs font-semibold"
                >
                  {saving ? "Generating Radar…" : "See my result & radar"}
                  <ArrowUpRight className="size-4" strokeWidth={2.25} />
                </button>
              )}
            </div>
          </section>
        )}

        {/* Result Screen */}
        {isResult && (
          <section>
            <span className="block navigation-text tracking-[0.14em] text-accent text-xs">Benchmark Result</span>
            <h1 className="mt-2 text-2xl md:text-3xl font-bold">
              You scored {result?.average ?? preview.average}/5 — Level {resultLevel.level}: {resultLevel.name}
            </h1>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{resultLevel.tagline}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {/* Spider Radar Chart */}
              <div>
                <ResultRadar answers={result ?? answers} />
              </div>

              {/* Score Breakdown Panel */}
              <div className="sita-green-surface rounded-[var(--radius-card)] bg-primary p-6 text-primary-foreground flex flex-col justify-between">
                <div>
                  <h4 className="text-primary-foreground font-bold text-sm mb-4">6 Criteria Ratings</h4>
                  <div className="flex flex-col gap-3">
                    {questions.map((question) => {
                      const scoreVal = (result as Record<string, number> | null)?.[question.key] ?? (answers as Record<string, number>)[question.key] ?? 3
                      return (
                        <div key={question.key} className="text-xs">
                          <div className="mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-2 text-primary-foreground font-medium">
                              <question.icon className="size-3.5" strokeWidth={1.75} />
                              {question.criterionName}
                            </span>
                            <span className="text-primary-foreground/80 font-bold">{scoreVal}/5</span>
                          </div>
                          <div className="h-[var(--progress-bar-height)] w-full overflow-hidden rounded-[var(--radius-input)] bg-primary-foreground/15">
                            <div
                              className="h-full rounded-[var(--radius-input)] bg-on-primary-accent"
                              style={{ width: `${scoreVal * 20}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

              </div>
            </div>

            {/* Explain the achieved level and the next step for every criterion. */}
            {(() => {
              const nextLevel = levels.find((level) => level.level === resultLevel.level + 1)
              return (
                <div className="mt-8 rounded-[var(--radius-card)] border border-border bg-card p-6">
                  <div className="mb-4">
                    <span className="navigation-text text-muted-foreground text-xs">Level {resultLevel.level} meaning and next steps</span>
                    <h3 className="mt-2 text-lg font-bold">What your score means — and how to reach the next level</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[680px] text-left text-xs">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground">
                          <th className="px-3 py-3 font-semibold">Criterion</th>
                          <th className="px-3 py-3 font-semibold">Your score</th>
                          <th className="px-3 py-3 font-semibold">What this means</th>
                          <th className="px-3 py-3 font-semibold">{nextLevel ? `How to reach Level ${nextLevel.level}` : "How to sustain Level 5"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultLevel.criteriaScores.map((criterion) => {
                          const nextCriterion = nextLevel?.criteriaScores.find((item) => item.key === criterion.key)
                          return (
                            <tr key={criterion.key} className="border-b border-border/70 last:border-0 align-top">
                              <td className="px-3 py-3 font-semibold text-foreground">{criterion.name}</td>
                              <td className="px-3 py-3 font-bold text-accent">{(result as Record<string, number> | null)?.[criterion.key] ?? (answers as Record<string, number>)[criterion.key] ?? criterion.score}/5</td>
                              <td className="px-3 py-3 leading-relaxed text-muted-foreground">{criterion.summary}</td>
                              <td className="px-3 py-3 leading-relaxed text-muted-foreground">{nextCriterion?.summary ?? "Keep measuring impact, strengthening governance, and sharing evidence with decision-makers."}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-border">
                          <td colSpan={2} />
                          <td className="px-3 pt-5">
                            <Link
                              to={`/#${resultLevel.id}`}
                              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-button)] bg-accent px-4 py-2.5 text-accent-foreground font-semibold text-xs transition hover:opacity-90"
                            >
                              Explore Level {resultLevel.level} Roadmap
                              <ArrowRight className="size-4" strokeWidth={2} />
                            </Link>
                          </td>
                          <td className="px-3 pt-5">
                            {nextLevel && (
                              <Link
                                to={`/#${nextLevel.id}`}
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-button)] bg-accent px-4 py-2.5 text-accent-foreground font-semibold text-xs transition hover:opacity-90"
                              >
                                Explore Level {nextLevel.level} Roadmap
                                <ArrowRight className="size-4" strokeWidth={2} />
                              </Link>
                            )}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )
            })()}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={restart}
                className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-border px-5 py-2.5 text-foreground transition hover:bg-accent/10 text-xs font-semibold"
              >
                <RotateCcw className="size-4" strokeWidth={2} />
                Retake the assessment
              </button>
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-primary px-5 py-2.5 text-primary-foreground transition hover:opacity-90 text-xs font-semibold"
              >
                Back to the playbook
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
