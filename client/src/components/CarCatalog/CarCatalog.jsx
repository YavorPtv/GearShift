import { useCars } from "../../api/carApi";
import { FaFilter } from "react-icons/fa";
import Spinner from "../Spinner/Spinner";
import CarCatalogItem from "./CarCatalogItem/CarCatalogItem";
import { useState } from "react";
import Search from "../Search/Search";

export default function Catalog() {
    const { cars, isLoading } = useCars();
    const [showSearch, setShowSearch] = useState(false);

    const handleFilterClick = () => {
        setShowSearch((state) => !state);
    };

    return (
        <>
            <section id="featured-cars" className="featured-cars">
                <div className="container">
                    <div className="section-header">
                        <h2>Featured Cars</h2>
                    </div>

                    <div
                        className="filter-icon"
                        onClick={handleFilterClick}
                        style={{ color: "#4e4ffa", cursor: "pointer", fontSize: "2rem" }}
                    >
                        <FaFilter />
                    </div>

                    {showSearch && <Search />}

                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <div className="car-catalog-container">
                            {cars.length > 0
                                ? cars.map(car => (
                                    <CarCatalogItem
                                        key={car._id}
                                        {...car}
                                    />
                                ))
                                : <h3>No listings of cars yet</h3>
                            }
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}