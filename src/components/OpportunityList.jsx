import OpportunityCard from "./OpportunityCard"

export default function OpportunityList({ opportunities, savedIds, onToggleSave }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((item) => (
                <OpportunityCard
                    key={item.id}
                    opportunity={item}
                    isSaved={savedIds.includes(item.id)}
                    onToggleSave={onToggleSave}
                />
            ))}
        </div>
    )
}