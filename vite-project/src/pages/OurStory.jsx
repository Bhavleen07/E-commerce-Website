
export default function OurStory() {
  return (
    <div className="bg-white font-['Times_New_Roman']">
      {/* Hero Section */}
      <div className="bg-pink-100 py-16">
        <div className="container mx-auto px-5 text-center">
          <h1 className="text-6xl font-extrabold text-gray-800 mb-2">
            Our <span className="text-pink-700">Story</span>
          </h1>
          <div className="w-32 h-1 bg-pink-700 mx-auto mb-6 rounded"></div>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Kaurkrafts started with a dream — to spread love through{" "}
            <span className="text-pink-700 font-semibold">handmade crafts</span>
            . Every product tells a story, carrying with it warmth, tradition,
            and dedication.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-5 py-20">
        <h2 className="text-5xl font-bold text-gray-800 mb-2">
          Our <span className="text-pink-700">Mission</span>
        </h2>
        <div className="w-24 h-1 bg-pink-700 mb-8 rounded"></div>
        <p className="text-2xl text-gray-700 leading-relaxed max-w-4xl">
          To bring the beauty of{" "}
          <span className="text-pink-700">handcrafted art</span> to everyone’s
          life. Each creation is carefully designed, symbolizing authenticity,
          culture, and love.
        </p>
      </div>

      {/* Radio Opportunity Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-5 flex flex-col md:flex-row items-center gap-10">
          <img
            src="/images/all-india-radio.jpg"
            alt="At All India Radio"
            className="rounded-2xl shadow-lg w-full md:w-1/2"
          />
          <div className="md:w-1/2">
            <h2 className="text-5xl font-bold text-gray-800 mb-2">
              A <span className="text-pink-700">Special Journey</span>
            </h2>
            <div className="w-24 h-1 bg-pink-700 mb-6 rounded"></div>
            <p className="text-2xl text-gray-700 leading-relaxed">
              On{" "}
              <span className="text-pink-700 font-semibold">
                National Handloom Day
              </span>{" "}
              (August 4, 2025), I was invited by{" "}
              <span className="text-pink-700">All India Radio</span> to share my
              story. It was an honor to represent small businesses and speak
              about the beauty of handmade crafts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
