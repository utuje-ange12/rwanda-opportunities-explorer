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

// Precomputed JSX variable: empty results