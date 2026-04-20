import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "@/api/base";
import BookingTable from "@/components/admin-view/BookingTable";
import { useToast } from "@/components/ui/use-toast";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, RefreshCw, Sparkles, Trash2 } from "lucide-react";

const BookingDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast();

  const fetchBookings = async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(`${API_BASE}/api/admin/bookings`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setBookings(res.data.bookings || []);
      }
    } catch (err) {
      toast({
        title: "Failed to fetch bookings",
        description: "Please check your connection or try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDeleteBooking = async (id) => {
    setDeleteTargetId(id);
    setShowConfirm(true);
  };

  const confirmDeleteBooking = async () => {
    if (!deleteTargetId) return;

    try {
      const res = await axios.delete(
        `${API_BASE}/api/admin/bookings/${deleteTargetId}`,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        toast({
          title: "Booking deleted",
          description: "The booking was successfully removed.",
          variant: "success",
        });

        setBookings((prev) =>
          prev.filter((booking) => booking._id !== deleteTargetId)
        );
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
        `${API_BASE}/api/admin/bookings/${updatedBooking._id}`,
        updatedBooking,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast({
          title: "Booking updated",
          description: "Changes saved successfully.",
          variant: "success",
        });

        setBookings((prev) =>
          prev.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
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
    <div className="space-y-8 p-4 md:p-6">
      {/* Header */}
      <div className="rounded-3xl border bg-gradient-to-r from-[#fffaf6] to-[#f8f2ec] p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[#C47D52]">
              <Sparkles size={18} />
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                Booking Management
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#3A3A3A]">
              Booking Dashboard
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage customer bookings, edit records, and remove unwanted entries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border bg-white px-5 py-3 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Total Bookings
              </p>
              <p className="text-2xl font-bold text-[#C47D52]">
                {bookings?.length || 0}
              </p>
            </div>

            <Button
              onClick={fetchBookings}
              variant="outline"
              className="h-12 rounded-2xl border-[#d8c5b8] bg-white px-5 text-[#3A3A3A] hover:bg-[#faf7f4]"
              disabled={isLoading}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="rounded-3xl border bg-white p-4 shadow-sm md:p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C47D52]/10 text-[#C47D52]">
            <CalendarDays size={22} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#3A3A3A]">
              All Bookings
            </h2>
            <p className="text-sm text-muted-foreground">
              Review and manage all submitted booking requests.
            </p>
          </div>
        </div>

        <BookingTable
          bookings={bookings}
          onEdit={handleEdit}
          onDelete={handleDeleteBooking}
          isLoading={isLoading}
        />
      </div>

      <ConfirmDialog
        open={showConfirm}
        onCancel={() => {
          setShowConfirm(false);
          setDeleteTargetId(null);
        }}
        onConfirm={confirmDeleteBooking}
        title="Delete Booking?"
        description="Are you sure you want to delete this booking? This action cannot be undone."
      />
    </div>
  );
};

export default BookingDashboard;