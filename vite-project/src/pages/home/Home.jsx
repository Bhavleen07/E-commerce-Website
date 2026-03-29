import React, { useContext, useState } from "react";
import Layout from "../../components/layout/Layout";
import MyContext from "../../context/data/myContext";
import HeroSection from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/productCard/ProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import { Link } from "react-router-dom";
import AIGiftRecommender from "../../components/AIGiftRecommender";

// Optional: simple particle background effect
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function Home() {
  const { mode } = useContext(MyContext);
  const [aiProducts, setAiProducts] = useState([]);

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <Layout>
      {/* Hero */}
      <HeroSection />

      {/* Filter */}
      <div className="mt-8 px-4 md:px-8">
        <Filter />
      </div>

      {/* ---------------- AI Gift Recommender Section ---------------- */}
      <section
  className="relative mt-12 px-4 md:px-8 py-8 rounded-2xl shadow-lg overflow-hidden"
  style={{
    background:
      mode === "dark"
        ? "#1f2937"
        : "linear-gradient(to right, #fdf2f8, #eff6ff)",
    color: mode === "dark" ? "white" : "",
  }}
>
        {/* Particle effect behind the component */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 30, density: { enable: true, area: 800 } },
              color: { value: ["#FBB6CE", "#93C5FD", "#FCD34D"] },
              shape: { type: "circle" },
              opacity: { value: 0.5 },
              size: { value: { min: 2, max: 6 } },
              move: { enable: true, speed: 1, direction: "top", outModes: "out" },
            },
          }}
          className="absolute inset-0 z-0"
        />

        {/* Section content */}
        <div className="relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            🎁 AI Gift Suggestions
          </h2>
          <p className="mb-6" style={{ color: mode === "dark" ? "#d1d5db" : "" }}>
            Let our AI recommend the perfect products for our customers
          </p>

          {/* The AI Recommender component */}
          <AIGiftRecommender mode={mode} onProducts={setAiProducts} />
        </div>
      </section>

      {/* ---------------- Display AI suggested products ---------------- */}
      {aiProducts.length > 0 && (
        <section className="mt-12 px-4 md:px-8">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center">
            Suggested Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {aiProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* See more button */}
      <div className="flex justify-center mt-8 mb-12">
        <Link to="/allproducts">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-blue-600 transition-colors duration-300">
            See All Products
          </button>
        </Link>
      </div>

      {/* Track & Testimonials */}
      <div className="px-4 md:px-8">
        <Track />
        <Testimonial />
      </div>
    </Layout>
  );
}

export default Home;