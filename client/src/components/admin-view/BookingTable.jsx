import React, { useState, useEffect } from "react";
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash, FaSearch, FaTimes, FaComment } from "react-icons/fa";

const BookingTable = ({ bookings, onEdit, onDelete, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    concept: "",
    date: "",
    time: "",
    comments: ""
  });
  const [selectedConcept, setSelectedConcept] = useState("");
  const [date, setDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [expandedCommentId, setExpandedCommentId] = useState(null);

  // Open modal and set current booking for editing
  const handleEditClick = (booking) => {
    setCurrentBooking(booking);
    setEditData({
      name: booking.name || "",
      phone: booking.phone || "",
      email: booking.email || "",
      location: booking.location || "",
      concept: booking.concept || "",
      date: booking.date || "",
      time: booking.time || "",
      comments: booking.comments || ""
    });
    
    setSelectedConcept(booking.concept || "");
    
    if (booking.date) {
      const bookingDate = new Date(booking.date);
      setDate(bookingDate.toISOString().split('T')[0]);
    } else {
      setDate("");
    }
    
    setPreferredTime(booking.time || "");
    setIsModalOpen(true);
  };

  // Handle input changes in modal form
  const handleInputChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  // Validate name input (only letters and spaces)
  const handleNameKeyPress = (e) => {
    const charCode = e.charCode;
    if (!(charCode >= 65 && charCode <= 90) && 
        !(charCode >= 97 && charCode <= 122) && 
        charCode !== 32) {
      e.preventDefault();
    }
  };

  // Format phone number input
  const handlePhoneInput = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    setEditData({ ...editData, phone: value });
  };

  // Save edited booking
  const handleSave = (e) => {
    e.preventDefault();
    
    const updatedBooking = {
      ...currentBooking,
      ...editData,
      concept: selectedConcept,
      date: new Date(date).toISOString(),
      time: preferredTime
    };
    
    onEdit(updatedBooking);
    setIsModalOpen(false);
  };

  // Close modal without saving
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Toggle comment expansion
  const toggleComment = (id) => {
    if (expandedCommentId === id) {
      setExpandedCommentId(null);
    } else {
      setExpandedCommentId(id);
    }
  };

  // Process bookings for display
  const processedBookings = bookings.map(booking => {
    const bookingDate = booking.date ? new Date(booking.date) : new Date();
    return {
      ...booking,
      date: bookingDate
    };
  });

  // Filter bookings based on search term
  const filteredBookings = processedBookings.filter(booking =>
    Object.values(booking).some(
      value =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort bookings
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);
  const currentBookings = sortedBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle column sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  // Render sort icons
  const renderSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="inline ml-1 text-gray-400" />;
    return sortDirection === "asc"
      ? <FaSortUp className="inline ml-1 text-blue-500" />
      : <FaSortDown className="inline ml-1 text-blue-500" />;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Empty state
  if (bookings.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="text-gray-500 text-lg">No bookings found</div>
        <p className="text-gray-400 mt-2">Create a new booking to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Search and controls */}
      <div className="p-4 border-b flex flex-col md:flex-row justify-between gap-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search bookings..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-700 text-sm">Show:</label>
          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <span className="text-gray-700 text-sm">
            {filteredBookings.length} bookings
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {[
                "#", "Name", "Phone", "Email", "Location",
                "Concept", "Date", "Time", "Comments", "Actions"
              ].map((header, idx) => (
                <th
                  key={idx}
                  className={`py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    idx === 0 ? "w-12" : header === "Actions" ? "w-24" : ""
                  }`}
                >
                  {["Name", "Date", "Location", "Concept"].includes(header) ? (
                    <button
                      className="flex items-center focus:outline-none"
                      onClick={() => handleSort(header.toLowerCase())}
                    >
                      {header}
                      {renderSortIcon(header.toLowerCase())}
                    </button>
                  ) : header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {currentBookings.map((booking, index) => (
              <tr key={booking._id || index} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">
                  {booking.name}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {booking.phone}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700 truncate max-w-xs">
                  <a href={`mailto:${booking.email}`} className="text-blue-600 hover:underline">
                    {booking.email}
                  </a>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {booking.location}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {booking.concept}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {booking.date.toLocaleDateString("en-IN")}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    {booking.time}
                  </span>
                </td>
                
                {/* Enhanced Comment Cell */}
                <td 
                  className="py-3 px-4 text-sm text-gray-700 max-w-xs"
                >
                  {booking.comments ? (
                    <div className="relative">
                      <div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          expandedCommentId === booking._id 
                            ? "max-h-96 whitespace-pre-wrap" 
                            : "max-h-6 truncate"
                        }`}
                        onClick={() => toggleComment(booking._id)}
                      >
                        {booking.comments}
                      </div>
                      
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <FaComment className="mr-1" />
                        <span>
                          {expandedCommentId === booking._id 
                            ? "Click to collapse" 
                            : "Click to expand"}
                        </span>
                      </div>
                      
                      {/* Desktop hover preview */}
                      {expandedCommentId !== booking._id && (
                        <div className="hidden md:block absolute z-10 top-full left-0 w-64 mt-1 p-2 bg-white border border-gray-200 shadow-lg rounded text-sm text-gray-700 opacity-0 transition-opacity duration-300 hover:opacity-100 pointer-events-none">
                          <div className="font-medium mb-1">Full Comment:</div>
                          <div className="max-h-32 overflow-y-auto">
                            {booking.comments}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">—</span>
                  )}
                </td>
                
                <td className="py-3 px-4 text-sm text-gray-700">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(booking)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(booking._id)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 border-t flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-gray-700 mb-4 md:mb-0">
          Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to
          <span className="font-medium"> {Math.min(currentPage * itemsPerPage, sortedBookings.length)}</span> of
          <span className="font-medium"> {sortedBookings.length}</span> results
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md text-sm ${currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            Previous
          </button>

          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md text-sm ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md text-sm ${currentPage === totalPages ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            Next
          </button>
        </div>
      </div>
      
      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="border-b p-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">Edit Booking</h3>
              <button 
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6">
              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-brand-charcoal">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-1">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      required
                      onKeyPress={handleNameKeyPress}
                      value={editData.name}
                      onChange={(e) => handleInputChange(e, "name")}
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-1">
                      Your Phone Number*
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={editData.phone}
                      onInput={handlePhoneInput}
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-1">
                      Your Email Address*
                    </label>
                    <input
                      type="email"
                      required
                      value={editData.email}
                      onChange={(e) => handleInputChange(e, "email")}
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-1">
                      Your Location*
                    </label>
                    <input
                      type="text"
                      required
                      value={editData.location}
                      onChange={(e) => handleInputChange(e, "location")}
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Concept */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-brand-charcoal">
                  Casting Impressions
                </h3>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Select Your Impressions Concept*
                </label>
                <select
                  required
                  value={selectedConcept}
                  onChange={(e) => setSelectedConcept(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose a concept</option>
                  <option value="Baby Concept">Baby Concept</option>
                  <option value="Parents / Aashirwad Concept">Parents / Aashirwad Concept</option>
                  <option value="Couples Concept">Couples Concept</option>
                  <option value="Family / Group">Family / Group Concept</option>
                </select>
              </div>

              {/* Time Preference */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-brand-charcoal">
                  Time Preference
                </h3>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full mb-4 px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Preferred Time*
                </label>
                <select
                  required
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a time</option>
                  <option value="early-morning">Early Morning (6AM–9AM)</option>
                  <option value="morning">Morning (9AM–12PM)</option>
                  <option value="afternoon">Afternoon (12PM–4PM)</option>
                  <option value="evening">Evening (4PM–7PM)</option>
                </select>
              </div>

              {/* Comments */}
              <div className="mb-6">
                <label htmlFor="comments" className="block text-sm font-medium mb-1 text-brand-charcoal">
                  Additional Comments
                </label>
                <textarea
                  rows={3}
                  id="comments"
                  placeholder="Optional"
                  value={editData.comments}
                  onChange={(e) => handleInputChange(e, "comments")}
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingTable;