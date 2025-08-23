import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import {
  Calendar,
  Eye,
  Loader2,
  Package,
  IndianRupee,
  Filter,
  X,
  Search,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: ""
  });
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllOrdersForAdmin())
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format price with commas
  const formatPrice = (price) => {
    if (!price) return "₹0.00";
    return `₹${parseFloat(price).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  // Get badge color based on status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
      case "completed":
      case "paid":
      case "delivered":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "pending":
      case "inprocess":
      case "inshipping":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "rejected":
      case "cancelled":
      case "failed":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  // Truncate order ID for better display
  const truncateOrderId = (id) => {
    if (!id) return "N/A";
    return `${id.substring(0, 8)}...`;
  };

  // Filter orders based on applied filters
  const filteredOrders = orderList ? orderList.filter(order => {
    // Status filter
    if (filters.status !== "all" && order.orderStatus !== filters.status) {
      return false;
    }
    
    // Search filter
    if (filters.search && !order._id.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Price range filter
    if (filters.minAmount && order.totalAmount < parseFloat(filters.minAmount)) {
      return false;
    }
    
    if (filters.maxAmount && order.totalAmount > parseFloat(filters.maxAmount)) {
      return false;
    }
    
    // Date range filter
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      const orderDate = new Date(order.orderDate);
      if (orderDate < startDate) return false;
    }
    
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999); // Include the entire end date
      const orderDate = new Date(order.orderDate);
      if (orderDate > endDate) return false;
    }
    
    return true;
  }) : [];

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      status: "all",
      search: "",
      minAmount: "",
      maxAmount: "",
      startDate: "",
      endDate: ""
    });
  };

  // Check if any filters are applied
  const hasActiveFilters = filters.status !== "all" || 
                          filters.search || 
                          filters.minAmount || 
                          filters.maxAmount || 
                          filters.startDate || 
                          filters.endDate;

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="bg-gray-50 rounded-t-lg border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-blue-600" />
            <CardTitle className="text-2xl font-semibold text-gray-800">All Orders</CardTitle>
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
                {filteredOrders.length} of {orderList?.length || 0}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={showFilters ? "default" : "outline"} 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="h-2 w-2 rounded-full bg-blue-600"></span>
              )}
            </Button>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500">
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Status Filter */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters({...filters, status: value})}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="inProcess">In Process</SelectItem>
                    <SelectItem value="inShipping">In Shipping</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Filter */}
              <div className="space-y-2">
                <Label htmlFor="search">Order ID</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="search"
                    placeholder="Search order ID..."
                    className="pl-8"
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                  />
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-2">
                <Label>Price Range</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Min ₹"
                    type="number"
                    value={filters.minAmount}
                    onChange={(e) => setFilters({...filters, minAmount: e.target.value})}
                  />
                  <Input
                    placeholder="Max ₹"
                    type="number"
                    value={filters.maxAmount}
                    onChange={(e) => setFilters({...filters, maxAmount: e.target.value})}
                  />
                </div>
              </div>

              {/* Date Range Filter */}
              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    placeholder="Start Date"
                    value={filters.startDate}
                    onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                  />
                  <Input
                    type="date"
                    placeholder="End Date"
                    value={filters.endDate}
                    onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-gray-500">Loading orders...</p>
            </div>
          </div>
        ) : filteredOrders && filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 hover:bg-gray-100">
                  <TableHead className="font-semibold text-gray-700">Order ID</TableHead>
                  <TableHead className="font-semibold text-gray-700">Date</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((orderItem) => (
                  <TableRow key={orderItem._id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span className="text-sm">#{truncateOrderId(orderItem._id)}</span>
                        <span className="text-xs text-gray-400">{orderItem.paymentMethod}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{formatDate(orderItem.orderDate)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={`py-1 px-3 font-normal ${getStatusColor(orderItem.orderStatus)}`}
                        variant="outline"
                      >
                        {orderItem.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      <div className="flex items-center justify-end gap-1">
                        <IndianRupee className="h-4 w-4" />
                        {formatPrice(orderItem.totalAmount).substring(1)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog
                        open={openDetailsDialog && orderDetails?._id === orderItem._id}
                        onOpenChange={(open) => {
                          if (!open) {
                            setOpenDetailsDialog(false);
                            dispatch(resetOrderDetails());
                          }
                        }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={() => handleFetchOrderDetails(orderItem._id)}
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        {orderDetails && (
                          <AdminOrderDetailsView orderDetails={orderDetails} />
                        )}
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <Package className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">
              {hasActiveFilters ? "No matching orders found" : "No orders found"}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              {hasActiveFilters 
                ? "Try adjusting your filters to see more results." 
                : "There are no orders to display at this time."
              }
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;