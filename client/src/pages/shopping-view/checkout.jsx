import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { clearCart } from "@/store/shop/cart-slice";
import {
  createRazorpayOrder,
  confirmRazorpayOrder,
} from "@/store/shop/order-slice";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
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

  async function handleRazorpayPayment() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    setIsPaymemntStart(true);

    try {
      // STEP 1: Create Razorpay order via backend
      const res = await fetch("http://localhost:5000/api/shop/order/razorpay/create", {
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
              toast({ title: "Order placed successfully!" });
            } else {
              toast({
                title: "Something went wrong while confirming payment",
                variant: "destructive",
              });
            }
            setIsPaymemntStart(false);
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
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error(error);
      toast({
        title: "Payment initiation failed",
        variant: "destructive",
      });
      setIsPaymemntStart(false);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems?.items?.length > 0 &&
            cartItems.items.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleRazorpayPayment} className="w-full">
              {isPaymentStart
                ? "Processing Razorpay Payment..."
                : "Checkout with Razorpay"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
