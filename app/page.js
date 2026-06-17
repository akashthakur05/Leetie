import { promises as fs } from 'fs'
import path from 'path'
import Navbar from '@/components/layout/Navbar'
import HomePage from '@/components/home/HomePage'

async function getCompanies() {
  const brainDir = path.join(process.cwd(), 'public', 'brain')
  try {
    const entries = await fs.readdir(brainDir, { withFileTypes: true })
    return entries.filter((e) => e.isDirectory()).map((e) => e.name).sort()
  } catch {
    return []
  }
}

export default async function Home() {
  const companies = await getCompanies()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <main style={{ maxWidth: 1320, margin: '0 auto', padding: '0 32px 80px' }}>
        <HomePage companies={companies} />
      </main>
    </div>
  )
}
