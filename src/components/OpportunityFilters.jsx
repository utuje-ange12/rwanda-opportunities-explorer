import Button from "./Button"

export default function OpportunityFilters({
                                               search, onSearchChange,
                                               category, onCategoryChange, categories,
                                               sortBy, onSortChange,
                                               availableOnly, onAvailableOnlyChange,
                                               savedOnly, onSavedOnlyChange,
                                               onReset,
                                           }) {
    const inputStyle =
        "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"

    return (
        <section aria-label="Search and filters" className="mb-4 rounded-lg border border-slate-200 bg-white p-4">
            <div className="grid gap-4 sm:grid-cols-3">
                <div>
                    <label htmlFor="search" className="mb-1 block text-sm font-medium text-slate-700">
                        Search title or city
                    </label>
                    <input
                        id="search"
                        type="text"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="e.g. kigali"
                        className={inputStyle}
                    />
                </div>

                <div>
                    <label htmlFor="category" className="mb-1 block text-sm font-medium text-slate-700">
                        Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className={inputStyle}
                    >
                        <option value="All">All categories</option>
                        {categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="sort" className="mb-1 block text-sm font-medium text-slate-700">
                        Sort by
                    </label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className={inputStyle}
                    >
                        <option value="date">Earliest date</option>
                        <option value="title">Title A to Z</option>
                        <option value="seats">Most available places</option>
                    </select>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                        type="checkbox"
                        checked={availableOnly}
                        onChange={(e) => onAvailableOnlyChange(e.target.checked)}
                        className="h-4 w-4 accent-teal-700"
                    />
                    Available only
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                        type="checkbox"
                        checked={savedOnly}
                        onChange={(e) => onSavedOnlyChange(e.target.checked)}
                        className="h-4 w-4 accent-teal-700"
                    />
                    Saved only
                </label>
                <Button variant="secondary" onClick={onReset}>Reset filters</Button>
            </div>
        </section>
    )
}