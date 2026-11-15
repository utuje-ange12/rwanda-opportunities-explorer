export default function Badge({ children, color = "teal" }) {
    const colors = {
        teal: "bg-teal-100 text-teal-800",
        amber: "bg-amber-100 text-amber-800",
        green: "bg-green-100 text-green-800",
        red: "bg-red-100 text-red-800",
    }
    return (
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
    )
}