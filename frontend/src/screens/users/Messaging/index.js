import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiSend, FiArrowLeft } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import useAxios from "../../../Hooks/useAxios";
import HT_Icons_Orange from '../../../assets/Sunset Blaze/HT_ICONS_ORANGE-42.png';

const MessagingPage = () => {
    const { user_id } = useParams(); // Get user_id from the URL
    const navigate = useNavigate();
    const { get, post } = useAxios();

    const [user, setUser] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user_data");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchChats();
        }
    }, [user]);

    useEffect(() => {
        if (user_id && user) {
            openChat(user_id);
        }
    }, [user_id, user]);

    // Fetch all chats
    const fetchChats = async () => {
        try {
            const response = await get("/api/chat/get", { useAuth: true });
            console.log(response);

            const filteredChats = response.chats.map((chat) => {
                // Determine the other user based on the logged-in user
                const otherUser =
                    chat.user1 === user.id
                        ? chat.user2Details[0] // Access first element of `user2Details`
                        : chat.user1Details[0]; // Access first element of `user1Details`

                return { ...chat, otherUser }; // Add `otherUser` details for easy access
            });

            // Sort chats by `updatedAt` to ensure the latest message appears at the top
            const sortedChats = filteredChats.sort(
                (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
            );

            setConversations(sortedChats);
        } catch (err) {
            console.error("Error fetching chats:", err.message);
        }
    };


    // Open a chat based on user_id
    const openChat = async (userId) => {
        try {
            const existingChat = conversations.find(
                (conv) => conv.otherUser._id === userId
            );

            if (existingChat) {
                setSelectedChat(existingChat._id);
                fetchMessages(existingChat._id);
            } else {
                const response = await post(
                    "/api/chat/create",
                    { user1: userId, user2: user.id },
                    { useAuth: true }
                );
                setSelectedChat(response.newChat._id);
                fetchChats();
            }
        } catch (err) {
            console.error("Error opening chat:", err.message);
        }
    };

    // Fetch messages for a specific chat
    const fetchMessages = async (chatId) => {
        try {
            const response = await get(`/api/message/get/${chatId}`, {
                useAuth: true,
            });
            setMessages(response.messages);
        } catch (err) {
            console.error("Error fetching messages:", err.message);
        }
    };

    // Send a message
    const sendMessage = async () => {
        if (!message.trim()) return;

        try {
            // Send the message to the backend
            const response = await post(
                "/api/message/create",
                {
                    sender: user.id,
                    receiver: conversations.find((c) => c._id === selectedChat)?.otherUser._id,
                    message,
                    chat: selectedChat,
                },
                { useAuth: true }
            );

            // Update the UI with the new message
            const newMessage = {
                id: response.data.id,
                sender: user.id,
                receiver: response.data.receiver,
                message,
                createdAt: new Date().toISOString(),
            };

            setMessages((prevMessages) => [...prevMessages, newMessage]);

            // Clear the message input field
            setMessage("");
        } catch (err) {
            console.error("Error sending message:", err.message);
        }
    };


    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Chat List */}
            <div
                className={`w-full sm:w-1/3 ${selectedChat ? "hidden sm:block" : "block"
                    } bg-white border-r`}
            >
                <h2 className="text-xl font-bold p-4 border-b">Chats</h2>
                <ul className="divide-y">
                    {conversations.map((conversation) => (
                        <li
                            key={conversation._id}
                            className={`p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-100 ${selectedChat === conversation._id ? "bg-gray-200" : ""
                                }`}
                            onClick={() => navigate(`/message/${conversation.otherUser._id}`)}
                        >
                            <img
                                src="https://via.placeholder.com/50"
                                alt={conversation.otherUser.firstName}
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <p className="font-medium">{conversation.otherUser.firstName}</p>
                                <p className="text-sm text-gray-500 truncate">
                                    {conversation?.lastMessage?.message || "No messages yet"}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Chat Window */}
            <div
                className={`w-full sm:w-2/3 flex flex-col ${selectedChat ? "block" : "hidden sm:block"
                    } bg-white`}
            >
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b flex items-center space-x-4">
                            <button
                                onClick={() => navigate("/message")}
                                className="sm:hidden text-sunsetBlaze focus:outline-none"
                            >
                                <FiArrowLeft size={24} />
                            </button>
                            <img
                                src="https://via.placeholder.com/50"
                                alt="Chat Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <p className="text-lg font-medium">
                                {
                                    conversations.find((conv) => conv._id === selectedChat)
                                        ?.otherUser.firstName
                                }
                            </p>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`mb-4 ${msg.sender === user.id ? "text-right" : "text-left"
                                        }`}
                                >
                                    <span
                                        className={`inline-block px-4 py-2 rounded-lg ${msg.sender === user.id
                                                ? "bg-sunsetBlaze text-white"
                                                : "bg-gray-200 text-gray-700"
                                            }`}
                                    >
                                        {msg.message}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t flex items-center space-x-4 sticky bottom-0 bg-white">
                            <div className="relative">
                                <button
                                    onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <BsEmojiSmile size={24} />
                                </button>
                                {isEmojiPickerOpen && (
                                    <div className="absolute bottom-12 left-0">
                                        <EmojiPicker onEmojiClick={(e) => setMessage(message + e.emoji)} />
                                    </div>
                                )}
                            </div>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-2 border rounded-lg"
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-sunsetBlaze text-white px-4 py-2 rounded-lg"
                            >
                                <FiSend size={20} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex justify-center items-center text-gray-500">
                        <img
                            src={HT_Icons_Orange}
                            alt="No conversation selected"
                            className="mb-4 w-32 h-32"
                        />
                        <p>Select a conversation to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessagingPage;
