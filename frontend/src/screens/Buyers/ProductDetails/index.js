import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Importing back arrow icon
import useAxios from "../../../Hooks/useAxios";

const ProductDetailsPage = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const { get } = useAxios();
    const navigate = useNavigate(); // For navigation

    // Fetch product details
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await get(`/api/product/get-2/${id}`);
                setProduct(response.product[0]);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };
        fetchProductDetails();
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 relative">
            {/* Back Arrow */}
            <div className="absolute top-4 left-4">
                <button
                    onClick={() => navigate(-1)} 
                    className="flex items-center text-gray-700 hover:text-sunsetBlaze transition duration-300"
                >
                    <FaArrowLeft className="mr-2" /> Back
                </button>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">{product.name}</h2>

                {/* Product Images */}
                {/* <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {product?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>
        </div> */}

                {/* Product Details */}
                <div className="mb-6">
                    <p className="text-gray-700">{product.description}</p>
                    <p className="text-lg font-semibold mt-2">Price: ${product.price}</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Availability:{" "}
                        <span className={product.availability ? "text-green-500" : "text-red-500"}>
                            {product.availability ? "Available" : "Not Available"}
                        </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Location: {product.location.placeName}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Type: {product.typeProduct.charAt(0).toUpperCase() + product.typeProduct.slice(1)}
                    </p>
                </div>

                {/* Additional Information */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold mb-2">Specifications</h3>
                    <p>Brand: {product.brand || "N/A"}</p>
                    <p>Model Number: {product.modelNumber || "N/A"}</p>
                    <p>Year: {product.year || "N/A"}</p>
                    <p>Engine Type: {product.engineType || "N/A"}</p>
                    <p>Horsepower: {product.horsepower || "N/A"}</p>
                    <p>Fuel Capacity: {product.fuelCapacity || "N/A"} L</p>
                    <p>Transmission: {product.transmissionType || "N/A"}</p>
                    <p>Warranty: {product.warranty || "N/A"}</p>
                    <p>Weight: {product.weight || "N/A"} kg</p>
                    <p>
                        Dimensions:{" "}
                        {product.dimensions
                            ? `${product.dimensions.length} x ${product.dimensions.width} x ${product.dimensions.height} cm`
                            : "N/A"}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                    <button className="bg-sunsetBlaze text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
                        Chat with Seller
                    </button>
                    <Link
                        to="/listings"
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
                    >
                        Back to Listings
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
