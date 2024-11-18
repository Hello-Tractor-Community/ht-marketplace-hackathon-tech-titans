import React from "react";

const HomePage = () => {
  // Mock product data
  const products = [
    {
      id: 1,
      name: "Tractor A",
      price: "$25,000",
      image: "https://i.pinimg.com/736x/30/2b/a4/302ba4b5be97439b1d1167ee4a97a7c5.jpg",
      description: "A high-quality second-hand tractor.",
    },
    {
      id: 2,
      name: "Tractor B",
      price: "$18,000",
      image: "https://i.pinimg.com/736x/28/28/2c/28282c31b5bfb11a96517fa6d21f4338.jpg",
      description: "Reliable and affordable tractor for farming.",
    },
    {
      id: 3,
      name: "Plow",
      price: "$3,000",
      image: "https://i.pinimg.com/736x/e2/f7/f7/e2f7f742a4a7c318d909e0f287d9fcf5.jpg",
      description: "Durable plow for your agricultural needs.",
    },
    {
      id: 4,
      name: "Harvester",
      price: "$45,000",
      image: "https://i.pinimg.com/736x/14/27/4a/14274a8ef98789f8540a39c3dfebf268.jpg",
      description: "Efficient harvester for large-scale farming.",
    },{
      id: 5,
      name: "Tractor A",
      price: "$25,000",
      image: "https://i.pinimg.com/736x/30/2b/a4/302ba4b5be97439b1d1167ee4a97a7c5.jpg",
      description: "A high-quality second-hand tractor.",
    },
    {
      id: 6,
      name: "Tractor B",
      price: "$18,000",
      image: "https://i.pinimg.com/736x/28/28/2c/28282c31b5bfb11a96517fa6d21f4338.jpg",
      description: "Reliable and affordable tractor for farming.",
    },
    {
      id: 7,
      name: "Plow",
      price: "$3,000",
      image: "https://i.pinimg.com/736x/e2/f7/f7/e2f7f742a4a7c318d909e0f287d9fcf5.jpg",
      description: "Durable plow for your agricultural needs.",
    },
    {
      id: 8,
      name: "Harvester",
      price: "$45,000",
      image: "https://i.pinimg.com/736x/14/27/4a/14274a8ef98789f8540a39c3dfebf268.jpg",
      description: "Efficient harvester for large-scale farming.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Available Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-300 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              <p className="text-lg font-bold text-sunsetBlaze mb-4">
                {product.price}
              </p>
              <button className="bg-sunsetBlaze text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
