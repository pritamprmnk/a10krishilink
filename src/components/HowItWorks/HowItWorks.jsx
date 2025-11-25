export default function HowItWorks() {
  const steps = [
    {
      title: "1. Create Your Profile",
      description:
        "Sign up for free and set up your profile to start buying or selling.",
      icon: "👤",
    },
    {
      title: "2. List or Find Crops",
      description:
        "Easily post your harvest for sale or browse listings to find what you need.",
      icon: "📦",
    },
    {
      title: "3. Connect & Transact",
      description:
        "Communicate directly and complete transactions securely on the platform.",
      icon: "🤝",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-4 text-green-500">How It Works</h2>
        <p className="text-gray-600 mb-12">
          Connecting farmers and buyers in three easy steps.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl shadow-md hover:shadow-lg transition-all bg-green-50"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
