import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import { FaTrashAlt } from "react-icons/fa";


const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const { get, del } = useAxios();

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await get("/api/wishlist/get");
                console.log(response)  
                setWishlist(response.wishlist || []);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        };
        fetchWishlist();
    }, [get]);

    const handleRemoveFromWishlist = async (productId) => {
        try {
            await del(`/api/wishlist/${productId}`);
            setWishlist(wishlist.filter((item) => item.product.id !== productId));
        } catch (error) {
            console.error("Error removing item from wishlist:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center mb-6">My Wishlist</h1>
            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item) => (
                        <div key={item.product.id} className="bg-white shadow-lg rounded-lg p-4 relative">
                            <button
                                onClick={() => handleRemoveFromWishlist(item.product.id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            >
                                <FaTrashAlt />
                            </button>
                            <h2 className="text-xl font-bold mb-2">{item.product.name}</h2>
                            <p className="text-gray-700 mb-4">Price: ${item.product.price}</p>
                            <Link
                                to={`/product/${item.product.id}`}
                                className="text-sunsetBlaze hover:underline"
                            >
                                View Product
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-20">
                    <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
                </div>
            )}
        </div>
    );
};

// Component for Cart



export default Wishlist