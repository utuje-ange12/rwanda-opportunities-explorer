import Badge from "./Badge"
import Button from "./Button"

// Lookup object: each category gets its own accent stripe
const categoryAccent = {
    "Workshop": "border-t-teal-600",
    "Career event": "border-t-sky-600",
    "Community activity": "border-t-emerald-600",
    "Short course": "border-t-amber-500",
}

export default function OpportunityCard({ opportunity, isSaved, onToggleSave }) {
    const { id, title, category, city, date, description, availableSeats, price, featured } = opportunity
    const accent = categoryAccent[category] || "border-t-slate-400"

    return (
        <article className={`flex flex-col rounded-xl border border-slate-200 border-t-4 ${accent} bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}>
            <div className="mb-3 flex min-h-6 flex-wrap gap-2">
                {featured && <Badge color="amber">Featured</Badge>}
                {price === 0 && <Badge color="green">Free</Badge>}
                {availableSeats === 0 && <Badge color="red">Fully booked</Badge>}
            </div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm font-medium text-teal-700">{category}</p>
            <p className="text-sm text-slate-500">{city} · {date}</p>
            <p className="mt-3 flex-1 text-sm text-slate-700">{description}</p>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
        <span className={availableSeats > 0 ? "font-medium text-slate-700" : "font-medium text-rose-700"}>
          {availableSeats > 0 ? `${availableSeats} places left` : "No places left"}
        </span>
                <span className="font-bold text-slate-900">
          {price > 0 ? `${price.toLocaleString()} RWF` : "Free"}
        </span>
            </div>

            <div className="mt-3">
                <Button variant={isSaved ? "saved" : "secondary"} onClick={() => onToggleSave(id)}>
                    {isSaved ? "Unsave" : "Save"}
                </Button>
            </div>
        </article>
    )
}