import { useState } from "react"
import AddOpportunityForm from "./components/AddOpportunityForm"
import OpportunityFilters from "./components/OpportunityFilters"
import OpportunityList from "./components/OpportunityList"
import Button from "./components/Button"
import { seedOpportunities } from "./data/seedOpportunities"

export default function App() {
    const [opportunities, setOpportunities] = useState(seedOpportunities)
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

    function addOpportunity(newItem) {
        // Unique permanent ID: one higher than the current largest ID
        const nextId = opportunities.reduce((max, o) => Math.max(max, o.id), 0) + 1
        setOpportunities([...opportunities, { id: nextId, ...newItem }]) // immutable add
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

    // [...visible] is an independent copy, so sorting never mutates state or props
    const sorted = [...visible].sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title)
        if (sortBy === "seats") return b.availableSeats - a.availableSeats
        return a.date.localeCompare(b.date)
    })

    // Precomputed JSX variable (third conditional rendering pattern)
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
        <div className="min-h-screen bg-slate-50">
            <header className="bg-gradient-to-r from-teal-800 to-emerald-600 text-white">
                <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-8">
                    <div>
                        <h1 className="text-3xl font-bold">Rwanda Opportunities Explorer</h1>
                        <p className="mt-1 text-sm text-teal-50">
                            Workshops, career events, community activities and short courses. All listings are sample content.
                        </p>
                    </div>
                    <span className="rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold">
            Saved: {savedIds.length}
          </span>
                </div>
            </header>

            <main className="mx-auto max-w-5xl p-4">
                <AddOpportunityForm categories={categories} onAdd={addOpportunity} />

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
        </div>
    )
}