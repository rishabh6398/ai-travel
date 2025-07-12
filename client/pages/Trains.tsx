import { useState } from "react";
import {
  Search,
  Train,
  Calendar,
  Users,
  ArrowUpDown,
  Clock,
  Star,
  Wifi,
  Coffee,
  Utensils,
} from "lucide-react";

interface TrainSearchForm {
  from: string;
  to: string;
  journeyDate: string;
  passengers: number;
  class: string;
  quota: string;
}

interface TrainResult {
  id: string;
  trainName: string;
  trainNumber: string;
  from: string;
  to: string;
  fromCode: string;
  toCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  daysOfRun: string[];
  classes: {
    [key: string]: {
      available: number;
      price: number;
      waitingList?: number;
    };
  };
  amenities: string[];
  rating: number;
  punctuality: number;
}

const Trains = () => {
  const [searchForm, setSearchForm] = useState<TrainSearchForm>({
    from: "",
    to: "",
    journeyDate: "",
    passengers: 1,
    class: "SL",
    quota: "GN",
  });

  const [searchResults, setSearchResults] = useState<TrainResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const popularStations = [
    { name: "New Delhi", code: "NDLS" },
    { name: "Mumbai Central", code: "MMCT" },
    { name: "Bangalore City", code: "SBC" },
    { name: "Chennai Central", code: "MAS" },
    { name: "Kolkata", code: "KOAA" },
    { name: "Hyderabad", code: "SC" },
    { name: "Pune Junction", code: "PUNE" },
    { name: "Ahmedabad", code: "ADI" },
    { name: "Jaipur", code: "JP" },
    { name: "Lucknow", code: "LJN" },
    { name: "Patna Junction", code: "PNBE" },
    { name: "Bhopal", code: "BPL" },
  ];

  const trainClasses = [
    { code: "1A", name: "First AC", price: "₹₹₹₹" },
    { code: "2A", name: "Second AC", price: "₹₹₹" },
    { code: "3A", name: "Third AC", price: "₹₹" },
    { code: "SL", name: "Sleeper", price: "₹" },
    { code: "2S", name: "Second Sitting", price: "₹" },
    { code: "CC", name: "Chair Car", price: "₹₹" },
    { code: "EC", name: "Executive Chair", price: "₹₹₹" },
  ];

  const quotaTypes = [
    { code: "GN", name: "General" },
    { code: "TQ", name: "Tatkal" },
    { code: "LD", name: "Ladies" },
    { code: "SS", name: "Senior Citizen" },
    { code: "HP", name: "Handicapped" },
  ];

  const handleInputChange = (
    field: keyof TrainSearchForm,
    value: string | number,
  ) => {
    setSearchForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = async () => {
    if (!searchForm.from || !searchForm.to || !searchForm.journeyDate) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    // Simulate API call
    setTimeout(() => {
      const mockResults: TrainResult[] = [
        {
          id: "1",
          trainName: "Rajdhani Express",
          trainNumber: "12301",
          from: searchForm.from,
          to: searchForm.to,
          fromCode: "NDLS",
          toCode: "HWH",
          departureTime: "17:00",
          arrivalTime: "10:05+1",
          duration: "17h 05m",
          daysOfRun: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          classes: {
            "1A": { available: 12, price: 4825 },
            "2A": { available: 8, price: 2895 },
            "3A": { available: 15, price: 2035 },
          },
          amenities: ["WiFi", "Catering", "Pantry Car"],
          rating: 4.5,
          punctuality: 92,
        },
        {
          id: "2",
          trainName: "Shatabdi Express",
          trainNumber: "12002",
          from: searchForm.from,
          to: searchForm.to,
          fromCode: "NDLS",
          toCode: "KLK",
          departureTime: "06:00",
          arrivalTime: "14:25",
          duration: "8h 25m",
          daysOfRun: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          classes: {
            EC: { available: 25, price: 1650 },
            CC: { available: 18, price: 825 },
          },
          amenities: ["WiFi", "Meals", "Tea/Coffee"],
          rating: 4.3,
          punctuality: 89,
        },
        {
          id: "3",
          trainName: "Duronto Express",
          trainNumber: "12273",
          from: searchForm.from,
          to: searchForm.to,
          fromCode: "NDLS",
          toCode: "BCT",
          departureTime: "21:55",
          arrivalTime: "08:35+1",
          duration: "15h 40m",
          daysOfRun: ["Tue", "Thu", "Sun"],
          classes: {
            "1A": { available: 5, price: 3850 },
            "2A": { available: 12, price: 2195 },
            "3A": { available: 28, price: 1465 },
            SL: { available: 0, price: 565, waitingList: 45 },
          },
          amenities: ["Pantry Car", "Charging Points"],
          rating: 4.1,
          punctuality: 87,
        },
        {
          id: "4",
          trainName: "Humsafar Express",
          trainNumber: "12595",
          from: searchForm.from,
          to: searchForm.to,
          fromCode: "NDLS",
          toCode: "MAS",
          departureTime: "15:50",
          arrivalTime: "22:15+1",
          duration: "30h 25m",
          daysOfRun: ["Wed", "Sat"],
          classes: {
            "3A": { available: 35, price: 2850 },
          },
          amenities: ["WiFi", "Meals", "CCTV", "Fire Safety"],
          rating: 4.2,
          punctuality: 85,
        },
        {
          id: "5",
          trainName: "Jan Shatabdi Express",
          trainNumber: "12082",
          from: searchForm.from,
          to: searchForm.to,
          fromCode: "NDLS",
          toCode: "LKO",
          departureTime: "14:25",
          arrivalTime: "20:30",
          duration: "6h 05m",
          daysOfRun: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          classes: {
            CC: { available: 42, price: 485 },
            "2S": { available: 28, price: 145 },
          },
          amenities: ["Catering", "Tea/Coffee"],
          rating: 3.9,
          punctuality: 83,
        },
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2500);
  };

  const swapStations = () => {
    setSearchForm((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  const getAvailabilityStatus = (available: number, waitingList?: number) => {
    if (available > 20) return { text: "Available", color: "text-green-600" };
    if (available > 0)
      return { text: `${available} Left`, color: "text-orange-600" };
    if (waitingList)
      return { text: `WL ${waitingList}`, color: "text-red-600" };
    return { text: "Not Available", color: "text-gray-500" };
  };

  const getDayColor = (day: string, runsOn: string[]) => {
    return runsOn.includes(day) ? "text-green-600" : "text-gray-300";
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Book Train Tickets
          </h1>
          <p className="text-slate-600">
            Find and book train tickets across India
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* Search Fields */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {/* From */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                From
              </label>
              <div className="relative">
                <Train className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchForm.from}
                  onChange={(e) => handleInputChange("from", e.target.value)}
                  placeholder="New Delhi - NDLS"
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  list="fromStations"
                />
                <datalist id="fromStations">
                  {popularStations.map((station) => (
                    <option
                      key={station.code}
                      value={`${station.name} - ${station.code}`}
                    />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex items-end justify-center pb-3">
              <button
                onClick={swapStations}
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
                <Train className="absolute left-3 top-3 h-4 w-4 text-slate-400 rotate-180" />
                <input
                  type="text"
                  value={searchForm.to}
                  onChange={(e) => handleInputChange("to", e.target.value)}
                  placeholder="Mumbai Central - MMCT"
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  list="toStations"
                />
                <datalist id="toStations">
                  {popularStations.map((station) => (
                    <option
                      key={station.code}
                      value={`${station.name} - ${station.code}`}
                    />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Journey Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Journey Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="date"
                  value={searchForm.journeyDate}
                  onChange={(e) =>
                    handleInputChange("journeyDate", e.target.value)
                  }
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={new Date().toISOString().split("T")[0]}
                  max={
                    new Date(Date.now() + 120 * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split("T")[0]
                  }
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" />
                {isSearching ? "Searching..." : "Search Trains"}
              </button>
            </div>
          </div>

          {/* Additional Options */}
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
                  {[1, 2, 3, 4, 5, 6].map((num) => (
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
                {trainClasses.map((cls) => (
                  <option key={cls.code} value={cls.code}>
                    {cls.name} ({cls.code}) - {cls.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Quota
              </label>
              <select
                value={searchForm.quota}
                onChange={(e) => handleInputChange("quota", e.target.value)}
                className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {quotaTypes.map((quota) => (
                  <option key={quota.code} value={quota.code}>
                    {quota.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              {isSearching
                ? "Searching for trains..."
                : `Train Results (${searchResults.length} found)`}
            </h2>

            {isSearching ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-slate-600">
                  Finding the best trains for you...
                </span>
              </div>
            ) : (
              <div className="space-y-6">
                {searchResults.map((train) => (
                  <div
                    key={train.id}
                    className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    {/* Train Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div className="flex items-center gap-4 mb-3 md:mb-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Train className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">
                              {train.trainName}
                            </div>
                            <div className="text-sm text-slate-500">
                              {train.trainNumber}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-slate-600">
                              {train.rating}
                            </span>
                          </div>
                          <div className="text-sm text-slate-600">
                            {train.punctuality}% on time
                          </div>
                        </div>
                      </div>

                      {/* Days of Operation */}
                      <div className="flex gap-1">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                          (day) => (
                            <span
                              key={day}
                              className={`text-xs px-2 py-1 rounded ${getDayColor(day, train.daysOfRun)}`}
                            >
                              {day}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Journey Details */}
                    <div className="flex items-center gap-6 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-slate-900">
                          {train.departureTime}
                        </div>
                        <div className="text-sm text-slate-500">
                          {train.fromCode}
                        </div>
                      </div>

                      <div className="flex-1 text-center">
                        <div className="flex items-center justify-center gap-2 text-slate-500">
                          <div className="h-px bg-slate-300 flex-1"></div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span className="text-xs">{train.duration}</span>
                          </div>
                          <div className="h-px bg-slate-300 flex-1"></div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-lg font-semibold text-slate-900">
                          {train.arrivalTime}
                        </div>
                        <div className="text-sm text-slate-500">
                          {train.toCode}
                        </div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm text-slate-600">Amenities:</span>
                      <div className="flex items-center gap-3">
                        {train.amenities.includes("WiFi") && (
                          <Wifi className="h-4 w-4 text-blue-500" />
                        )}
                        {train.amenities.includes("Catering") && (
                          <Utensils className="h-4 w-4 text-green-500" />
                        )}
                        {train.amenities.includes("Tea/Coffee") && (
                          <Coffee className="h-4 w-4 text-brown-500" />
                        )}
                      </div>
                      <span className="text-xs text-slate-500">
                        {train.amenities.join(" • ")}
                      </span>
                    </div>

                    {/* Classes and Pricing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {Object.entries(train.classes).map(
                        ([classCode, classInfo]) => {
                          const status = getAvailabilityStatus(
                            classInfo.available,
                            classInfo.waitingList,
                          );
                          const className =
                            trainClasses.find((c) => c.code === classCode)
                              ?.name || classCode;

                          return (
                            <div
                              key={classCode}
                              className="border border-slate-200 rounded-lg p-3 bg-slate-50"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <div className="font-medium text-slate-900 text-sm">
                                    {className}
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    {classCode}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-slate-900">
                                    ₹{classInfo.price.toLocaleString()}
                                  </div>
                                  <div className={`text-xs ${status.color}`}>
                                    {status.text}
                                  </div>
                                </div>
                              </div>
                              <button
                                disabled={
                                  classInfo.available === 0 &&
                                  !classInfo.waitingList
                                }
                                className="w-full bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                              >
                                {classInfo.available > 0
                                  ? "Book Now"
                                  : classInfo.waitingList
                                    ? "Join Waitlist"
                                    : "Not Available"}
                              </button>
                            </div>
                          );
                        },
                      )}
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
            <Train className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Ready to find your train?
            </h3>
            <p className="text-slate-500">
              Enter your journey details above and we'll show you all available
              trains.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trains;
