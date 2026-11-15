import { useState } from "react"
import Button from "./Button"

const emptyForm = {
    title: "",
    category: "",
    city: "",
    date: "",
    capacity: "",
    price: "",
    description: "",
    featured: false,
}

const inputStyle =
    "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"

// Defined OUTSIDE the form so inputs keep focus while typing
function Field({ id, label, error, children }) {
    return (
        <div>
            <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
                {label}
            </label>
            {children}
            {error && (
                <p className="mt-1 text-sm text-rose-700" role="alert">
                    {error}
                </p>
            )}
        </div>
    )
}

export default function AddOpportunityForm({ categories, onAdd }) {
    const [form, setForm] = useState(emptyForm)
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState(false)

    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setForm({ ...form, [name]: type === "checkbox" ? checked : value })
        setSuccess(false)
    }

    function validate() {
        const found = {}
        if (form.title.trim() === "") found.title = "Title is required."
        if (form.category.trim() === "") found.category = "Category is required."
        if (form.city.trim() === "") found.city = "City is required."
        if (form.date === "" || Number.isNaN(new Date(form.date).getTime())) {
            found.date = "Please enter a valid date."
        }
        if (
            form.capacity === "" ||
            Number(form.capacity) < 0 ||
            !Number.isInteger(Number(form.capacity))
        ) {
            found.capacity = "Capacity must be a whole number, 0 or more."
        }
        if (form.price === "" || Number(form.price) < 0) {
            found.price = "Price must be 0 or more."
        }
        return found
    }

    function handleSubmit(e) {
        e.preventDefault() // stops the page from reloading
        const found = validate()
        setErrors(found)
        if (Object.keys(found).length > 0) return

        onAdd({
            title: form.title.trim(),
            category: form.category.trim(),
            city: form.city.trim(),
            date: form.date,
            description: form.description.trim() || "No description provided.",
            capacity: Number(form.capacity),
            availableSeats: Number(form.capacity),
            price: Number(form.price),
            featured: form.featured,
        })
        setForm(emptyForm)
        setErrors({})
        setSuccess(true)
    }

    function handleClear() {
        setForm(emptyForm)
        setErrors({})
        setSuccess(false)
    }

    return (
        <section
            aria-labelledby="add-heading"
            className="mb-6 rounded-lg border border-slate-200 bg-white p-4"
        >
            <h2 id="add-heading" className="mb-3 text-lg font-bold text-slate-900">
                Add an opportunity
            </h2>

            {success && (
                <p className="mb-3 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800" role="status">
                    Opportunity added. You can see it in the list below.
                </p>
            )}

            <form onSubmit={handleSubmit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Field id="title" label="Title" error={errors.title}>
                        <input id="title" name="title" type="text" value={form.title} onChange={handleChange} className={inputStyle} />
                    </Field>

                    <Field id="category" label="Category" error={errors.category}>
                        <input id="category" name="category" type="text" list="category-options" value={form.category} onChange={handleChange} className={inputStyle} />
                        <datalist id="category-options">
                            {categories.map((c) => (
                                <option key={c} value={c} />
                            ))}
                        </datalist>
                    </Field>

                    <Field id="city" label="City" error={errors.city}>
                        <input id="city" name="city" type="text" value={form.city} onChange={handleChange} className={inputStyle} />
                    </Field>

                    <Field id="date" label="Date" error={errors.date}>
                        <input id="date" name="date" type="date" value={form.date} onChange={handleChange} className={inputStyle} />
                    </Field>

                    <Field id="capacity" label="Capacity (places)" error={errors.capacity}>
                        <input id="capacity" name="capacity" type="number" min="0" value={form.capacity} onChange={handleChange} className={inputStyle} />
                    </Field>

                    <Field id="price" label="Price (RWF, 0 for free)" error={errors.price}>
                        <input id="price" name="price" type="number" min="0" value={form.price} onChange={handleChange} className={inputStyle} />
                    </Field>
                </div>

                <div className="mt-4">
                    <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">
                        Description (optional)
                    </label>
                    <textarea id="description" name="description" rows="2" value={form.description} onChange={handleChange} className={inputStyle} />
                </div>

                <label className="mt-3 flex items-center gap-2 text-sm text-slate-700">
                    <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="h-4 w-4 accent-teal-700" />
                    Mark as featured
                </label>

                <div className="mt-4 flex gap-3">
                    <Button type="submit">Add opportunity</Button>
                    <Button variant="secondary" onClick={handleClear}>
                        Clear form
                    </Button>
                </div>
            </form>
        </section>
    )
}