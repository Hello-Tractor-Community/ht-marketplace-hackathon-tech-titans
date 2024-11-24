import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiSend, FiArrowLeft } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import HT_Icons_Orange from '../../../assets/Sunset Blaze/HT_ICONS_ORANGE-42.png';

const MessagingPage = () => {
    const { user_id } = useParams(); // Get user_id from the URL
    const navigate = useNavigate(); // For navigation
    const [conversations] = useState([
        { id: 1, name: "John Doe", lastMessage: "How about 5 PM?", avatar: "https://via.placeholder.com/50" },
        { id: 2, name: "Jane Smith", lastMessage: "Is the tractor still available?", avatar: "https://via.placeholder.com/50" },
        { id: 3, name: "Mike Johnson", lastMessage: "Thanks for the update.", avatar: "https://via.placeholder.com/50" },
    ]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [chatMessages, setChatMessages] = useState({
        1: [
            { id: 1, message: "Hi, is this still available?", sender: "user" },
            { id: 2, message: "Yes, it is!", sender: "John Doe" },
        ],
        2: [],
        3: [],
    });
    const [message, setMessage] = useState("");
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

    useEffect(() => {
        // Set the selected conversation based on the user_id in the URL
        if (user_id) {
            const conversation = conversations.find((conv) => conv.id === parseInt(user_id));
            if (conversation) {
                setSelectedConversation(conversation.id);
            }
        } else {
            setSelectedConversation(null); // No user selected
        }
    }, [user_id, conversations]);

    const handleSendMessage = () => {
        if (!message.trim()) return;

        setChatMessages((prevMessages) => ({
            ...prevMessages,
            [selectedConversation]: [
                ...prevMessages[selectedConversation],
                { id: Date.now(), message, sender: "user" },
            ],
        }));
        setMessage(""); // Clear input field
    };

    const handleEmojiClick = (emoji) => {
        setMessage((prev) => prev + emoji.emoji);
        setIsEmojiPickerOpen(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Chat List View */}
            <div
                className={`w-full sm:w-1/3 ${selectedConversation ? "hidden sm:block" : "block"
                    } bg-white border-r`}
            >
                <h2 className="text-xl font-bold p-4 border-b">Chats</h2>
                <ul className="divide-y">
                    {conversations.map((conversation) => (
                        <li
                            key={conversation.id}
                            className={`p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-100 ${selectedConversation === conversation.id ? "bg-gray-200" : ""
                                }`}
                            onClick={() => navigate(`/message/${conversation.id}`)} // Navigate to the specific conversation
                        >
                            <img src={conversation.avatar} alt={conversation.name} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-medium">{conversation.name}</p>
                                <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Chat Window */}
            <div
                className={`w-full sm:w-2/3 flex flex-col ${selectedConversation ? "block" : "hidden sm:block"
                    } bg-white`}
            >
                {selectedConversation ? (
                    <>
                        {/* Back Button for Mobile */}
                        <div className="p-4 border-b flex items-center space-x-4">
                            <button
                                onClick={() => navigate("/message")} // Navigate back to chat list
                                className="sm:hidden text-sunsetBlaze focus:outline-none"
                            >
                                <FiArrowLeft size={24} />
                            </button>
                            <img
                                src={conversations.find((c) => c.id === selectedConversation)?.avatar}
                                alt=""
                                className="w-10 h-10 rounded-full"
                            />
                            <p className="text-lg font-medium">{conversations.find((c) => c.id === selectedConversation)?.name}</p>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-4 overflow-y-auto">
                            {chatMessages[selectedConversation]?.map((chat, index) => (
                                <div
                                    key={index}
                                    className={`mb-4 ${chat.sender === "user" ? "text-right" : "text-left"
                                        }`}
                                >
                                    <span
                                        className={`inline-block px-4 py-2 rounded-lg ${chat.sender === "user" ? "bg-sunsetBlaze text-white" : "bg-gray-200 text-gray-700"
                                            }`}
                                    >
                                        {chat.message}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 border-t flex items-center space-x-4 sticky bottom-0 bg-white">
                            {/* Emoji Picker */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <BsEmojiSmile size={24} />
                                </button>
                                {isEmojiPickerOpen && (
                                    <div className="absolute bottom-12 left-0">
                                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                                    </div>
                                )}
                            </div>

                            {/* Text Input */}
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sunsetBlaze"
                            />

                            {/* Send Button */}
                            <button
                                onClick={handleSendMessage}
                                className="bg-sunsetBlaze text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                            >
                                <FiSend size={20} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col justify-center items-center h-screen text-gray-500">
                        {/* Image */}
                        <img
                            src={HT_Icons_Orange}
                            alt="No conversation selected"
                            className="mb-4 w-32 h-32"
                        />

                        {/* Text */}
                        <p className="text-center text-lg">
                            Select a conversation to start chatting
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessagingPage;
