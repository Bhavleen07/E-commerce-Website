export default function Terms() {
  return (
    <div className="bg-white font-['Times_New_Roman']">
      <div className="bg-pink-100 py-16 text-center">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-2">
          Terms & <span className="text-pink-700">Conditions</span>
        </h1>
        <div className="w-32 h-1 bg-pink-700 mx-auto mb-6 rounded"></div>
        <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Please read our terms carefully before placing any orders.
        </p>
      </div>

      <div className="container mx-auto px-5 py-20 space-y-12 text-xl text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-3xl font-bold text-pink-700 mb-2">1. Orders</h2>
          <p>
            All orders must be prepaid and confirmed before processing. We do
            not accept COD orders.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-pink-700 mb-2">
            2. Returns & Refunds
          </h2>
          <p>
            Since our products are handcrafted,{" "}
            <span className="text-pink-700">returns are not accepted</span>{" "}
            unless there is damage during transit. Claims must be reported
            within 48 hours of delivery.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-pink-700 mb-2">3. Shipping</h2>
          <p>
            We use reputed logistics partners. Customers are responsible for
            customs duties or additional taxes, if any.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-pink-700 mb-2">
            4. Handcrafted Products
          </h2>
          <p>
            Each product is unique and may have slight variations, which are
            part of its handmade charm.
          </p>
        </div>
      </div>
    </div>
  );
}
