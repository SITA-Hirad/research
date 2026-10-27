import { useEffect, useMemo, useState, useCallback, useRef } from "react"
import { createBrowserRouter, RouterProvider, useLocation, useNavigate } from "react-router"
import { Survey } from "./Survey"
import { Quiz } from "./Quiz"
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  Layers,
  Minus,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  TrendingUp,
  Users,
  Workflow,
  Target,
  BookOpen,
  BarChart3,
  Quote as QuoteIcon,
  ShieldCheck,
  Database,
  Sliders,
  Award,
  LineChart,
  Scale,
  BrainCircuit,
  GraduationCap,
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
import {
  levels,
  sixCriteria,
  glossary,
  businessOutcomes,
  distribution,
  researchMethods,
  type Level,
  type Criterion,
  type CriterionKey,
} from "./data"

/* ----------------------------------------------------------------------------
   Navigation model — drives the left-hand table of contents.
---------------------------------------------------------------------------- */
type NavItem = { id: string; label: string }
type NavGroup = { title: string; items: NavItem[] }

const navGroups: NavGroup[] = [
  {
    title: "Foundations",
    items: [
      { id: "overview", label: "From ad-hoc to insights-led" },
      { id: "criteria", label: "The 6 SITA criteria" },
      { id: "stages", label: "The five stages" },
    ],
  },
  {
    title: "The five levels",
    items: levels.map((l) => ({ id: l.id, label: `Level ${l.level}: ${l.name}` })),
  },
  {
    title: "The evidence",
    items: [
      { id: "insights-led", label: "What sets them apart" },
      { id: "state", label: "The current state" },
    ],
  },
  {
    title: "Act",
    items: [
      { id: "toolkit", label: "Your starting toolkit" },
      { id: "quiz", label: "Test your knowledge" },
    ],
  },
]

const criterionIcons: Record<CriterionKey, typeof Users> = {
  capacity_enablement: Users,
  leadership_buyin: Award,
  metrics_kpis: LineChart,
  decision_influence: Target,
  operations_governance: Sliders,
  capacity: Users,
  sponsorship: Award,
  enablement: GraduationCap,
  metrics: LineChart,
  influence: Target,
  operations: Sliders,
  repository: Database,
  governance: ShieldCheck,
  ai_integration: BrainCircuit,
}

/* ----------------------------------------------------------------------------
   Small presentational primitives — composed from kit tokens + kit typography.
---------------------------------------------------------------------------- */
function Eyebrow({ children, onPrimary }: { children: React.ReactNode; onPrimary?: boolean }) {
  return (
    <span
      className={`navigation-text inline-block tracking-[0.14em] ${
        onPrimary ? "text-on-primary-accent" : "text-accent"
      }`}
    >
      {children}
    </span>
  )
}

function MeterBar({ score, tone = "accent" }: { score: number; tone?: "accent" | "primary" }) {
  return (
    <div className="h-[var(--progress-bar-height)] w-full overflow-hidden rounded-[var(--radius-input)] bg-foreground/10">
      <div
        className={
          tone === "primary"
            ? "progress-bar-fill-forest-green h-full rounded-[var(--radius-input)]"
            : "progress-bar-fill-vibrant-blue h-full rounded-[var(--radius-input)]"
        }
        style={{ width: `${Math.min(100, Math.max(0, score * 20))}%` }}
      />
    </div>
  )
}

/* ----------------------------------------------------------------------------
   Spider / radar chart matching the SITA Figma design screenshots
   6 Criteria axes clockwise:
   Capacity -> Sponsorship -> Enablement -> Metrics -> Influence -> Operations -> Repository -> Governance -> AI Integration
---------------------------------------------------------------------------- */
function SITAChart({ level }: { level: Level }) {
  const [expanded, setExpanded] = useState(false)
  // Map criteriaScores into radar chart items
  const axisLabels: Record<string, string> = {
    capacity_enablement: "Capacity & enablement",
    leadership_buyin: "Leadership buy-in",
    metrics_kpis: "Metrics & KPIs",
    decision_influence: "Decision influence",
    operations_governance: "Operations & governance",
    ai_integration: "AI integration",
  }

  const chartData = level.criteriaScores.map((c) => ({
    axis: axisLabels[c.key] || c.name,
    score: c.score,
  }))

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
      <div className="flex items-center justify-between px-2 pt-1">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-on-primary-accent uppercase">Level {level.level}</span>
          <h4 className="text-primary-foreground text-base font-bold">{level.name}</h4>
        </div>
      </div>

      <div className={`${expandedView ? "h-[min(68vh,620px)]" : "h-[260px]"} w-full [&_.recharts-surface]:cursor-pointer [&_.recharts-wrapper]:cursor-pointer [&_svg]:cursor-pointer`}>
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <RadarChart data={chartData} outerRadius="72%">
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
        <span>6 Criteria Signal</span>
        <span className="text-on-primary-accent font-semibold">
          Avg {Math.round(level.criteriaScores.reduce((acc, c) => acc + c.score, 0) / level.criteriaScores.length)}/5
        </span>
      </div>
    </div>
  )

  return (
    <>
      {/* The kit has no chart-card component; this button preserves a keyboard-accessible chart trigger. */}
      <button
        type="button"
        className="block w-full text-left cursor-pointer"
        onClick={() => setExpanded(true)}
        aria-label={`Open Level ${level.level} ${level.name} radar chart`}
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
            aria-label={`Level ${level.level} radar chart`}
            onMouseDown={(event) => event.stopPropagation()}
          >
            {chart(true)}
          </div>
        </div>
      )}
    </>
  )
}

function CriteriaScoresBreakdown({ level }: { level: Level }) {
  const avg = Math.round(
    level.criteriaScores.reduce((s, d) => s + d.score, 0) / level.criteriaScores.length,
  )
  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-card p-6">
      <div className="mb-4 flex items-baseline justify-between">
        <span className="navigation-text text-muted-foreground">6 SITA Criteria Radar</span>
        <span className="text-muted-foreground">
          avg <span className="font-semibold text-foreground">{avg}</span>/5
        </span>
      </div>
      <SITAChart level={level} />
      <div className="mt-6 flex flex-col gap-3.5">
        {level.criteriaScores.map((c) => {
          const Icon = criterionIcons[c.key] || Users
          return (
            <div key={c.key} className="text-xs">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium text-foreground">
                  <Icon className="criterion-signal-primary size-3.5" strokeWidth={2} />
                  {c.name}
                </span>
                <span className="criterion-signal-primary font-semibold">{c.score}/5</span>
              </div>
              <MeterBar score={c.score} />
              <p className="mt-2 text-muted-foreground leading-relaxed">{c.summary}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ImpactChart({ data, title }: { data: { label: string; value: number }[]; title: string }) {
  const max = Math.max(...data.map((d) => d.value), 100)
  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-card p-6">
      <div className="impact-card-primary mb-5 navigation-text">{title}</div>
      <div className="flex flex-col gap-3">
        {data.map((d) => (
          <div key={d.label} className="grid grid-cols-[1fr_auto] items-center gap-0">
            <div className="flex items-center">
              <div className="h-[var(--progress-bar-height)] flex-1 overflow-hidden rounded-[var(--radius-input)] bg-foreground/5">
                <div
                  className="progress-bar-fill-vibrant-blue h-full rounded-[var(--radius-input)]"
                  style={{ width: `${(d.value / max) * 100}%` }}
                />
              </div>
            </div>
            <span className="impact-card-primary w-10 text-right font-medium">{d.value}%</span>
            <span className="impact-card-primary col-span-2 -mt-1 text-xs">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[var(--radius-button)] border border-border bg-card px-3 py-1 text-muted-foreground text-xs">
      {children}
    </span>
  )
}

function QuoteBlock({ level }: { level: Level }) {
  if (!level.quote) return null
  return (
    <figure className="sita-green-surface rounded-[var(--radius-card)] bg-primary p-8 text-primary-foreground">
      <QuoteIcon className="mb-4 size-7 text-primary-foreground/60" strokeWidth={1.5} />
      <blockquote className="text-primary-foreground">
        <p className="text-primary-foreground italic">“{level.quote.text}”</p>
      </blockquote>
      <figcaption className="mt-6 border-t border-primary-foreground/20 pt-4">
        <span className="block font-semibold text-primary-foreground">{level.quote.name}</span>
        <span className="block text-primary-foreground/70 text-xs">{level.quote.role}</span>
      </figcaption>
    </figure>
  )
}

function ListCard({
  title,
  icon,
  items,
  tone = "neutral",
}: {
  title: string
  icon: React.ReactNode
  items: string[]
  tone?: "good" | "bad" | "neutral"
}) {
  const marker =
    tone === "good" ? (
      <Check className="mt-1 size-4 shrink-0 text-primary" strokeWidth={2.25} />
    ) : tone === "bad" ? (
      <Minus className="mt-1 size-4 shrink-0 text-destructive" strokeWidth={2.5} />
    ) : (
      <ArrowRight className="mt-1 size-4 shrink-0 text-accent" strokeWidth={2} />
    )
  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-card p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-[var(--radius-input)] bg-accent/10 text-accent">
          {icon}
        </span>
        <h4 className="font-semibold text-foreground">{title}</h4>
      </div>
      <ul className="flex flex-col gap-3">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2.5 text-muted-foreground text-xs leading-relaxed">
            {marker}
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ----------------------------------------------------------------------------
   Section: a single maturity level — comprehensive detail across the 9 criteria.
---------------------------------------------------------------------------- */
function LevelSection({ level, next }: { level: Level; next?: Level }) {
  const ramp = [
    "progress-bar-fill-vibrant-blue opacity-15",
    "progress-bar-fill-vibrant-blue opacity-30",
    "progress-bar-fill-vibrant-blue opacity-50",
    "progress-bar-fill-vibrant-blue opacity-70",
    "progress-bar-fill-vibrant-blue",
  ]
  return (
    <section data-section id={level.id} className="scroll-mt-24 py-20">
      {/* Header band */}
      <div className="flex flex-col items-start gap-6 border-b border-border pb-10">
        <div className="max-w-2xl">
          <Eyebrow>Level {level.level}</Eyebrow>
          <h2 className="mt-3 text-2xl md:text-3xl font-bold">{level.name}</h2>
          <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">{level.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Pill>
            <Layers className="size-3.5 text-accent" strokeWidth={2} />
            Score {level.scoreRange}
          </Pill>
          {level.isTop && (
            <Pill>
              <Sparkles className="size-3.5 text-accent" strokeWidth={2} />
              Insights-led
            </Pill>
          )}
        </div>
      </div>

      {/* Overview + spider chart */}
      <div className="mt-10 grid gap-4 min-[1200px]:grid-cols-2">
        <div>
          <p className="text-foreground/85 leading-relaxed text-sm md:text-base">{level.overview}</p>
          <div className="mt-6 flex items-center gap-1">
            {ramp.map((c, i) => (
              <div
                key={i}
                className={`h-[var(--progress-bar-height)] flex-1 rounded-full ${i < level.level ? c : "bg-foreground/10"}`}
              />
            ))}
          </div>
          <span className="mt-2 block text-muted-foreground text-xs">
            Stage {level.level} of 5 on the SITA research maturity ladder
          </span>

          {/* SITA Roadmap focus for this stage */}
          <div className="mt-8 rounded-[var(--radius-card)] border border-border bg-card p-6">
            <h4 className="flex items-center gap-2 font-semibold text-foreground mb-4">
              <Compass className="size-4 text-accent" strokeWidth={2} />
              Stage {level.level} Criteria Roadmap Focus
            </h4>
            <div className="flex flex-col gap-3.5">
              {level.roadmap.map((step, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-foreground text-xs block">{step.title}</span>
                    <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CriteriaScoresBreakdown level={level} />
      </div>


      {/* Characteristics + how to reach */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <ListCard
          title="Characteristics of this level"
          icon={<BookOpen className="size-4" strokeWidth={1.75} />}
          items={level.characteristics}
          tone="neutral"
        />
        <ListCard
          title="How organizations reach this level"
          icon={<Compass className="size-4" strokeWidth={1.75} />}
          items={level.reachThisLevel}
          tone="neutral"
        />
      </div>

      {/* Strengths + weaknesses */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <ListCard
          title="Strengths at this stage"
          icon={<TrendingUp className="size-4" strokeWidth={1.75} />}
          items={level.strengths}
          tone="good"
        />
        <ListCard
          title="Weaknesses & risks"
          icon={<Minus className="size-4" strokeWidth={1.75} />}
          items={level.weaknesses}
          tone="bad"
        />
      </div>

      {/* Quote */}
      <div className="mt-8"><QuoteBlock level={level} /></div>

      {/* How to progress */}
      <div className="mt-10 rounded-[var(--radius-card)] border border-accent/25 bg-accent/[0.04] p-8">
        <div className="mb-6 flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-[var(--radius-input)] bg-accent text-accent-foreground">
            <ArrowUpRight className="size-4" strokeWidth={2.25} />
          </span>
          <h3 className="text-lg font-bold">
            {next ? `How to prepare and progress to Level ${next.level}: ${next.name}` : "How to maintain Level 5: Strategic"}
          </h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {level.prepareNext.map((step, i) => (
            <div key={i} className="flex gap-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-[var(--radius-button)] border border-accent/40 text-accent font-bold text-xs">
                {i + 1}
              </span>
              <div>
                <h4 className="mb-1 font-semibold text-sm">{step.title}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------------------
   Playbook application component
---------------------------------------------------------------------------- */
function Playbook() {
  const navigate = useNavigate()
  const location = useLocation()
  const allIds = useMemo(
    () => navGroups.flatMap((g) => g.items.map((i) => i.id)),
    [],
  )
  const [active, setActive] = useState(allIds[0])
  const [navOpen, setNavOpen] = useState(true)
  const isNavigatingRef = useRef(false)

  // Instant navigation handler: updates URL hash, active blue line state, and jumps immediately without animation
  const handleNavClick = useCallback((id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
    }
    isNavigatingRef.current = true
    setActive(id)
    history.replaceState(null, "", `#${id}`)

    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" })
    }

    // Release after instant jump
    setTimeout(() => {
      isNavigatingRef.current = false
    }, 100)
  }, [])

  // Scroll spy: tracks which section is in view on natural scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isNavigatingRef.current) return

      const scrollPos = window.scrollY + 120
      let currentId = allIds[0]

      for (const id of allIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          if (scrollPos >= top) {
            currentId = id
          }
        }
      }

      setActive(currentId)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [allIds])

  // Initial jump on load if hash exists
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    if (allIds.includes(id)) {
      handleNavClick(id)
    }
  }, [location.hash, allIds, handleNavClick])

  return (
    <div className="min-h-full bg-card text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4">
          <a href={import.meta.env.BASE_URL} className="flex items-center gap-3 transition hover:opacity-90" aria-label="Return to the SITA Research Maturity Model home page">
            {/* The kit has no image component; this is the exact Figma logo asset in its 44px header slot. */}
            <span className="sita-green-surface flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-input)]">
              <img src={`${import.meta.env.BASE_URL}assets/7a24d.svg`} alt="SITA" width="33" height="11" />
            </span>
            <div className="leading-tight">
              <span className="application-title block text-[22px] font-medium">SITA Research Maturity Model</span>
              <span className="block text-muted-foreground text-xs">6 Core Criteria & Roadmap</span>
            </div>
          </a>
          <button
            onClick={() => navigate("/survey")}
            className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-accent px-5 py-2.5 text-accent-foreground transition hover:opacity-90 active:opacity-80 font-medium text-xs md:text-sm"
          >
            Take survey
            <ArrowUpRight className="size-4" strokeWidth={2.25} />
          </button>
        </div>
      </header>

      <div className={`mx-auto flex max-w-[1400px] items-start px-6 ${navOpen ? "lg:gap-10" : "lg:gap-0"}`}>
        {/* Left table of contents — collapsible lane */}
        <aside
          className={`hidden lg:block lg:self-start lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-x-hidden lg:overflow-y-auto lg:transition-all lg:duration-200 ${
            navOpen
              ? "lg:w-64 lg:border-r lg:border-border lg:pr-6 lg:opacity-100"
              : "lg:pointer-events-none lg:w-0 lg:overflow-hidden lg:opacity-0"
          }`}
        >
          <nav className="w-64 max-w-full overflow-x-hidden py-8">
            {navGroups.map((group) => (
              <div key={group.title} className="mb-6">
                <div className="navigation-text mb-2.5 text-[9px] font-bold text-muted-foreground uppercase tracking-wider">{group.title}</div>
                <ul className="flex flex-col gap-0.5 border-l border-border">
                  {group.items.map((item) => {
                    const isActive = active === item.id
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => handleNavClick(item.id, e)}
                          className={`-ml-[2px] block break-words border-l-2 py-1.5 pl-3.5 text-[14px] font-medium transition-colors ${
                            isActive
                              ? "border-accent text-accent font-semibold"
                              : "border-transparent text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 bg-card pb-24">
          {/* Hero / overview */}
          <section data-section id="overview" className="scroll-mt-24 pt-10">
            <div className="sita-green-surface overflow-hidden rounded-[var(--radius-card)] bg-primary p-10 text-primary-foreground md:p-14">
              <Eyebrow onPrimary>SITA Research Maturity Model</Eyebrow>
              <h1 className="mt-4 max-w-3xl text-primary-foreground text-3xl md:text-4xl font-bold">
                SITA's roadmap to building an insights-led organization
              </h1>
              <p className="mt-6 max-w-2xl text-primary-foreground/80 leading-relaxed">
                As product development accelerates across aviation and travel technology, what we build becomes our true
                differentiator. This comprehensive corporate playbook benchmarks SITA's 6 core research criteria
                across five maturity levels—Limited, Sporadic, Developing, Systematic, and Strategic—providing a clear,
                actionable roadmap for squads and leadership.
              </p>
              <div className="mt-8 grid gap-4 border-t border-primary-foreground/20 pt-8 sm:grid-cols-3">
                {[
                  { k: "6 Criteria", v: "rigorous standards spanning People, Impact & Process" },
                  { k: "5 Stages", v: "from reactive testing to strategic C-level steering" },
                  { k: "4.3x", v: "accelerated time-to-market in insights-led organizations" },
                ].map((s) => (
                  <div key={s.k}>
                    <h2 className="block text-primary-foreground font-bold text-2xl">{s.k}</h2>
                    <span className="mt-1 block text-primary-foreground/70 text-xs">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-[1.5fr_1fr]">
              <div>
                <h3 className="text-xl font-bold">From ad-hoc insights to organizational learning</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  The SITA Research Maturity Model replaces guesswork with an evidence-based framework. Rather than viewing
                  research as occasional usability checks, mature organizations weave user insights into every stage of
                  product strategy, architectural bets, and service design.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Use this playbook to benchmark your squad, identify systemic gaps in operations or tooling, and follow
                  the progressive roadmap recommendations to advance your research impact.
                </p>
              </div>

              <div className="rounded-[var(--radius-card)] border border-border bg-card p-6">
                <div className="navigation-text mb-3 text-muted-foreground">How to use this SITA playbook</div>
                <ul className="flex flex-col gap-4">
                  {[
                    "Audit current practices against the 6 SITA Core Criteria.",
                    "Pinpoint your stage on the 5-level maturity ladder using the radar charts.",
                    "Execute the progressive roadmap steps tailored for your stage.",
                    "Take the 6-criteria assessment survey to generate your team's benchmark.",
                  ].map((t, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground text-xs leading-relaxed">
                      <ArrowRight className="mt-1 size-4 shrink-0 text-accent" strokeWidth={2} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* SITA 6 Criteria Section */}
          <section data-section id="criteria" className="scroll-mt-24 py-20">
            <Eyebrow>The Framework</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-2xl md:text-3xl font-bold">The 6 SITA Research Criteria</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              SITA evaluates research capability across 6 interconnected criteria grouped under People, Impact, and Process.
              True organizational maturity requires advancing in each criterion to eliminate bottlenecks and unlock strategic value.
            </p>

            {/* Criteria Detailed Table / Cards */}
            <div className="mt-8 grid gap-4">
              {(["People", "Impact", "Process"] as const).map((pillar) => {
                const group = sixCriteria.filter((c) => c.pillar === pillar)
                return (
                  <div key={pillar} className="rounded-[var(--radius-card)] border border-border bg-card p-6">
                    <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
                      <span className="font-bold text-accent tracking-wider uppercase text-xs">Pillar: {pillar}</span>
                      <span className="text-muted-foreground text-xs">• {group.length} Criteria</span>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      {group.map((c) => {
                        const Icon = criterionIcons[c.key] || Users
                        return (
                          <div key={c.key} className="flex flex-col justify-between rounded-[var(--radius-input)] border border-border/80 bg-foreground/[0.015] p-5">
                            <div>
                              <div className="flex items-center gap-2.5 mb-2">
                                <span className="flex size-7 items-center justify-center rounded-[var(--radius-input)] bg-accent/10 text-accent">
                                  <Icon className="size-4" strokeWidth={2} />
                                </span>
                                <h4 className="font-bold text-foreground text-sm">{c.name}</h4>
                              </div>
                              <span className="text-[14px] font-semibold text-accent/90 block mb-2">{c.subCriteria}</span>
                              <p className="text-muted-foreground text-xs leading-relaxed">{c.roadmapFocus}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Glossary */}
            <div className="mt-6 rounded-[var(--radius-card)] border border-border bg-card p-6">
              <div className="navigation-text mb-4 text-muted-foreground">Glossary of SITA Terminology</div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {glossary.map((g) => (
                  <div key={g.term}>
                    <h4 className="mb-1 font-semibold text-xs text-foreground">{g.term}</h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">{g.def}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stages ladder */}
          <section data-section id="stages" className="scroll-mt-24 py-20">
            <Eyebrow>Progression</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-2xl md:text-3xl font-bold">The Five Stages of Research Maturity</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Every stage represents a structural evolution in capacity, leadership sponsorship, operational rigor, and
              decision influence. Click any level to explore its full profile and radar baseline.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {levels.map((l, i) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={(e) => handleNavClick(l.id, e)}
                  className="group grid grid-cols-1 items-center gap-4 rounded-[var(--radius-card)] border border-border bg-card p-6 transition hover:border-accent md:grid-cols-[auto_1fr_auto]"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="flex size-11 items-center justify-center rounded-[var(--radius-input)] text-accent-foreground font-bold text-sm"
                      style={{ backgroundColor: "var(--accent)", opacity: 0.25 + i * 0.19 }}
                    >
                      L{l.level}
                    </span>
                    <div>
                      <span className="navigation-text text-muted-foreground text-xs">Level {l.level}</span>
                      <h3 className="mt-0.5 font-bold text-foreground text-base">{l.name}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs md:px-6 leading-relaxed">{l.tagline}</p>
                  <span className="flex items-center gap-2 text-accent text-xs font-semibold">
                    View level & radar
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" strokeWidth={2} />
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* Deep dive into each level */}
          {levels.map((l, i) => (
            <LevelSection key={l.id} level={l} next={levels[i + 1]} />
          ))}

          {/* Evidence / Business Outcomes */}
          <section data-section id="insights-led" className="scroll-mt-24 py-20">
            <Eyebrow>Business Impact</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-2xl md:text-3xl font-bold">Research Drives 2.3x Better Business Outcomes</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Organizations that systematically embed user research outpace peers across every key performance metric—achieving
              massive multipliers in time-to-market speed (4.3x) and direct revenue impact (4.2x).
            </p>
            <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-border bg-card">
              <div className="grid grid-cols-[1.4fr_1fr_1fr_auto] gap-4 border-b border-border bg-accent/[0.04] px-6 py-4 text-muted-foreground text-xs font-semibold">
                <span className="navigation-text">Business outcome</span>
                <span className="navigation-text">Low maturity</span>
                <span className="navigation-text">High maturity</span>
                <span className="navigation-text w-14 text-right">Lift</span>
              </div>
              {businessOutcomes.map((o) => (
                <div
                  key={o.outcome}
                  className="grid grid-cols-[1.4fr_1fr_1fr_auto] items-center gap-4 border-b border-border px-6 py-3.5 last:border-b-0 text-xs"
                >
                  <span className="font-medium text-foreground">{o.outcome}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-[var(--progress-bar-height)] w-full max-w-24 overflow-hidden rounded-[var(--radius-input)] bg-foreground/10">
                      <div className="h-full bg-foreground/30" style={{ width: `${o.low}%` }} />
                    </div>
                    <span className="w-9 text-muted-foreground">{o.low}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="progress-bar-track-vibrant-blue h-[var(--progress-bar-height)] w-full max-w-24 overflow-hidden rounded-[var(--radius-input)]">
                      <div className="progress-bar-fill-vibrant-blue h-full" style={{ width: `${o.high}%` }} />
                    </div>
                    <span className="w-9 text-muted-foreground font-semibold">{o.high}%</span>
                  </div>
                  <span className="w-14 text-right font-bold text-accent">{o.mult}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { k: "4.3x", v: "faster time-to-market through early problem validation" },
                { k: "4.2x", v: "greater revenue lift correlated with strategic research" },
                { k: "5.1x", v: "more likely to run generative research exploring opportunities" },
              ].map((s) => (
                <div key={s.k} className="rounded-[var(--radius-card)] border border-border bg-card p-6">
                  <h2 className="block text-accent font-bold text-2xl">{s.k}</h2>
                  <span className="mt-1 block text-muted-foreground text-xs leading-relaxed">{s.v}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Research Methods removed per the six-criteria playbook. */}
          {false && (
          <section data-section id="methods" className="scroll-mt-24 py-20">
            <Eyebrow>Craft & Methods</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-2xl md:text-3xl font-bold">How Mature Teams Conduct Research</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Mature organizations move beyond evaluative usability tests. They actively invest in generative discovery, causal analysis,
              and industry foresight to identify market opportunities well ahead of competitors.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 min-[1200px]:grid-cols-3">
              {researchMethods.map((m) => (
                <div key={m.method} className="rounded-[var(--radius-card)] border border-border bg-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-foreground text-base">{m.method}</h3>
                      <span className="rounded-[var(--radius-button)] bg-accent/10 px-2.5 py-1 text-accent font-bold text-xs">
                        {m.mult}
                      </span>
                    </div>
                    <p className="mt-2 text-muted-foreground text-xs leading-relaxed">{m.desc}</p>
                  </div>
                  <div className="mt-5 flex flex-col gap-2 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-9 text-muted-foreground">Low</span>
                      <MeterBar score={m.low} />
                      <span className="w-11 text-right text-muted-foreground">{m.low}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-9 text-muted-foreground font-semibold">High</span>
                      <MeterBar score={m.high} tone="primary" />
                      <span className="w-11 text-right text-muted-foreground font-semibold">{m.high}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          )}

          {/* Current State / Benchmark */}
          <section data-section id="state" className="scroll-mt-24 py-20">
            <Eyebrow>Industry Benchmark</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-2xl md:text-3xl font-bold">The Current State of Research Maturity</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Most organizations (78%) are currently navigating Level 3 (Developing) and Level 4 (Systematic). Only 3% have achieved
              Level 5 (Strategic) where insights direct foundational business bets—highlighting a major opportunity for SITA.
            </p>
            <div className="mt-8 rounded-[var(--radius-card)] border border-border bg-card p-8">
              <div className="flex h-4 w-full overflow-hidden rounded-[var(--radius-button)]">
                {distribution.map((d, i) => (
                  <div
                    key={d.level}
                    style={{ width: `${d.pct}%`, backgroundColor: "var(--accent)", opacity: 0.2 + i * 0.2 }}
                  />
                ))}
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {distribution.map((d, i) => (
                  <div key={d.level}>
                    <div className="flex items-center gap-2">
                      <span
                        className="size-3 rounded-full"
                        style={{ backgroundColor: "var(--accent)", opacity: 0.2 + i * 0.2 }}
                      />
                      <h3 className="text-accent font-bold text-lg">{d.pct}%</h3>
                    </div>
                    <span className="mt-1 block font-semibold text-xs text-foreground">{d.level}</span>
                    <span className="block text-muted-foreground text-xs">Score {d.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Toolkit */}
          <section data-section id="toolkit" className="scroll-mt-24 py-20">
            <div className="sita-green-surface rounded-[var(--radius-card)] bg-primary p-10 text-primary-foreground md:p-14">
              <Eyebrow onPrimary>Action Plan</Eyebrow>
              <h2 className="mt-3 max-w-2xl text-primary-foreground text-2xl md:text-3xl font-bold">
                Your SITA Toolkit for Advancing Research Maturity
              </h2>
              <p className="mt-4 max-w-2xl text-primary-foreground/80 leading-relaxed text-sm">
                Progress begins by honestly benchmarking your squad across the 6 criteria, selecting the highest-friction gaps,
                and applying standardized ResearchOps templates and training.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  { icon: BarChart3, t: "1. Audit the 6 Criteria", d: "Assess capacity and enablement, leadership buy-in, metrics and KPIs, decision influence, operations and governance, and AI integration." },
                  { icon: Target, t: "2. Target Key Bottlenecks", d: "Identify which criteria lag behind and implement the dedicated stage roadmap plays." },
                  { icon: Sparkles, t: "3. Scale Community & Ops", d: "Democratize vetted tools, maintain the central repository, and showcase impact to executive sponsors." },
                ].map((s) => (
                  <div key={s.t} className="rounded-[var(--radius-card)] bg-primary-foreground/10 p-6">
                    <s.icon className="size-5 text-primary-foreground" strokeWidth={1.75} />
                    <h4 className="mt-3 text-primary-foreground font-semibold text-sm">{s.t}</h4>
                    <p className="mt-1 text-primary-foreground/70 text-xs leading-relaxed">{s.d}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/survey")}
                className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-accent px-5 py-2.5 text-accent-foreground transition hover:opacity-90 font-medium text-xs md:text-sm"
              >
                Assess your team: 6-Criteria Survey
                <ArrowUpRight className="size-4" strokeWidth={2.25} />
              </button>
            </div>
          </section>

          {/* Knowledge check */}
          <section data-section id="quiz" className="scroll-mt-24 py-20">
            <Eyebrow>Certification</Eyebrow>
            <h2 className="mt-3 max-w-2xl text-2xl md:text-3xl font-bold">Test Your SITA Model Knowledge</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Ten questions covering SITA's 6 core criteria, pillar definitions, radar baselines, and maturity principles.
              Submit to review your score and directly jump to the sections explaining each answer.
            </p>
            <Quiz onNavigateSection={handleNavClick} />
            <p className="mt-10 text-muted-foreground text-xs">
              SITA Research Maturity Model — Establishing a clear roadmap for insights-led engineering and design.
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------------------
   Router configuration
---------------------------------------------------------------------------- */
const router = createBrowserRouter(
  [
    { path: "/", Component: Playbook },
    { path: "/survey", Component: Survey },
  ],
  { basename: import.meta.env.BASE_URL },
)

export default function App() {
  return <RouterProvider router={router} />
}
