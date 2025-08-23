import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";
import {
  Calendar,
  CreditCard,
  Package,
  Truck,
  User,
  MapPin,
  Phone,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Clipboard
} from "lucide-react";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const [expandedSections, setExpandedSections] = useState({
    orderInfo: true,
    cartItems: true,
    shippingInfo: true,
    updateStatus: true
  });
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Get badge color based on status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
      case "completed":
      case "paid":
      case "delivered":
        return "bg-green-100 text-green-800";
      case "pending":
      case "inprocess":
      case "inshipping":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
      case "cancelled":
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
      <div className="grid gap-6">
        {/* Order Info Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div 
            className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
            onClick={() => toggleSection('orderInfo')}
          >
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-gray-600" />
              <h3 className="font-semibold text-lg">Order Information</h3>
            </div>
            {expandedSections.orderInfo ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {expandedSections.orderInfo && (
            <div className="p-4 grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Clipboard className="h-4 w-4" /> Order ID
                  </p>
                  <p className="font-medium">{orderDetails?._id || "N/A"}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Order Date
                  </p>
                  <p className="font-medium">{formatDate(orderDetails?.orderDate)}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-medium text-lg">{formatPrice(orderDetails?.totalAmount)}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <CreditCard className="h-4 w-4" /> Payment Method
                  </p>
                  <p className="font-medium capitalize">{orderDetails?.paymentMethod || "N/A"}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <Badge className={getStatusColor(orderDetails?.paymentStatus)}>
                    {orderDetails?.paymentStatus || "N/A"}
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Order Status</p>
                  <Badge className={getStatusColor(orderDetails?.orderStatus)}>
                    {orderDetails?.orderStatus || "N/A"}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <Separator />
        
        {/* Cart Items Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div 
            className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
            onClick={() => toggleSection('cartItems')}
          >
            <h3 className="font-semibold text-lg">Order Items</h3>
            {expandedSections.cartItems ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {expandedSections.cartItems && (
            <div className="p-4">
              {orderDetails?.cartItems && orderDetails.cartItems.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-3 font-medium">Product</th>
                        <th className="text-center py-2 px-3 font-medium">Quantity</th>
                        <th className="text-right py-2 px-3 font-medium">Price</th>
                        <th className="text-right py-2 px-3 font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.cartItems.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100 last:border-b-0">
                          <td className="py-3 px-3">
                            <p className="font-medium">{item.title || "Unnamed Product"}</p>
                          </td>
                          <td className="py-3 px-3 text-center">{item.quantity || 0}</td>
                          <td className="py-3 px-3 text-right">{formatPrice(item.price)}</td>
                          <td className="py-3 px-3 text-right">
                            {formatPrice((item.price || 0) * (item.quantity || 0))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50 font-medium">
                        <td colSpan="3" className="py-3 px-3 text-right">Subtotal</td>
                        <td className="py-3 px-3 text-right">
                          {formatPrice(orderDetails?.totalAmount)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">No items in this order</p>
              )}
            </div>
          )}
        </div>
        
        <Separator />
        
        {/* Shipping Info Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div 
            className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
            onClick={() => toggleSection('shippingInfo')}
          >
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-gray-600" />
              <h3 className="font-semibold text-lg">Shipping Information</h3>
            </div>
            {expandedSections.shippingInfo ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {expandedSections.shippingInfo && (
            <div className="p-4">
              {orderDetails?.addressInfo ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <User className="h-4 w-4" /> Full Name
                    </p>
                    <p className="font-medium">{orderDetails.addressInfo.name || "N/A"}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Phone className="h-4 w-4" /> Phone Number
                    </p>
                    <p className="font-medium">{orderDetails.addressInfo.phone || "N/A"}</p>
                  </div>
                  
                  <div className="space-y-1 md:col-span-2">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> Address
                    </p>
                    <p className="font-medium">{orderDetails.addressInfo.address || "N/A"}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">City</p>
                    <p className="font-medium">{orderDetails.addressInfo.city || "N/A"}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Postal Code</p>
                    <p className="font-medium">{orderDetails.addressInfo.pincode || "N/A"}</p>
                  </div>
                  
                  {orderDetails.addressInfo.notes && (
                    <div className="space-y-1 md:col-span-2">
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" /> Delivery Notes
                      </p>
                      <p className="font-medium italic">{orderDetails.addressInfo.notes}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">No shipping information available</p>
              )}
            </div>
          )}
        </div>

        <Separator />
        
        {/* Update Status Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div 
            className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
            onClick={() => toggleSection('updateStatus')}
          >
            <h3 className="font-semibold text-lg">Update Order Status</h3>
            {expandedSections.updateStatus ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
          
          {expandedSections.updateStatus && (
            <div className="p-4">
              <CommonForm
                formControls={[
                  {
                    label: "Order Status",
                    name: "status",
                    componentType: "select",
                    options: [
                      { id: "pending", label: "Pending" },
                      { id: "inProcess", label: "In Process" },
                      { id: "inShipping", label: "In Shipping" },
                      { id: "delivered", label: "Delivered" },
                      { id: "rejected", label: "Rejected" },
                    ],
                  },
                ]}
                formData={formData}
                setFormData={setFormData}
                buttonText={"Update Order Status"}
                onSubmit={handleUpdateStatus}
              />
            </div>
          )}
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;