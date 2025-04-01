import "./Search.css";

export default function Search() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="model-search-content">
                        <div className="row">
                            {/* Year & Type */}
                            <div className="col-md-offset-1 col-md-2 col-sm-12">
                                <div className="single-model-search">
                                    <h2>Year</h2>
                                    <div className="model-select-icon">
                                        <input className="form-control" placeholder="e.g. 2023" />
                                    </div>
                                </div>
                                <div className="single-model-search">
                                    <h2>Color</h2>
                                    <div className="model-select-icon">
                                        <input className="form-control" placeholder="e.g. Red" />
                                    </div>
                                </div>
                            </div>

                            {/* Brand & Transmission */}
                            <div className="col-md-offset-1 col-md-2 col-sm-12">
                                <div className="single-model-search">
                                    <h2>Brand</h2>
                                    <div className="model-select-icon">
                                        <input className="form-control" placeholder="e.g. Ferrari" />
                                    </div>
                                </div>
                                <div className="single-model-search">
                                    <h2>Transmission</h2>
                                    <div className="model-select-icon">
                                        <input className="form-control" placeholder="e.g. Automatic" />
                                    </div>
                                </div>
                            </div>

                            {/* Model & Price */}
                            <div className="col-md-offset-1 col-md-2 col-sm-12">
                                <div className="single-model-search">
                                    <h2>Model</h2>
                                    <div className="model-select-icon">
                                        <input className="form-control" placeholder="e.g. SF90 Stradale" />
                                    </div>
                                </div>
                                <div className="single-model-search">
                                    <h2>Max Price ($)</h2>
                                    <div className="model-select-icon">
                                        <input className="form-control" placeholder="e.g. 500000" />
                                    </div>
                                </div>
                            </div>

                            {/* Color */}
                            <div className="col-md-2 col-sm-12">
                                <div className="single-model-search text-center">
                                    <button className="welcome-btn model-search-btn">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
