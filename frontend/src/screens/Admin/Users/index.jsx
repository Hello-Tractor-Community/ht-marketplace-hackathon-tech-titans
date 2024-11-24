import React, { useState, useEffect } from "react";
import useAxios from "../../../Hooks/useAxios";
import { FiEdit, FiTrash, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";

const UserManagement = () => {
    const { get,patch } = useAxios();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchUsers();
    }, [search, roleFilter, statusFilter, page]);

    const fetchUsers = async () => {
        try {
            const params = {
                search,
                userType: roleFilter,
                isActive: statusFilter,
                page,
            };
            const response = await get("/api/register/users", { params, useAuth: true });
            console.log(response.data);
            setUsers(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDelete = async(id) => {
        try {
            await patch(`/api/register/users/${id}/deactivate`, { useAuth: true })
            toast.success("Deactivated")
        } catch (err) {
            toast.error("Failed to deactivate user")
            console.log(err);
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <div className="flex space-x-4 mb-6">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded-lg flex-1"
                />
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="border p-2 rounded-lg"
                >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border p-2 rounded-lg"
                >
                    <option value="">All Status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
                <button onClick={fetchUsers} className="bg-sunsetBlaze text-white p-2 rounded-lg">
                    <FiSearch />
                </button>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Role</th>
                        <th className="p-2 text-left">Status</th>
                        <th className="p-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-b">
                            <td className="p-2">{`${user.firstName} ${user.lastName}`}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2 capitalize">{user.userType}</td>
                            <td className="p-2 capitalize">
                                <span
                                    className={`px-2 py-1 rounded-lg ${
                                        user.isActive 
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                    }`}
                                >
                                    {user.isActive? "active":"Inactive"}
                                </span>
                            </td>
                            <td className="p-2 flex space-x-2">
                                <button className="text-blue-500 hover:text-blue-700">
                                    <FiEdit />
                                </button>
                                <button className="text-red-500 hover:text-red-700" onClick={()=>handleDelete(user._id)}>
                                    <FiTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-end space-x-2">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="p-2 bg-gray-200 rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>
                <span>{`Page ${page} of ${totalPages}`}</span>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="p-2 bg-gray-200 rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserManagement;
