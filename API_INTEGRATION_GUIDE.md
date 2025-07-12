# 🚀 API Integration Guide for Travel Booking App

## 📝 **What Happens When You Click "Create Repo"**

### 1. **Repository Creation Process**

- ✅ Creates a new GitHub repository with all your current code
- ✅ Exports all components, pages, styles, and configurations
- ✅ Sets up automatic deployment (usually Vercel/Netlify)
- ✅ Provides clone URL for local development

### 2. **Post-Creation Workflow**

```bash
# Clone your new repository
git clone https://github.com/yourusername/your-travel-app.git
cd your-travel-app

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔌 **API Integration Steps**

### Step 1: Environment Setup

Create `.env.local` file with your API credentials:

```env
REACT_APP_API_BASE_URL=https://your-backend.com/api
REACT_APP_IRCTC_API_KEY=your-irctc-key
REACT_APP_AMADEUS_API_KEY=your-amadeus-key
REACT_APP_RAZORPAY_KEY=your-razorpay-key
```

### Step 2: Replace Mock Data with Real APIs

#### Current Mock Implementation:

```typescript
// In your current Trains.tsx
setTimeout(() => {
  const mockResults = [
    /* mock data */
  ];
  setSearchResults(mockResults);
}, 2000);
```

#### Real API Implementation:

```typescript
// Replace with real API call
const response = await trainApi.searchTrains(searchParams);
if (response.success) {
  setSearchResults(response.data);
}
```

### Step 3: Backend API Setup

Update `server/index.ts` to include train routes:

```typescript
import { searchTrains, bookTrain, getBooking } from "./routes/trains";

app.post("/api/trains/search", searchTrains);
app.post("/api/trains/book", bookTrain);
app.get("/api/bookings/:bookingId", getBooking);
```

## 🌐 **Popular APIs for Integration**

### 🚂 **Train Booking APIs**

1. **IRCTC Connect** (Official)

   - Requires partnership agreement
   - Full booking capabilities
   - Real-time data

2. **Third-party Aggregators**
   - RailYatri API
   - Trainman API
   - ConfirmTkt API

### ✈️ **Flight Booking APIs**

1. **Amadeus Travel API**

   - Global coverage
   - Real-time pricing
   - Booking capabilities

2. **Sabre Red APIs**

   - Comprehensive travel data
   - Enterprise-grade

3. **Skyscanner API**
   - Flight search and comparison
   - Partner network

### 🏨 **Hotel Booking APIs**

1. **Booking.com API**
2. **Agoda API**
3. **Hotels.com API**

### 🚗 **Cab Booking APIs**

1. **Uber API**
2. **Ola Cabs API**
3. **Local cab aggregators**

## 💳 **Payment Integration**

### Indian Payment Gateways

```typescript
// Razorpay Integration
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
const order = await razorpay.orders.create({
  amount: totalAmount * 100, // Amount in paise
  currency: "INR",
  receipt: bookingId,
});
```

### International Payment

```typescript
// Stripe Integration
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentIntent = await stripe.paymentIntents.create({
  amount: totalAmount * 100,
  currency: "usd",
});
```

## 🔄 **How Further Fixes Reach Your Repo**

### Method 1: Direct Git Push (Recommended)

```bash
# Make changes locally
git add .
git commit -m "Add real API integration"
git push origin main

# Deploy automatically triggers on most platforms
```

### Method 2: Builder.io Sync (if available)

- Some Builder.io plans offer repository sync
- Changes made in Builder.io can be pushed to your repo
- Check your Builder.io settings for sync options

### Method 3: Manual Updates

- Export updated code from Builder.io
- Manually merge changes into your repository
- Commit and push changes

## 🏗️ **Production Deployment Checklist**

### 1. **Environment Variables**

```bash
# Production environment
REACT_APP_ENV=production
REACT_APP_API_BASE_URL=https://your-production-api.com
NODE_ENV=production
```

### 2. **Database Setup**

- Set up production database (PostgreSQL, MongoDB)
- Configure connection strings
- Run migrations

### 3. **API Security**

```typescript
// Add API rate limiting
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);

// Add CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
```

### 4. **Monitoring & Analytics**

```typescript
// Add error tracking (Sentry)
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

// Add analytics (Google Analytics, Mixpanel)
```

## 🔧 **Development Workflow**

### 1. **Local Development**

```bash
# Frontend
npm run dev

# Backend
npm run dev:server

# Full stack
npm run dev:full
```

### 2. **Testing**

```bash
# Run tests
npm test

# Run API tests
npm run test:api

# End-to-end tests
npm run test:e2e
```

### 3. **Deployment**

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod
```

## 📞 **API Integration Examples**

### Train Search Integration

```typescript
// Replace mock data in handleSearch function
const handleSearch = async () => {
  setIsSearching(true);

  try {
    const response = await fetch("/api/trains/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchForm),
    });

    const data = await response.json();

    if (data.success) {
      setSearchResults(data.data);
    } else {
      setError(data.error);
    }
  } catch (error) {
    setError("Failed to search trains");
  } finally {
    setIsSearching(false);
  }
};
```

### Booking Integration

```typescript
const handleBooking = async (trainId: string, classCode: string) => {
  try {
    const response = await fetch("/api/trains/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        trainId,
        classCode,
        passengers: searchForm.passengers,
        // ... other booking details
      }),
    });

    const result = await response.json();

    if (result.success) {
      // Redirect to payment
      window.location.href = `/payment/${result.data.bookingId}`;
    }
  } catch (error) {
    alert("Booking failed");
  }
};
```

## 🎯 **Next Steps After Creating Repo**

1. **Clone and set up locally**
2. **Add environment variables**
3. **Integrate real APIs**
4. **Set up payment gateway**
5. **Add authentication**
6. **Configure deployment**
7. **Add monitoring & analytics**
8. **Test thoroughly**
9. **Launch! 🚀**

## 📚 **Resources**

- [IRCTC Connect API Documentation](https://www.irctc.co.in/connect)
- [Amadeus Travel API](https://developers.amadeus.com/)
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Stripe Documentation](https://stripe.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
