import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Package, ChevronRight, ShoppingBag } from "lucide-react";

/* ── Status pill helper ── */
function StatusPill({ status, type = "order" }) {
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

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "—";

  /* ── Empty state ── */
  if (!orderList || orderList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div
          className="rounded-full p-5"
          style={{ background: "#fdf3ec" }}
        >
          <ShoppingBag size={36} style={{ color: "#c17f5e" }} />
        </div>
        <p className="text-lg font-semibold" style={{ color: "#2d1f17" }}>
          No orders yet
        </p>
        <p className="text-sm" style={{ color: "#9c8b80" }}>
          When you place an order, it will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium pb-1" style={{ color: "#9c8b80" }}>
        {orderList.length} order{orderList.length !== 1 ? "s" : ""}
      </p>

      {orderList.map((orderItem) => (
        <div
          key={orderItem?._id}
          className="rounded-xl border transition-shadow hover:shadow-md"
          style={{ borderColor: "#ece8e3", background: "#fffcfa" }}
        >
          {/* Order card header */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
            style={{ borderBottom: "1px solid #ece8e3" }}
          >
            {/* Left: icon + date */}
            <div className="flex items-center gap-3">
              <div
                className="rounded-lg p-2"
                style={{ background: "#fdf3ec" }}
              >
                <Package size={16} style={{ color: "#c17f5e" }} />
              </div>
              <div>
                <p className="text-xs" style={{ color: "#9c8b80" }}>
                  Order placed
                </p>
                <p className="text-sm font-semibold" style={{ color: "#2d1f17" }}>
                  {formatDate(orderItem?.orderDate)}
                </p>
              </div>
            </div>

            {/* Right: statuses */}
            <div className="flex items-center gap-2 flex-wrap">
              <StatusPill status={orderItem?.orderStatus} />
              <StatusPill status={orderItem?.paymentStatus} />
            </div>
          </div>

          {/* Product image strip (first 3 items) */}
          {orderItem?.cartItems && orderItem.cartItems.length > 0 && (
            <div className="flex items-center gap-3 px-5 py-3">
              <div className="flex -space-x-3">
                {orderItem.cartItems.slice(0, 3).map((item, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-lg border-2 overflow-hidden bg-gray-100"
                    style={{ borderColor: "#fff", zIndex: 3 - i }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        className="h-full w-full flex items-center justify-center"
                        style={{ background: "#f5ede6" }}
                      >
                        <Package size={14} style={{ color: "#c17f5e" }} />
                      </div>
                    )}
                  </div>
                ))}
                {orderItem.cartItems.length > 3 && (
                  <div
                    className="h-10 w-10 rounded-lg border-2 flex items-center justify-center text-xs font-semibold"
                    style={{ borderColor: "#fff", background: "#fdf3ec", color: "#c17f5e" }}
                  >
                    +{orderItem.cartItems.length - 3}
                  </div>
                )}
              </div>
              <p className="text-sm" style={{ color: "#6b5c52" }}>
                {orderItem.cartItems.length} item{orderItem.cartItems.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}

          {/* Footer: ID + price + button */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-5 py-3"
            style={{ borderTop: "1px solid #ece8e3" }}
          >
            <div>
              <p className="text-xs" style={{ color: "#9c8b80" }}>
                Order ID
              </p>
              <p
                className="text-xs font-mono mt-0.5 truncate max-w-[180px]"
                style={{ color: "#6b5c52" }}
              >
                {orderItem?._id}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs" style={{ color: "#9c8b80" }}>
                  Total
                </p>
                <p className="text-base font-bold" style={{ color: "#2d1f17" }}>
                  ₹{orderItem?.totalAmount?.toLocaleString("en-IN")}
                </p>
              </div>

              <Dialog
                open={openDetailsDialog}
                onOpenChange={() => {
                  setOpenDetailsDialog(false);
                  dispatch(resetOrderDetails());
                }}
              >
                <Button
                  onClick={() => handleFetchOrderDetails(orderItem?._id)}
                  className="flex items-center gap-1.5 rounded-lg text-sm font-semibold px-4 py-2"
                  style={{
                    background: "#c17f5e",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Details
                  <ChevronRight size={15} />
                </Button>
                <ShoppingOrderDetailsView orderDetails={orderDetails} />
              </Dialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShoppingOrders;