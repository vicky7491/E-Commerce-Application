import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { useDispatch } from "react-redux";
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
  Clipboard,
  Sparkles,
  IndianRupee,
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
    updateStatus: true,
  });

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
          variant: "success",
        });
      }
    });
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
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

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
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

  const SectionCard = ({
    id,
    title,
    icon: Icon,
    children,
    defaultOpenKey,
  }) => (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      <button
        type="button"
        onClick={() => toggleSection(defaultOpenKey)}
        className="flex w-full items-center justify-between border-b bg-[#fcfaf8] px-5 py-4 text-left transition hover:bg-[#f8f2ec]"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#C47D52]/10 text-[#C47D52]">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-semibold text-[#3A3A3A]">{title}</h3>
        </div>

        {expandedSections[defaultOpenKey] ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      {expandedSections[defaultOpenKey] && (
        <div className="p-5">{children}</div>
      )}
    </div>
  );

  const InfoBlock = ({ icon: Icon, label, value, full = false }) => (
    <div className={full ? "space-y-1 md:col-span-2" : "space-y-1"}>
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        {Icon ? <Icon className="h-4 w-4" /> : null}
        {label}
      </p>
      <div className="font-medium text-[#3A3A3A]">{value || "N/A"}</div>
    </div>
  );

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto border-0 bg-[#f8f5f2] p-0 sm:max-w-[760px]">
      <div className="space-y-6 p-6">
        {/* Top Header */}
        <div className="rounded-3xl border bg-gradient-to-r from-[#fffaf6] to-[#f8f2ec] p-6 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-[#C47D52]">
            <Sparkles size={18} />
            <span className="text-sm font-semibold uppercase tracking-[0.2em]">
              Order Details
            </span>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#3A3A3A]">
                #{orderDetails?._id || "N/A"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Complete order summary, shipping details, and status control.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className={`rounded-full border px-3 py-1 ${getStatusColor(
                  orderDetails?.paymentStatus
                )}`}
              >
                Payment: {orderDetails?.paymentStatus || "N/A"}
              </Badge>

              <Badge
                variant="outline"
                className={`rounded-full border px-3 py-1 ${getStatusColor(
                  orderDetails?.orderStatus
                )}`}
              >
                Order: {orderDetails?.orderStatus || "N/A"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Order Information */}
        <SectionCard
          title="Order Information"
          icon={Package}
          defaultOpenKey="orderInfo"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoBlock
              icon={Clipboard}
              label="Order ID"
              value={orderDetails?._id}
            />
            <InfoBlock
              icon={Calendar}
              label="Order Date"
              value={formatDate(orderDetails?.orderDate)}
            />
            <InfoBlock
              icon={IndianRupee}
              label="Total Amount"
              value={
                <span className="text-lg font-semibold text-[#C47D52]">
                  {formatPrice(orderDetails?.totalAmount)}
                </span>
              }
            />
            <InfoBlock
              icon={CreditCard}
              label="Payment Method"
              value={
                <span className="capitalize">
                  {orderDetails?.paymentMethod || "N/A"}
                </span>
              }
            />

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Payment Status</p>
              <Badge
                variant="outline"
                className={`rounded-full border px-3 py-1 ${getStatusColor(
                  orderDetails?.paymentStatus
                )}`}
              >
                {orderDetails?.paymentStatus || "N/A"}
              </Badge>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Order Status</p>
              <Badge
                variant="outline"
                className={`rounded-full border px-3 py-1 ${getStatusColor(
                  orderDetails?.orderStatus
                )}`}
              >
                {orderDetails?.orderStatus || "N/A"}
              </Badge>
            </div>
          </div>
        </SectionCard>

        {/* Order Items */}
        <SectionCard
          title="Order Items"
          icon={Clipboard}
          defaultOpenKey="cartItems"
        >
          {orderDetails?.cartItems && orderDetails.cartItems.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#fcfaf8]">
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#5b514b]">
                        Product
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-[#5b514b]">
                        Qty
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-[#5b514b]">
                        Price
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-[#5b514b]">
                        Total
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {orderDetails.cartItems.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b last:border-0 hover:bg-[#fdf8f4]"
                      >
                        <td className="px-4 py-4">
                          <p className="font-medium text-[#3A3A3A]">
                            {item.title || "Unnamed Product"}
                          </p>
                        </td>
                        <td className="px-4 py-4 text-center text-[#4f4742]">
                          {item.quantity || 0}
                        </td>
                        <td className="px-4 py-4 text-right text-[#4f4742]">
                          {formatPrice(item.price)}
                        </td>
                        <td className="px-4 py-4 text-right font-medium text-[#3A3A3A]">
                          {formatPrice((item.price || 0) * (item.quantity || 0))}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot>
                    <tr className="bg-[#fcfaf8]">
                      <td
                        colSpan="3"
                        className="px-4 py-4 text-right font-semibold text-[#5b514b]"
                      >
                        Subtotal
                      </td>
                      <td className="px-4 py-4 text-right font-bold text-[#C47D52]">
                        {formatPrice(orderDetails?.totalAmount)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed bg-[#fcfaf8] px-4 py-8 text-center text-sm text-muted-foreground">
              No items in this order
            </div>
          )}
        </SectionCard>

        {/* Shipping Information */}
        <SectionCard
          title="Shipping Information"
          icon={Truck}
          defaultOpenKey="shippingInfo"
        >
          {orderDetails?.addressInfo ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoBlock
                icon={User}
                label="Full Name"
                value={orderDetails.addressInfo.name}
              />
              <InfoBlock
                icon={Phone}
                label="Phone Number"
                value={orderDetails.addressInfo.phone}
              />
              <InfoBlock
                icon={MapPin}
                label="Address"
                value={orderDetails.addressInfo.address}
                full
              />
              <InfoBlock
                label="City"
                value={orderDetails.addressInfo.city}
              />
              <InfoBlock
                label="Postal Code"
                value={orderDetails.addressInfo.pincode}
              />

              {orderDetails.addressInfo.notes && (
                <InfoBlock
                  icon={MessageSquare}
                  label="Delivery Notes"
                  value={
                    <span className="italic text-[#4f4742]">
                      {orderDetails.addressInfo.notes}
                    </span>
                  }
                  full
                />
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed bg-[#fcfaf8] px-4 py-8 text-center text-sm text-muted-foreground">
              No shipping information available
            </div>
          )}
        </SectionCard>

        {/* Update Status */}
        <SectionCard
          title="Update Order Status"
          icon={CreditCard}
          defaultOpenKey="updateStatus"
        >
          <div className="rounded-2xl border bg-[#fcfaf8] p-4">
            <p className="mb-4 text-sm text-muted-foreground">
              Update the current order status from the dropdown below.
            </p>

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
        </SectionCard>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;