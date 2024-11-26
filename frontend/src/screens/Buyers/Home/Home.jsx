import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchAndFilter from "../../../components/SearchAndFilter";
import useAxios from "../../../Hooks/useAxios";
import notfound from "../../../assets/no-data-found.svg"
import LoadingSpinner from "../../../components/LoadingSpinner";

const baseURL = "https://ht-marketplace-hackathon-tech-titans.onrender.com";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    priceRange: "",
    location: "",
  });
  const { get } = useAxios();
    const [loading, setLoading] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true)
      const response = await get("/api/product/get-2");

      if (response.message === "Session ID generated successfully.") {
        localStorage.setItem("session_id", response.sessionId)
      }

      setProducts(response.products || []);
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilters({
      type: "",
      priceRange: "",
      location: "",
    });
  };

  const filteredProducts = products.filter((product) => {
  const lowerSearchTerm = searchTerm.toLowerCase().trim();

  // Check if the search term matches any relevant field
  const matchesSearchTerm =
    !searchTerm ||
    product.name.toLowerCase().includes(lowerSearchTerm) ||
    product.location.placeName.toLowerCase().includes(lowerSearchTerm) ||
    product.description.toLowerCase().includes(lowerSearchTerm);

  const matchesType = !filters.type || product.type === filters.type;
  const matchesPriceRange =
    !filters.priceRange ||
    (filters.priceRange === "low" && product.price <= 10000) ||
    (filters.priceRange === "medium" &&
      product.price > 10000 &&
      product.price <= 30000) ||
    (filters.priceRange === "high" && product.price > 30000);

  const matchesLocation =
    !filters.location ||
    product.location.placeName
      ?.toLowerCase()
      .includes(filters.location.toLowerCase().trim());

  return matchesSearchTerm && matchesType && matchesPriceRange && matchesLocation;
});



  return loading ? (
        <LoadingSpinner message="Fetching data, please wait..." />
    ) : (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Top Products</h1>

      {/* Search and Filters */}
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Conditional Rendering */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={`${baseURL}${product?.images[0]}` || "https://via.placeholder.com/50"}
                alt={product.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-4"><span className="font-bold">Location:</span> {product.location.placeName}</p>
                <p className="text-gray-600 text-sm mb-4"><span className="font-bold">Brand:</span> {product.brand}</p>
                <p className="text-lg font-bold text-sunsetBlaze mb-4">
                  KSH {product.price.toLocaleString()}
                </p>
                <Link
                  to={`/product/${product._id}`}
                  className="mt-4 inline-block bg-sunsetBlaze text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <img
            src={notfound} 
            alt="No data found"
            className="w-64 h-64 mb-4"
          />
          <p className="text-xl text-gray-500">No products found. Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;