import { useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  Wifi,
  Car,
  Coffee,
  Shield,
  Utensils,
  Wind,
  Tv,
  Bath,
  Phone,
  Heart,
  Filter,
  ChevronDown,
  ChevronUp,
  ImageIcon,
} from "lucide-react";

interface HotelSearchForm {
  location: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  guests: number;
}

interface Hotel {
  id: string;
  name: string;
  brand: "OYO" | "Premium" | "Townhouse" | "Capital O";
  location: string;
  address: string;
  distance: string;
  rating: number;
  reviewCount: number;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  images: string[];
  amenities: string[];
  features: string[];
  roomTypes: RoomType[];
  cancellationPolicy: string;
  checkInTime: string;
  checkOutTime: string;
  available: boolean;
}

interface RoomType {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  maxGuests: number;
  amenities: string[];
  available: boolean;
  roomsLeft: number;
}

const Hotels = () => {
  const [searchForm, setSearchForm] = useState<HotelSearchForm>({
    location: "",
    checkIn: "",
    checkOut: "",
    rooms: 1,
    guests: 2,
  });

  const [searchResults, setSearchResults] = useState<Hotel[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");

  const popularDestinations = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Goa",
    "Udaipur",
    "Agra",
    "Manali",
    "Shimla",
    "Rishikesh",
    "Haridwar",
  ];

  const amenitiesFilter = [
    "Free WiFi",
    "AC",
    "TV",
    "Parking",
    "Restaurant",
    "Room Service",
    "Gym",
    "Swimming Pool",
    "Breakfast",
    "Power Backup",
  ];

  const brandFilter = ["OYO", "Premium", "Townhouse", "Capital O"];

  const handleInputChange = (
    field: keyof HotelSearchForm,
    value: string | number,
  ) => {
    setSearchForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = async () => {
    if (!searchForm.location || !searchForm.checkIn || !searchForm.checkOut) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    // Simulate API call
    setTimeout(() => {
      const mockResults: Hotel[] = [
        {
          id: "1",
          name: "OYO 123 Hotel Paradise",
          brand: "OYO",
          location: searchForm.location,
          address: "Near Metro Station, Central Delhi",
          distance: "2.5 km from city center",
          rating: 4.2,
          reviewCount: 1250,
          originalPrice: 2500,
          discountedPrice: 1499,
          discount: 40,
          images: [
            "/api/placeholder/400/300",
            "/api/placeholder/400/300",
            "/api/placeholder/400/300",
          ],
          amenities: ["Free WiFi", "AC", "TV", "Parking"],
          features: ["Couple Friendly", "Pay at Hotel", "Free Cancellation"],
          roomTypes: [
            {
              id: "r1",
              name: "Classic Room",
              description: "Comfortable room with basic amenities",
              price: 1499,
              originalPrice: 2500,
              maxGuests: 2,
              amenities: ["AC", "TV", "WiFi"],
              available: true,
              roomsLeft: 3,
            },
            {
              id: "r2",
              name: "Deluxe Room",
              description: "Spacious room with premium amenities",
              price: 1899,
              originalPrice: 3000,
              maxGuests: 3,
              amenities: ["AC", "TV", "WiFi", "Mini Fridge"],
              available: true,
              roomsLeft: 2,
            },
          ],
          cancellationPolicy: "Free cancellation till 6 PM",
          checkInTime: "12:00 PM",
          checkOutTime: "11:00 AM",
          available: true,
        },
        {
          id: "2",
          name: "OYO Townhouse 456 Elite",
          brand: "Townhouse",
          location: searchForm.location,
          address: "Business District, Prime Location",
          distance: "1.2 km from city center",
          rating: 4.5,
          reviewCount: 890,
          originalPrice: 4000,
          discountedPrice: 2799,
          discount: 30,
          images: [
            "/api/placeholder/400/300",
            "/api/placeholder/400/300",
            "/api/placeholder/400/300",
          ],
          amenities: ["Free WiFi", "AC", "TV", "Parking", "Restaurant", "Gym"],
          features: ["Business Friendly", "Pay at Hotel", "Breakfast Included"],
          roomTypes: [
            {
              id: "r3",
              name: "Superior Room",
              description: "Premium room with city view",
              price: 2799,
              originalPrice: 4000,
              maxGuests: 2,
              amenities: ["AC", "TV", "WiFi", "Mini Bar"],
              available: true,
              roomsLeft: 5,
            },
          ],
          cancellationPolicy: "Free cancellation till 4 PM",
          checkInTime: "2:00 PM",
          checkOutTime: "12:00 PM",
          available: true,
        },
        {
          id: "3",
          name: "Capital O 789 Grand Stay",
          brand: "Capital O",
          location: searchForm.location,
          address: "Airport Road, Near Shopping Mall",
          distance: "3.8 km from city center",
          rating: 4.7,
          reviewCount: 2100,
          originalPrice: 5500,
          discountedPrice: 3999,
          discount: 27,
          images: [
            "/api/placeholder/400/300",
            "/api/placeholder/400/300",
            "/api/placeholder/400/300",
          ],
          amenities: [
            "Free WiFi",
            "AC",
            "TV",
            "Parking",
            "Restaurant",
            "Room Service",
            "Swimming Pool",
            "Gym",
          ],
          features: [
            "Luxury Experience",
            "24/7 Service",
            "Complimentary Breakfast",
          ],
          roomTypes: [
            {
              id: "r4",
              name: "Executive Room",
              description: "Luxurious room with premium facilities",
              price: 3999,
              originalPrice: 5500,
              maxGuests: 2,
              amenities: ["AC", "TV", "WiFi", "Mini Bar", "Room Service"],
              available: true,
              roomsLeft: 4,
            },
            {
              id: "r5",
              name: "Suite",
              description: "Spacious suite with living area",
              price: 5999,
              originalPrice: 8000,
              maxGuests: 4,
              amenities: [
                "AC",
                "TV",
                "WiFi",
                "Mini Bar",
                "Room Service",
                "Balcony",
              ],
              available: true,
              roomsLeft: 1,
            },
          ],
          cancellationPolicy: "Free cancellation till 2 PM",
          checkInTime: "3:00 PM",
          checkOutTime: "12:00 PM",
          available: true,
        },
        {
          id: "4",
          name: "OYO Premium 321 Royal",
          brand: "Premium",
          location: searchForm.location,
          address: "Heritage Area, Old City",
          distance: "4.2 km from city center",
          rating: 4.0,
          reviewCount: 567,
          originalPrice: 3200,
          discountedPrice: 2299,
          discount: 28,
          images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
          amenities: ["Free WiFi", "AC", "TV", "Parking", "Restaurant"],
          features: ["Heritage Property", "Pay at Hotel", "Pet Friendly"],
          roomTypes: [
            {
              id: "r6",
              name: "Heritage Room",
              description: "Traditional room with modern amenities",
              price: 2299,
              originalPrice: 3200,
              maxGuests: 2,
              amenities: ["AC", "TV", "WiFi"],
              available: false,
              roomsLeft: 0,
            },
          ],
          cancellationPolicy: "Free cancellation till 8 PM",
          checkInTime: "1:00 PM",
          checkOutTime: "11:00 AM",
          available: false,
        },
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2500);
  };

  const getBrandColor = (brand: string) => {
    switch (brand) {
      case "OYO":
        return "bg-red-500 text-white";
      case "Premium":
        return "bg-purple-500 text-white";
      case "Townhouse":
        return "bg-blue-500 text-white";
      case "Capital O":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const calculateNights = () => {
    if (!searchForm.checkIn || !searchForm.checkOut) return 1;
    const checkIn = new Date(searchForm.checkIn);
    const checkOut = new Date(searchForm.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Book Hotels
          </h1>
          <p className="text-slate-600">
            Find and book comfortable stays at the best prices
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            {/* Location */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchForm.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="Delhi, Mumbai, Goa..."
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  list="locations"
                />
                <datalist id="locations">
                  {popularDestinations.map((destination) => (
                    <option key={destination} value={destination} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Check-in */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Check-in
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="date"
                  value={searchForm.checkIn}
                  onChange={(e) => handleInputChange("checkIn", e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            {/* Check-out */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Check-out
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="date"
                  value={searchForm.checkOut}
                  onChange={(e) =>
                    handleInputChange("checkOut", e.target.value)
                  }
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  min={
                    searchForm.checkIn || new Date().toISOString().split("T")[0]
                  }
                />
              </div>
            </div>

            {/* Rooms & Guests */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Rooms & Guests
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={searchForm.rooms}
                  onChange={(e) =>
                    handleInputChange("rooms", parseInt(e.target.value))
                  }
                  className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} Room{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <select
                    value={searchForm.guests}
                    onChange={(e) =>
                      handleInputChange("guests", parseInt(e.target.value))
                    }
                    className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} Guest{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <Search className="h-4 w-4" />
                {isSearching ? "Searching..." : "Search Hotels"}
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        {hasSearched && (
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              <Filter className="h-4 w-4" />
              Filters
              {showFilters ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="distance">Distance</option>
            </select>
          </div>
        )}

        {/* Filters Panel */}
        {showFilters && hasSearched && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">
                  Price Range
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full"
                  />
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Amenities</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {amenitiesFilter.map((amenity) => (
                    <label key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAmenities([
                              ...selectedAmenities,
                              amenity,
                            ]);
                          } else {
                            setSelectedAmenities(
                              selectedAmenities.filter((a) => a !== amenity),
                            );
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-slate-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Brand</h3>
                <div className="space-y-2">
                  {brandFilter.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBrands([...selectedBrands, brand]);
                          } else {
                            setSelectedBrands(
                              selectedBrands.filter((b) => b !== brand),
                            );
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-slate-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setPriceRange([0, 5000]);
                    setSelectedAmenities([]);
                    setSelectedBrands([]);
                  }}
                  className="text-red-500 hover:text-red-600 text-sm font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {hasSearched && (
          <div>
            {isSearching ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                <span className="ml-3 text-slate-600">
                  Finding the best hotels for you...
                </span>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {searchResults.length} hotels found in {searchForm.location}
                  </h2>
                  <span className="text-sm text-slate-600">
                    {calculateNights()} night{calculateNights() > 1 ? "s" : ""}
                  </span>
                </div>

                {searchResults.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
                      {/* Hotel Images */}
                      <div className="relative">
                        <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden bg-slate-200">
                          <div className="w-full h-48 bg-slate-200 rounded-lg flex items-center justify-center">
                            <ImageIcon className="h-12 w-12 text-slate-400" />
                          </div>
                        </div>
                        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                          <Heart className="h-4 w-4 text-slate-400" />
                        </button>
                        <div
                          className={`absolute bottom-2 left-2 px-2 py-1 rounded text-xs font-medium ${getBrandColor(hotel.brand)}`}
                        >
                          {hotel.brand}
                        </div>
                      </div>

                      {/* Hotel Details */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {hotel.name}
                          </h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">
                              {hotel.rating}
                            </span>
                            <span className="text-xs text-slate-500">
                              ({hotel.reviewCount})
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-slate-600 mb-1">
                          {hotel.address}
                        </p>
                        <p className="text-xs text-slate-500 mb-3">
                          {hotel.distance}
                        </p>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {hotel.amenities.slice(0, 4).map((amenity, index) => (
                            <span
                              key={index}
                              className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded"
                            >
                              {amenity}
                            </span>
                          ))}
                          {hotel.amenities.length > 4 && (
                            <span className="text-xs text-slate-500">
                              +{hotel.amenities.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                          {hotel.features.map((feature, index) => (
                            <span
                              key={index}
                              className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Check-in/out times */}
                        <div className="mt-3 text-xs text-slate-500">
                          Check-in: {hotel.checkInTime} | Check-out:{" "}
                          {hotel.checkOutTime}
                        </div>
                      </div>

                      {/* Pricing and Booking */}
                      <div className="text-right">
                        <div className="mb-2">
                          <div className="text-xs text-slate-500 line-through">
                            ₹{hotel.originalPrice}
                          </div>
                          <div className="text-2xl font-bold text-slate-900">
                            ₹{hotel.discountedPrice}
                          </div>
                          <div className="text-xs text-slate-600">
                            per night + taxes
                          </div>
                          <div className="text-xs text-green-600">
                            {hotel.discount}% OFF
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="text-sm font-medium text-slate-900">
                            Total: ₹
                            {(
                              hotel.discountedPrice * calculateNights()
                            ).toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500">
                            for {calculateNights()} night
                            {calculateNights() > 1 ? "s" : ""}
                          </div>
                        </div>

                        {hotel.available ? (
                          <div className="space-y-2">
                            <button
                              onClick={() => setSelectedHotel(hotel.id)}
                              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                            >
                              Book Now
                            </button>
                            <button className="w-full border border-slate-300 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors text-sm">
                              View Details
                            </button>
                          </div>
                        ) : (
                          <button
                            disabled
                            className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed text-sm"
                          >
                            Sold Out
                          </button>
                        )}

                        <p className="text-xs text-slate-500 mt-2">
                          {hotel.cancellationPolicy}
                        </p>
                      </div>
                    </div>

                    {/* Room Types (Expanded) */}
                    {selectedHotel === hotel.id && (
                      <div className="border-t border-slate-200 p-6">
                        <h4 className="font-semibold text-slate-900 mb-4">
                          Available Rooms
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {hotel.roomTypes.map((room) => (
                            <div
                              key={room.id}
                              className="border border-slate-200 rounded-lg p-4"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h5 className="font-medium text-slate-900">
                                    {room.name}
                                  </h5>
                                  <p className="text-sm text-slate-600">
                                    {room.description}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    Max {room.maxGuests} guests
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-slate-900">
                                    ₹{room.price}
                                  </div>
                                  <div className="text-xs text-slate-500 line-through">
                                    ₹{room.originalPrice}
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-1 mb-3">
                                {room.amenities.map((amenity, index) => (
                                  <span
                                    key={index}
                                    className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
                                  >
                                    {amenity}
                                  </span>
                                ))}
                              </div>

                              {room.available ? (
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-green-600">
                                    {room.roomsLeft} rooms left
                                  </span>
                                  <button className="bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600">
                                    Select
                                  </button>
                                </div>
                              ) : (
                                <span className="text-sm text-red-600">
                                  Sold Out
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!hasSearched && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Find your perfect stay
            </h3>
            <p className="text-slate-500">
              Search for hotels in your destination and discover amazing deals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;
