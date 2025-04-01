import { useState } from 'react';
import './Sort.css';

export default function Sort({ 
    onSort,
    prevSortValue
}) {
    const [sortValue, setSortValue] = useState(prevSortValue);

    const handleInputChange = (e) => {
        setSortValue(e.target.value);
    };

    const handleSortClick = () => {
        onSort(sortValue); // Call the parent function with the sort value
    };

    return (
        <div className="sort-container">
            <select
                type="text"
                className="sort-input"
                placeholder="Enter sort criteria"
                value={sortValue}
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
