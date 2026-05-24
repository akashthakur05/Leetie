<p align="center">
  <a href="https://github.com/amitjomy007/Leetie/stargazers">
    <img src="https://img.shields.io/github/stars/amitjomy007/Leetie?style=for-the-badge" />
  </a>
  <a href="https://github.com/amitjomy007/Leetie/network/members">
    <img src="https://img.shields.io/github/forks/amitjomy007/Leetie?style=for-the-badge" />
  </a>
  <a href="https://github.com/amitjomy007/Leetie/issues">
    <img src="https://img.shields.io/github/issues/amitjomy007/Leetie?style=for-the-badge" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/github/license/amitjomy007/Leetie?style=for-the-badge" />
  </a>
  <a href="https://github.com/amitjomy007/Leetie/pulls">
    <img src="https://img.shields.io/badge/PRs-Welcome-success?style=for-the-badge" />
  </a>
</p>

<br />

<p align="center">
  <img src="./public/logo.png" width="140" alt="Leetie Logo"/>
</p>

<h1 align="center">
  Leet<span style="color:#f0883e">ie</span>
</h1>

<p align="center">
  <b>Open-source company-wise LeetCode intelligence dashboard.</b>
  <br />
  Track interview trends, organize preparation, and build a smarter grinding workflow.
</p>

<p align="center">
  If this project helps your interview prep, consider giving it a ⭐ — it helps more people discover it.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript" />
  <img src="https://img.shields.io/badge/LeetCode-FFA116?style=for-the-badge&logo=leetcode&logoColor=black" />
  <img src="https://img.shields.io/badge/Open_Source-181717?style=for-the-badge&logo=github" />
</p>

<p align="center">
  <a href="https://github.com/amitjomy007">
    <img src="https://img.shields.io/badge/GitHub-amitjomy007-181717?style=flat-square&logo=github" />
  </a>
  <a href="https://www.linkedin.com/in/amitjomy/">
    <img src="https://img.shields.io/badge/LinkedIn-Amit%20Jomy-blue?style=flat-square&logo=linkedin" />
  </a>
  <a href="https://github.com/amitjomy007/Leetie/issues">
    <img src="https://img.shields.io/badge/Contributions-Welcome-success?style=flat-square" />
  </a>
</p>

---

## ✨ Why Leetie?

Most LeetCode trackers focus only on solving problems.

Leetie focuses on **interview intelligence**:

- company-wise interview trends
- frequency-based prioritization
- persistent preparation tracking
- fast filtering workflows
- developer-grade dashboard experience

Designed for serious interview preparation with a clean, premium desktop-first workflow.

---

## 🚀 Features

- Browse interview problems from company datasets
- Filter by:
  - 30 Days
  - 3 Months
  - 6 Months
  - More Than 6 Months
  - All Time
- Sort by:
  - Frequency
  - Acceptance Rate
  - Difficulty
  - Title
- Multi-company comparison mode
- Company autocomplete search
- Problem title search
- Difficulty filtering
- Mark problems as completed
- Completion date tracking
- Star important problems
- Persistent personal notes with hidden section
- Timer + open LeetCode workflow
- Pause/reset timers
- Hide completed problems toggle
- Starred-only mode
- Tag reveal system (per-tag and global)
- Dark / light theme with no flash
- localStorage persistence across refreshes and browser restarts
- Graceful handling for empty CSV datasets
- Responsive desktop-first UI
- Modular architecture for scalability

---

## 🖼️ Preview

### Dashboard

![Dashboard](./public/screenshots/dashboard.png)

### Filters & Search

![Filters](./public/screenshots/filters.png)

### Problem Workspace

![Workspace](./public/screenshots/workspace.png)

---

## 🌐 Live Demo

Coming soon via Vercel deployment.

---

## ⚡ Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/amitjomy007/Leetie.git
cd Leetie
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add the brain dataset

Leetie reads problem data from `public/brain/`. Clone the upstream dataset and copy the folders:

```bash
git clone https://github.com/liquidslr/interview-company-wise-problems.git
cp -r interview-company-wise-problems/* public/brain/
```

Expected structure:

```txt
public/
  brain/
    Google/
      1. Thirty Days.csv
      2. Three Months.csv
      3. Six Months.csv
      4. More Than Six Months.csv
      5. All.csv
    Amazon/
      ...
    Adobe/
      ...
```

### 4. Run development server

```bash
npm run dev
```

Open: `http://localhost:3000`

---

## 📦 Production Build

```bash
npm run build
npm start
```

---

## 🏗️ Project Structure

```txt
app/
  api/
    companies/route.js
    problems/[company]/

  layout.js
  page.js
  globals.css

components/
  layout/
    Navbar.js

  problems/
    CompanySelector.js
    FilterBar.js
    ProblemList.js
    ProblemRow.js
    ProblemTimer.js
    NoteEditor.js
    StatsBar.js

lib/
  csv.js
  companyLogos.js
  filters.js
  storage.js
```

---

## 🧠 Architecture Highlights

### Composable Filtering Pipeline

Filtering logic is intentionally modular. Adding new filters requires one filter condition and one UI control — nothing else changes.

### Persistent State Management

localStorage powers completed problems, starred problems, notes, timers, and completion history. Everything survives refreshes, browser restarts, and navigation.

### Optimized Rendering

- memoized problem rows
- module-level cached company datasets
- in-flight deduplication
- efficient filtering/sorting pipeline

Designed for large datasets (400+ companies, thousands of problems) and fast interaction.

### No Hardcoded Data

Leetie dynamically discovers companies, ranges, and datasets directly from the filesystem. No fake or placeholder data is used.

---

## 🙌 Credits

Leetie is built on top of the amazing **interview-company-wise-problems** dataset maintained by [@liquidslr](https://github.com/liquidslr).

Huge thanks for maintaining one of the most useful open-source interview preparation datasets available.

Dataset repository: https://github.com/liquidslr/interview-company-wise-problems

---

## 📄 Dataset / CSV Structure

```csv
Difficulty,Title,Frequency,Acceptance Rate,Link,Topics
MEDIUM,Two Sum,100.0,0.52,https://leetcode.com/problems/two-sum,"Array, Hash Table"
```

Leetie gracefully handles empty CSVs, malformed rows, missing values, and inconsistent datasets.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Check the [issues page](https://github.com/amitjomy007/Leetie/issues).

Possible contribution areas:

- new filters or sorting modes
- performance optimization
- accessibility improvements
- mobile polish
- export/import support
- analytics views
- UI improvements
- dataset tooling

### Contribution Workflow

```bash
# Fork, then:
git checkout -b feature/amazing-feature
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
# Open a Pull Request
```

Please keep the project JavaScript-only, follow existing architecture patterns, and avoid unnecessary dependencies.

---

## 🛣️ Roadmap

- [x] Company-wise filtering
- [x] Persistent progress tracking
- [x] Notes system with hidden section
- [x] Timer workflow
- [x] Tag reveal system
- [x] Dark / light theme
- [ ] Topic-based filtering
- [ ] Heatmap analytics
- [ ] Study plan mode
- [ ] PWA support
- [ ] Keyboard shortcuts
- [ ] Advanced statistics dashboard
- [ ] Google login & cloud sync
- [ ] Public deployment

---

## 👤 Author

**Amit Jomy**

<p>
  <a href="https://github.com/amitjomy007">
    <img src="https://img.shields.io/badge/GitHub-amitjomy007-181717?style=for-the-badge&logo=github" />
  </a>
  <a href="https://www.linkedin.com/in/amitjomy/">
    <img src="https://img.shields.io/badge/LinkedIn-Amit%20Jomy-blue?style=for-the-badge&logo=linkedin" />
  </a>
</p>

---

## ⭐ Show Your Support

If Leetie helped your interview preparation, please [give it a star](https://github.com/amitjomy007/Leetie/stargazers).

It helps more people discover the project, grows the open-source community, and motivates future development.

---

## 📜 License

Copyright © 2026 Amit Jomy. MIT licensed.
