import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchAndFilter from "../../../components/SearchAndFilter";

const HomePage = () => {
  const products = [
    {
      id: 1,
      name: "Tractor A",
      price: 25000,
      location: "Nairobi",
      usageHours: 1200,
      type: "tractor",
      image: "https://i.pinimg.com/736x/30/2b/a4/302ba4b5be97439b1d1167ee4a97a7c5.jpg",
      description: "A high-quality second-hand tractor.",
    },
    {
      id: 2,
      name: "Tractor B",
      price: 18000,
      location: "Mombasa",
      usageHours: 800,
      type: "tractor",
      image: "https://i.pinimg.com/736x/28/28/2c/28282c31b5bfb11a96517fa6d21f4338.jpg",
      description: "Reliable and affordable tractor for farming.",
    },
    {
      id: 3,
      name: "Plow",
      price: 3000,
      location: "Nairobi",
      usageHours: 200,
      type: "spare",
      image: "https://i.pinimg.com/736x/e2/f7/f7/e2f7f742a4a7c318d909e0f287d9fcf5.jpg",
      description: "Durable plow for your agricultural needs.",
    },
    {
      id: 4,
      name: "Harvester",
      price: 45000,
      location: "Kisumu",
      usageHours: 400,
      type: "tractor",
      image: "https://i.pinimg.com/736x/14/27/4a/14274a8ef98789f8540a39c3dfebf268.jpg",
      description: "Efficient harvester for large-scale farming.",
    },
  ];

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    priceRange: "",
    location: "",
  });

  // Handle search change
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filtered products
  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm =
      product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      !filters.type || product.type === filters.type;
    const matchesPriceRange =
      !filters.priceRange ||
      (filters.priceRange === "low" && product.price <= 10000) ||
      (filters.priceRange === "medium" &&
        product.price > 10000 &&
        product.price <= 30000) ||
      (filters.priceRange === "high" && product.price > 30000);
    const matchesLocation =
      !filters.location || product.location === filters.location;

    return matchesSearchTerm && matchesType && matchesPriceRange && matchesLocation;
  });

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilters({
      type: "",
      priceRange: "",
      location: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Available Products</h1>

      {/* Search and Filters */}
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-300 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              <p className="text-lg font-bold text-sunsetBlaze mb-4">
                ${product.price.toLocaleString()}
              </p>
              <Link
                to={`/product/${product.id}`} // Navigate to the Product Details page
                className="mt-4 inline-block bg-sunsetBlaze text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
