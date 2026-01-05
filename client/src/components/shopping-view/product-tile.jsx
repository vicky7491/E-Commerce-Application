import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";

function ShoppingProductTile({ product, handleGetProductDetails }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false); // Fixed: Added missing state
  const userId = useSelector((state) => state.auth.user?.id);
  const cartItems = useSelector((state) => state.shopCart.cartItems);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const images = product?.images || [];
  
  // Auto-scroll effect with hover pause
  useEffect(() => {
    if (images.length <= 1 || isHovering) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [images.length, isHovering]); // Added isHovering dependency

  // 🛒 Add to cart logic
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
      const existingItem = getCartItems.find((item) => item.productId === productId);
      if (existingItem) {
        if (existingItem.quantity + 1 > totalStock) {
          toast({
            title: `Stock limit reached`,
            description: `Only ${totalStock} items available in stock.`,
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
      .catch((error) => {
        console.error("Add to cart error:", error);
        toast({
          title: "Failed",
          description: "Could not add to cart. Try again later.",
          variant: "destructive",
        });
      });
  };

  // Handle manual image navigation on hover
  const handleImageHover = () => {
    setIsHovering(true);
  };

  const handleImageLeave = () => {
    setIsHovering(false);
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-sm mx-auto"
      data-product-id={product._id}
    >
      <Card className="w-full h-full bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/10 hover:border-rose-300/50 group">
        <div 
          onClick={() => handleGetProductDetails(product?._id)}
          className="cursor-pointer"
        >
          <div 
            className="relative overflow-hidden h-[280px]"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
          >
            {/* Carousel Container */}
            <div className="relative w-full h-full">
              {images.length > 0 ? (
                <>
                  {/* Current Image */}
                  <img
                    src={images[currentImageIndex]}
                    alt={`${product?.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                    key={currentImageIndex}
                  />
                  
                  {/* Image Indicators/Dots */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(index);
                          }}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            index === currentImageIndex
                              ? "bg-white scale-125"
                              : "bg-white/50 hover:bg-white/80"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                      {currentImageIndex + 1}/{images.length}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                  <span className="text-slate-400">No Image</span>
                </div>
              )}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Quick View Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <Button
                size="sm"
                className="bg-white/95 backdrop-blur-sm text-slate-700 hover:bg-rose-50 hover:text-rose-700 shadow-xl border-0 rounded-full px-4 py-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleGetProductDetails(product?._id);
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                Quick View
              </Button>
            </div>

            {/* Badges */}
            {product?.totalStock === 0 ? (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg rounded-full px-3 py-1">
                Out Of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg rounded-full px-3 py-1">
                {`Only ${product?.totalStock} left`}
              </Badge>
            ) : product?.salePrice > 0 ? (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg rounded-full px-3 py-1 flex items-center">
                <Sparkles className="w-3 h-3 mr-1" />
                Sale
              </Badge>
            ) : null}
          </div>

          {/* Product Info */}
          <CardContent className="p-6 h-[140px] flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold mb-3 text-slate-800 line-clamp-2 leading-tight group-hover:text-rose-700 transition-colors duration-300">
                {product?.title}
              </h2>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                  {categoryOptionsMap[product?.category] || "Uncategorized"}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span
                  className={`${
                    product?.salePrice > 0
                      ? "line-through text-slate-400 text-sm"
                      : "text-slate-800 font-bold text-lg"
                  }`}
                >
                  ₹{product?.price || 0}
                </span>
                {product?.salePrice > 0 && (
                  <span className="text-lg font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                    ₹{product?.salePrice}
                  </span>
                )}
              </div>
              {product?.salePrice > 0 && product?.price > 0 && (
                <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full font-medium">
                  {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                </span>
              )}
            </div>
          </CardContent>
        </div>

        {/* Footer - Add to Cart */}
        <CardFooter className="p-6 pt-0">
          {product?.totalStock === 0 ? (
            <Button 
              disabled
              className="w-full bg-slate-200 text-slate-500 cursor-not-allowed rounded-xl h-12"
            >
              Out Of Stock
            </Button>
          ) : (
            <motion.div className="w-full">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product?._id, product?.totalStock);
                }}
                className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white rounded-xl h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </Button>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default ShoppingProductTile;