# Enhanced Question View

The All Questions section now features an enhanced question card design similar to seanprashad.com/leetcode-patterns, with company badges, pattern tags, and an interactive hint system.

## Visual Features

### Company Badges
- Shows up to 8 company initials as small badges
- Each badge has a company name tooltip on hover
- Overflow indicator (+N) for companies beyond the first 8
- Color-coded styling that matches your theme
- Click-friendly badges with scale animation on hover

Example: "G A M M B T D O +12"
- G = Google, A = Amazon, M = Microsoft, M = Microsoft, B = Bloomberg, T = TCS, D = Deloitte, O = Oracle, +12 = 12 more companies

### Pattern Tags
- Display the first two patterns/categories as inline tags
- Examples: "Array", "Hash Table", "Two Pointers", "String"
- Styled with subtle background and borders
- Help quickly identify problem type

### Difficulty Badges
- Color-coded difficulty levels:
  - Easy: Green badge
  - Medium: Amber/Orange badge
  - Hard: Red badge
- Displayed inline with pattern tags

### Hint System
- "Show hint" button with lightbulb emoji (💡)
- Click to toggle hint visibility
- Hints displayed in a highlighted section with:
  - Amber left border
  - Subtle background color
  - Clear, readable text
- Button changes to "Hide hint" when expanded

Example Hint:
```
💡 Try using a hash map or array to solve this problem efficiently.
```

## Component Details

### ReferenceProblemRow Component
- **Location**: `/components/problems/ReferenceProblemRow.js`
- **Props**:
  - `problem`: Full problem object with companies, patterns, difficulty, etc.
  - `compact`: Boolean (optional) for compact row mode
  - `showHint`: Boolean state for hint visibility

### Styling
- **Location**: `/components/problems/ReferenceProblemRow.module.css`
- Uses CSS variables for theme compatibility:
  - `--bg`: Background color
  - `--text`: Text color
  - `--accent`: Orange/amber accent color
  - `--border`: Border color
  - `--card-bg`: Card background
  - `--hover-bg`: Hover background

### Responsive Design
- **Desktop**: All badges visible, full spacing
- **Tablet**: Slightly reduced badge size
- **Mobile**: Further scaled badges, optimized spacing
- Touch-friendly button sizes on all devices

## Data Structure

Each problem includes:
```javascript
{
  "id": 1,
  "title": "Two Sum",
  "slug": "two-sum",
  "pattern": ["Array", "Hash Table"],
  "difficulty": "Easy",
  "companies": [
    { "name": "Google", "slug": "google", "frequency": 151 },
    { "name": "Amazon", "slug": "amazon", "frequency": 68 },
    // ... more companies
  ]
}
```

## Features

### Done Tracking
- Click checkbox to mark problem as done
- Checkmark appears when complete
- State persists in localStorage across sessions
- Done problems appear slightly faded

### Starring
- Click star icon to favorite problems
- Filled star indicates favorited status
- Quick access for important problems

### Notes & Timers
- Access from individual problem interactions
- Stored in localStorage under problem title
- Tracks: completion time, notes, timer data

### LocalStorage Key
All problem states stored under `grind75_problems`:
```javascript
{
  "Two Sum": {
    "done": true,
    "doneAt": "2025-06-17T10:30:00Z",
    "starred": true,
    "note": "Quick hash table solution",
    "timerStarted": "2025-06-17T10:00:00Z",
    "timerElapsed": 1500 // seconds
  }
}
```

## Interaction Examples

### Mark as Done
1. Click the checkbox (○) to the left of the problem title
2. Checkbox changes to (✓)
3. Problem appears slightly faded
4. State persists in localStorage

### View Hint
1. Click "Show hint" button
2. Hint section expands below the company badges
3. Button text changes to "Hide hint"
4. Click again to collapse

### Star for Later
1. Click star (★) button on the right
2. Star fills with color (orange/amber)
3. Problem is marked as favorite
4. Use pattern/company filters to find starred items

## Accessibility

- All buttons have descriptive titles on hover
- High contrast text for readability
- Semantic HTML with proper labels
- Touch targets sized for mobile (min 44px)
- Keyboard navigable (Tab through elements)

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support with responsive design

## Future Enhancements

Potential additions:
- Difficulty filtering hints
- Custom hint editing
- Company filtering within problem rows
- Pattern-specific hint templates
- User-contributed hints
- Hint difficulty levels
