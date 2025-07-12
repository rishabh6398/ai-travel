import { RequestHandler } from "express";
import { z } from "zod";

// Validation schemas
const TrainSearchSchema = z.object({
  from: z.string().min(1, "Origin is required"),
  to: z.string().min(1, "Destination is required"),
  journeyDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  passengers: z.number().min(1).max(6),
  class: z.string(),
  quota: z.string(),
});

const TrainBookingSchema = z.object({
  trainId: z.string(),
  classCode: z.string(),
  passengers: z.number().min(1).max(6),
  journeyDate: z.string(),
  from: z.string(),
  to: z.string(),
  quota: z.string(),
  passengerDetails: z.array(
    z.object({
      name: z.string(),
      age: z.number(),
      gender: z.enum(["M", "F", "T"]),
      berth: z.string().optional(),
    }),
  ),
  contactDetails: z.object({
    email: z.string().email(),
    phone: z.string(),
  }),
});

// Train search endpoint
export const searchTrains: RequestHandler = async (req, res) => {
  try {
    const searchParams = TrainSearchSchema.parse(req.body);

    // Example: Integrate with IRCTC API or third-party service
    const trains = await fetchTrainsFromAPI(searchParams);

    res.json({
      success: true,
      data: trains,
      message: "Trains found successfully",
    });
  } catch (error) {
    console.error("Train search error:", error);
    res.status(400).json({
      success: false,
      error: error instanceof z.ZodError ? error.errors : "Search failed",
    });
  }
};

// Train booking endpoint
export const bookTrain: RequestHandler = async (req, res) => {
  try {
    const bookingData = TrainBookingSchema.parse(req.body);

    // 1. Validate availability
    const availability = await checkTrainAvailability(
      bookingData.trainId,
      bookingData.classCode,
      bookingData.journeyDate,
    );

    if (!availability.available) {
      return res.status(400).json({
        success: false,
        error: "Train not available for selected date and class",
      });
    }

    // 2. Create booking
    const booking = await createBooking(bookingData);

    // 3. Process payment (integrate with Razorpay/Stripe)
    const paymentResult = await processPayment({
      bookingId: booking.id,
      amount: booking.totalAmount,
      currency: "INR",
    });

    if (paymentResult.success) {
      // 4. Confirm booking with IRCTC
      const confirmation = await confirmWithIRCTC(booking);

      res.json({
        success: true,
        data: {
          bookingId: booking.id,
          pnr: confirmation.pnr,
          status: "CONFIRMED",
          totalAmount: booking.totalAmount,
          paymentId: paymentResult.paymentId,
        },
        message: "Booking confirmed successfully",
      });
    } else {
      // Cancel booking if payment failed
      await cancelBooking(booking.id);
      res.status(400).json({
        success: false,
        error: "Payment failed. Please try again.",
      });
    }
  } catch (error) {
    console.error("Train booking error:", error);
    res.status(500).json({
      success: false,
      error: "Booking failed. Please try again.",
    });
  }
};

// Get booking details
export const getBooking: RequestHandler = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await getBookingById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }

    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Get booking error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get booking details",
    });
  }
};

// Helper functions - implement these based on your chosen APIs
async function fetchTrainsFromAPI(searchParams: any) {
  // Example implementation with IRCTC or third-party API
  // This would typically involve:
  // 1. Making API calls to train data providers
  // 2. Parsing and normalizing the response
  // 3. Adding business logic (pricing, availability, etc.)

  // For IRCTC integration, you might use:
  // - Official IRCTC Connect API (requires partnership)
  // - Third-party aggregators like RailYatri, Trainman
  // - Web scraping (not recommended for production)

  return [
    {
      id: "12301",
      trainName: "Rajdhani Express",
      trainNumber: "12301",
      from: searchParams.from,
      to: searchParams.to,
      departureTime: "17:00",
      arrivalTime: "10:05+1",
      duration: "17h 05m",
      classes: {
        "1A": { available: 12, price: 4825 },
        "2A": { available: 8, price: 2895 },
      },
      // ... other train details
    },
  ];
}

async function checkTrainAvailability(
  trainId: string,
  classCode: string,
  date: string,
) {
  // Check real-time availability with IRCTC
  return { available: true, seatsLeft: 15 };
}

async function createBooking(bookingData: any) {
  // Save booking to your database
  return {
    id: "BKG" + Date.now(),
    totalAmount: 2895,
    status: "PENDING",
    // ... other booking details
  };
}

async function processPayment(paymentData: any) {
  // Integrate with Razorpay, Stripe, or other payment gateway
  // Example with Razorpay:
  /*
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const order = await razorpay.orders.create({
    amount: paymentData.amount * 100, // Amount in paise
    currency: paymentData.currency,
    receipt: paymentData.bookingId,
  });
  */

  return { success: true, paymentId: "pay_" + Date.now() };
}

async function confirmWithIRCTC(booking: any) {
  // Confirm booking with IRCTC API
  return {
    pnr: "1234567890",
    status: "CONFIRMED",
  };
}

async function cancelBooking(bookingId: string) {
  // Cancel booking in your database
  console.log("Booking cancelled:", bookingId);
}

async function getBookingById(bookingId: string) {
  // Fetch booking from your database
  return {
    id: bookingId,
    pnr: "1234567890",
    status: "CONFIRMED",
    // ... other details
  };
}
