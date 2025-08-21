import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Home, PackageSearch, Printer, Download } from "lucide-react";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function formatDate(d) {
  try {
    if (!d) return "N/A";
    const date = new Date(d);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "N/A";
  }
}

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1) Prefer state from navigate; 2) else fallback to sessionStorage
  const order = useMemo(() => {
    const fromState = location.state?.order;
    if (fromState) return fromState;
    try {
      const cached = sessionStorage.getItem("lastOrder");
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }, [location.state]);

  if (!order) {
    // If user refreshed directly & no cache, send them home
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-semibold mb-2">No order to show</h1>
        <p className="text-muted-foreground mb-6">
          We couldn’t find your recent order details.
        </p>
        <Button onClick={() => navigate("/shop/home")}>
          <Home className="w-4 h-4 mr-2" />
          Go to Home
        </Button>
      </div>
    );
  }

  const {
    _id,
    totalAmount,
    paymentMethod,
    paymentStatus,
    orderStatus,
    orderDate,
    paymentId,
    cartItems = [],
    addressInfo = {},
  } = order;

  const itemsSubtotal = cartItems.reduce(
    (sum, it) => sum + Number(it.price || 0) * Number(it.quantity || 0),
    0
  );
  const shippingFee = 0; // adjust if you apply shipping
  const discount = 0;    // adjust if you apply coupon/discount
  const grandTotal = itemsSubtotal + shippingFee - discount;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Success Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <CheckCircle2 className="w-14 h-14 text-green-600 mb-3" />
        <h1 className="text-3xl font-bold">Order Confirmed</h1>
        <p className="text-muted-foreground mt-1">
          Thank you for your purchase! Your payment has been received.
        </p>
      </div>

      {/* Top summary strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="py-4">
            <div className="text-sm text-muted-foreground">Order ID</div>
            <div className="font-semibold truncate">{_id}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <div className="text-sm text-muted-foreground">Order Date</div>
            <div className="font-semibold">{formatDate(orderDate)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <div className="text-sm text-muted-foreground">Total Paid</div>
            <div className="font-semibold">{currency.format(totalAmount ?? grandTotal)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Address + Payment */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              {addressInfo?.name && <div className="font-medium">{addressInfo.name}</div>}
              {addressInfo?.phone && (
                <div className="text-muted-foreground">📞 {addressInfo.phone}</div>
              )}
              <div>
                {addressInfo?.address}
                {addressInfo?.city ? `, ${addressInfo.city}` : ""}
                {addressInfo?.state ? `, ${addressInfo.state}` : ""}
              </div>
              {addressInfo?.pincode && <div>PIN: {addressInfo.pincode}</div>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment & Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Payment Method</span>
                <Badge variant="secondary" className="capitalize">
                  {paymentMethod || "—"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Payment Status</span>
                <Badge className={paymentStatus === "paid" ? "bg-green-600" : ""}>
                  {paymentStatus || "—"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Order Status</span>
                <Badge variant="outline" className="capitalize">
                  {orderStatus || "inProcess"}
                </Badge>
              </div>
              {paymentId && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Payment ID: </span>
                  <span className="font-mono">{paymentId}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-2" />
                Print Invoice
              </Button>
              <Button variant="outline" onClick={() => navigate("/shop/home")}>
                <Home className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
              <Button onClick={() => navigate("/shop/account")}>
                <PackageSearch className="w-4 h-4 mr-2" />
                View My Orders
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right column: Items + Totals */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Items in your Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-sm text-muted-foreground">No items found.</div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const lineTotal = (Number(item.price) || 0) * (Number(item.quantity) || 0);
                    return (
                      <div
                        key={item._id || item.productId}
                        className="flex items-center gap-4"
                      >
                        <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : null}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground">
                            Qty: {item.quantity} × {currency.format(item.price || 0)}
                          </div>
                        </div>
                        <div className="font-semibold">{currency.format(lineTotal)}</div>
                      </div>
                    );
                  })}
                </div>
              )}
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{currency.format(itemsSubtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shippingFee ? currency.format(shippingFee) : "Free"}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span>-{currency.format(discount)}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Grand Total</span>
                  <span className="text-lg font-bold">
                    {currency.format(totalAmount ?? grandTotal)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
