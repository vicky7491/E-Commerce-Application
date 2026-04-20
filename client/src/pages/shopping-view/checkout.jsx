import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "@/api/base";
import { clearCart } from "@/store/shop/cart-slice";
import { confirmRazorpayOrder } from "@/store/shop/order-slice";

import {
  CreditCard,
  MapPin,
  Package,
  ShoppingCart,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const items = cartItems?.items || [];

  const totalCartAmount = items.reduce((sum, item) => {
    const price = item?.salePrice > 0 ? item.salePrice : item?.price || 0;
    return sum + price * (item?.quantity || 0);
  }, 0);

  const itemCount = items.reduce((total, item) => total + (item?.quantity || 0), 0);

  async function handleRazorpayPayment() {
    if (!items.length) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to proceed with checkout",
        variant: "destructive",
      });
      return;
    }

    if (!currentSelectedAddress) {
      toast({
        title: "Shipping address required",
        description: "Please select a delivery address to proceed",
        variant: "warning",
      });
      return;
    }

    setIsPaymentStart(true);

    try {
      const res = await fetch(`${API_BASE}/api/shop/order/razorpay/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalCartAmount }),
      });

      const data = await res.json();

      if (!data?.success) {
        throw new Error("Failed to create Razorpay order");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "Your Store",
        description: "Payment for your order",
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: currentSelectedAddress?.phone || "",
        },
        theme: {
          color: "#9155FD",
        },
        modal: {
          ondismiss: function () {
            setIsPaymentStart(false);
            toast({
              title: "Payment cancelled",
              description: "You can try again whenever you're ready",
              variant: "destructive",
            });
          },
        },
        handler: function (response) {
          const orderData = {
            userId: user?.id,
            cartId: cartItems?._id,
            cartItems: items.map((item) => ({
              productId: item?.productId,
              title: item?.title,
              image: item?.image,
              price: item?.salePrice > 0 ? item.salePrice : item?.price,
              quantity: item?.quantity,
            })),
            addressInfo: {
              addressId: currentSelectedAddress?._id,
              name: currentSelectedAddress?.name,
              address: currentSelectedAddress?.address,
              city: currentSelectedAddress?.city,
              pincode: currentSelectedAddress?.pincode,
              phone: currentSelectedAddress?.phone,
              notes: currentSelectedAddress?.notes,
            },
            paymentMethod: "razorpay",
            totalAmount: totalCartAmount,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          dispatch(confirmRazorpayOrder(orderData)).then((res) => {
            if (res?.payload?.success) {
              dispatch(clearCart());
              navigate("/shop/order-success", {
                state: { order: res.payload.order },
              });

              toast({
                title: "Order placed successfully!",
                description: "Your order has been confirmed and will be shipped soon.",
                variant: "success",
              });
            } else {
              toast({
                title: "Payment confirmation failed",
                description: "Please contact support if the amount was deducted",
                variant: "destructive",
              });
            }

            setIsPaymentStart(false);
          });
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment initiation failed",
        description: "Please try again or use a different payment method",
        variant: "destructive",
      });
      setIsPaymentStart(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="container mx-auto flex-1 max-w-6xl px-4 py-8">
        {/* Order Items */}
        <Card className="mb-8">
          <CardHeader className="border-b bg-blue-50">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">Order Items ({itemCount})</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-4">
              {items.length > 0 ? (
                items.map((item) => (
                  <UserCartItemsContent key={item.productId} cartItem={item} />
                ))
              ) : (
                <div className="py-8 text-center">
                  <Package className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => navigate("/shop")}
                  >
                    Continue Shopping
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader className="border-b bg-blue-50">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">Shipping Address</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <Address
                  selectedId={currentSelectedAddress}
                  setCurrentSelectedAddress={setCurrentSelectedAddress}
                />

                {currentSelectedAddress && (
                  <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-green-700">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Address Selected</span>
                    </div>
                    <p className="text-sm text-green-600">
                      Orders will be shipped to this address
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader className="border-b bg-blue-50">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>₹{totalCartAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{totalCartAmount.toFixed(2)}</span>
                  </div>

                  <Button
                    size="lg"
                    className="mt-4 w-full"
                    onClick={handleRazorpayPayment}
                    disabled={isPaymentStart || !items.length || !currentSelectedAddress}
                  >
                    {isPaymentStart ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pay with Razorpay
                      </>
                    )}
                  </Button>

                  {(!items.length || !currentSelectedAddress) && (
                    <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="mt-0.5 h-4 w-4 text-yellow-600" />
                        <div className="text-sm text-yellow-700">
                          {!items.length ? (
                            <p>Add items to your cart to proceed</p>
                          ) : (
                            <p>Select a shipping address to proceed</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 text-center text-xs text-gray-500">
                    By completing your purchase, you agree to our Terms of Service and
                    Privacy Policy
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Badges */}
            <div className="rounded-lg border bg-white p-4 text-center">
              <div className="mb-2 flex items-center justify-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-xs text-gray-600">Secure Payment</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <Package className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-600">Fast Delivery</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-xs text-gray-600">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;