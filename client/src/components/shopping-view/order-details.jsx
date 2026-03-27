import { useState } from "react";
import { useSelector } from "react-redux";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  Calendar,
  CreditCard,
  Package,
  Truck,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  User,
} from "lucide-react";

/* ── Status pill ── */
function StatusPill({ status }) {
  const map = {
    confirmed:  { bg: "#dcfce7", text: "#15803d", dot: "#22c55e" },
    completed:  { bg: "#dcfce7", text: "#15803d", dot: "#22c55e" },
    paid:       { bg: "#dcfce7", text: "#15803d", dot: "#22c55e" },
    pending:    { bg: "#fef9c3", text: "#854d0e", dot: "#eab308" },
    processing: { bg: "#fef9c3", text: "#854d0e", dot: "#eab308" },
    shipped:    { bg: "#dbeafe", text: "#1d4ed8", dot: "#3b82f6" },
    rejected:   { bg: "#fee2e2", text: "#b91c1c", dot: "#ef4444" },
    cancelled:  { bg: "#fee2e2", text: "#b91c1c", dot: "#ef4444" },
    failed:     { bg: "#fee2e2", text: "#b91c1c", dot: "#ef4444" },
  };
  const s = map[status?.toLowerCase()] ?? { bg: "#f3f4f6", text: "#374151", dot: "#9ca3af" };
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize"
      style={{ background: s.bg, color: s.text }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.dot }} />
      {status || "—"}
    </span>
  );
}

/* ── Collapsible section wrapper ── */
function Section({ icon: Icon, title, sectionKey, expanded, onToggle, children }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid #ece8e3" }}
    >
      <button
        className="w-full flex items-center justify-between p-4 text-left transition-colors"
        style={{ background: expanded ? "#fdf7f3" : "#faf7f4" }}
        onClick={() => onToggle(sectionKey)}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} style={{ color: "#c17f5e" }} />}
          <span className="font-semibold text-sm" style={{ color: "#2d1f17" }}>
            {title}
          </span>
        </div>
        {expanded
          ? <ChevronUp size={15} style={{ color: "#9c8b80" }} />
          : <ChevronDown size={15} style={{ color: "#9c8b80" }} />}
      </button>
      {expanded && (
        <div className="p-4" style={{ background: "#fff" }}>
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Info row ── */
function InfoRow({ icon: Icon, label, value, mono = false }) {
  return (
    <div className="space-y-0.5">
      <p className="text-xs" style={{ color: "#9c8b80" }}>{label}</p>
      <div className="flex items-center gap-1.5">
        {Icon && <Icon size={13} style={{ color: "#c17f5e" }} />}
        <p
          className={`text-sm font-medium ${mono ? "font-mono text-xs" : ""}`}
          style={{ color: "#2d1f17" }}
        >
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
}

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);
  const [copiedOrderId, setCopiedOrderId] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    orderInfo: true,
    cartItems: true,
    shippingInfo: true,
  });

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";

  const formatPrice = (p) =>
    p != null
      ? `₹${parseFloat(p).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : "₹0.00";

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderDetails?._id || "");
    setCopiedOrderId(true);
    setTimeout(() => setCopiedOrderId(false), 2000);
  };

  const toggleSection = (key) =>
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <DialogContent
      className="sm:max-w-[640px] max-h-[90vh] overflow-y-auto p-0"
      style={{ background: "#faf7f4", border: "1px solid #ece8e3" }}
    >
      {/* Dialog header */}
      <div
        className="px-6 py-5"
        style={{
          background: "linear-gradient(135deg, #1c1410 0%, #2e1f14 100%)",
        }}
      >
        <p className="text-xs tracking-widest uppercase" style={{ color: "#c17f5e" }}>
          Order Details
        </p>
        <div className="mt-1 flex items-center gap-3">
          <p
            className="text-lg font-bold truncate max-w-[340px] font-mono"
            style={{ color: "#f5e6d3" }}
          >
            #{orderDetails?._id?.slice(-10).toUpperCase() || "—"}
          </p>
          <button
            onClick={handleCopyOrderId}
            className="rounded-md p-1.5 transition-colors"
            style={{ background: "rgba(193,127,94,0.15)" }}
            title="Copy order ID"
          >
            {copiedOrderId
              ? <Check size={13} style={{ color: "#86efac" }} />
              : <Copy size={13} style={{ color: "#c17f5e" }} />}
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <StatusPill status={orderDetails?.orderStatus} />
          <StatusPill status={orderDetails?.paymentStatus} />
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-3">

        {/* ── Order Information ── */}
        <Section
          icon={Package}
          title="Order Information"
          sectionKey="orderInfo"
          expanded={expandedSections.orderInfo}
          onToggle={toggleSection}
        >
          <div className="grid grid-cols-2 gap-4">
            <InfoRow
              icon={Calendar}
              label="Order Date"
              value={formatDate(orderDetails?.orderDate)}
            />
            <InfoRow
              icon={CreditCard}
              label="Payment Method"
              value={orderDetails?.paymentMethod}
            />
            <div className="space-y-0.5">
              <p className="text-xs" style={{ color: "#9c8b80" }}>Payment Status</p>
              <StatusPill status={orderDetails?.paymentStatus} />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs" style={{ color: "#9c8b80" }}>Order Status</p>
              <StatusPill status={orderDetails?.orderStatus} />
            </div>
            <div className="col-span-2 pt-2" style={{ borderTop: "1px solid #ece8e3" }}>
              <p className="text-xs" style={{ color: "#9c8b80" }}>Order Total</p>
              <p className="text-2xl font-bold mt-0.5" style={{ color: "#c17f5e" }}>
                {formatPrice(orderDetails?.totalAmount)}
              </p>
            </div>
          </div>
        </Section>

        {/* ── Cart Items ── */}
        <Section
          icon={Package}
          title={`Items Ordered (${orderDetails?.cartItems?.length ?? 0})`}
          sectionKey="cartItems"
          expanded={expandedSections.cartItems}
          onToggle={toggleSection}
        >
          {orderDetails?.cartItems && orderDetails.cartItems.length > 0 ? (
            <div className="space-y-3">
              {orderDetails.cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-xl p-3"
                  style={{ background: "#fdf7f3", border: "1px solid #ece8e3" }}
                >
                  {/* Product image */}
                  <div
                    className="h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden"
                    style={{ background: "#f5ede6", border: "1px solid #e8ddd6" }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title || "Product"}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className="h-full w-full items-center justify-center"
                      style={{ display: item.image ? "none" : "flex" }}
                    >
                      <Package size={20} style={{ color: "#c17f5e" }} />
                    </div>
                  </div>

                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold text-sm truncate"
                      style={{ color: "#2d1f17" }}
                    >
                      {item.title || "Unnamed Product"}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#9c8b80" }}>
                      Qty: {item.quantity ?? 0} × {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Line total */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold" style={{ color: "#2d1f17" }}>
                      {formatPrice((item.price ?? 0) * (item.quantity ?? 0))}
                    </p>
                  </div>
                </div>
              ))}

              {/* Subtotal row */}
              <div
                className="flex items-center justify-between rounded-xl px-4 py-3"
                style={{ background: "#1c1410" }}
              >
                <p className="text-sm font-semibold" style={{ color: "#c17f5e" }}>
                  Order Total
                </p>
                <p className="text-base font-bold" style={{ color: "#f5e6d3" }}>
                  {formatPrice(orderDetails?.totalAmount)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center py-6 text-sm" style={{ color: "#9c8b80" }}>
              No items in this order.
            </p>
          )}
        </Section>

        {/* ── Shipping Information ── */}
        <Section
          icon={Truck}
          title="Shipping Information"
          sectionKey="shippingInfo"
          expanded={expandedSections.shippingInfo}
          onToggle={toggleSection}
        >
          {orderDetails?.addressInfo ? (
            <div className="grid grid-cols-2 gap-4">
              <InfoRow
                icon={User}
                label="Full Name"
                value={orderDetails.addressInfo.name}
              />
              <InfoRow
                icon={Phone}
                label="Phone"
                value={orderDetails.addressInfo.phone}
              />
              <div className="col-span-2">
                <InfoRow
                  icon={MapPin}
                  label="Address"
                  value={orderDetails.addressInfo.address}
                />
              </div>
              <InfoRow label="City" value={orderDetails.addressInfo.city} />
              <InfoRow label="Postal Code" value={orderDetails.addressInfo.pincode} />
              {orderDetails.addressInfo.notes && (
                <div className="col-span-2">
                  <InfoRow label="Delivery Notes" value={orderDetails.addressInfo.notes} />
                </div>
              )}
            </div>
          ) : (
            <p className="text-center py-6 text-sm" style={{ color: "#9c8b80" }}>
              No shipping information available.
            </p>
          )}
        </Section>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;