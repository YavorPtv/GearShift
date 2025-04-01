import { useCars, useCarsFilter } from "../../api/carApi";
import { FaFilter } from "react-icons/fa";
import Spinner from "../Spinner/Spinner";
import CarCatalogItem from "./CarCatalogItem/CarCatalogItem";
import { useEffect, useState } from "react";
import Search from "../Search/Search";

export default function Catalog() {
    const { cars, isLoading } = useCars();
    const [displayCars, setDisplayCars] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const { filterCars, isLoading: isLoadingFilterCars } = useCarsFilter();

    useEffect(() => {
        if (!isLoading) {
            setDisplayCars(cars);
        }
    }, [cars, isLoading])

    const handleFilterClick = () => {
        setShowSearch((state) => !state);
    };

    const handleSearch = async (filters) => {
        const filteredCars = await filterCars(filters);
        setDisplayCars(filteredCars);
    };

    return (
        <>
            <section id="featured-cars" className="featured-cars">
                <div className="container">
                    <div className="section-header">
                        <h2>Featured Cars</h2>
                    </div>

                    <FaFilter className="filter-icon"
                        onClick={handleFilterClick}
                        style={{ color: "#4e4ffa", cursor: "pointer", fontSize: "2rem" }} 
                    />


                    {showSearch && <Search onSearch={handleSearch} />}

                    {isLoading || isLoadingFilterCars ? (
                        <Spinner />
                    ) : (
                        <div className="car-catalog-container">
                            {displayCars.length > 0
                                ? displayCars.map(car => (
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