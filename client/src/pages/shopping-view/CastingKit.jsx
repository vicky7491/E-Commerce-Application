import React, { useEffect, useState } from "react";
import axios from "axios";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/shop/cart-slice/index"; // adjust this to your actual path





const CastingKitPage = () => {
  const [kits, setKits] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchKits = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/casting-kits/all");
        setKits(res.data.kits);
        console.log("userId", userId);
      } catch (err) {
        console.error("Error fetching kits:", err);
      }
    };

    fetchKits();
  }, []);

  const handleAddtoCart = (id, stock, type) => {
  const userId = localStorage.getItem("userId");
  const selectedKit = kits.find((kit) => kit._id === id);

     if (!selectedKit || stock === 0 || !userId) {
    console.warn("Missing data", { userId, selectedKit, stock });
    return;
  }
   console.log("Adding to cart:", {
    userId,
    itemId: selectedKit._id,
    itemType: type,
    quantity: 1,
  });

   dispatch(
  addToCart({
    userId,
    itemId: selectedKit._id,
    itemType: "CastingKit", // or "product"
    quantity: 1,
  })
);

  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Our Casting Kits</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {kits.map((kit) => (
          <ShoppingProductTile
            key={kit._id}
             product={{ ...kit, itemType: "CastingKit" }} // reusing "product" prop
            handleAddtoCart={handleAddtoCart}
            handleGetProductDetails={null} // or define if needed
          />
        ))}
      </div>
    </div>
  );
};

export default CastingKitPage;
