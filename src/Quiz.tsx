import { useMemo, useState } from "react"
import { ArrowRight, Check, X, RotateCcw, GraduationCap } from "lucide-react"
import { quizQuestions } from "./data"

/* ----------------------------------------------------------------------------
   Knowledge check — 10 multiple-choice questions updated for six SITA Criteria.
   Users pick options, submit, and get immediate feedback with instant section links.
---------------------------------------------------------------------------- */
export function Quiz({ onNavigateSection }: { onNavigateSection?: (sectionId: string) => void }) {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const answeredCount = Object.keys(answers).length
  const allAnswered = answeredCount === quizQuestions.length

  const score = useMemo(
    () => quizQuestions.filter((q) => answers[q.id] === q.answer).length,
    [answers],
  )

  function pick(qid: string, idx: number) {
    if (submitted) return
    setAnswers((a) => ({ ...a, [qid]: idx }))
  }

  function reset() {
    setAnswers({})
    setSubmitted(false)
    const el = document.getElementById("quiz")
    if (el) {
      el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" })
    }
  }

  const pct = Math.round((score / quizQuestions.length) * 100)
  const verdict =
    pct >= 80
      ? "Outstanding — you have mastered the 6 SITA research criteria and roadmap stages."
      : pct >= 50
        ? "Good foundation — review the 6 criteria and pillar definitions to strengthen your knowledge."
        : "Worth another read — dive into the linked criteria and level sections below to level up."

  return (
    <div className="mt-8">
      {/* Result summary */}
      {submitted && (
        <div className="sita-green-surface mb-8 rounded-[var(--radius-card)] bg-primary p-8 text-primary-foreground md:p-10">
          <span className="flex size-11 items-center justify-center rounded-[var(--radius-input)] bg-primary-foreground/10 text-on-primary-accent">
            <GraduationCap className="size-5" strokeWidth={1.75} />
          </span>
          <h3 className="mt-5 text-primary-foreground text-xl font-bold">
            You scored {score} out of {quizQuestions.length} ({pct}%)
          </h3>
          <p className="mt-2 text-primary-foreground/80 text-sm leading-relaxed">{verdict}</p>
          <div className="mt-6 h-[var(--progress-bar-height)] w-full overflow-hidden rounded-[var(--radius-input)] bg-primary-foreground/15">
            <div
              className="h-full rounded-[var(--radius-input)] bg-on-primary-accent transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {quizQuestions.map((q, i) => {
          const selected = answers[q.id]
          const isCorrect = selected === q.answer
          return (
            <div key={q.id} className="rounded-[var(--radius-card)] border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-[var(--radius-button)] border border-border text-muted-foreground text-xs font-semibold">
                  {i + 1}
                </span>
                <h4 className="mt-0.5 text-sm font-semibold text-foreground">{q.question}</h4>
              </div>

              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {q.options.map((opt, idx) => {
                  const isSelected = selected === idx
                  const isAnswer = q.answer === idx
                  let stateClass =
                    "border-border text-foreground hover:border-accent hover:bg-accent/[0.04]"
                  if (submitted) {
                    if (isAnswer) stateClass = "border-primary bg-primary/[0.06] text-foreground font-medium"
                    else if (isSelected) stateClass = "border-destructive bg-destructive/[0.06] text-foreground"
                    else stateClass = "border-border text-muted-foreground"
                  } else if (isSelected) {
                    stateClass = "border-accent bg-accent/[0.06] text-foreground font-medium"
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => pick(q.id, idx)}
                      disabled={submitted}
                      className={`flex items-center justify-between gap-3 rounded-[var(--radius-input)] border px-4 py-3 text-left text-xs transition disabled:cursor-default ${stateClass}`}
                    >
                      <span>{opt}</span>
                      {submitted && isAnswer && <Check className="size-4 shrink-0 text-primary" strokeWidth={2.5} />}
                      {submitted && isSelected && !isAnswer && (
                        <X className="size-4 shrink-0 text-destructive" strokeWidth={2.5} />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Per-question feedback after submitting */}
              {submitted && (
                <div className="mt-4 border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold">
                        <Check className="size-4" strokeWidth={2.5} /> Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-destructive text-xs font-semibold">
                        <X className="size-4" strokeWidth={2.5} />
                        {selected === undefined ? "Not answered" : "Incorrect"}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-muted-foreground text-xs leading-relaxed">{q.explanation}</p>
                  <a
                    href={`#${q.sectionId}`}
                    onClick={(e) => {
                      e.preventDefault()
                      if (onNavigateSection) {
                        onNavigateSection(q.sectionId)
                      } else {
                        const el = document.getElementById(q.sectionId)
                        if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" })
                      }
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 text-accent text-xs font-semibold transition hover:gap-2.5"
                  >
                    Read: {q.sectionLabel}
                    <ArrowRight className="size-3.5" strokeWidth={2} />
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Controls */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        {!submitted ? (
          <>
            <button
              onClick={() => setSubmitted(true)}
              disabled={!allAnswered}
              className="inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-accent px-5 py-2.5 text-accent-foreground transition hover:opacity-90 active:opacity-80 disabled:opacity-40 text-xs font-semibold"
            >
              Submit answers
              <ArrowRight className="size-4" strokeWidth={2} />
            </button>
            <span className="text-muted-foreground text-xs">
              {answeredCount} of {quizQuestions.length} answered
            </span>
          </>
        ) : (
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-border px-5 py-2.5 text-foreground transition hover:bg-accent/10 text-xs font-semibold"
          >
            <RotateCcw className="size-4" strokeWidth={2} />
            Retake the test
          </button>
        )}
      </div>
    </div>
  )
}
