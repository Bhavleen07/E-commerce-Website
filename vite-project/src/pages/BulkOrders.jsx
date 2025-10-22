export default function BulkOrders() {
  return (
    <div className="bg-white font-['Times_New_Roman']">
      {/* Hero Section */}
      <div className="py-16 text-center">
        <h1 className="text-6xl font-extrabold mb-4 text-black">
          Place a Bulk Order
        </h1>
        <div className="w-32 h-1 bg-pink-500 mx-auto mb-6 rounded"></div>
        <p className="text-2xl max-w-4xl mx-auto leading-relaxed text-black">
          We partner with{" "}
          <span className="font-semibold">corporates, event planners</span>, and
          store owners for wholesale orders — fully customized to your needs.
        </p>
      </div>

      {/* How it Works - 4 Part Grid */}
      <div className="container mx-auto px-5 py-20">
        <h2 className="text-5xl font-bold text-center text-black mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Step 1 */}
          <div className="bg-pink-500 text-white p-10 rounded-2xl shadow-lg flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:bg-pink-600">
            <div className="bg-white text-pink-600 w-14 h-14 flex items-center justify-center rounded-full text-2xl font-bold mb-4 shadow-md">
              1
            </div>
            <h3 className="text-3xl font-semibold mb-4">Contact Us</h3>
            <p className="text-lg leading-relaxed">
              Reach out to us via email or our contact form. We’d love to
              partner with you for any event or corporate gift. Every order is
              curated and may include discounts.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-pink-500 text-white p-10 rounded-2xl shadow-lg flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:bg-pink-600">
            <div className="bg-white text-pink-600 w-14 h-14 flex items-center justify-center rounded-full text-2xl font-bold mb-4 shadow-md">
              2
            </div>
            <h3 className="text-3xl font-semibold mb-4">
              Customize Your Order
            </h3>
            <p className="text-lg leading-relaxed">
              Choose from our collections or request unique handmade crafts. Our
              artisans can create personalized products tailored to your needs.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-pink-500 text-white p-10 rounded-2xl shadow-lg flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:bg-pink-600">
            <div className="bg-white text-pink-600 w-14 h-14 flex items-center justify-center rounded-full text-2xl font-bold mb-4 shadow-md">
              3
            </div>
            <h3 className="text-3xl font-semibold mb-4">
              Our Artisans Make It
            </h3>
            <p className="text-lg leading-relaxed">
              We work closely with you during production, keeping you updated
              from sampling to the final schedule so you’re part of the journey.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-pink-500 text-white p-10 rounded-2xl shadow-lg flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:bg-pink-600">
            <div className="bg-white text-pink-600 w-14 h-14 flex items-center justify-center rounded-full text-2xl font-bold mb-4 shadow-md">
              4
            </div>
            <h3 className="text-3xl font-semibold mb-4">
              Receive Your Shipment
            </h3>
            <p className="text-lg leading-relaxed">
              Orders are shipped across India and internationally. Delivery
              times depend on items and destination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
