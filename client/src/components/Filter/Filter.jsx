import "./Filter.css";

export default function Filter({
    onFilter,
    filters,
    setFilters
}) {

    const handleChange = (e) => {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const submitAction = async (formData) => {
        onFilter(Object.fromEntries(formData)); 
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="model-search-content">
                        <form action={submitAction} className="row">
                            <div className="col-md-offset-1 col-md-2 col-sm-12">
                                <div className="single-model-search">
                                    <h2>Year</h2>
                                    <div className="model-select-icon">
                                        <input className="form-control" placeholder="e.g. 2023" name="year" value={filters.year} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="single-model-search">
                                    <h2>Color</h2>
                                    <div className="model-select-icon">
                                        <input className="form-control" placeholder="e.g. Red" name="color" value={filters.color} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-offset-1 col-md-2 col-sm-12">
                                <div className="single-model-search">
                                    <h2>Brand</h2>
                                    <div className="model-select-icon">
                                        <input className="form-control" placeholder="e.g. Ferrari" name="brand" value={filters.brand} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="single-model-search">
                                    <h2>Transmission</h2>
                                    <div className="model-select-icon">
                                        <input className="form-control" placeholder="e.g. Automatic" name="transmission" value={filters.transmission} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-offset-1 col-md-2 col-sm-12">
                                <div className="single-model-search">
                                    <h2>Model</h2>
                                    <div className="model-select-icon">
                                        <input className="form-control" placeholder="e.g. SF90 Stradale" name="model" value={filters.model} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="single-model-search">
                                    <h2>Max Price ($)</h2>
                                    <div className="model-select-icon">
                                        <input className="form-control" placeholder="e.g. 500000" name="price" value={filters.price} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-2 col-sm-12">
                                <div className="single-model-search text-center">
                                    <button className="welcome-btn model-search-btn">Filter</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
