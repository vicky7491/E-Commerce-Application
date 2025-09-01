import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "@/api/base";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { clearCart } from "@/store/shop/cart-slice";
import {
  createRazorpayOrder,
  confirmRazorpayOrder,
} from "@/store/shop/order-slice";
import {
  CreditCard,
  MapPin,
  Package,
  ShoppingCart,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) * currentItem?.quantity,
          0
        )
      : 0;

  // Calculate item count
  const itemCount = cartItems?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  async function handleRazorpayPayment() {
    if (!cartItems?.items || cartItems.items.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to proceed with checkout",
        variant: "destructive",
      });
      return;
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Shipping address required",
        description: "Please select a delivery address to proceed",
        variant: "destructive",
      });
      return;
    }

    setIsPaymentStart(true);

    try {
      // STEP 1: Create Razorpay order via backend
      const res = await fetch(`${API_BASE}/shop/order/razorpay/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalCartAmount }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error("Failed to create Razorpay order");
      }

      // STEP 2: Configure Razorpay checkout options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "Your Store",
        description: "Payment for your order",
        handler: function (response) {
          const orderData = {
            userId: user?.id,
            cartId: cartItems?._id,
            cartItems: cartItems.items.map((item) => ({
              productId: item?.productId,
              title: item?.title,
              image: item?.image,
              price:
                item?.salePrice > 0 ? item?.salePrice : item?.price,
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

          // STEP 3: Confirm order and save to DB
          dispatch(confirmRazorpayOrder(orderData)).then((res) => {
            if (res?.payload?.success) {
               dispatch(clearCart());
               navigate("/shop/order-success", { state: { order: res.payload.order } });
              toast({ 
                title: "Order placed successfully!",
                description: "Your order has been confirmed and will be shipped soon."
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
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
          contact: currentSelectedAddress?.phone || "",
        },
        theme: {
          color: "#9155FD",
        },
        modal: {
          ondismiss: function() {
            setIsPaymentStart(false);
            toast({
              title: "Payment cancelled",
              description: "You can try again whenever you're ready",
            });
          }
        }
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      

      <div className="flex-1 container max-w-6xl mx-auto px-4 py-8 ">
         {/* Order Items */}
            <Card >
              <CardHeader className="bg-blue-50 border-b">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">Order Items ({itemCount})</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {cartItems?.items?.length > 0 ? (
                    cartItems.items.map((item) => (
                      <UserCartItemsContent key={item.productId} cartItem={item} />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Your cart is empty</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => navigate('/shop')}
                      >
                        Continue Shopping
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Shipping Address */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="bg-blue-50 border-b">
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
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700 mb-2">
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

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <Card className="sticky top-6">
              <CardHeader className="bg-blue-50 border-b">
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
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{totalCartAmount.toFixed(2)}</span>
                  </div>

                  <Button 
                    onClick={handleRazorpayPayment} 
                    className="w-full mt-4"
                    disabled={isPaymentStart || !cartItems?.items?.length || !currentSelectedAddress}
                    size="lg"
                  >
                    {isPaymentStart ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay with Razorpay
                      </>
                    )}
                  </Button>

                  {(!cartItems?.items?.length || !currentSelectedAddress) && (
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <div className="text-sm text-yellow-700">
                          {!cartItems?.items?.length ? (
                            <p>Add items to your cart to proceed</p>
                          ) : (
                            <p>Select a shipping address to proceed</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-gray-500 mt-4 text-center">
                    By completing your purchase, you agree to our Terms of Service and Privacy Policy
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Badges */}
            <div className="bg-white rounded-lg border p-4 text-center">
              <div className="flex justify-center items-center gap-4 mb-2">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-xs text-gray-600">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                    <Package className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-600">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-1">
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