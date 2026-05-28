import React, { useState } from "react";
import axios from "axios";

const AddOffer = () => {
  const [o_name, setOName] = useState("");
  const [offer, setOffer] = useState("");
  const [imgs, setImgs] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("o_name", o_name);
      formData.append("offer", offer);
      formData.append("imgs", imgs);

      const response = await axios.post(
        "http://localhost:5000/addoffer",
        formData,{
          withCredentials:true
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMsg(response.data.msg);

      // Clear form
      setOName("");
      setOffer("");
      setImgs(null);

    } catch (error) {
      console.log(error);
      setMsg("❌ Failed to add offer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            🎉 Add Offer
          </h2>
          <p className="text-gray-500 mt-2">
            Upload your latest discount offers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-black">

          {/* Offer Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Offer Name
            </label>

            <input
              type="text"
              value={o_name}
              onChange={(e) => setOName(e.target.value)}
              placeholder="Enter offer name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            />
          </div>

          {/* Offer */}
          <div className="text-black">
            <label className="block text-gray-700 font-semibold mb-2">
              Offer Percentage
            </label>

            <input
              type="text"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder="Ex: 50% OFF"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            />
          </div>

          {/* Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImgs(e.target.files[0])}
              required
              className="w-full border border-dashed border-gray-400 rounded-xl p-3 bg-gray-50 cursor-pointer"
            />
          </div>

          {/* Image Preview */}
          {imgs && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(imgs)}
                alt="preview"
                className="w-full h-52 object-cover rounded-2xl border"
              />
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-bold text-lg transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 hover:shadow-lg"
            }`}
          >
            {loading ? "Uploading..." : "Add Offer"}
          </button>
        </form>

        {/* Message */}
        {msg && (
          <div
            className={`mt-6 p-4 rounded-xl text-center font-semibold ${
              msg.includes("Failed")
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {msg}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddOffer;