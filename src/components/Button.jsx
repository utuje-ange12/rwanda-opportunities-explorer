export default function Button({ children, onClick, type = "button", variant = "primary", ...rest }) {
    const styles = {
        primary: "bg-teal-700 text-white shadow-sm hover:bg-teal-800",
        secondary: "border border-teal-700 bg-white text-teal-700 hover:bg-teal-50",
        saved: "border border-teal-700 bg-teal-700 text-white hover:bg-teal-800",
    }
    return (
        <button
            type={type}
            onClick={onClick}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${styles[variant]}`}
            {...rest}
        >
            {children}
        </button>
    )
}