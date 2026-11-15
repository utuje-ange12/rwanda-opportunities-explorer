import { useState } from "react"
import OpportunityFilters from "./components/OpportunityFilters"
import OpportunityList from "./components/OpportunityList"
import Button from "./components/Button"
import { seedOpportunities } from "./data/seedOpportunities"

export default function App() {
    const [opportunities] = useState(seedOpportunities)
    const [savedIds, setSavedIds] = useState([])
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("All")
    const [sortBy, setSortBy] = useState("date")
    const [availableOnly, setAvailableOnly] = useState(false)
    const [savedOnly, setSavedOnly] = useState(false)

    function toggleSave(id) {
        setSavedIds(
            savedIds.includes(id)
                ? savedIds.filter((savedId) => savedId !== id)
                : [...savedIds, id]
        )
    }

    function resetFilters() {
        setSearch("")
        setCategory("All")
        setSortBy("date")
        setAvailableOnly(false)
        setSavedOnly(false)
    }

    // Derived data: calculated during render, never stored in state
    const categories = [...new Set(opportunities.map((o) => o.category))]
    const term = search.trim().toLowerCase()

    const visible = opportunities
        .filter((o) => term === "" || o.title.toLowerCase().includes(term) || o.city.toLowerCase().includes(term))
        .filter((o) => category === "All" || o.category === category)
        .filter((o) => !availableOnly || o.availableSeats > 0)
        .filter((o) => !savedOnly || savedIds.includes(o.id))

    // [...visible] makes an independent copy, so sorting never mutates state or props
    const sorted = [...visible].sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title)
        if (sortBy === "seats") return b.availableSeats - a.availableSeats
        return a.date.localeCompare(b.date)
    })

    // Third conditional pattern: a precomputed JSX variable
    let content
    if (sorted.length === 0) {
        content = (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
                <p className="mb-3 text-slate-700">No opportunities match your search or filters.</p>
                <Button onClick={resetFilters}>Reset filters</Button>
            </div>
        )
    } else {
        content = (
            <OpportunityList
                opportunities={sorted}
                savedIds={savedIds}
                onToggleSave={toggleSave}
            />
        )
    }

    return (
        <main className="mx-auto max-w-5xl p-4">
            <h1 className="mb-1 text-2xl font-bold text-teal-700">Rwanda Opportunities Explorer</h1>
            <p className="mb-4 text-sm text-slate-600">
                All listings are sample content. Saved: {savedIds.length}
            </p>

            <OpportunityFilters
                search={search} onSearchChange={setSearch}
                category={category} onCategoryChange={setCategory} categories={categories}
                sortBy={sortBy} onSortChange={setSortBy}
                availableOnly={availableOnly} onAvailableOnlyChange={setAvailableOnly}
                savedOnly={savedOnly} onSavedOnlyChange={setSavedOnly}
                onReset={resetFilters}
            />

            <p className="mb-3 text-sm font-medium text-slate-700" aria-live="polite">
                Showing {sorted.length} of {opportunities.length} opportunities
            </p>

            {content}
        </main>
    )
}