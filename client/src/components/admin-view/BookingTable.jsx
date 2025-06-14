import React, { useState, useEffect } from "react";
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const BookingTable = ({ bookings, onEdit, onDelete, isLoading }) => {
  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Process and filter bookings
  const processedBookings = bookings.map(booking => ({
    ...booking,
    date: new Date(booking.date)
  }));

  const filteredBookings = processedBookings.filter(booking => 
    Object.values(booking).some(
      value => value && 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sorting logic
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

  // Handle sort column click
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

  // Render sort icon
  const renderSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="inline ml-1 text-gray-400" />;
    return sortDirection === "asc" ? 
      <FaSortUp className="inline ml-1 text-blue-500" /> : 
      <FaSortDown className="inline ml-1 text-blue-500" />;
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
      {/* Search and Controls */}
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
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
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
              <tr key={booking._id} className="hover:bg-gray-50">
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
                <td className="py-3 px-4 text-sm text-gray-700 max-w-xs truncate">
                  {booking.comments || "—"}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onEdit(booking)}
                      className="text-blue-600 hover:text-blue-900"
                      aria-label="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => onDelete(booking._id)}
                      className="text-red-600 hover:text-red-900"
                      aria-label="Delete"
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
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === 1 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Previous
          </button>
          
          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md text-sm ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingTable;