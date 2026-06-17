# Leetie - Three-Section Redesign Features

## 🎯 Beginner Roadmap

A structured 11-phase learning path designed for those new to coding interviews.

### Phases (in order):
1. **Arrays & Hash Tables** - 6 problems
   - Fundamentals: indexing, lookups, duplicates
   - Examples: Contains Duplicate, Two Sum, Best Time to Buy and Sell Stock

2. **Two Pointers & Sliding Window** - 5 problems
   - Linear array techniques
   - Examples: 3Sum, Container With Most Water

3. **Stack & Queue** - 5 problems
   - LIFO/FIFO data structures
   - Examples: Valid Parentheses, Min Stack

4. **Linked Lists** - 5 problems
   - Pointer manipulation and reversal
   - Examples: Reverse Linked List, Remove Nth Node

5. **Trees & Graphs** - 6 problems
   - Tree traversal (DFS, BFS)
   - Examples: Invert Binary Tree, Number of Islands

6. **Binary Search** - 5 problems
   - O(log n) search techniques
   - Examples: Binary Search, Search in Rotated Array

7. **Dynamic Programming Basics** - 5 problems
   - Memoization patterns
   - Examples: Climbing Stairs, House Robber

8. **Greedy & Intervals** - 5 problems
   - When greedy works
   - Examples: Jump Game, Merge Intervals

9. **Bit Manipulation** - 5 problems
   - Bitwise operations
   - Examples: Single Number, Number of 1 Bits

10. **Heap & Sorting** - 5 problems
    - Priority queues
    - Examples: Merge K Sorted Lists, Top K Frequent

11. **Advanced Patterns** - 5 problems
    - Complex multi-technique problems
    - Examples: Word Ladder, Generate Parentheses

**Features:**
- Collapsible phase cards with progress tracking
- Visual completion counters (0/6, 0/5, etc.)
- All problems stored locally with done/star/note/timer state
- Maintains state across browser sessions via localStorage

---

## ⚡ Experienced Roadmap

The famous "Blind 75" problem set - 75 essential problems organized by 15 categories.

### Categories:
1. Array & Hashing (6 problems)
2. Two Pointers (5 problems)
3. Sliding Window (5 problems)
4. Stack (4 problems)
5. Binary Search (5 problems)
6. Linked List (6 problems)
7. Trees (12 problems) - largest category
8. Tries (3 problems)
9. Heap (3 problems)
10. Graphs (7 problems)
11. Advanced Graphs (5 problems)
12. 1-D DP (9 problems)
13. 2-D DP (3 problems)
14. Greedy (5 problems)
15. Intervals (5 problems)

**Key differences from Beginner:**
- More challenging problems (Medium/Hard)
- Focus on interview-critical patterns
- Larger problem sets per category
- FAANG company interview focus
- Recommended to complete after or alongside Beginner

---

## 📚 All Questions

The complete database view with 178 LeetCode problems, supporting the original company-based filtering plus new pattern-based organization.

### Filtering Options:

**By Pattern** (Algorithm Pattern)
- Array, Hash Table, String, Math
- Two Pointers, Sliding Window
- Stack, Queue, Heap, Priority Queue
- Linked List, Tree, Binary Search Tree
- Graph, DFS, BFS, Backtracking, Greedy
- Dynamic Programming, Bit Manipulation, And more...

**By Difficulty**
- Easy (green badges)
- Medium (amber badges)
- Hard (red badges)

**By Company**
- Google, Amazon, Meta, Microsoft, Apple
- Goldman Sachs, JPMorgan, Morgan Stanley
- 150+ company options with frequency data

**Search**
- Full-text search across problem titles and patterns
- Instant filtering as you type

**Sort Options**
- By Frequency (most asked first)
- By Difficulty (Easy → Hard)
- By Title (A-Z)

### View Modes:

1. **List View** (default)
   - Flat list of all matching problems
   - Quick scanning and filtering
   - Company badges show top hiring company
   - Frequency scores visible

2. **Pattern View**
   - Problems grouped by algorithm pattern
   - Learn a specific pattern in depth
   - See which patterns have most problems
   - Pattern mastery approach

### Features:
- Problem state persistence (done, starred, notes, timers)
- Click problem to open in LeetCode
- Star for favorites / easy access
- Mark as done for progress tracking
- Add personal notes on solutions
- Built-in timer for mock interviews

---

## 🔧 Technical Features

### Data Management
- **178 LeetCode Problems** with full metadata
- **Company Frequency Data** - shows which companies ask each question
- **Pattern Categorization** - 25+ algorithm patterns
- **Difficulty Levels** - Easy, Medium, Hard
- **No Backend Required** - all data in JSON files

### State Persistence
- localStorage key: `grind75_problems`
- Stores: done status, timestamp, starred, notes, timer data
- Syncs across all three views automatically
- Works offline (no internet required)

### Theme System
- Dark mode (default)
- Light mode (toggle in navbar)
- CSS variables for custom theming
- High contrast accessibility

### Responsive Design
- Mobile-first approach
- Tablet optimized
- Desktop full-featured
- Touch-friendly buttons and tabs

---

## 📊 Usage Patterns

### For Beginners:
1. Start with **Beginner Roadmap**
2. Follow phases 1-11 in order
3. Complete all problems in each phase
4. Mark as done when finished
5. Move to next phase only when confident

### For Advanced Users:
1. Start with **Experienced Roadmap** or **All Questions**
2. Filter by pattern to master specific techniques
3. Use pattern-view to deep dive into one pattern
4. Track progress with done/star system
5. Use company filtering for target companies
6. Reference **Blind 75** for canonical problems

### For Company Prep:
1. Go to **All Questions**
2. Filter by target company
3. Sort by frequency (most asked first)
4. Solve top 30-50 questions
5. Use star/note features to track progress
6. Time yourself with built-in timer

---

## 🎨 Design System

- **Primary Color**: Orange/Amber (accent)
- **Text Colors**: High contrast for readability
- **Card Design**: Clean, modern, accessible
- **Icons**: Emoji-based for universal support
- **Spacing**: Consistent 8px/16px/24px scale
- **Typography**: System fonts for performance

---

## 🚀 Ready to Deploy

The application is production-ready:

```bash
npm run build
npm start
# or
vercel deploy
```

All data is bundled in JSON files - no database required!
