import { useState } from "react";
import {
  Search,
  Plane,
  Calendar,
  Users,
  ArrowUpDown,
  Clock,
  Star,
} from "lucide-react";

interface FlightSearchForm {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  class: string;
  tripType: "oneWay" | "roundTrip";
}

interface FlightResult {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: number;
  aircraft: string;
  rating: number;
}

const Flights = () => {
  const [searchForm, setSearchForm] = useState<FlightSearchForm>({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    class: "Economy",
    tripType: "roundTrip",
  });

  const [searchResults, setSearchResults] = useState<FlightResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const popularCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Goa",
    "Kochi",
    "Chandigarh",
  ];

  const handleInputChange = (
    field: keyof FlightSearchForm,
    value: string | number,
  ) => {
    setSearchForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = async () => {
    if (!searchForm.from || !searchForm.to || !searchForm.departureDate) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    // Simulate API call
    setTimeout(() => {
      const mockResults: FlightResult[] = [
        {
          id: "1",
          airline: "IndiGo",
          flightNumber: "6E 6117",
          from: searchForm.from,
          to: searchForm.to,
          departureTime: "06:10",
          arrivalTime: "08:35",
          duration: "2h 25m",
          price: 4850,
          stops: 0,
          aircraft: "A320",
          rating: 4.2,
        },
        {
          id: "2",
          airline: "Air India",
          flightNumber: "AI 131",
          from: searchForm.from,
          to: searchForm.to,
          departureTime: "09:15",
          arrivalTime: "11:50",
          duration: "2h 35m",
          price: 5200,
          stops: 0,
          aircraft: "A321",
          rating: 4.0,
        },
        {
          id: "3",
          airline: "SpiceJet",
          flightNumber: "SG 8709",
          from: searchForm.from,
          to: searchForm.to,
          departureTime: "13:20",
          arrivalTime: "15:55",
          duration: "2h 35m",
          price: 4320,
          stops: 0,
          aircraft: "B737",
          rating: 3.8,
        },
        {
          id: "4",
          airline: "Vistara",
          flightNumber: "UK 995",
          from: searchForm.from,
          to: searchForm.to,
          departureTime: "18:30",
          arrivalTime: "21:10",
          duration: "2h 40m",
          price: 6800,
          stops: 0,
          aircraft: "A320neo",
          rating: 4.5,
        },
        {
          id: "5",
          airline: "GoAir",
          flightNumber: "G8 2133",
          from: searchForm.from,
          to: searchForm.to,
          departureTime: "21:45",
          arrivalTime: "00:20+1",
          duration: "2h 35m",
          price: 3850,
          stops: 0,
          aircraft: "A320",
          rating: 3.6,
        },
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  const swapCities = () => {
    setSearchForm((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Book Flights
          </h1>
          <p className="text-slate-600">
            Find and book the best flights for your journey
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* Trip Type Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => handleInputChange("tripType", "roundTrip")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                searchForm.tripType === "roundTrip"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Round Trip
            </button>
            <button
              onClick={() => handleInputChange("tripType", "oneWay")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                searchForm.tripType === "oneWay"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              One Way
            </button>
          </div>

          {/* Search Fields */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {/* From */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                From
              </label>
              <div className="relative">
                <Plane className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchForm.from}
                  onChange={(e) => handleInputChange("from", e.target.value)}
                  placeholder="Delhi"
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  list="fromCities"
                />
                <datalist id="fromCities">
                  {popularCities.map((city) => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex items-end justify-center pb-3">
              <button
                onClick={swapCities}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
              >
                <ArrowUpDown className="h-5 w-5" />
              </button>
            </div>

            {/* To */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                To
              </label>
              <div className="relative">
                <Plane className="absolute left-3 top-3 h-4 w-4 text-slate-400 rotate-90" />
                <input
                  type="text"
                  value={searchForm.to}
                  onChange={(e) => handleInputChange("to", e.target.value)}
                  placeholder="Mumbai"
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  list="toCities"
                />
                <datalist id="toCities">
                  {popularCities.map((city) => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Departure Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Departure
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="date"
                  value={searchForm.departureDate}
                  onChange={(e) =>
                    handleInputChange("departureDate", e.target.value)
                  }
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {/* Return Date */}
            {searchForm.tripType === "roundTrip" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Return
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="date"
                    value={searchForm.returnDate}
                    onChange={(e) =>
                      handleInputChange("returnDate", e.target.value)
                    }
                    className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={
                      searchForm.departureDate ||
                      new Date().toISOString().split("T")[0]
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {/* Passengers and Class */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Passengers
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <select
                  value={searchForm.passengers}
                  onChange={(e) =>
                    handleInputChange("passengers", parseInt(e.target.value))
                  }
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Passenger" : "Passengers"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Class
              </label>
              <select
                value={searchForm.class}
                onChange={(e) => handleInputChange("class", e.target.value)}
                className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business</option>
                <option value="First">First Class</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" />
                {isSearching ? "Searching..." : "Search Flights"}
              </button>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              {isSearching
                ? "Searching for flights..."
                : `Flight Results (${searchResults.length} found)`}
            </h2>

            {isSearching ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-slate-600">
                  Finding the best flights for you...
                </span>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((flight) => (
                  <div
                    key={flight.id}
                    className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Plane className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-slate-900">
                                {flight.airline}
                              </div>
                              <div className="text-sm text-slate-500">
                                {flight.flightNumber} • {flight.aircraft}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-slate-600">
                              {flight.rating}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="text-lg font-semibold text-slate-900">
                              {flight.departureTime}
                            </div>
                            <div className="text-sm text-slate-500">
                              {flight.from}
                            </div>
                          </div>

                          <div className="flex-1 text-center">
                            <div className="flex items-center justify-center gap-2 text-slate-500">
                              <div className="h-px bg-slate-300 flex-1"></div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span className="text-xs">
                                  {flight.duration}
                                </span>
                              </div>
                              <div className="h-px bg-slate-300 flex-1"></div>
                            </div>
                            <div className="text-xs text-slate-500 mt-1">
                              {flight.stops === 0
                                ? "Non-stop"
                                : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-lg font-semibold text-slate-900">
                              {flight.arrivalTime}
                            </div>
                            <div className="text-sm text-slate-500">
                              {flight.to}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0 md:ml-6 text-right">
                        <div className="text-2xl font-bold text-slate-900">
                          ₹{flight.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-500 mb-3">
                          per person
                        </div>
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                          Select Flight
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!hasSearched && (
          <div className="text-center py-12">
            <Plane className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Ready to find your perfect flight?
            </h3>
            <p className="text-slate-500">
              Enter your travel details above and we'll show you the best
              options available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flights;
