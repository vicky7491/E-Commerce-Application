import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { ShoppingBag, ArrowRight } from "lucide-react";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="w-full sm:max-w-md p-0 border-l border-slate-200 bg-white">
      <div className="flex h-full flex-col">
        <SheetHeader className="border-b border-slate-200 bg-gradient-to-r from-rose-50 to-orange-50 px-6 py-5 text-left">
          <SheetTitle className="flex items-center gap-2 text-xl font-bold text-slate-800">
            <ShoppingBag className="w-5 h-5 text-rose-500" />
            Your Cart
          </SheetTitle>
          <p className="text-sm text-slate-500">
            Review your selected keepsakes before checkout.
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cartItems && cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
                >
                  <UserCartItemsContent cartItem={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <ShoppingBag className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">
                Your cart is empty
              </h3>
              <p className="mt-1 text-sm text-slate-500 max-w-[240px]">
                Looks like you haven’t added anything yet.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 bg-white px-6 py-5">
          <div className="mb-4 rounded-2xl bg-slate-50 px-4 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Total
              </span>
              <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                ₹{totalCartAmount}
              </span>
            </div>
          </div>

          <Button
            onClick={() => {
              navigate("/shop/checkout");
              setOpenCartSheet(false);
            }}
            disabled={!cartItems || cartItems.length === 0}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            Checkout
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;