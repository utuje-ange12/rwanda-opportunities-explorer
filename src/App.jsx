import { useState } from "react"
import AddOpportunityForm from "./components/AddOpportunityForm"
import OpportunityFilters from "./components/OpportunityFilters"
import OpportunityList from "./components/OpportunityList"
import Button from "./components/Button"
import { seedOpportunities } from "./data/seedOpportunities"

// Lookup object for status labels
const statusLabels = {
    ready: "Ready",
    loading: "Loading",
    error: "Error",
}

export default function App() {
    const [opportunities, setOpportunities] = useState(seedOpportunities)
    const [savedIds, setSavedIds] = useState([])
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("All")
    const [sortBy, setSortBy] = useState("date")
    const [availableOnly, setAvailableOnly] = useState(false)
    const [savedOnly, setSavedOnly] = useState(false)
    const [demoStatus, setDemoStatus] = useState("ready")

    function toggleSave(id) {
        setSavedIds(
            savedIds.includes(id)
                ? savedIds.filter((savedId) => savedId !== id)
                : [...savedIds, id]
        )
    }

    function addOpportunity(newItem) {
        const nextId = opportunities.reduce((max, o) => Math.max(max, o.id), 0) + 1
        setOpportunities([...opportunities, { id: nextId, ...newItem }])
    }

    function resetFilters() {
        setSearch("")
        setCategory("All")
        setSortBy("date")
        setAvailableOnly(false)
        setSavedOnly(false)
    }

    const categories = [...new Set(opportunities.map((o) => o.category))]
    const term = search.trim().toLowerCase()

    const visible = opportunities
        .filter((o) => term === "" || o.title.toLowerCase().includes(term) || o.city.toLowerCase().includes(term))
        .filter((o) => category === "All" || o.category === category)
        .filter((o) => !availableOnly || o.availableSeats > 0)
        .filter((o) => !savedOnly || savedIds.includes(o.id))

    const sorted = [...visible].sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title)
        if (sortBy === "seats") return b.availableSeats - a.availableSeats
        return a.date.localeCompare(b.date)
    })

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

    let statusView = null
    if (demoStatus === "loading") {
        statusView = (
            <div className="rounded-lg border border-slate-200 bg-white p-8 text-center" role="status">
                <p className="text-slate-700">Loading opportunities...</p>
            </div>
        )
    } else if (demoStatus === "error") {
        statusView = (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-8 text-center" role="alert">
                <p className="mb-3 text-rose-800">Something went wrong while loading opportunities.</p>
                <Button onClick={() => setDemoStatus("ready")}>Try again</Button>
            </div>
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

                <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                    <span>Demo state: <strong>{statusLabels[demoStatus]}</strong></span>
                    <Button variant="secondary" onClick={() => setDemoStatus("loading")}>Show loading</Button>
                    <Button variant="secondary" onClick={() => setDemoStatus("error")}>Show error</Button>
                    <Button variant="secondary" onClick={() => setDemoStatus("ready")}>Back to ready</Button>
                </div>

                <p className="mb-3 text-sm font-medium text-slate-700" aria-live="polite">
                    Showing {sorted.length} of {opportunities.length} opportunities
                </p>

                {statusView ?? content}
            </main>
        </div>
    )
}