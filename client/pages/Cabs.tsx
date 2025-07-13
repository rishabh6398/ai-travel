import { useState } from "react";
import {
  Search,
  Car,
  Calendar,
  Clock,
  MapPin,
  ArrowUpDown,
  Users,
  Star,
  Phone,
  Shield,
  Fuel,
  Navigation,
  CreditCard,
  Timer,
} from "lucide-react";

interface CabSearchForm {
  serviceType: "local" | "outstation";
  tripType: "oneWay" | "roundTrip";
  pickup: string;
  drop: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  passengers: number;
}

interface CabOption {
  id: string;
  carType: string;
  carModel: string;
  carImage: string;
  seatingCapacity: number;
  fuelType: string;
  features: string[];
  pricePerKm: number;
  baseFare: number;
  estimatedFare: number;
  estimatedTime: string;
  driverRating: number;
  driverName: string;
  driverExperience: string;
  carNumber: string;
  available: boolean;
  cancellationPolicy: string;
}

const Cabs = () => {
  const [searchForm, setSearchForm] = useState<CabSearchForm>({
    serviceType: "local",
    tripType: "oneWay",
    pickup: "",
    drop: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
    returnTime: "",
    passengers: 1,
  });

  const [searchResults, setSearchResults] = useState<CabOption[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCab, setSelectedCab] = useState<string | null>(null);

  const popularLocations = [
    "Delhi Airport (DEL)",
    "Mumbai Airport (BOM)",
    "Bangalore Airport (BLR)",
    "Chennai Airport (MAA)",
    "Connaught Place, Delhi",
    "Bandra, Mumbai",
    "Koramangala, Bangalore",
    "T. Nagar, Chennai",
    "Gurgaon Cyber City",
    "Whitefield, Bangalore",
    "Andheri, Mumbai",
    "Hyderabad Airport (HYD)",
  ];

  const cabTypes = [
    {
      type: "Hatchback",
      examples: "Swift, i10, Wagon R",
      capacity: "4 seater",
      luggage: "2 bags",
    },
    {
      type: "Sedan",
      examples: "Dzire, Amaze, Aspire",
      capacity: "4 seater",
      luggage: "3 bags",
    },
    {
      type: "SUV",
      examples: "Ertiga, Innova, XUV500",
      capacity: "6-7 seater",
      luggage: "4-5 bags",
    },
    {
      type: "Luxury",
      examples: "Camry, BMW, Audi",
      capacity: "4 seater",
      luggage: "3 bags",
    },
  ];

  const handleInputChange = (
    field: keyof CabSearchForm,
    value: string | number,
  ) => {
    setSearchForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = async () => {
    if (!searchForm.pickup || !searchForm.drop || !searchForm.pickupDate) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    // Simulate API call
    setTimeout(() => {
      const mockResults: CabOption[] = [
        {
          id: "1",
          carType: "Hatchback",
          carModel: "Maruti Swift",
          carImage: "/api/placeholder/300/200",
          seatingCapacity: 4,
          fuelType: "Petrol",
          features: ["AC", "Music System", "Clean Interior"],
          pricePerKm: 12,
          baseFare: 80,
          estimatedFare: 450,
          estimatedTime: "25 mins",
          driverRating: 4.2,
          driverName: "Rajesh Kumar",
          driverExperience: "5 years",
          carNumber: "DL 01 AB 1234",
          available: true,
          cancellationPolicy: "Free cancellation up to 1 hour before pickup",
        },
        {
          id: "2",
          carType: "Sedan",
          carModel: "Maruti Dzire",
          carImage: "/api/placeholder/300/200",
          seatingCapacity: 4,
          fuelType: "CNG",
          features: ["AC", "Music System", "Mobile Charger", "Clean Interior"],
          pricePerKm: 14,
          baseFare: 100,
          estimatedFare: 520,
          estimatedTime: "22 mins",
          driverRating: 4.5,
          driverName: "Amit Singh",
          driverExperience: "7 years",
          carNumber: "DL 05 CD 5678",
          available: true,
          cancellationPolicy: "Free cancellation up to 1 hour before pickup",
        },
        {
          id: "3",
          carType: "SUV",
          carModel: "Toyota Innova",
          carImage: "/api/placeholder/300/200",
          seatingCapacity: 7,
          fuelType: "Diesel",
          features: [
            "AC",
            "Music System",
            "Mobile Charger",
            "Extra Luggage Space",
            "Reclining Seats",
          ],
          pricePerKm: 18,
          baseFare: 150,
          estimatedFare: 720,
          estimatedTime: "20 mins",
          driverRating: 4.7,
          driverName: "Suresh Sharma",
          driverExperience: "10 years",
          carNumber: "DL 07 EF 9012",
          available: true,
          cancellationPolicy: "Free cancellation up to 2 hours before pickup",
        },
        {
          id: "4",
          carType: "Luxury",
          carModel: "Toyota Camry",
          carImage: "/api/placeholder/300/200",
          seatingCapacity: 4,
          fuelType: "Petrol",
          features: [
            "Premium AC",
            "Premium Music System",
            "Leather Seats",
            "Complimentary Water",
            "Wi-Fi",
            "Phone Charger",
          ],
          pricePerKm: 25,
          baseFare: 250,
          estimatedFare: 1200,
          estimatedTime: "18 mins",
          driverRating: 4.9,
          driverName: "Vikram Mehta",
          driverExperience: "12 years",
          carNumber: "DL 02 GH 3456",
          available: true,
          cancellationPolicy: "Free cancellation up to 4 hours before pickup",
        },
        {
          id: "5",
          carType: "Hatchback",
          carModel: "Hyundai i10",
          carImage: "/api/placeholder/300/200",
          seatingCapacity: 4,
          fuelType: "Petrol",
          features: ["AC", "Music System"],
          pricePerKm: 11,
          baseFare: 70,
          estimatedFare: 420,
          estimatedTime: "28 mins",
          driverRating: 4.0,
          driverName: "Manoj Gupta",
          driverExperience: "3 years",
          carNumber: "DL 03 IJ 7890",
          available: false,
          cancellationPolicy:
            "Free cancellation up to 30 minutes before pickup",
        },
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  const swapLocations = () => {
    setSearchForm((prev) => ({
      ...prev,
      pickup: prev.drop,
      drop: prev.pickup,
    }));
  };

  const formatTime = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Book Cabs</h1>
          <p className="text-slate-600">
            Comfortable and reliable cab service for all your travel needs
          </p>
        </div>

        {/* Service Type Selection */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => handleInputChange("serviceType", "local")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                searchForm.serviceType === "local"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Local Trips
            </button>
            <button
              onClick={() => handleInputChange("serviceType", "outstation")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                searchForm.serviceType === "outstation"
                  ? "bg-blue-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Outstation Trips
            </button>
          </div>

          {/* Trip Type for Outstation */}
          {searchForm.serviceType === "outstation" && (
            <div className="flex gap-4 mb-6">
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
            </div>
          )}

          {/* Location Selection */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {/* Pickup */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Pickup Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                <input
                  type="text"
                  value={searchForm.pickup}
                  onChange={(e) => handleInputChange("pickup", e.target.value)}
                  placeholder="Enter pickup location"
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  list="pickupLocations"
                />
                <datalist id="pickupLocations">
                  {popularLocations.map((location) => (
                    <option key={location} value={location} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex items-end justify-center pb-3">
              <button
                onClick={swapLocations}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
              >
                <ArrowUpDown className="h-5 w-5" />
              </button>
            </div>

            {/* Drop */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Drop Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-red-500" />
                <input
                  type="text"
                  value={searchForm.drop}
                  onChange={(e) => handleInputChange("drop", e.target.value)}
                  placeholder="Enter drop location"
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  list="dropLocations"
                />
                <datalist id="dropLocations">
                  {popularLocations.map((location) => (
                    <option key={location} value={location} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Pickup Date & Time */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Pickup Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="date"
                  value={searchForm.pickupDate}
                  onChange={(e) =>
                    handleInputChange("pickupDate", e.target.value)
                  }
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Pickup Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="time"
                  value={searchForm.pickupTime}
                  onChange={(e) =>
                    handleInputChange("pickupTime", e.target.value)
                  }
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Return Date & Time for Round Trip */}
          {searchForm.serviceType === "outstation" &&
            searchForm.tripType === "roundTrip" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Return Date
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
                        searchForm.pickupDate ||
                        new Date().toISOString().split("T")[0]
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Return Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="time"
                      value={searchForm.returnTime}
                      onChange={(e) =>
                        handleInputChange("returnTime", e.target.value)
                      }
                      className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    <Search className="h-4 w-4" />
                    {isSearching ? "Searching..." : "Search Cabs"}
                  </button>
                </div>
              </div>
            )}

          {/* Passengers and Search for non-round-trip */}
          {!(
            searchForm.serviceType === "outstation" &&
            searchForm.tripType === "roundTrip"
          ) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Passenger" : "Passengers"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div></div>

              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  {isSearching ? "Searching..." : "Search Cabs"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Car Types Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Available Car Types
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {cabTypes.map((type, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
              >
                <Car className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h4 className="font-semibold text-slate-900 mb-1">
                  {type.type}
                </h4>
                <p className="text-sm text-slate-600 mb-2">{type.examples}</p>
                <div className="text-xs text-slate-500">
                  <div>{type.capacity}</div>
                  <div>{type.luggage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              {isSearching
                ? "Finding available cabs..."
                : `Available Cabs (${searchResults.length} found)`}
            </h2>

            {isSearching ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-slate-600">
                  Finding the best cabs for you...
                </span>
              </div>
            ) : (
              <div className="space-y-6">
                {searchResults.map((cab) => (
                  <div
                    key={cab.id}
                    className={`border rounded-lg p-6 transition-all ${
                      selectedCab === cab.id
                        ? "border-blue-500 shadow-md"
                        : "border-slate-200 hover:shadow-md"
                    } ${!cab.available ? "opacity-60" : ""}`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Car Details */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                            <Car className="h-8 w-8 text-slate-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-slate-900">
                                {cab.carModel}
                              </h3>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  cab.available
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {cab.available ? "Available" : "Booked"}
                              </span>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">
                              {cab.carType} • {cab.carNumber}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {cab.seatingCapacity} seater
                              </div>
                              <div className="flex items-center gap-1">
                                <Fuel className="h-3 w-3" />
                                {cab.fuelType}
                              </div>
                              <div className="flex items-center gap-1">
                                <Timer className="h-3 w-3" />
                                {cab.estimatedTime}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {cab.features.map((feature, index) => (
                                <span
                                  key={index}
                                  className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Driver Details */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold text-slate-600">
                              {cab.driverName.split(" ").map((n) => n[0])}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {cab.driverName}
                            </p>
                            <p className="text-xs text-slate-500">
                              {cab.driverExperience} experience
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-slate-600">
                            {cab.driverRating} rating
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-500" />
                          <span className="text-xs text-slate-500">
                            Verified Driver
                          </span>
                        </div>
                      </div>

                      {/* Pricing and Booking */}
                      <div className="text-right">
                        <div className="mb-3">
                          <div className="text-2xl font-bold text-slate-900">
                            ₹{cab.estimatedFare}
                          </div>
                          <div className="text-xs text-slate-500">
                            ₹{cab.pricePerKm}/km + ₹{cab.baseFare} base fare
                          </div>
                        </div>

                        {cab.available ? (
                          <div className="space-y-2">
                            <button
                              onClick={() => setSelectedCab(cab.id)}
                              className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                                selectedCab === cab.id
                                  ? "bg-blue-500 text-white"
                                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                              }`}
                            >
                              {selectedCab === cab.id
                                ? "Selected"
                                : "Select Cab"}
                            </button>
                            {selectedCab === cab.id && (
                              <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                                Book Now
                              </button>
                            )}
                          </div>
                        ) : (
                          <button
                            disabled
                            className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed"
                          >
                            Not Available
                          </button>
                        )}

                        <p className="text-xs text-slate-500 mt-2">
                          {cab.cancellationPolicy}
                        </p>
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
            <Car className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Ready to book your ride?
            </h3>
            <p className="text-slate-500">
              Enter your pickup and drop locations to find available cabs.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cabs;
