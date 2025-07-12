const HowItWorks = () => {
  const steps = [
    {
      icon: "💬",
      title: "1. Tell Us Your Needs",
      description:
        "Share your travel destination, budget, and preferences with our AI assistant. The more details you provide, the better recommendations you'll get.",
    },
    {
      icon: "📋",
      title: "2. Get Personalized Options",
      description:
        "Our AI analyzes thousands of travel options to create personalized packages that match your budget and preferences perfectly.",
    },
    {
      icon: "🖱️",
      title: "3. Book with One Click",
      description:
        "Choose your favorite option and book everything instantly. No need to visit multiple websites or make separate reservations.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Planning your perfect trip has never been easier. Our AI does all
            the heavy lifting for you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-slate-50 p-8 rounded-lg border border-slate-200 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
