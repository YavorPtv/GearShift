import { useCars, useCarsSortAndFilter } from "../../api/carApi";
import { FaFilter, FaSort } from "react-icons/fa";
import Spinner from "../Spinner/Spinner";
import CarCatalogItem from "./CarCatalogItem/CarCatalogItem";
import { useEffect, useState } from "react";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";
import { FcClearFilters } from 'react-icons/fc'
import Pagination from "../Pagination/Pagination";

export default function Catalog() {
    const { cars, isLoading } = useCars();
    const [displayCars, setDisplayCars] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [sortCriteria, setSortCriteria] = useState(""); // Holds sorting criteria
    const [hasFilteredOrSorted, setHasFilteredOrSorted] = useState(false);
    const { sortAndFilterCars, isLoading: isSortingAndFiltering } = useCarsSortAndFilter(); // Using the sort hook
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 12;
    const totalPages = Math.ceil(displayCars.length / carsPerPage);

    const [filters, setFilters] = useState({
        year: "",
        color: "",
        brand: "",
        transmission: "",
        model: "",
        price: "",
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
        setHasFilteredOrSorted(false);
        setFilters({
            year: "",
            color: "",
            brand: "",
            transmission: "",
            model: "",
            price: "",
        });
        setSortCriteria("");
        const sortedAndFilteredCars = cars; // Fetch sorted cars
        setDisplayCars(sortedAndFilteredCars);
    };

    const handleFilter = async (newFilters) => {
        setHasFilteredOrSorted(true);
        setFilters(newFilters); // Set the filters
        const sortedAndFilteredCars = await sortAndFilterCars(sortCriteria, newFilters); // Fetch sorted cars
        setDisplayCars(sortedAndFilteredCars);
    };
    const handleSort = async (criteria) => {
        setHasFilteredOrSorted(true);
        setSortCriteria(criteria); // Set the selected sort criteria
        const sortedAndFilteredCars = await sortAndFilterCars(criteria, filters); // Fetch sorted cars
        setDisplayCars(sortedAndFilteredCars);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const paginatedCars = displayCars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage);

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
                    {hasFilteredOrSorted &&
                        <FcClearFilters className="filter-icon"
                            onClick={handleRemoveFiltersClick}
                            style={{ color: "#4e4ffa", cursor: "pointer", fontSize: "2rem", marginLeft: "15px" }}
                        />
                    }


                    {showFilter && <Filter onFilter={handleFilter} filters={filters} setFilters={setFilters} />}
                    {showSort && <Sort onSort={handleSort} sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} />}

                    {isLoading || isSortingAndFiltering || isSortingAndFiltering ? (
                        <Spinner />
                    ) : (
                        <div className="car-catalog-container">
                            {paginatedCars.length > 0
                                ? paginatedCars.map(car => (
                                    <CarCatalogItem
                                        key={car._id}
                                        {...car}
                                    />
                                ))
                                : <h3>No listings of cars yet</h3>
                            }
                        </div>
                    )}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </section>
        </>
    );
}