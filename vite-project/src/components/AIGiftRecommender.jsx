import React, { useState, useContext } from "react";
import { getGiftSuggestionsFromPrompt } from "../utils/aiHelper";
import MyContext from "../context/data/myContext";

export default function AIGiftRecommender({ mode }) {
  const [prompt, setPrompt] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { product } = useContext(MyContext);

 const handleSubmit = () => {
  if (!prompt) return;
  const results = getGiftSuggestionsFromPrompt(product, prompt); // product = array from context
  setSuggestions(results);   // local state inside AI component
  onProducts(results);       // send filtered products to Home.jsx
};

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-2" style={{color: mode==="dark"?"white":""}}>
        Find a Gift (Free AI)
      </h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 rounded flex-1"
          style={{
          backgroundColor: mode === "dark" ? "#374151" : "",
          color: mode === "dark" ? "white" : "",
}}
          placeholder="E.g. Birthday gift under 1500"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />
        <button
          className="bg-pink-600 text-white px-4 rounded"
          onClick={handleSubmit}
        >
          Suggest
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {suggestions.map(s => (
          <div key={s.id} className="border rounded p-2 hover:shadow-lg cursor-pointer"
style={{
  backgroundColor: mode === "dark" ? "#1f2937" : "",
  color: mode === "dark" ? "white" : "",
}}>
            <img src={s.imageUrl} alt={s.title} className="w-full h-40 object-cover rounded mb-2"/>
            <h3 className="text-sm font-semibold">{s.title}</h3>
            <p>₹{s.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}