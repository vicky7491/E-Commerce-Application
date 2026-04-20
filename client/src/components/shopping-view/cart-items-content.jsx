import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      const getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentCartItem = getCartItems.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );

        if (getCurrentProductIndex > -1) {
          const getTotalStock = productList[getCurrentProductIndex].totalStock;

          if (indexOfCurrentCartItem > -1) {
            const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;

            if (getQuantity + 1 > getTotalStock) {
              toast({
                title: `Only ${getQuantity} quantity can be added for this item`,
                variant: "destructive",
              });
              return;
            }
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is updated successfully",
          variant: "success",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({
        userId: user?.id,
        productId: getCartItem?.productId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
          variant: "success",
        });
      }
    });
  }

  const itemPrice =
    cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price;

  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="h-24 w-24 overflow-hidden rounded-xl bg-slate-100 flex-shrink-0">
        <img
          src={cartItem?.image}
          alt={cartItem?.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-bold text-slate-800">
            {cartItem?.title}
          </h3>

          <div className="mt-2 flex items-center gap-2">
            {cartItem?.salePrice > 0 ? (
              <>
                <span className="text-sm font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                  ₹{cartItem?.salePrice}
                </span>
                <span className="text-xs text-slate-400 line-through">
                  ₹{cartItem?.price}
                </span>
              </>
            ) : (
              <span className="text-sm font-semibold text-slate-600">
                ₹{cartItem?.price}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="outline"
              className="h-8 w-8 rounded-full border-slate-200 hover:bg-slate-100"
              size="icon"
              disabled={cartItem?.quantity === 1}
              onClick={() => handleUpdateQuantity(cartItem, "minus")}
            >
              <Minus className="w-4 h-4" />
              <span className="sr-only">Decrease</span>
            </Button>

            <span className="min-w-[32px] text-center text-sm font-semibold text-slate-800">
              {cartItem?.quantity}
            </span>

            <Button
              variant="outline"
              className="h-8 w-8 rounded-full border-slate-200 hover:bg-slate-100"
              size="icon"
              onClick={() => handleUpdateQuantity(cartItem, "plus")}
            >
              <Plus className="w-4 h-4" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-end justify-between h-full">
          <p className="text-base font-bold text-slate-800">
            ₹{(itemPrice * cartItem?.quantity).toFixed(2)}
          </p>

          <button
            onClick={() => handleCartItemDelete(cartItem)}
            className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCartItemsContent;