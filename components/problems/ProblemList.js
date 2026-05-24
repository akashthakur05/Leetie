'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { parseCSV } from '@/lib/csv'
import { sortProblems, filterProblems, deduplicateProblems } from '@/lib/filters'
import { useProblemState } from '@/lib/storage'
import { getCompanyLogoUrl } from '@/lib/companyLogos'
import ProblemRow from './ProblemRow'
import FilterBar from './FilterBar'
import StatsBar from './StatsBar'
import CompanySelector from './CompanySelector'
import { Loader, Search, Building2 } from 'lucide-react'

const DEFAULT_FILTERS = {
  range: 'all',
  sort: 'frequency',
  difficulty: 'ALL',
  hideCompleted: false,
  starred: false,
}

const FAANG = [
  'Amazon','Apple','Google','Microsoft','Netflix',
  'Meta','Uber','Airbnb','Adobe','Bloomberg',
]

const TYPING_TEXT = 'Select a/multiple company/ies to begin'
const TYPING_SPEED = 42

const dataCache = {}

function CompanyIcon({ name, size = 14 }) {
  const [imgFailed, setImgFailed] = useState(false)
  const url = getCompanyLogoUrl(name)

  if (!url || imgFailed) {
    return <Building2 size={size} style={{ flexShrink: 0 }} />
  }
  return (
    <img
      src={url}
      alt=""
      width={size}
      height={size}
      style={{ flexShrink: 0, objectFit: 'contain' }}
      onError={() => setImgFailed(true)}
    />
  )
}

function AnimatedHeading() {
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState('typing') // typing | pause | erasing

  useEffect(() => {
    let timeout

    if (phase === 'typing') {
      if (displayed.length < TYPING_TEXT.length) {
        timeout = setTimeout(() => setDisplayed(TYPING_TEXT.slice(0, displayed.length + 1)), TYPING_SPEED)
      } else {
        timeout = setTimeout(() => setPhase('pause'), 2200)
      }
    } else if (phase === 'pause') {
      setPhase('erasing')
    } else if (phase === 'erasing') {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(TYPING_TEXT.slice(0, displayed.length - 1)), 22)
      } else {
        timeout = setTimeout(() => setPhase('typing'), 600)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, phase])

  return (
    <p style={{
      fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.01em',
      marginBottom: 24, minHeight: 20, textAlign: 'center',
    }}>
      {displayed}
      <span className="cursor" style={{ color: 'var(--accent)', marginLeft: 1 }}>|</span>
    </p>
  )
}

export default function ProblemList({ companies }) {
  const [selectedCompanies, setSelectedCompanies] = useState([])
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [cacheVersion, setCacheVersion] = useState(0)
  const [loading, setLoading] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [showTags, setShowTags] = useState(false)
  const [landed, setLanded] = useState(false)
  const fetchingRef = useRef(new Set())
  const selectorRef = useRef(null)

  const { getState, markDone, toggleStar, setNote, setTimerStart, pauseTimer, resetTimer, hydrated } = useProblemState()

  useEffect(() => {
    if (selectedCompanies.length > 0 && !landed) setLanded(true)
  }, [selectedCompanies])

  useEffect(() => {
    if (selectedCompanies.length === 0) return
    const { range } = filters
    const needed = selectedCompanies.filter((c) => {
      const key = `${c}:${range}`
      return !(key in dataCache) && !fetchingRef.current.has(key)
    })
    if (needed.length === 0) return

    needed.forEach((c) => fetchingRef.current.add(`${c}:${filters.range}`))
    setLoading(true)

    Promise.all(
      needed.map(async (company) => {
        const res = await fetch(`/api/problems/${encodeURIComponent(company)}?range=${filters.range}`)
        const parsed = res.ok ? parseCSV((await res.json()).csv ?? '') : []
        return { company, parsed }
      })
    ).then((results) => {
      for (const { company, parsed } of results) {
        dataCache[`${company}:${filters.range}`] = parsed
      }
      setCacheVersion((v) => v + 1)
      setLoading(false)
    })
  }, [selectedCompanies.join(','), filters.range])

  const problems = useMemo(() => {
    if (selectedCompanies.length === 0) return []
    const pwc = []
    for (const company of selectedCompanies) {
      const rows = dataCache[`${company}:${filters.range}`]
      if (!rows) continue
      for (const p of rows) pwc.push({ problem: p, company })
    }
    const deduped = deduplicateProblems(pwc)
    const statesMap = {}
    for (const p of deduped) statesMap[p.title] = getState(p.title)
    const filtered = filterProblems(deduped, { ...filters, search: searchInput, problemStates: statesMap })
    return sortProblems(filtered, filters.sort)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheVersion, selectedCompanies, filters, searchInput, getState])

  const allCached = selectedCompanies.length > 0 &&
    selectedCompanies.every((c) => `${c}:${filters.range}` in dataCache)
  const isRangeEmpty = allCached && problems.length === 0 &&
    !searchInput && filters.difficulty === 'ALL' && !filters.hideCompleted && !filters.starred

  const problemStates = useMemo(() => {
    const map = {}
    for (const p of problems) map[p.title] = getState(p.title)
    return map
  }, [problems, getState])

  const quickPick = FAANG.filter((c) => companies.includes(c))

  function handleQuickPick(company) { setSelectedCompanies([company]) }

  function handleMoreClick() {
    setLanded(true)
    setTimeout(() => selectorRef.current?.querySelector('input')?.focus(), 150)
  }

  if (!hydrated) return null

  // ── LANDING ──────────────────────────────────────────────────────────────
  if (!landed) {
    return (
      <div className="landing-bg" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: 'calc(100vh - 58px)',
        padding: '0 24px 60px', position: 'relative',
      }}>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {/* Logo */}
          <img
            src="/logo.png"
            alt="Leetie"
            className="float"
            style={{ width: 130, height: 130, objectFit: 'contain', marginBottom: 20 }}
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />

          {/* Brand */}
          <h1 className="font-display" style={{
            fontSize: 64, fontWeight: 800, letterSpacing: '-0.05em',
            color: 'var(--text)', marginBottom: 14, textAlign: 'center', lineHeight: 1,
          }}>
            Leet<span style={{ color: 'var(--accent)' }}>ie</span>
          </h1>

          <p style={{
            fontSize: 15, color: 'var(--text-muted)', textAlign: 'center',
            maxWidth: 460, lineHeight: 1.75, marginBottom: 48,
          }}>
            Company-wise LeetCode problems sorted by real interview frequency.
            Track progress, set timers, take notes — all stored locally.
          </p>

          {/* Picker card */}
          <div style={{
            background: 'rgba(13,17,23,0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border)',
            borderRadius: 18,
            padding: '32px 44px',
            width: '100%',
            maxWidth: 780,
          }}>
            <AnimatedHeading />

            {/* Company buttons — single neutral color, icon */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 18 }}>
              {quickPick.map((c) => (
                <button
                  key={c}
                  onClick={() => handleQuickPick(c)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '11px 20px',
                    background: 'var(--bg-hover)',
                    border: '1px solid var(--border)',
                    borderRadius: 10,
                    color: 'var(--text)',
                    fontSize: 14, fontWeight: 500,
                    cursor: 'pointer', transition: 'all 0.15s',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.color = 'var(--accent)'
                    e.currentTarget.style.background = 'var(--accent-dim)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(240,136,62,0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.color = 'var(--text)'
                    e.currentTarget.style.background = 'var(--bg-hover)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <CompanyIcon name={c} size={15} />
                  {c}
                </button>
              ))}
            </div>

            {/* Search button — accent glow */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <button
                onClick={handleMoreClick}
                className="glow-pulse"
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '13px 32px',
                  background: 'var(--accent-dim)',
                  border: '1px solid var(--accent)',
                  borderRadius: 10,
                  color: 'var(--accent)',
                  fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit',
                  letterSpacing: '-0.01em',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(240,136,62,0.22)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.animationPlayState = 'paused'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--accent-dim)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.animationPlayState = 'running'
                }}
              >
                <Search size={15} />
                Search among {companies.length} companies
              </button>
            </div>

            <p style={{ fontSize: 11, color: 'var(--text-dim)', textAlign: 'center' }}>
              Click any company above, or search for a specific one
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ── MAIN VIEW ─────────────────────────────────────────────────────────────
  return (
    <div className="fade-up">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '16px 0 12px' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div ref={selectorRef} style={{ flex: 1 }}>
            <CompanySelector companies={companies} selected={selectedCompanies} onChange={setSelectedCompanies} />
          </div>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search problems..."
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 8, color: 'var(--text)', fontSize: 13,
              padding: '9px 14px', outline: 'none', width: 220, transition: 'border-color 0.15s',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--border-bright)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          />
        </div>
        <FilterBar
          filters={filters} onChange={setFilters}
          showTags={showTags} onToggleTags={() => setShowTags((v) => !v)}
        />
      </div>

      {selectedCompanies.length === 0 && (
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '60px 0', textAlign: 'center',
        }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>
            Search and select a company above
          </p>
          <p style={{ fontSize: 11, color: 'var(--text-dim)' }}>{companies.length} companies available</p>
        </div>
      )}

      {selectedCompanies.length > 0 && (
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 10, overflow: 'hidden',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr 100px 80px 72px 230px',
            gap: 16, padding: '10px 20px',
            borderBottom: '1px solid var(--border)', background: 'var(--bg)',
          }}>
            {['', 'Problem', 'Difficulty', 'Frequency', 'Acceptance', 'Actions'].map((col) => (
              <span key={col} style={{
                fontSize: 11, color: 'var(--text-dim)',
                letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500,
              }}>
                {col}
              </span>
            ))}
          </div>

          <StatsBar problems={problems} problemStates={problemStates} />

          {loading && (
            <div style={{ padding: 48, display: 'flex', justifyContent: 'center', color: 'var(--text-dim)' }}>
              <Loader size={18} className="spin-slow" />
            </div>
          )}

          {!loading && isRangeEmpty && (
            <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-dim)', fontSize: 13 }}>
              No problems in the dataset for this time range.
            </div>
          )}

          {!loading && !isRangeEmpty && problems.length === 0 && (
            <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-dim)', fontSize: 13 }}>
              No matching problems.
            </div>
          )}

          {!loading && problems.map((problem) => (
            <ProblemRow
              key={problem.title}
              problem={problem}
              state={problemStates[problem.title] ?? {}}
              showTags={showTags}
              onMarkDone={markDone}
              onToggleStar={toggleStar}
              onSaveNote={setNote}
              onStartTimer={setTimerStart}
              onPauseTimer={pauseTimer}
              onResetTimer={resetTimer}
            />
          ))}
        </div>
      )}
    </div>
  )
}
