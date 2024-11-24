import React, { useState, useEffect } from "react";
import useAxios from "../../../Hooks/useAxios";
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ProductManagement = () => {
    const { get, patch } = useAxios();
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState("all"); // Filter options: all, active, inactive

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await get("/api/product/get", {useAuth:true});

                setProducts(response.products || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        if (filter === "all") return true;
        if (filter === "active") return product.isActive;
        if (filter === "inactive") return !product.isActive;
        return true;
    });

    const toggleProductStatus = async (productId, isActive) => {
        try {
            await patch(`/api/product/${productId}`, { isActive: !isActive });
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === productId ? { ...product, isActive: !isActive } : product
                )
            );
        } catch (error) {
            console.error("Error updating product status:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Product Management</h1>

            {/* Filter Buttons */}
            <div className="flex space-x-4 mb-6">
                <button
                    className={`py-2 px-4 rounded ${filter === "all" ? "bg-sunsetBlaze text-white" : "bg-gray-200"
                        }`}
                    onClick={() => setFilter("all")}
                >
                    All Products
                </button>
                <button
                    className={`py-2 px-4 rounded ${filter === "active" ? "bg-sunsetBlaze text-white" : "bg-gray-200"
                        }`}
                    onClick={() => setFilter("active")}
                >
                    Active
                </button>
                <button
                    className={`py-2 px-4 rounded ${filter === "inactive" ? "bg-sunsetBlaze text-white" : "bg-gray-200"
                        }`}
                    onClick={() => setFilter("inactive")}
                >
                    Inactive
                </button>
            </div>

            {/* Products Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Price</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border">{product.name}</td>
                                <td className="px-4 py-2 border">${product.price}</td>
                                <td className="px-4 py-2 border">
                                    {product.isActive ? (
                                        <span className="text-green-500 flex items-center">
                                            <FaCheckCircle className="mr-1" /> Active
                                        </span>
                                    ) : (
                                        <span className="text-red-500 flex items-center">
                                            <FaTimesCircle className="mr-1" /> Inactive
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-2 border">
                                    <button
                                        className="text-blue-500 hover:underline mr-4"
                                        onClick={() => alert("Edit functionality coming soon!")}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className={`text-${product.isActive ? "red" : "green"
                                            }-500 hover:underline`}
                                        onClick={() => toggleProductStatus(product.id, product.isActive)}
                                    >
                                        {product.isActive ? <FaTrash /> : <FaCheckCircle />}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredProducts.length === 0 && (
                    <div className="text-center p-4 text-gray-500">No products found</div>
                )}
            </div>
        </div>
    );
};

export default ProductManagement;
