import Badge from "./Badge"
import Button from "./Button"

export default function OpportunityCard({ opportunity, isSaved, onToggleSave }) {
    const { id, title, category, city, date, description, availableSeats, price, featured } = opportunity

    return (
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex flex-wrap gap-2">
                {featured && <Badge color="amber">Featured</Badge>}
                {price === 0 && <Badge color="green">Free</Badge>}
                {availableSeats === 0 && <Badge color="red">Fully booked</Badge>}
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-600">{category} · {city} · {date}</p>
            <p className="mt-2 text-sm text-slate-700">{description}</p>
            <p className="mt-2 text-sm">
                {availableSeats > 0 ? `${availableSeats} places left` : "No places left"}
            </p>
            <p className="text-sm">{price > 0 ? `${price} RWF` : "Free"}</p>
            <div className="mt-3">
                <Button variant="secondary" onClick={() => onToggleSave(id)}>
                    {isSaved ? "Unsave" : "Save"}
                </Button>
            </div>
        </article>
    )
}