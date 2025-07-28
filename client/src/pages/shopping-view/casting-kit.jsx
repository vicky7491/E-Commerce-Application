import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/shop/cart-slice/index";
import CastingKitTile from "@/components/shopping-view/CastingKitTile";
import { useToast } from "@/components/ui/use-toast";
import CallToAction from "./CallToAction";
import Footer from "./Footer";

const CastingKitPage = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = useSelector((state) => state.auth.user?._id); // adjust if different
console.log("UserID in page:", userId);
  useEffect(() => {
    const fetchKits = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/shop/casting-kits");
        setKits(res.data.kits || []);
      } catch (err) {
        console.error("Failed to fetch casting kits:", err);
        toast({
          title: "Error",
          description: "Unable to load casting kits.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchKits();
  }, []);

const handleAddToCart = (itemId, itemType, quantity) => {
  dispatch(addToCart({ itemId, itemType, quantity }))
    .unwrap()
    .then(() => {
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
              isLoggedIn={!!userId}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </section>
    <CallToAction />
    <Footer />
    </div>
  );
};

export default CastingKitPage;
