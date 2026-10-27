import { levels, type CriterionKey } from "../data"

/**
 * Survey data layer for the six SITA Research Criteria.
 *
 * Stores completed maturity assessments across:
 * 1. Capacity
 * 2. Sponsorship
 * 3. Enablement
 * 4. Metrics
 * 5. Influence
 * 6. Operations
 * 7. Repository
 * 8. Governance
 * 9. AI Integration
 */

export type SurveyKey = "capacity_enablement" | "leadership_buyin" | "metrics_kpis" | "decision_influence" | "operations_governance" | "ai_integration"
export type SurveyAnswers = Record<SurveyKey, number>

export type SurveyResult = SurveyAnswers & {
  id: string
  createdAt: string
  average: number
  levelId: string
  levelNumber: number
  levelName: string
}

export type SurveyAggregate = {
  count: number
  avgCapacity: number
  avgSponsorship: number
  avgEnablement: number
  avgMetrics: number
  avgInfluence: number
  avgOperations: number
  avgRepository: number
  avgGovernance: number
  avgAiIntegration: number
  avgOverall: number
  levelShare: { levelId: string; levelNumber: number; levelName: string; pct: number }[]
}

const STORAGE_KEY = "sita.rmm.survey.responses.v2"

/** Map a 1–5 average score onto one of the five maturity levels. */
export function resolveLevel(average: number) {
  const idx = Math.min(4, Math.max(0, Math.round(average) - 1))
  return levels[idx]
}

export function scoreToResult(answers: SurveyAnswers): Omit<SurveyResult, "id" | "createdAt"> {
  const keys: SurveyKey[] = [
    "capacity_enablement",
    "leadership_buyin",
    "metrics_kpis",
    "decision_influence",
    "operations_governance",
    "ai_integration",
  ]
  const sum = keys.reduce((acc, k) => acc + (answers[k] ?? 3), 0)
  const average = Math.round(sum / keys.length)
  const level = resolveLevel(average)
  return {
    ...answers,
    average,
    levelId: level.id,
    levelNumber: level.level,
    levelName: level.name,
  }
}

function read(): SurveyResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as SurveyResult[]) : []
  } catch {
    return []
  }
}

function write(rows: SurveyResult[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows))
  } catch {
    /* storage may be unavailable */
  }
}

export async function saveSurvey(answers: SurveyAnswers): Promise<SurveyResult> {
  const result: SurveyResult = {
    ...scoreToResult(answers),
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
  }
  const rows = read()
  rows.push(result)
  write(rows)
  return result
}

export async function getAggregate(): Promise<SurveyAggregate> {
  const rows = read()
  const count = rows.length
  const mean = (pick: (r: SurveyResult) => number) => count ? Math.round(rows.reduce((s, r) => s + pick(r), 0) / count) : 0

  const levelShare = levels.map((l) => ({
    levelId: l.id,
    levelNumber: l.level,
    levelName: l.name,
    pct: count ? Math.round((rows.filter((r) => r.levelId === l.id).length / count) * 100) : 0,
  }))

  return {
    count,
    avgCapacity: mean((r) => r.capacity_enablement ?? 3),
    avgSponsorship: mean((r) => r.leadership_buyin ?? 3),
    avgEnablement: mean((r) => r.capacity_enablement ?? 3),
    avgMetrics: mean((r) => r.metrics_kpis ?? 3),
    avgInfluence: mean((r) => r.decision_influence ?? 3),
    avgOperations: mean((r) => r.operations_governance ?? 3),
    avgRepository: mean((r) => r.operations_governance ?? 3),
    avgGovernance: mean((r) => r.operations_governance ?? 3),
    avgAiIntegration: mean((r) => r.ai_integration ?? 3),
    avgOverall: mean((r) => r.average ?? 50),
    levelShare,
  }
}
