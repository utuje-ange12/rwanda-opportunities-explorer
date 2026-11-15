import { useState } from "react"
import OpportunityList from "./components/OpportunityList"
import { seedOpportunities } from "./data/seedOpportunities"

export default function App() {
    const [opportunities] = useState(seedOpportunities)
    const [savedIds, setSavedIds] = useState([])

    function toggleSave(id) {
        setSavedIds(
            savedIds.includes(id)
                ? savedIds.filter((savedId) => savedId !== id)
                : [...savedIds, id]
        )
    }

    return (
        <main className="mx-auto max-w-5xl p-4">
            <h1 className="mb-1 text-2xl font-bold text-teal-700">Rwanda Opportunities Explorer</h1>
            <p className="mb-4 text-sm text-slate-600">
                All listings are sample content. Saved: {savedIds.length}
            </p>
            <OpportunityList
                opportunities={opportunities}
                savedIds={savedIds}
                onToggleSave={toggleSave}
            />
        </main>
    )
}