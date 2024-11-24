import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useDropzone } from "react-dropzone";
import useAxios from "../../../Hooks/useAxios"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SellerProductUpload = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    location: { latitude: "", longitude: "", placeName: "" },
    availability: true,
    typeProduct: "",
    usageHour: "",
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
  const [images, setImages] = useState([]);

  const [mapCenter, setMapCenter] = useState({ lat: -1.286389, lng: 36.817223 }); // Default to Nairobi
  const [autocomplete, setAutocomplete] = useState(null);
  const { post } = useAxios()
  const navigate = useNavigate()
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
      [subField]: isNaN(value) ? value : Number(value), 
    },
  }));
};


  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate the number of uploaded images
  if (images.length < 5) {
    toast.error("You must upload at least 5 images.");
    return;
  }

  // Construct FormData
  const formData = new FormData();
  Object.entries(productData).forEach(([key, value]) => {
    if (key === "location" || key === "dimensions") {
      formData.append(key, JSON.stringify(value)); // Serialize nested objects
    } else {
      formData.append(key, value);
    }
  });

  // Append images to FormData
  images.forEach((image) => formData.append("images", image));

  try {
    const response = await post("/api/product/add", formData, {
      useAuth: true,
    });

    if (response.success) {
      toast.success("Product uploaded successfully!");
      setProductData({
        name: "",
        price: "",
        location: { latitude: "", longitude: "", placeName: "" },
        availability: true,
        typeProduct: "",
        usageHour: "",
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
      setImages([]);
      navigate("/seller/products");
    } else {
      toast.error("Failed to upload product, please try again later.");
    }
  } catch (error) {
    toast.error("Failed to upload product, please try again later.");
    console.error(error);
  }
};

    
    
    // Handle image files dropped via drag and drop
  const onDrop = useCallback((acceptedFiles) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
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
        
       <label className="block">
          <span className="text-gray-700 font-semibold">Product Name *</span>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border p-2 rounded-lg w-full"
            required
          />
        </label>  

        {/* Price */}
        <label className="block">
          <span className="text-gray-700 font-semibold">Price *</span>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded-lg w-full"
            required
          />
        </label>

        {/* Location */}
        {isLoaded && (
          <label className="block">
            <span className="text-gray-700 font-semibold">Search Location *</span>
            <Autocomplete onLoad={handleAutocompleteLoad} onPlaceChanged={handlePlaceSelected}>
              <input
                type="text"
                placeholder="Search location"
                className="border p-2 rounded-lg w-full"
              />
            </Autocomplete>
          </label>
        )}

        {/* Availability */}
        {/* <label className="flex items-center">
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
        </label> */}

        {/* Type */}
        <label className="block">
          <span className="text-gray-700 font-semibold">Type *</span>
          <select
            name="typeProduct"
            value={productData.typeProduct}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          >
            <option value="">Select Type</option>
            <option value="tractor">Tractor</option>
            <option value="spare">Spare Part</option>
          </select>
        </label>

        {/* Usage Hour */}
        <label className="block">
          <span className="text-gray-700 font-semibold">Usage Hours</span>
          <input
            type="number"
            name="usageHour"
            value={productData.usageHour}
            onChange={handleChange}
            placeholder="Usage Hours"
            className="border p-2 rounded-lg w-full"
          />
        </label>

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

  {images.length > 0 && (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((img, index) => (
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
        <label className="block">
          <span className="text-gray-700 font-semibold">Description *</span>
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
          </label>

        {/* Additional Fields */}
        <label className="block">
          <span className="text-gray-700 font-semibold">Model Number *</span>
        <input
          type="text"
          name="modelNumber"
          value={productData.modelNumber}
          onChange={handleChange}
          placeholder="Model Number"
          className="border p-2 rounded-lg w-full"
          />
        </label>
        <label className="block">
          <span className="text-gray-700 font-semibold">Brand *</span>
        <input
          type="text"
          name="brand"
          value={productData.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="border p-2 rounded-lg w-full"
          />
        </label>
        <label className="block">
          <span className="text-gray-700 font-semibold">Year *</span>
        <input
          type="number"
          name="year"
          value={productData.year}
          onChange={handleChange}
          placeholder="Year"
          className="border p-2 rounded-lg w-full"
          />
        </label>
        <label className="block">
          <span className="text-gray-700 font-semibold">Engine Type *</span>
        <input
          type="text"
          name="engineType"
          value={productData.engineType}
          onChange={handleChange}
          placeholder="Engine Type"
          className="border p-2 rounded-lg w-full"
        />
        </label>
        <label className="block">
          <span className="text-gray-700 font-semibold">Horse Power</span>
        <input
          type="number"
          name="horsepower"
          value={productData.horsepower}
          onChange={handleChange}
          placeholder="Horsepower"
          className="border p-2 rounded-lg w-full"
          />
        </label>
        <label className="block">
          <span className="text-gray-700 font-semibold">Weight *</span>
        <input
          type="number"
          name="weight"
          value={productData.weight}
          onChange={handleChange}
          placeholder="Weight (kg)"
          className="border p-2 rounded-lg w-full"
          />
        </label>
        <div className="grid gap-4 grid-cols-3">
  <label className="block">
    <span className="text-gray-700 font-semibold">Length *</span>
    <input
      type="number"
      name="length"
      value={productData.dimensions.length}
      onChange={(e) =>
        handleNestedChange("dimensions", "length", e.target.value)
      }
      placeholder="Length"
      className="border p-2 rounded-lg w-full"
    />
  </label>
  <label className="block">
    <span className="text-gray-700 font-semibold">Width *</span>
    <input
      type="number"
      name="width"
      value={productData.dimensions.width}
      onChange={(e) =>
        handleNestedChange("dimensions", "width", e.target.value)
      }
      placeholder="Width"
      className="border p-2 rounded-lg w-full"
    />
  </label>
  <label className="block">
    <span className="text-gray-700 font-semibold">Height *</span>
    <input
      type="number"
      name="height"
      value={productData.dimensions.height}
      onChange={(e) =>
        handleNestedChange("dimensions", "height", e.target.value)
      }
      placeholder="Height"
      className="border p-2 rounded-lg w-full"
    />
  </label>
</div>

        <label className="block">
          <span className="text-gray-700 font-semibold">Fuel Capacity *</span>
        <input
          type="number"
          name="fuelCapacity"
          value={productData.fuelCapacity}
          onChange={handleChange}
          placeholder="Fuel Capacity (L)"
          className="border p-2 rounded-lg w-full"
          />
        </label>
        <label className="block">
          <span className="text-gray-700 font-semibold">Transmission Type *</span>
        <input
          type="text"
          name="transmissionType"
          value={productData.transmissionType}
          onChange={handleChange}
          placeholder="Transmission Type"
          className="border p-2 rounded-lg w-full"
          />
        </label>
        <label className="block">
          <span className="text-gray-700 font-semibold">Warranty *</span>
        <input
          type="text"
          name="warranty"
          value={productData.warranty}
          onChange={handleChange}
          placeholder="Warranty"
          className="border p-2 rounded-lg w-full"
          />
          </label>

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
