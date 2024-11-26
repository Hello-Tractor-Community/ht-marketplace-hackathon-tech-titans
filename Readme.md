# Hello Tractor Web Application

## Overview
The Hello Tractor Web Application is a multi-user platform designed to connect buyers, sellers, and administrators. The platform includes features such as product listings, messaging, cart management, wishlist management, and user profile management. It is built with React, Node.js, and various modern tools and libraries to deliver a seamless and responsive experience.

---

## Features

### General Features
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Role-Based Access**: Users have different access levels based on their roles (Admin, Seller, Buyer, Guest).
- **User Authentication**: Secure login and session management.
- **Customizable Navbar**: Dynamic navigation based on user type.

### Product Management
- **Add to Cart and Wishlist**: Users can add products to their cart or wishlist.
- **Product Details**: Detailed product pages with specifications, availability, and actions like messaging sellers.
- **Listings**: Buyers can browse product listings while sellers manage their product listings.

### Messaging
- **Conversations**: Chat feature allowing buyers and sellers to communicate.
- **Emoji Support**: Emoji picker for enhanced communication.
- **Dynamic Routing**: Opens messages based on URL parameters (e.g., `/message/user_id`).

### Cart and Wishlist Management
- **View and Manage Cart**: Buyers can view, update, and remove items from their cart.
- **View Wishlist**: Manage and view wishlist items.
- **Empty State**: Visually appealing design for empty cart or wishlist scenarios.

### Profile Management
- **User Profiles**: Users can view and edit their personal and company details.
- **Services and Activity Logs**: Buyers and sellers can manage services offered and view past activities.

---

## Technologies Used

### Frontend
- **React**: For building interactive user interfaces.
- **React Router**: For routing and dynamic navigation.
- **Framer Motion**: For smooth animations.
- **Tailwind CSS**: For responsive and modern UI styling.
- **React Icons**: For consistent iconography.
- **Emoji Picker**: For enhanced messaging features.

### Backend
- **Node.js**: Backend runtime environment.
- **Express.js**: Lightweight and flexible web framework.
- **MongoDB**: Database for storing application data.
- **Mongoose**: ORM for MongoDB.
- **Session Management**: Cookies and JWT for user sessions.

### Tools
- **Axios**: For API calls and handling HTTP requests.
- **React Icons**: For rich icon design.

---

## Project Structure

```plaintext
src/
|-- assets/             # Static assets like images
|-- components/         # Reusable components
|-- hooks/              # Custom React hooks (e.g., `useAxios`)
|-- screens/            # Main application pages
|-- App.js              # Main React component
|-- index.js            # Application entry point
backend/
|-- models/             # Mongoose models
|-- routes/             # API routes
|-- controllers/        # Logic for handling requests
|-- app.js              # Express server entry point
```

---

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone git@github.com:Hello-Tractor-Community/ht-marketplace-hackathon-tech-titans.git
   cd ht-marketplace-hackathon-tech-titans
   ```

2. Install dependencies:
   ```bash
   cd frontend
   npm install
   cd backend
   npm install
   ```

3. Set environment variables:
   Create a `.env` file in both the `frontend` and `backend` directories and add the following:

   **Frontend**:
   ```env
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   change backend url in frontend/src/hooks/useAxios
   ```

   **Backend**:
   ```env
   PORT=5500
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Run the application:
   - Backend:
     ```bash
     cd backend
     npm start
     ```
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```

5. Access the application:
   Visit `http://localhost:3000` in your browser.

---

## Usage

### User Roles
1. **Guest**:
   - Browse listings
   - Add items to cart or wishlist (session-based).

2. **Buyer**:
   - Manage cart and wishlist.
   - Message sellers.

3. **Seller**:
   - Manage product listings.
   - Chat with buyers.

4. **Admin**:
   - Manage users.
   - Access analytics.

---

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login.
- `POST /api/auth/register` - User registration.

### Products
- `GET /api/product/list` - List all products.
- `POST /api/product/add` - Add a new product (seller only).

### Cart
- `GET /api/cart` - Get cart items.
- `POST /api/cart/add` - Add an item to cart.

### Wishlist
- `GET /api/wishlist` - Get wishlist items.
- `POST /api/wishlist/add` - Add an item to wishlist.

---

## Contributing
Contributions are not accepted unless explicitly approved. If you wish to contribute, please contact the project maintainer for further instructions.

---

## License
This project is licensed for commercial use only under specific agreements. Usage for commercial purposes requires explicit approval from the project owner.

---
## Demo video
- **demo video**: [hello tractor Tech Titans video](https://www.loom.com/share/8e96a803c08d467a92723852093c8bce?sid=10d83b4d-7aeb-4005-a197-97c2150158bd)

## Live Application URL
- **live link**: [hello tractor Tech Titans link](https://ht-marketplace-hackathon-tech-titans-uy7a.vercel.app/)

## Lesson learned
- how use to use google map
- implement websocket
-to implement live chat

## Challenges
- deployment of mongo database
- implementation of live chat
- 


## Contact
For inquiries, reach out to:
- **Email**: stanleywanjau371@gmail.com
- **LInkedin**: [Stanley Muiruri](www.linkedin.com/in/wanjau-stanley-muiruri
)
- **GitHub**: [Stanley Muiruri](https://github.com/stanleywanjau/)

- **Email**: irungud220@gmail.com
- **LInkedin**: [Dennis Irungu](https://www.linkedin.com/in/dennis-irungu-aa88b32a8/)

- **GitHub**: [Dennis Irungu](https://github.com/irungudennisnganga/)




