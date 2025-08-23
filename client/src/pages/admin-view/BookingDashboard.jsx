import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "@/api/base";
import BookingTable from "@/components/admin-view/BookingTable";
import { useToast } from "@/components/ui/use-toast";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const BookingDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    axios
      .get(`${API_BASE}/admin/bookings`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setBookings(res.data.bookings);
        }
      })
      .catch((err) => {
        toast({
          title: "Failed to fetch bookings",
          description: "Please check your connection or try again later.",
          variant: "destructive",
        });
      });
  }, []);

  const handleDeleteBooking = async (id) => {
    setDeleteTargetId(id);
    setShowConfirm(true);
  };

  const confirmDeleteBooking = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await axios.delete(`${API_BASE}/admin/bookings/${deleteTargetId}`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        toast({
          title: "Booking deleted",
          description: "The booking was successfully removed.",
          variant: "success",
        });
        setBookings(prev => prev.filter(booking => booking._id !== deleteTargetId));
      }
    } catch (err) {
      toast({
        title: "Failed to delete booking",
        description: err.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setShowConfirm(false);
      setDeleteTargetId(null);
    }
  };

  const handleEdit = async (updatedBooking) => {
    try {
      const res = await axios.put(
        `${API_BASE}/admin/bookings/${updatedBooking._id}`,
        updatedBooking,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast({
          title: "Booking updated",
          description: "Changes saved successfully.",
          variant: "success",
        });

        setBookings(prev =>
          prev.map(b => (b._id === updatedBooking._id ? updatedBooking : b))
        );
      }
    } catch (err) {
      toast({
        title: "Failed to update booking",
        description: err.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4">
      <BookingTable
        bookings={bookings}
        onEdit={handleEdit}
        onDelete={handleDeleteBooking}
        isLoading={false}
      />

      <ConfirmDialog
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmDeleteBooking}
        title="Delete Booking?"
        description="Are you sure you want to delete this booking? This action cannot be undone."
      />
    </div>
  );
};

export default BookingDashboard;
