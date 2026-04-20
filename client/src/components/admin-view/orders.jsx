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
  Search,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
    endDate: "",
  });

  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllOrdersForAdmin()).finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    if (!price) return "₹0.00";
    return `₹${parseFloat(price).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
      case "completed":
      case "paid":
      case "delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pending":
      case "inprocess":
      case "inshipping":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "rejected":
      case "cancelled":
      case "failed":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const truncateOrderId = (id) => {
    if (!id) return "N/A";
    return `${id.substring(0, 8)}...`;
  };

  const filteredOrders = orderList
    ? orderList.filter((order) => {
        if (filters.status !== "all" && order.orderStatus !== filters.status) {
          return false;
        }

        if (
          filters.search &&
          !order._id.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false;
        }

        if (
          filters.minAmount &&
          order.totalAmount < parseFloat(filters.minAmount)
        ) {
          return false;
        }

        if (
          filters.maxAmount &&
          order.totalAmount > parseFloat(filters.maxAmount)
        ) {
          return false;
        }

        if (filters.startDate) {
          const startDate = new Date(filters.startDate);
          const orderDate = new Date(order.orderDate);
          if (orderDate < startDate) return false;
        }

        if (filters.endDate) {
          const endDate = new Date(filters.endDate);
          endDate.setHours(23, 59, 59, 999);
          const orderDate = new Date(order.orderDate);
          if (orderDate > endDate) return false;
        }

        return true;
      })
    : [];

  const clearFilters = () => {
    setFilters({
      status: "all",
      search: "",
      minAmount: "",
      maxAmount: "",
      startDate: "",
      endDate: "",
    });
  };

  const hasActiveFilters =
    filters.status !== "all" ||
    filters.search ||
    filters.minAmount ||
    filters.maxAmount ||
    filters.startDate ||
    filters.endDate;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden rounded-3xl border-0 bg-white shadow-sm">
        <CardHeader className="border-b bg-gradient-to-r from-[#fffaf6] to-[#f8f2ec] p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[#C47D52]">
                <Sparkles size={18} />
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                  Order Management
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <CardTitle className="text-3xl font-bold tracking-tight text-[#3A3A3A]">
                  All Orders
                </CardTitle>

                {hasActiveFilters && (
                  <Badge className="rounded-full border border-[#C47D52]/20 bg-[#C47D52]/10 px-3 py-1 text-[#A85F38]">
                    {filteredOrders.length} of {orderList?.length || 0}
                  </Badge>
                )}
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                Track orders, monitor payment status, and view complete order
                details.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border bg-white px-5 py-3 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-[#C47D52]">
                  {orderList?.length || 0}
                </p>
              </div>

              <Button
                variant={showFilters ? "default" : "outline"}
                size="sm"
                className={
                  showFilters
                    ? "h-11 rounded-2xl bg-[#C47D52] px-4 text-white hover:bg-[#a9633d]"
                    : "h-11 rounded-2xl border-[#d8c5b8] bg-white px-4 text-[#3A3A3A] hover:bg-[#faf7f4]"
                }
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-current opacity-80" />
                )}
              </Button>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-11 rounded-2xl px-4 text-muted-foreground hover:bg-white"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="mt-5 rounded-3xl border bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4 text-[#C47D52]" />
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#A85F38]">
                  Refine Orders
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium">
                    Status
                  </Label>
                  <Select
                    value={filters.status}
                    onValueChange={(value) =>
                      setFilters({ ...filters, status: value })
                    }
                  >
                    <SelectTrigger
                      id="status"
                      className="h-11 rounded-2xl border-[#e5d7cd] bg-[#fcfaf8]"
                    >
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

                <div className="space-y-2">
                  <Label htmlFor="search" className="text-sm font-medium">
                    Order ID
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search order ID..."
                      className="h-11 rounded-2xl border-[#e5d7cd] bg-[#fcfaf8] pl-9"
                      value={filters.search}
                      onChange={(e) =>
                        setFilters({ ...filters, search: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Price Range</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Min ₹"
                      type="number"
                      className="h-11 rounded-2xl border-[#e5d7cd] bg-[#fcfaf8]"
                      value={filters.minAmount}
                      onChange={(e) =>
                        setFilters({ ...filters, minAmount: e.target.value })
                      }
                    />
                    <Input
                      placeholder="Max ₹"
                      type="number"
                      className="h-11 rounded-2xl border-[#e5d7cd] bg-[#fcfaf8]"
                      value={filters.maxAmount}
                      onChange={(e) =>
                        setFilters({ ...filters, maxAmount: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Date Range</Label>
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      className="h-11 rounded-2xl border-[#e5d7cd] bg-[#fcfaf8]"
                      value={filters.startDate}
                      onChange={(e) =>
                        setFilters({ ...filters, startDate: e.target.value })
                      }
                    />
                    <Input
                      type="date"
                      className="h-11 rounded-2xl border-[#e5d7cd] bg-[#fcfaf8]"
                      value={filters.endDate}
                      onChange={(e) =>
                        setFilters({ ...filters, endDate: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center gap-3">
                <div className="rounded-full bg-[#C47D52]/10 p-4">
                  <Loader2 className="h-8 w-8 animate-spin text-[#C47D52]" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Loading orders...
                </p>
              </div>
            </div>
          ) : filteredOrders && filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b bg-[#fcfaf8] hover:bg-[#fcfaf8]">
                    <TableHead className="px-6 py-4 font-semibold text-[#5b514b]">
                      Order ID
                    </TableHead>
                    <TableHead className="py-4 font-semibold text-[#5b514b]">
                      Date
                    </TableHead>
                    <TableHead className="py-4 font-semibold text-[#5b514b]">
                      Status
                    </TableHead>
                    <TableHead className="py-4 text-right font-semibold text-[#5b514b]">
                      Amount
                    </TableHead>
                    <TableHead className="px-6 py-4 text-right font-semibold text-[#5b514b]">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filteredOrders.map((orderItem) => (
                    <TableRow
                      key={orderItem._id}
                      className="border-b last:border-0 hover:bg-[#fdf8f4]"
                    >
                      <TableCell className="px-6 py-4 font-medium">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-[#3A3A3A]">
                            #{truncateOrderId(orderItem._id)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {orderItem.paymentMethod}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="py-4">
                        <div className="flex items-center gap-2 text-sm text-[#4f4742]">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(orderItem.orderDate)}</span>
                        </div>
                      </TableCell>

                      <TableCell className="py-4">
                        <Badge
                          variant="outline"
                          className={`rounded-full border px-3 py-1 font-medium ${getStatusColor(
                            orderItem.orderStatus
                          )}`}
                        >
                          {orderItem.orderStatus}
                        </Badge>
                      </TableCell>

                      <TableCell className="py-4 text-right font-semibold text-[#3A3A3A]">
                        <div className="flex items-center justify-end gap-1">
                          <IndianRupee className="h-4 w-4" />
                          {formatPrice(orderItem.totalAmount).substring(1)}
                        </div>
                      </TableCell>

                      <TableCell className="px-6 py-4 text-right">
                        <Dialog
                          open={
                            openDetailsDialog &&
                            orderDetails?._id === orderItem._id
                          }
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
                            className="rounded-xl border-[#d8c5b8] bg-white text-[#3A3A3A] hover:bg-[#faf7f4]"
                            onClick={() =>
                              handleFetchOrderDetails(orderItem._id)
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" />
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
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
              <div className="mb-4 rounded-full bg-[#C47D52]/10 p-5">
                <Package className="h-10 w-10 text-[#C47D52]" />
              </div>

              <h3 className="mb-2 text-xl font-semibold text-[#3A3A3A]">
                {hasActiveFilters ? "No matching orders found" : "No orders found"}
              </h3>

              <p className="mb-5 max-w-md text-sm text-muted-foreground">
                {hasActiveFilters
                  ? "Try adjusting your filters to see more matching results."
                  : "There are no orders to display right now."}
              </p>

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="rounded-2xl border-[#d8c5b8] bg-white hover:bg-[#faf7f4]"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminOrdersView;