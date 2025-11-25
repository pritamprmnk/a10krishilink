export default function ModernTrade() {
  return (
    <section className="bg-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            The Modern Way to Trade
          </h2>
          <p className="text-gray-600 mb-8">
            We provide the tools and technology to make agricultural trading more
            efficient, profitable, and secure for everyone.
          </p>

          <div className="space-y-6">
            {/* Feature 1 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl">
                ✓
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Wide Market Reach</h4>
                <p className="text-gray-600 text-sm">
                  Connect with a national network of verified buyers and sellers,
                  expanding your opportunities beyond local markets.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl">
                🔒
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Secure Transactions</h4>
                <p className="text-gray-600 text-sm">
                  Our platform facilitates secure communication and payments,
                  giving you peace of mind with every deal.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl">
                📊
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Market Insights</h4>
                <p className="text-gray-600 text-sm">
                  Access real-time data and pricing trends to make informed
                  decisions and maximize your profitability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div>
          <img
            src="/assets/Trending.png"
            alt="Farmer using drone"
            className="rounded-3xl w-full object-cover shadow"
          />
        </div>
      </div>
    </section>
  );
}