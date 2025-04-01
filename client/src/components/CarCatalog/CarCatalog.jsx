import { useCars, useCarsSortAndFilter } from "../../api/carApi";
import { FaFilter, FaSort } from "react-icons/fa";
import Spinner from "../Spinner/Spinner";
import CarCatalogItem from "./CarCatalogItem/CarCatalogItem";
import { useEffect, useState } from "react";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";
import { FcClearFilters } from 'react-icons/fc'

export default function Catalog() {
    const { cars, isLoading } = useCars();
    const [displayCars, setDisplayCars] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [sortCriteria, setSortCriteria] = useState(""); // Holds sorting criteria
    const { sortAndFilterCars, isLoading: isSortingAndFiltering } = useCarsSortAndFilter(); // Using the sort hook
    // const { hasFilters, setHasFilters } = useState(false);
    const [filters, setFilters] = useState({
        year: "",
        color: "",
        brand: "",
        transmission: "",
        model: "",
        price: "",
        firstFilter: true,
    });
    useEffect(() => {
        if (!isLoading) {
            setDisplayCars(cars);
        }
    }, [cars, isLoading])

    const handleFilterClick = () => {
        setShowFilter((state) => !state);
    };
    const handleSortClick = () => {
        setShowSort((state) => !state);
    };
    const handleRemoveFiltersClick = async () => {
        setFilters({
            year: "",
            color: "",
            brand: "",
            transmission: "",
            model: "",
            price: "",
            firstFilter: true,
        });
        const sortedAndFilteredCars = await sortAndFilterCars({}, {}); // Fetch sorted cars
        setDisplayCars(sortedAndFilteredCars);
    };

    const handleFilter = async (newFilters) => {
        // setHasFilters(true);
        setFilters(newFilters); // Set the filters
        const sortedAndFilteredCars = await sortAndFilterCars(sortCriteria, newFilters); // Fetch sorted cars
        setDisplayCars(sortedAndFilteredCars);
    };
    const handleSort = async (criteria) => {
        setSortCriteria(criteria); // Set the selected sort criteria
        const sortedAndFilteredCars = await sortAndFilterCars(criteria, filters); // Fetch sorted cars
        setDisplayCars(sortedAndFilteredCars);
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

                    <FaSort className="filter-icon"
                        onClick={handleSortClick}
                        style={{ color: "#4e4ffa", cursor: "pointer", fontSize: "2rem", marginLeft: "15px" }}
                    />
                    {!filters.firstFilter &&
                        <FcClearFilters className="filter-icon"
                            onClick={handleRemoveFiltersClick}
                            style={{ color: "#4e4ffa", cursor: "pointer", fontSize: "2rem", marginLeft: "15px" }}
                        />
                    }


                    {showFilter && <Filter onFilter={handleFilter} prevFilters={filters} />}
                    {showSort && <Sort onSort={handleSort} prevSortValue={sortCriteria} />}

                    {isLoading || isSortingAndFiltering || isSortingAndFiltering ? (
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