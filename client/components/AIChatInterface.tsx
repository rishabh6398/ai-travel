import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface ChatMessage {
  id: string;
  type: "ai" | "user";
  content: string;
  options?: TravelOption[];
}

interface TravelOption {
  id: string;
  title: string;
  details: string;
  price: string;
  booked: boolean;
}

const AIChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hello! I'm your AI travel assistant. Where would you like to travel? Tell me your origin, destination, and approximate budget.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "Here are some great travel options based on your preferences:",
        options: [
          {
            id: "opt1",
            title: "Option 1: Budget Train",
            details: "Train travel, hotel stay, and local cab for sightseeing.",
            price: "₹ 8,500",
            booked: false,
          },
          {
            id: "opt2",
            title: "Option 2: Flight + Hotel",
            details: "Flight travel with premium hotel accommodation.",
            price: "₹ 15,200",
            booked: false,
          },
          {
            id: "opt3",
            title: "Option 3: Luxury Package",
            details: "Premium flight, 5-star hotel, and private cab service.",
            price: "₹ 28,900",
            booked: false,
          },
        ],
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleBookOption = (messageId: string, optionId: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId && message.options
          ? {
              ...message,
              options: message.options.map((option) =>
                option.id === optionId ? { ...option, booked: true } : option,
              ),
            }
          : message,
      ),
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 text-center">
            Chat with Your Travel Agent AI
          </h2>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-full">
                <div
                  className={
                    message.type === "ai"
                      ? "chat-bubble-ai"
                      : "chat-bubble-user"
                  }
                >
                  {message.content}
                </div>

                {/* Travel Options */}
                {message.options && (
                  <div className="mt-3 space-y-3">
                    {message.options.map((option) => (
                      <div
                        key={option.id}
                        className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-w-md"
                      >
                        <h4 className="font-semibold text-slate-800 mb-1">
                          {option.title}
                        </h4>
                        <p className="text-slate-600 text-sm mb-2">
                          {option.details}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-green-600">
                            {option.price}
                          </span>
                          <button
                            onClick={() =>
                              handleBookOption(message.id, option.id)
                            }
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                              option.booked
                                ? "bg-green-600 text-white cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                            }`}
                            disabled={option.booked}
                          >
                            {option.booked ? "Booked" : "Book Now"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="chat-bubble-ai">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tell me about your travel plans..."
              className="flex-1 p-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;
