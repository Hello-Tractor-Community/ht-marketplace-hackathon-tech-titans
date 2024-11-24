import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../../Hooks/useAxios";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const { get, del } = useAxios();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await get("/api/cart/get");
                console.log(response)  
                setCart(response || []);
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

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.totalPrice, 0);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold text-center mb-6">My Cart</h1>
            {cart.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cart.map((item) => (
                        <div key={item.product.id} className="bg-white shadow-lg rounded-lg p-4 relative">
                            <button
                                onClick={() => handleRemoveFromCart(item.product.id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            >
                                <FaTrashAlt />
                            </button>
                            <h2 className="text-xl font-bold mb-2">{item.product.name}</h2>
                            <p className="text-gray-700">Price: ${item.product.price}</p>
                            <p className="text-gray-700">Quantity: {item.quantity}</p>
                            <p className="text-gray-700">Total: ${item.totalPrice}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-20">
                    <p className="text-gray-500 text-lg">Your cart is empty.</p>
                </div>
            )}

            {cart.length > 0 && (
                <div className="text-center mt-8">
                    <p className="text-lg font-bold">Total: ${calculateTotal()}</p>
                    <button className="bg-sunsetBlaze text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-600 transition duration-300">
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart
