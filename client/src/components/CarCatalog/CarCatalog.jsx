import { useCars, useCarsSortAndFilter } from "../../api/carApi";
import { FaFilter, FaSort } from "react-icons/fa";
import Spinner from "../Spinner/Spinner";
import CarCatalogItem from "./CarCatalogItem/CarCatalogItem";
import { useEffect, useState } from "react";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";
import { FcClearFilters } from 'react-icons/fc';
import Pagination from "../Pagination/Pagination";
import { useSearchParams } from "react-router";

export default function Catalog() {
    const { cars, isLoading } = useCars();
    const { sortAndFilterCars, isLoading: isSortingAndFiltering } = useCarsSortAndFilter();
    const [searchParams, setSearchParams] = useSearchParams();

    const [displayCars, setDisplayCars] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);

    // Initialize filters from URL or empty values
    const [sortCriteria, setSortCriteria] = useState(searchParams.get("sort") || "");
    const [filters, setFilters] = useState({
        year: searchParams.get("year") || "",
        color: searchParams.get("color") || "",
        brand: searchParams.get("brand") || "",
        transmission: searchParams.get("transmission") || "",
        model: searchParams.get("model") || "",
        price: searchParams.get("price") || "",
    });

    const [pendingFilters, setPendingFilters] = useState(filters);
    const [pendingSort, setPendingSort] = useState(sortCriteria);

    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
    const carsPerPage = 12;

    useEffect(() => {
        const fetchCars = async () => {
            const sortedAndFilteredCars = await sortAndFilterCars(sortCriteria, filters);
            setDisplayCars(sortedAndFilteredCars);
        };
        fetchCars();
    }, [sortCriteria, filters, sortAndFilterCars]);

    const updateURLParams = (newFilters, newSort, newPage) => {
        const params = new URLSearchParams();

        if (newSort) params.set("sort", newSort);
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });
        if (newPage > 1) params.set("page", newPage);

        setSearchParams(params);
    };

    const handleApplyFilters = () => {
        setFilters(pendingFilters);
        updateURLParams(pendingFilters, sortCriteria, currentPage);
    };

    const handleApplySort = () => {
        setSortCriteria(pendingSort);
        updateURLParams(filters, pendingSort, currentPage);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        updateURLParams(filters, sortCriteria, page);
    };

    const handleRemoveFiltersClick = () => {
        setFilters({ year: "", color: "", brand: "", transmission: "", model: "", price: "" });
        setPendingFilters({ year: "", color: "", brand: "", transmission: "", model: "", price: "" });
        setSortCriteria("");
        setPendingSort("");
        setCurrentPage(1);
        setSearchParams({});
        setDisplayCars(cars);
    };

    const paginatedCars = displayCars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage);

    return (
        <section id="featured-cars" className="featured-cars">
            <div className="container">
                <div className="section-header">
                    <h2>Featured Cars</h2>
                </div>

                <FaFilter className="filter-icon"
                    onClick={() => setShowFilter((prev) => !prev)}
                    style={{ color: "#4e4ffa", cursor: "pointer", fontSize: "2rem" }}
                />

                <FaSort className="filter-icon"
                    onClick={() => setShowSort((prev) => !prev)}
                    style={{ color: "#4e4ffa", cursor: "pointer", fontSize: "2rem", marginLeft: "15px" }}
                />

                {Object.values(filters).some((val) => val) || sortCriteria ? (
                    <FcClearFilters className="filter-icon"
                        onClick={handleRemoveFiltersClick}
                        style={{ color: "#4e4ffa", cursor: "pointer", fontSize: "2rem", marginLeft: "15px" }}
                    />
                ) : null}

                {showFilter && (
                    <Filter onFilter={handleApplyFilters} filters={pendingFilters} setFilters={setPendingFilters} />

                )}

                {showSort && (
                    <Sort onSort={handleApplySort} sortCriteria={pendingSort} setSortCriteria={setPendingSort} />
                )}

                {isLoading || isSortingAndFiltering ? (
                    <Spinner />
                ) : (
                    <div className="car-catalog-container">
                        {paginatedCars.length > 0 ? (
                            paginatedCars.map(car => <CarCatalogItem key={car._id} {...car} />)
                        ) : (
                            <h3>No listings of cars yet</h3>
                        )}
                    </div>
                )}

                <Pagination currentPage={currentPage} totalPages={Math.ceil(displayCars.length / carsPerPage)} onPageChange={handlePageChange} />
            </div>
        </section>
    );
}
