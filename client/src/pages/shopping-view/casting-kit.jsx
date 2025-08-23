import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "@/api/base";
import { useSelector, useDispatch } from "react-redux";
import CastingKitTile from "@/components/shopping-view/CastingKitTile";
import CallToAction from "./CallToAction";
import Footer from "./Footer";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { setProductDetails } from "@/store/shop/products-slice";

const CastingKitPage = () => {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const userId = useSelector((state) => state.auth.user?.id);
  const cartItems = useSelector((state) => state.shopCart.cartItems);
  const { toast } = useToast();
  const dispatch = useDispatch();

  // 🛒 Add to cart logic (same as before)
  const handleAddToCart = (productId, totalStock) => {
    if (!userId) {
      toast({
        title: "Login required",
        description: "Please login to add items to cart.",
        variant: "destructive",
      });
      return;
    }

    const getCartItems = cartItems?.items || [];
    if (getCartItems.length) {
      const index = getCartItems.findIndex((item) => item.productId === productId);
      if (index > -1) {
        const getQuantity = getCartItems[index].quantity;
        if (getQuantity + 1 > totalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(addToCart({ userId, productId, quantity: 1 }))
      .unwrap()
      .then(() => {
        dispatch(fetchCartItems(userId));
        toast({
          title: "Added to Cart",
          description: "The item has been added to your cart.",
        });
      })
      .catch(() => {
        toast({
          title: "Failed",
          description: "Could not add to cart. Try again later.",
          variant: "destructive",
        });
      });
  };

  // 📦 Product Details Handler
  const handleGetProductDetails = (productId) => {
    const product = kits.find((item) => item._id === productId);
    if (product) {
      setSelectedProduct(product);
      setOpen(true);
    }
  };

  // 🔄 Fetch casting kits
  useEffect(() => {
    const fetchCastingKits = async () => {
      try {
        const response = await axios.get(`${API_BASE}/admin/products/get`);
        const allProducts = response.data.data || [];
        const onlyCastingKits = allProducts.filter((item) => item.isCastingKit === true);
        setKits(onlyCastingKits);
      } catch (error) {
        console.error("Failed to load casting kits:", error);
        setKits([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCastingKits();
  }, []);

  return (
    <div>
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Casting Kits</h1>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : kits.length === 0 ? (
          <p className="text-center text-muted-foreground">No casting kits available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {kits.map((kit) => (
              <CastingKitTile
                key={kit._id}
                kit={kit}
                handleAddToCart={handleAddToCart}
                handleGetProductDetails={handleGetProductDetails}
              />
            ))}
          </div>
        )}
      </section>

      {/* 🔍 Product Details Dialog */}
      <ProductDetailsDialog
        open={open}
        setOpen={setOpen}
        productDetails={selectedProduct}
      />

      <CallToAction />
      <Footer />
    </div>
  );
};

export default CastingKitPage;
