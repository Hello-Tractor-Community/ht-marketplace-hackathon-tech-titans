import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SellerProductTable = () => {
  const [products, setProducts] = useState([]); // Mock product data
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate()

  // Mock data for demonstration purposes
  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Tractor A",
        price: "$25,000",
        type: "tractor",
        availability: true,
      },
      {
        id: 2,
        name: "Spare Part A",
        price: "$500",
        type: "spare",
        availability: true,
      },
      {
        id: 3,
        name: "Tractor B",
        price: "$18,000",
        type: "tractor",
        availability: false,
      },
      {
        id: 4,
        name: "Harvester",
        price: "$45,000",
        type: "tractor",
        availability: true,
      },
      {
        id: 5,
        name: "Plow",
        price: "$3,000",
        type: "spare",
        availability: false,
      },
      {
        id: 6,
        name: "Tractor C",
        price: "$30,000",
        type: "tractor",
        availability: true,
      },
    ]);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleAction = (action, product) => {
    switch (action) {
      case "view":
        console.log("Viewing product:", product);
        break;
      case "edit":
        console.log("Editing product:", product);
        break;
      case "delete":
        console.log("Deleting product:", product);
        setProducts(products.filter((p) => p.id !== product.id));
        break;
      default:
        break;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>

      {/* Search Bar */}
      <div className="flex justify-between">
      <div className="mb-4 flex-grow mx-4">
        <input
          type="text"
          placeholder="Search by name or type..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 rounded-lg w-full"
        />
      </div>
        <div>
          <button
            onClick={()=>{navigate('/seller/product/add')}}
            className="w-full bg-sunsetBlaze text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 flex justify-center gap-1 items-center">
            <FaPlus />
            Add
           </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Type</th>
              <th className="py-2 px-4">Availability</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-100 transition duration-150"
                >
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">{product.price}</td>
                  <td className="py-2 px-4 capitalize">{product.type}</td>
                  <td className="py-2 px-4">
                    {product.availability ? "Available" : "Not Available"}
                  </td>
                  <td className="py-2 px-4">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setSelectedProduct(
                            selectedProduct === product.id ? null : product.id
                          )
                        }
                        className="text-gray-500 hover:text-gray-700"
                      >
                        •••
                      </button>
                      {selectedProduct === product.id && (
                        <div className="absolute z-10 bg-white border border-gray-300 rounded shadow-lg right-0 mt-2">
                          <button
                            onClick={() => handleAction("view", product)}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleAction("edit", product)}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleAction("delete", product)}
                            className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full text-left"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-4 text-gray-500 font-medium"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SellerProductTable;
