'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon, Star, GitFork, GitPullRequest, ExternalLink } from 'lucide-react'

const REPO = 'https://github.com/amitjomy007/Leetie'

function NavLink({ href, icon: Icon, label, accent }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 12px',
        background: accent ? 'var(--accent-dim)' : 'var(--bg-card)',
        border: `1px solid ${accent ? 'rgba(240,136,62,0.4)' : 'var(--border)'}`,
        borderRadius: 7,
        color: accent ? 'var(--accent)' : 'var(--text-muted)',
        fontSize: 12, fontWeight: 500,
        textDecoration: 'none',
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent ? 'var(--accent)' : 'var(--border-bright)'
        e.currentTarget.style.color = accent ? 'var(--accent)' : 'var(--text)'
        e.currentTarget.style.background = accent ? 'rgba(240,136,62,0.18)' : 'var(--bg-hover)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = accent ? 'rgba(240,136,62,0.4)' : 'var(--border)'
        e.currentTarget.style.color = accent ? 'var(--accent)' : 'var(--text-muted)'
        e.currentTarget.style.background = accent ? 'var(--accent-dim)' : 'var(--bg-card)'
      }}
    >
      {Icon && <Icon size={13} />}
      {label}
    </a>
  )
}

export default function Navbar() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const stored = localStorage.getItem('leetie_theme') || 'dark'
    setTheme(stored)
  }, [])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('leetie_theme', next)
    if (next === 'light') {
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }

  return (
    <header style={{
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{
        maxWidth: 1320, margin: '0 auto', padding: '0 28px',
        height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <img
            src="/logo.png" alt="Leetie"
            width={28} height={28}
            style={{ borderRadius: 7, display: 'block', objectFit: 'contain' }}
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <span className="font-display" style={{
            fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)',
          }}>
            Leet<span style={{ color: 'var(--accent)' }}>ie</span>
          </span>
        </div>

        {/* Nav actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <NavLink href={`${REPO}/stargazers`} icon={Star} label="Star" accent />
          <NavLink href={`${REPO}/fork`} icon={GitFork} label="Fork" />
          <NavLink href={`${REPO}/issues`} icon={GitPullRequest} label="Contribute" />
          <NavLink href="https://leetcode.com" icon={ExternalLink} label="LeetCode" />

          <div style={{ width: 1, height: 22, background: 'var(--border)', margin: '0 4px' }} />

          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 34, height: 34,
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 8, color: 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-bright)'; e.currentTarget.style.color = 'var(--text)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>
    </header>
  )
}
