# E-Commerce Application (Hand Casting & Sculpting Store)

Full-stack e-commerce platform for selling hand-casting kits, finished sculptures, and booking custom casting sessions. The project includes a React + Vite frontend, an Express + MongoDB backend, Razorpay payments, email notifications, and an admin dashboard for managing products, orders, bookings, and homepage features.

## Project Structure

```
.
├── client/   # React storefront + admin UI (Vite, Tailwind, Redux Toolkit)
└── server/   # Express API (MongoDB, JWT auth, Razorpay, Cloudinary, Nodemailer/Resend)
```

## Key Features

- Product browsing with category filters, sorting, search, reviews, and ratings
- Shopping cart, checkout, and order history
- Razorpay payment integration
- Authentication with JWT, password reset via email, and role-based admin access
- Address book management
- Booking flow for custom casting consultations
- Admin dashboard for products, orders, bookings, and homepage feature images
- Cloudinary-backed image uploads
- Tailwind-styled UI with Radix components and Framer Motion animations

## Tech Stack

- **Frontend:** React 18, Vite, Redux Toolkit, React Router, Tailwind CSS, Radix UI, Swiper, Axios
- **Backend:** Node.js, Express 4, MongoDB with Mongoose, JWT auth, Multer + Cloudinary, Razorpay, Nodemailer/Resend, Helmet, CORS, Rate Limiting, Compression, Morgan

## Prerequisites

- Node.js and npm
- MongoDB instance (local or Atlas)
- Cloudinary account (image storage)
- Razorpay account (payments)
- Resend/email credentials for transactional emails

## Environment Variables

Create a `.env` file in `server/` with:

```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce
JWT_SECRET=replace_with_strong_secret
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RAZORPAY_KEY_ID=rzp_test_xxxx
RAZORPAY_KEY_SECRET=your_secret

RESEND_API_KEY=re_xxxx
EMAIL_FROM=noreply@example.com
APP_NAME=Beautiful Molds
APP_LOGO_URL=https://example.com/logo.png
SUPPORT_EMAIL=beautifulmolds@gmail.com
BRAND_COLOR=#b45309
```

Create a `.env` file in `client/` with:

```
VITE_API_BASE_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=rzp_test_xxxx
```

## Getting Started (Local Development)

### Backend (API)

```bash
cd server
npm install
npm run dev          # starts Express on http://localhost:5000
```

### Frontend (React)

```bash
cd client
npm install
npm run dev          # starts Vite on http://localhost:5173
```

> CORS: `FRONTEND_URL` should list allowed origins (comma-separated) for the API.

## Scripts

### Client
- `npm run dev` – Vite dev server with HMR
- `npm run build` – Production build
- `npm run preview` – Preview the production build
- `npm run lint` – ESLint
- `npm run generate:sitemap` – Generate sitemap (also runs before build)

### Server
- `npm run dev` – Start API with nodemon
- `npm start` – Alias to nodemon
- `npm run build` – Install deps and build the client (from server folder)

## API Overview

- `GET /` – Health check (`{ status: "API IS RUNNING" }`)
- `POST /api/auth/register | /login | /forgot-password | /reset-password/:token`
- `GET /api/auth/check-auth`
- Admin: `/api/admin/products`, `/api/admin/orders`, `/api/admin/bookings`
- Shop: `/api/shop/products`, `/api/shop/cart`, `/api/shop/address`, `/api/shop/order`, `/api/shop/search`, `/api/shop/review`
- Common: `/api/common/feature`, `/api/bookings`

## Data Models (high level)

- **User** – name, email, hashed password, role, reset tokens
- **Product** – title, description, category, pricing, stock, images, averageReview, isCastingKit
- **Cart** – userId, items (productId, quantity)
- **Order** – userId, cart items, address, status, payment method/status, Razorpay paymentId
- **Address** – userId, contact + address details
- **Review** – productId, userId, rating, message
- **Feature** – homepage feature images
- **Booking** – name, phone, email, location, concept, schedule details

## Building for Production

From the `server/` directory:

```bash
npm run build    # installs dependencies and builds the client
# then run the server in your preferred process manager:
node server.js   # ensure NODE_ENV=production and env vars are set
```

## Admin Access

Admin rights are checked via email allowlist (`verifyTokenAndAdmin` middleware). Update the list in `server/middleware/verifyToken.js` to add administrators.
