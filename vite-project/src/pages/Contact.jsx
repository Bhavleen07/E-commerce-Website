export default function Contact() {
  return (
    <div className="bg-white font-['Times_New_Roman']">
      <div className="bg-pink-100 py-16 text-center">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-2">
          Contact <span className="text-pink-700">Us</span>
        </h1>
        <div className="w-32 h-1 bg-pink-700 mx-auto mb-6 rounded"></div>
        <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          We’d love to hear from you! Reach out through any of the options
          below.
        </p>
      </div>

      <div className="container mx-auto px-5 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Contact Info */}
        <div className="space-y-6 text-xl text-gray-700">
          <div className="flex items-center space-x-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              alt="location"
              className="w-8 h-8"
            />
            <p>Jalandhar, Punjab</p>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
              alt="email"
              className="w-8 h-8"
            />
            <p>kaurkrafts@gmail.com</p>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/724/724664.png"
              alt="phone"
              className="w-8 h-8"
            />
            <p>+91 98765 43210</p>
          </div>
        </div>

        {/* Google Map */}
        <div>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.356322502791!2d75.5762!3d31.3260!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5a4d2c4f6d9f%3A0x5b9e3aebbd9b4f36!2sShashi%20Nagar%2C%20Sodal%20Road%2C%20Jalandhar!5e0!3m2!1sen!2sin!4v16938393823"
            className="w-full h-96 rounded-lg border-4 border-pink-700"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
