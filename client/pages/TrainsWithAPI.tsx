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
  AlertCircle,
} from "lucide-react";
import { trainApi, handleApiError } from "../services/api";

// ... (keep all the existing interfaces and constants)

const TrainsWithAPI = () => {
  const [searchForm, setSearchForm] = useState({
    from: "",
    to: "",
    journeyDate: "",
    passengers: 1,
    class: "SL",
    quota: "GN",
  });

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  // ... (keep all the existing constants and helper functions)

  const handleSearch = async () => {
    if (!searchForm.from || !searchForm.to || !searchForm.journeyDate) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    setError("");

    try {
      // Call real API instead of mock data
      const response = await trainApi.searchTrains({
        from: searchForm.from,
        to: searchForm.to,
        journeyDate: searchForm.journeyDate,
        passengers: searchForm.passengers,
        class: searchForm.class,
        quota: searchForm.quota,
      });

      if (response.success) {
        setSearchResults(response.data);
      } else {
        setError(response.error || "Failed to search trains");
        setSearchResults([]);
      }
    } catch (error) {
      setError(handleApiError(error));
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleBooking = async (trainId: string, classCode: string) => {
    try {
      setIsSearching(true);

      const bookingData = {
        trainId,
        classCode,
        passengers: searchForm.passengers,
        journeyDate: searchForm.journeyDate,
        from: searchForm.from,
        to: searchForm.to,
        quota: searchForm.quota,
        // Add passenger details, payment info, etc.
      };

      const response = await trainApi.bookTrain(bookingData);

      if (response.success) {
        alert(
          `Booking successful! Your PNR is: ${response.data.pnr || "XXXXXXXXXX"}`,
        );
        // Redirect to booking confirmation page
        // navigate('/bookings/' + response.data.bookingId);
      } else {
        alert(response.error || "Booking failed. Please try again.");
      }
    } catch (error) {
      alert(handleApiError(error));
    } finally {
      setIsSearching(false);
    }
  };

  // ... (rest of the component remains the same, just replace the mock data section)

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ... existing JSX ... */}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

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
            ) : searchResults.length > 0 ? (
              <div className="space-y-6">
                {searchResults.map((train: any) => (
                  <div
                    key={train.id}
                    className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    {/* Train display logic with real booking buttons */}
                    {/* Replace mock booking with handleBooking(train.id, classCode) */}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Train className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  No trains found
                </h3>
                <p className="text-slate-500">
                  Try adjusting your search criteria and try again.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainsWithAPI;
