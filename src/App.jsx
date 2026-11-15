import { useState } from "react"
import OpportunityCard from "./components/OpportunityCard"
import { seedOpportunities } from "./data/seedOpportunities"

export default function App() {
    const [savedIds, setSavedIds] = useState([])

    function toggleSave(id) {
        setSavedIds(savedIds.includes(id)
            ? savedIds.filter((savedId) => savedId !== id)
            : [...savedIds, id])
    }

    return (
        <main className="mx-auto max-w-5xl p-4">
            <h1 className="mb-4 text-2xl font-bold text-teal-700">Rwanda Opportunities Explorer</h1>
            <div className="grid gap-4 sm:grid-cols-3">
                {seedOpportunities.slice(0, 3).map((item) => (
                    <OpportunityCard
                        key={item.id}
                        opportunity={item}
                        isSaved={savedIds.includes(item.id)}
                        onToggleSave={toggleSave}
                    />
                ))}
            </div>
        </main>
    )
}