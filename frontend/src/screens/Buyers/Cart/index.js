import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import { FaTrashAlt } from "react-icons/fa";

const baseURL = "http://localhost:5500";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const { get, del } = useAxios();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await get("/api/cart/get");
                // console.log(response.cartItems);
                setCart(response.cartItems || []);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };
        fetchCart();
    }, [get]);

    const handleRemoveFromCart = async (productId) => {
        try {
            await del(`/api/cart/${productId}`);
            setCart(cart.filter((item) => item.product.id !== productId));
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center mb-6">My Cart</h1>
            {cart.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {cart.map((item) => {
                        const product = item?.product;
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
                                        <span className="font-bold">Type:</span>{" "}
                                        {product?.type || "Not specified"}
                                    </p>
                                    <p className="text-gray-600 text-sm mb-4">
                                        <span className="font-bold">Price:</span>{" "}
                                        KSH {product?.price?.toLocaleString() || "0"}
                                    </p>
                                    <p className="text-gray-600 text-sm mb-4">
                                        <span className="font-bold">Quantity:</span> {item.quantity}
                                    </p>
                                    <p className="text-gray-600 text-sm mb-4">
                                        <span className="font-bold">Total:</span> KSH{" "}
                                        {item.totalPrice?.toLocaleString() || "0"}
                                    </p>
                                    <Link
                                        to={`/product/${product?.id}`}
                                        className="mt-4 inline-block bg-sunsetBlaze text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => handleRemoveFromCart(product.id)}
                                        className="mt-4 inline-block bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition duration-300 ml-2"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center mt-20">
                    <p className="text-gray-500 text-lg">Your cart is empty.</p>
                </div>
            )}
        </div>
    );
};

export default Cart;
