import AIChatInterface from "../components/AIChatInterface";
import HowItWorks from "../components/HowItWorks";

export default function Index() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Your Dream Trip,{" "}
            <span className="text-blue-500">Planned by AI</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-12">
            Tell us where you want to go and your budget. Our AI will craft
            personalized travel plans, which you can book with a single click.
          </p>

          {/* AI Chat Interface */}
          <AIChatInterface />
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />
    </div>
  );
}
