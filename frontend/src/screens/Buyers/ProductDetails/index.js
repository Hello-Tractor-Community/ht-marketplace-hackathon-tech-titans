import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaShoppingCart } from "react-icons/fa"; // Importing icons
import useAxios from "../../../Hooks/useAxios";
import { toast } from "react-toastify";

const ProductDetailsPage = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const { get, post } = useAxios();
    const [quantity, setQuantity] = useState(1);
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

    const handleAddToWishlist = async () => {
        try {
            const response = await post("/api/wishlist/create", { productId: id });
            if (response.success) {
                toast.success("Item added to wishlist successfully.");
            } else {
                toast.error(response.message || "Item already in wishlist.");
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            toast.error("Failed to add item to wishlist.");
        }
    };

    const handleAddToCart = async() => {
        try {
            const response = await post("/api/cart/create", {
                productId: id,
                quantity,
            });
            toast.success("Item added to cart successfully.");
            console.log(response); // Log response for debugging
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add item to cart.");
        }
    };

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

            <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto relative">
                {/* Icons for Wishlist and Cart */}
                <div className="absolute top-4 right-4 flex space-x-4">
                    <button
                        onClick={handleAddToWishlist}
                        className="text-gray-700 hover:text-sunsetBlaze transition duration-300"
                    >
                        <FaHeart size={24} />
                    </button>
                    <button
                        onClick={handleAddToCart}
                        className="text-gray-700 hover:text-blue-500 transition duration-300"
                    >
                        <FaShoppingCart size={24} />
                    </button>
                </div>

                <h2 className="text-2xl font-bold mb-4 text-center">{product.name}</h2>

                {/* Product Images */}
                <div className="mb-6">
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
                </div>

                {/* Product Details */}
                <div className="mb-6">
                    <p className="text-gray-700 text-center">{product.description}</p>
                    <p className="text-lg font-semibold mt-2 text-center">Price: ${product.price}</p>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                        Availability:{" "}
                        <span className={product.availability ? "text-green-500" : "text-red-500"}>
                            {product.availability ? "Available" : "Not Available"}
                        </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                        Location: {product.location.placeName}
                    </p>
                    <p className="text-sm text-gray-500 mt-2 text-center">
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

                <div className="mb-6 text-center">
                    <label className="font-semibold mr-2">Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        min="1"
                        className="border p-2 rounded w-20 text-center"
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-center space-x-4">
                    <button
                        className="bg-sunsetBlaze text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                        onClick={() => alert("Chat functionality coming soon.")}
                    >
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
