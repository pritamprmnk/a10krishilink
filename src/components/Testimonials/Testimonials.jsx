export default function Testimonials() {
  return (
    <section className="bg-[#FAF9F6] py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-green-500">Hear From Our Farmers</h2>
        <p className="text-gray-700 mt-2">Discover how farmers across the country are growing with KrishiLink.</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <img
            src="/assets/Wheat.jpg"
            alt="Wheat Field"
            className="w-full h-40 object-cover rounded-xl"
          />
          <div className="flex justify-center -mt-8">
            <img
              src="/assets/avatermale.png"
              alt="Farmer"
              className="w-16 h-16 rounded-full border-4 border-white"
            />
          </div>
          <h3 className="text-xl font-semibold mt-4 text-green-500">Ramesh Kumar</h3>
          <p className="text-sm text-orange-700">Wheat Farmer, Naogaon</p>
          <p className="text-gray-600 mt-4 italic">
            "Using the weather advisory saved my entire crop this season. KrishiLink is a game-changer!"
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <img
            src="/assets/Tomato.jpg"
            alt="Tomato Farm"
            className="w-full h-40 object-cover rounded-xl"
          />
          <div className="flex justify-center -mt-8">
            <img
              src="/assets/avaterfemale.png"
              alt="Farmer"
              className="w-16 h-16 rounded-full border-4 border-white"
            />
          </div>
          <h3 className="text-xl font-semibold mt-4 text-green-500">Sunita Devi</h3>
          <p className="text-sm text-orange-700">Tomato Farmer, Rajshahi</p>
          <p className="text-gray-600 mt-4 italic">
            "The market linkage feature got me 20% higher prices than last year. I feel so empowered."
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <img
            src="/assets/Cotton.jpg"
            alt="Cotton Field"
            className="w-full h-40 object-cover rounded-xl"
          />
          <div className="flex justify-center -mt-8">
            <img
              src="/assets/avatermale.png"
              alt="Farmer"
              className="w-16 h-16 rounded-full border-4 border-white"
            />
          </div>
          <h3 className="text-xl font-semibold mt-4 text-green-500">Anand Patel</h3>
          <p className="text-sm text-orange-700">Cotton Farmer, Natore</p>
          <p className="text-gray-600 mt-4 italic">
            "I connected with experts who helped me solve a pest problem in days. My yield has never been better."
          </p>
        </div>
      </div>
    </section>
  );
}
