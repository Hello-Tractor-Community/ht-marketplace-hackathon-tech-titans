import React from "react";

const SearchAndFilter = ({
    searchTerm,
    onSearchChange,
    filters,
    onFilterChange,
    onClearFilters,
    maxPrice,
    onMaxPriceChange,
}) => {
    return (
        <div className="mb-8 flex flex-wrap gap-4 items-center">
            {/* Search Bar */}
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by name, make, or model"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sunsetBlaze"
            />

            {/* Type Filter */}
            <select
                name="type"
                value={filters.type}
                onChange={(e) => onFilterChange(e)}
                className="px-4 py-2 border rounded-lg"
            >
                <option value="">All Products</option>
                <option value="tractor">Tractors</option>
                <option value="spare">Spare Parts</option>
            </select>

            {/* Price Range Filter */}
            <input
                type="number"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                placeholder="Enter maximum price"
                className="px-4 py-2 border rounded-lg"
            />

            

            {/* Clear Filters Button */}
            <button
                onClick={onClearFilters}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition duration-300"
            >
                Clear Filters
            </button>
        </div>
    );
};

export default SearchAndFilter;
