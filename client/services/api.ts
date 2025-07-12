// API Service Layer for Travel Booking App
// Replace these with your actual API endpoints

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://api.yourtravel.com";

// API Configuration
const apiConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`, // Add your API key
  },
};

// Types for API responses
export interface TrainSearchRequest {
  from: string;
  to: string;
  journeyDate: string;
  passengers: number;
  class: string;
  quota: string;
}

export interface FlightSearchRequest {
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  class: string;
  tripType: "oneWay" | "roundTrip";
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Train API Functions
export const trainApi = {
  // Search trains
  searchTrains: async (
    searchParams: TrainSearchRequest,
  ): Promise<ApiResponse<any[]>> => {
    try {
      // Example: Replace with actual Indian Railway API or third-party service
      const response = await fetch(`${API_BASE_URL}/trains/search`, {
        method: "POST",
        ...apiConfig,
        body: JSON.stringify(searchParams),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Train search error:", error);
      return {
        success: false,
        data: [],
        error: "Failed to search trains. Please try again.",
      };
    }
  },

  // Get train details
  getTrainDetails: async (trainNumber: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/trains/${trainNumber}`, {
        ...apiConfig,
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Get train details error:", error);
      return {
        success: false,
        data: null,
        error: "Failed to get train details.",
      };
    }
  },

  // Book train ticket
  bookTrain: async (bookingData: any): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/trains/book`, {
        method: "POST",
        ...apiConfig,
        body: JSON.stringify(bookingData),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Train booking error:", error);
      return {
        success: false,
        data: null,
        error: "Failed to book train. Please try again.",
      };
    }
  },
};

// Flight API Functions
export const flightApi = {
  // Search flights
  searchFlights: async (
    searchParams: FlightSearchRequest,
  ): Promise<ApiResponse<any[]>> => {
    try {
      // Example: Integrate with Amadeus, Sabre, or other flight APIs
      const response = await fetch(`${API_BASE_URL}/flights/search`, {
        method: "POST",
        ...apiConfig,
        body: JSON.stringify(searchParams),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Flight search error:", error);
      return {
        success: false,
        data: [],
        error: "Failed to search flights. Please try again.",
      };
    }
  },

  // Book flight
  bookFlight: async (bookingData: any): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/flights/book`, {
        method: "POST",
        ...apiConfig,
        body: JSON.stringify(bookingData),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Flight booking error:", error);
      return {
        success: false,
        data: null,
        error: "Failed to book flight. Please try again.",
      };
    }
  },
};

// User API Functions
export const userApi = {
  // Get user bookings
  getBookings: async (userId: string): Promise<ApiResponse<any[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}/bookings`, {
        ...apiConfig,
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Get bookings error:", error);
      return {
        success: false,
        data: [],
        error: "Failed to get bookings.",
      };
    }
  },

  // Cancel booking
  cancelBooking: async (bookingId: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/bookings/${bookingId}/cancel`,
        {
          method: "POST",
          ...apiConfig,
        },
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Cancel booking error:", error);
      return {
        success: false,
        data: null,
        error: "Failed to cancel booking.",
      };
    }
  },
};

// AI Chat API Functions
export const aiApi = {
  // Send message to AI
  sendMessage: async (
    message: string,
    context?: any,
  ): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/chat`, {
        method: "POST",
        ...apiConfig,
        body: JSON.stringify({ message, context }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("AI chat error:", error);
      return {
        success: false,
        data: null,
        error: "Failed to get AI response.",
      };
    }
  },

  // Get travel recommendations
  getTravelRecommendations: async (
    preferences: any,
  ): Promise<ApiResponse<any[]>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/recommendations`, {
        method: "POST",
        ...apiConfig,
        body: JSON.stringify(preferences),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Get recommendations error:", error);
      return {
        success: false,
        data: [],
        error: "Failed to get recommendations.",
      };
    }
  },
};

// Error handling utility
export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data.message || "An error occurred";
  } else if (error.request) {
    // Request was made but no response received
    return "Network error. Please check your connection.";
  } else {
    // Something else happened
    return error.message || "An unexpected error occurred";
  }
};

// Example: Popular API services you might integrate with
export const API_PROVIDERS = {
  // Indian Railways
  IRCTC: "https://www.irctc.co.in/nget/train-search", // Official IRCTC (requires authentication)

  // Flight APIs
  AMADEUS: "https://api.amadeus.com", // Global flight data
  SABRE: "https://api.sabre.com", // Flight booking
  SKYSCANNER: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com", // Flight search

  // Travel APIs
  MAKEMYTRIP: "https://makemytrip.com/api", // Indian travel portal
  CLEARTRIP: "https://cleartrip.com/api", // Indian travel portal
  GOIBIBO: "https://goibibo.com/api", // Indian travel portal

  // Hotel APIs
  BOOKING: "https://booking.com/api",
  AGODA: "https://agoda.com/api",

  // Cab APIs
  UBER: "https://api.uber.com",
  OLA: "https://api.olacabs.com",
};
