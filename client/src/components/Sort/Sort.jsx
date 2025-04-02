import './Sort.css';

export default function Sort({ 
    onSort,
    sortCriteria,
    setSortCriteria
}) {

    const handleInputChange = (e) => {
        setSortCriteria(e.target.value);
    };

    const handleSortClick = () => {
        onSort(sortCriteria); // Call the parent function with the sort value
    };

    return (
        <div className="sort-container">
            <select
                type="text"
                className="sort-input"
                placeholder="Enter sort criteria"
                value={sortCriteria}
                onChange={handleInputChange}
            >
                <option value="">Select sort criteria</option>
                <option value="newest">Newest</option>
                <option value="abc-asc">A-Z</option>
                <option value="zyx-desc">Z-A</option>
                <option value="price-asc">Price - asc</option>
                <option value="price-desc">Price - desc</option>
            </select>

            <button className="sort-button" onClick={handleSortClick}>
                Sort
            </button>
        </div>
    );
}
