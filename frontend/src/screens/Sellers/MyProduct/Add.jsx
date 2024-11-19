import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useDropzone } from "react-dropzone";

const SellerProductUpload = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    location: { latitude: "", longitude: "", placeName: "" },
    availability: false,
    type: "",
    usageHour: "",
    images: [],
    description: "",
    modelNumber: "",
    brand: "",
    year: "",
    engineType: "",
    horsepower: "",
    weight: "",
    dimensions: { length: "", width: "", height: "" },
    fuelCapacity: "",
    transmissionType: "",
    warranty: "",
  });

  const [mapCenter, setMapCenter] = useState({ lat: -1.286389, lng: 36.817223 }); // Default to Nairobi
  const [autocomplete, setAutocomplete] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Replace with your API key
    libraries: ["places"],
  });

  const handleAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const handlePlaceSelected = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const { lat, lng } = place.geometry.location;

      setProductData((prev) => ({
        ...prev,
        location: {
          latitude: lat(),
          longitude: lng(),
          placeName: place.formatted_address,
        },
      }));

      setMapCenter({ lat: lat(), lng: lng() });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (field, subField, value) => {
    setProductData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productData); // Replace with API call to save the product
  };
    
    
    // Handle image files dropped via drag and drop
  const onDrop = useCallback((acceptedFiles) => {
    setProductData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...acceptedFiles], // Add files directly
    }));
  }, []);
    // Dropzone setup
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  return (
    <div className="container mx-auto px-4 py-8 border my-4 shadow-2xl">
      <h1 className="text-2xl font-bold mb-6 mx-auto flex items-center justify-center">Upload Product</h1>
      <form onSubmit={handleSubmit} className="grid gap-6">
        {/* Name */}
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2 rounded-lg w-full"
          required
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded-lg w-full"
          required
        />

        {/* Location */}
        {isLoaded && (
          <div>
            <label className="block mb-2 font-bold">Search Location</label>
            <Autocomplete
              onLoad={handleAutocompleteLoad}
              onPlaceChanged={handlePlaceSelected}
            >
              <input
                type="text"
                placeholder="Search location"
                className="border p-2 rounded-lg w-full"
              />
            </Autocomplete>
          </div>
        )}

        {/* Availability */}
        <label className="flex items-center">
          <input
            type="checkbox"
            name="availability"
            checked={productData.availability}
            onChange={(e) =>
              setProductData((prev) => ({
                ...prev,
                availability: e.target.checked,
              }))
            }
            className="mr-2"
          />
          Available
        </label>

        {/* Type */}
        <select
          name="type"
          value={productData.type}
          onChange={handleChange}
          className="border p-2 rounded-lg"
          required
        >
          <option value="">Select Type</option>
          <option value="tractor">Tractor</option>
          <option value="spare">Spare Part</option>
        </select>

        {/* Usage Hour */}
        <input
          type="number"
          name="usageHour"
          value={productData.usageHour}
          onChange={handleChange}
          placeholder="Usage Hours"
          className="border p-2 rounded-lg w-full"
        />

        {/* Images */}
        <div className="mb-6">
  <label className="block text-lg font-semibold text-gray-700 mb-2">
    Upload Images *
  </label>
  <div
    {...getRootProps()}
    className={`border-dashed border-2 p-6 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-sunsetBlaze transition duration-300 cursor-pointer ${
      isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-400 bg-gray-50"
    }`}
  >
    <input {...getInputProps()} />
    {isDragActive ? (
      <p className="text-blue-500 font-medium">
        Drop the images here to upload...
      </p>
    ) : (
      <p className="text-center">
        Drag and drop some images here, or{" "}
        <span className="text-sunsetBlaze font-medium hover:underline">
          click to select files
        </span>
      </p>
    )}
    <p className="text-sm text-gray-400 mt-2">
      Supported formats: JPG, PNG, GIF (Max size: 5MB per image)
    </p>
  </div>

  {productData.images.length > 0 && (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {productData.images.map((img, index) => (
        <div
          key={index}
          className="relative group bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden"
        >
          <img
            src={URL.createObjectURL(img)}
            alt={`Uploaded ${index}`}
            className="w-full h-32 object-cover"
          />
          <button
            type="button"
            onClick={() =>
              setProductData((prev) => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index),
              }))
            }
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-200 opacity-0 group-hover:opacity-100"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )}
</div>


        {/* Description */}
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded-lg w-full"
          rows="4"
          maxLength="500"
          required
        ></textarea>

        {/* Additional Fields */}
        <input
          type="text"
          name="modelNumber"
          value={productData.modelNumber}
          onChange={handleChange}
          placeholder="Model Number"
          className="border p-2 rounded-lg w-full"
        />
        <input
          type="text"
          name="brand"
          value={productData.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="border p-2 rounded-lg w-full"
        />
        <input
          type="number"
          name="year"
          value={productData.year}
          onChange={handleChange}
          placeholder="Year"
          className="border p-2 rounded-lg w-full"
        />
        <input
          type="text"
          name="engineType"
          value={productData.engineType}
          onChange={handleChange}
          placeholder="Engine Type"
          className="border p-2 rounded-lg w-full"
        />
        <input
          type="number"
          name="horsepower"
          value={productData.horsepower}
          onChange={handleChange}
          placeholder="Horsepower"
          className="border p-2 rounded-lg w-full"
        />
        <input
          type="number"
          name="weight"
          value={productData.weight}
          onChange={handleChange}
          placeholder="Weight (kg)"
          className="border p-2 rounded-lg w-full"
        />
        <div className="grid gap-4 grid-cols-3">
          <input
            type="number"
            name="length"
            value={productData.dimensions.length}
            onChange={(e) =>
              handleNestedChange("dimensions", "length", e.target.value)
            }
            placeholder="Length"
            className="border p-2 rounded-lg"
          />
          <input
            type="number"
            name="width"
            value={productData.dimensions.width}
            onChange={(e) =>
              handleNestedChange("dimensions", "width", e.target.value)
            }
            placeholder="Width"
            className="border p-2 rounded-lg"
          />
          <input
            type="number"
            name="height"
            value={productData.dimensions.height}
            onChange={(e) =>
              handleNestedChange("dimensions", "height", e.target.value)
            }
            placeholder="Height"
            className="border p-2 rounded-lg"
          />
        </div>
        <input
          type="number"
          name="fuelCapacity"
          value={productData.fuelCapacity}
          onChange={handleChange}
          placeholder="Fuel Capacity (L)"
          className="border p-2 rounded-lg w-full"
        />
        <input
          type="text"
          name="transmissionType"
          value={productData.transmissionType}
          onChange={handleChange}
          placeholder="Transmission Type"
          className="border p-2 rounded-lg w-full"
        />
        <input
          type="text"
          name="warranty"
          value={productData.warranty}
          onChange={handleChange}
          placeholder="Warranty"
          className="border p-2 rounded-lg w-full"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-sunsetBlaze text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Submit
        </button>
      </form> 
    </div>
  );
};

export default SellerProductUpload;
