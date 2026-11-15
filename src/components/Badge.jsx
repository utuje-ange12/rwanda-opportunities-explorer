export default function Badge({ children, color = "teal" }) {
    const colors = {
        teal: "bg-teal-50 text-teal-800 ring-teal-600/20",
        amber: "bg-amber-50 text-amber-800 ring-amber-600/30",
        green: "bg-emerald-50 text-emerald-800 ring-emerald-600/20",
        red: "bg-rose-50 text-rose-800 ring-rose-600/20",
    }
    return (
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${colors[color]}`}>
      {children}
    </span>
    )
}