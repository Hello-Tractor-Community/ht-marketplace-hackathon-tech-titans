import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import { FaTrashAlt } from "react-icons/fa";
import LoadingSpinner from "../../../components/LoadingSpinner";

const baseURL = "https://ht-marketplace-hackathon-tech-titans.onrender.com";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const { get, del } = useAxios();

    useEffect(() => {
        const fetchWishlist = async () => {
            setLoading(true);
            try {
                const response = await get("/api/wishlist/get");
                // console.log(response.wishlist.items);
                setWishlist(response.wishlist.items || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
                setLoading(false);
            }
        };
        fetchWishlist();
    }, [get]);

    const handleRemoveFromWishlist = async (productId) => {
        try {
            await del(`/api/wishlist/${productId}`);
            setWishlist(wishlist.filter((item) => item.productId._id !== productId));
        } catch (error) {
            console.error("Error removing item from wishlist:", error);
        }
    };

    return loading ? (
        <LoadingSpinner message="Fetching data, please wait..." />
    ) : (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center mb-6">My Wishlist</h1>
            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlist.map((item) => {
                        const product = item?.productId;
                        const imageUrl = product?.images?.[0]
                            ? `${baseURL}${product.images[0]}`
                            : "https://via.placeholder.com/150";
                        return (
                            <div
                                key={item._id}
                                className="border border-gray-300 rounded-lg shadow-lg overflow-hidden"
                            >
                                <img
                                    src={imageUrl}
                                    alt={product?.name || "Product Image"}
                                    className="h-40 w-full object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-2">
                                        {product?.name || "Unnamed Product"}
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-4">
                                        <span className="font-bold">Location:</span>{" "}
                                        {product?.location?.placeName || "Not specified"}
                                    </p>
                                    <p className="text-gray-600 text-sm mb-4">
                                        <span className="font-bold">Brand:</span>{" "}
                                        {product?.brand || "Unknown"}
                                    </p>
                                    <p className="text-lg font-bold text-sunsetBlaze mb-4">
                                        KSH {product?.price?.toLocaleString() || "0"}
                                    </p>
                                    <Link
                                        to={`/product/${product?._id}`}
                                        className="mt-4 inline-block bg-sunsetBlaze text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                                    >
                                        View Details
                                    </Link>
                                    {/* <button
                                        onClick={() => handleRemoveFromWishlist(product._id)}
                                        className="mt-4 inline-block bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition duration-300 ml-2"
                                    >
                                        <FaTrashAlt />
                                    </button> */}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center mt-20">
                    <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
