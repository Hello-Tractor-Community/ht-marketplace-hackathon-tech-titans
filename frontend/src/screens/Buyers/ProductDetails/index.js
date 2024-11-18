import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetailsPage = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);

    // Fetch product details (replace with your API call)
    useEffect(() => {
        // Replace this with a real API call
        const fetchProductDetails = async () => {
            const mockProduct = {
                id,
                name: "Tractor Model X",
                price: 12000,
                description: "High-quality tractor with excellent performance.",
                images: [
                    "https://via.placeholder.com/600x400?text=Image+1",
                    "https://via.placeholder.com/600x400?text=Image+2",
                    "https://via.placeholder.com/600x400?text=Image+3",
                ],
                seller: {
                    name: "John Doe",
                    phone: "123-456-7890",
                    email: "seller@example.com",
                },
            };
            setProduct(mockProduct);
        };
        fetchProductDetails();
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
                {/* Product Images */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {product.images.map((image, index) => (
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
                <p className="text-gray-700 mb-6">{product.description}</p>
                <p className="text-lg font-semibold mb-4">Price: ${product.price}</p>

                {/* Seller Details */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold mb-2">Seller Details</h3>
                    <p>Name: {product.seller.name}</p>
                    <p>Phone: {product.seller.phone}</p>
                    <p>Email: {product.seller.email}</p>
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
