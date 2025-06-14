import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingTable from "@/components/admin-view/BookingTable";

const BookingDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/bookings", { withCredentials: true })
      .then((res) => {
        console.log("Admin Bookings Response:", res.data);
        if (res.data.success) setBookings(res.data.bookings);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
      {bookings.length > 0 ? (
        <BookingTable bookings={bookings} />
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default BookingDashboard;
