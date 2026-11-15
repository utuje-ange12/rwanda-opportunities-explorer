# Rwanda Opportunities Explorer

A responsive React app that helps learners discover workshops, career events,
community activities and short courses across Rwanda. All data is sample content
stored in the frontend. There is no backend, API or database.


## Features

- 12 sample opportunities across 4 categories and 4 cities (Kigali, Huye, Musanze, Rubavu)
- Live search by title or city (case-insensitive, extra spaces trimmed)
- Category filter, "Available only" and "Saved only" checkboxes, all working together
- Sorting by earliest date, title A to Z, or most available places
- Result count and a Reset filters button
- Save / Unsave on every card with a live saved counter
- Controlled Add Opportunity form with validation and helpful messages
- Badges for Featured, Free and Fully booked
- Empty-results message with a reset action
- Demo loading and error states
- Responsive, accessible layout built with Tailwind CSS

## Tech stack

React (function components, JSX, props, `useState`), Vite, Tailwind CSS v4.

## Setup

```bash
git clone https://github.com/utuje-ange12/rwanda-opportunities-explorer.git
cd rwanda-opportunities-explorer
npm install
npm run dev      # start the dev server at http://localhost:5173
npm run build    # production build
```

## Project structure

```
src/
  components/
    Button.jsx             Reusable button (variants, safe default type)
    Badge.jsx              Reusable colored label
    OpportunityCard.jsx    One opportunity, with conditional badges and Save button
    OpportunityList.jsx    Renders cards with map() and stable id keys
    OpportunityFilters.jsx Search, category, sort, checkboxes, reset
    AddOpportunityForm.jsx Controlled form with validation
  data/seedOpportunities.js  Sample data
  App.jsx                  State, derived filtering and sorting, layout
```

## Component descriptions

- **App**: owns all state (opportunities, saved IDs, filters, demo status) and
  derives the visible list during render.
- **OpportunityFilters**: displays the controls; all changes go up through callback props.
- **OpportunityList / OpportunityCard**: receive data through props and report Save clicks upward.
- **AddOpportunityForm**: keeps its own form state, validates, and calls `onAdd` with a new record.
- **Button / Badge**: small reusable props-driven components.

## Key concepts demonstrated

- `map()` with stable unique `id` keys (never array index)
- Immutable updates: spread, `filter()`, and sorting a copy (`[...visible].sort(...)`)
- Conditional rendering: ternary, `&&`, and precomputed JSX variables, plus lookup objects
- `=== 0` and `> 0` checks so no stray "0" is rendered
- Controlled inputs, `preventDefault()`, and associated labels for accessibility
