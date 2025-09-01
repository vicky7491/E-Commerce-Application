import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, Sparkles, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
("");
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import ShopByCategory from "./ShopByCategory";
import BookingForm from "./BookingForm";
import Footer from "./Footer";
import babyimpression from "../../assets/babyimpression.jpg";
import coupleimpression from "../../assets/coupleimpression.jpg";
import parentsimpression from "../../assets/parentsimpression.jpg";
import petimpression from "../../assets/petimpression.jpg";
import CallToAction from "./CallToAction";
import InstagramHandle from "./InstaHandle";

const categoriesWithIcon = [
  { id: "baby", label: "Baby", image: babyimpression },
  { id: "couples", label: "Couple", image: coupleimpression },
  { id: "parents", label: "Parents", image: parentsimpression },
  { id: "family/group", label: "Family/Group", image: petimpression },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
  const currentFilter = {
    [section]: [getCurrentItem.id],
  };

  const queryString = new URLSearchParams();
  for (const [key, value] of Object.entries(currentFilter)) {
    queryString.set(key, value.join(","));
  }

  navigate(`/shop/listing?${queryString.toString()}`);
}


  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  // Animation for category cards
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCategoryVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50">
      {/* Enhanced Hero Slider */}
      <div className="relative w-full h-[700px] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 via-transparent to-amber-100/30"></div>
        
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <div key={index} className="absolute inset-0">
                <img
                  src={slide?.image}
                  className={`${
                    index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  } absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ease-out`}
                />
                {/* Enhanced overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/30 via-transparent to-slate-900/20"></div>
              </div>
            ))
          : null}

        {/* Enhanced Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm border-0 text-slate-700 hover:bg-rose-50 hover:text-rose-700 shadow-xl transition-all duration-300 hover:scale-110"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm border-0 text-slate-700 hover:bg-rose-50 hover:text-rose-700 shadow-xl transition-all duration-300 hover:scale-110"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featureImageList.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>
      

      {/* Enhanced Shop By Category Section */}
      <ShopByCategory
  categories={categoriesWithIcon}
  handleNavigate={(category) =>
    handleNavigateToListingPage(category, "category")
  }
  isVisible={isCategoryVisible}
/>



      {/* Enhanced Featured Products Section */}
      <section id="feature-products" className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-rose-50/30"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-rose-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-48 h-48 bg-gradient-to-br from-amber-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent mr-4"></div>
              <div className="w-3 h-3 bg-rose-400 rounded-full mx-2"></div>
              <div className="w-20 h-0.5 bg-gradient-to-l from-transparent via-rose-400 to-transparent ml-4"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-6 tracking-tight">
              Featured Products
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover our most beloved memory preservation pieces, carefully crafted to last generations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 place-items-stretch">
            {productList && productList.length > 0
              ? productList
                  .filter((item) => item.isCastingKit !== true)
                  .map((productItem, index) => (
                    <motion.div
                      key={productItem._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: index * 0.1, 
                        duration: 0.5,
                        ease: "easeOut" 
                      }}
                      className="w-full h-full flex items-stretch justify-center"
                    >
                      <div className="w-full max-w-sm">
                        <ShoppingProductTile
                          handleGetProductDetails={handleGetProductDetails}
                          product={productItem}
                          handleAddtoCart={handleAddtoCart}
                        />
                      </div>
                    </motion.div>
                  ))
              : null}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />

      {/* Enhanced Booking Form Section */}
    {/* Enhanced Booking Form Section */}
<section className="py-24 relative overflow-hidden">
  {/* Enhanced Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-amber-50"></div>
  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_rgba(251,207,232,0.3)_0%,_transparent_50%)]"></div>
  <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,_rgba(254,215,170,0.3)_0%,_transparent_50%)]"></div>

  <div className="container mx-auto px-4 relative z-10">
    {/* Changed from lg:grid-cols-2 to custom ratio - image gets 5/12, form gets 7/12 */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <motion.div 
        className="lg:col-span-5 relative" // Reduced from 6 to 5 columns
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative overflow-hidden rounded-3xl group shadow-2xl">
          <img
            src={coupleimpression}
            alt="Family hand casting"
            className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
          />

          {/* Enhanced overlay elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-slate-900/30 mix-blend-soft-light"></div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-8 -left-6 w-24 h-24 bg-gradient-to-br from-rose-400/20 to-orange-400/20 rotate-12 rounded-2xl backdrop-blur-sm"></div>
          <div className="absolute bottom-10 -right-6 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-yellow-400/20 rotate-6 rounded-full backdrop-blur-sm"></div>
          
          {/* Sparkle effects */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-80 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-rose-300 rounded-full opacity-60 animate-pulse"></div>
        </div>

        {/* Enhanced tagline - made more compact */}
        <div className="mt-8 text-center lg:text-left">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 relative inline-block leading-tight" // Reduced font sizes
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <span className="relative z-10 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">
              Turn Memories
            </span>
            <div className="absolute bottom-2 left-0 w-full h-4 bg-gradient-to-r from-rose-400/40 to-orange-400/40 -z-0 transform -rotate-1"></div>
          </motion.h2>
          
          <div className="flex flex-col items-center lg:items-start">
            <motion.p 
              className="text-2xl font-light bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent mb-3" // Reduced font size
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Into Timeless Art
            </motion.p>
            
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-rose-400 to-orange-400 mb-4 rounded-full" // Smaller divider
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            ></motion.div>
            
            <motion.p 
              className="text-slate-600 max-w-sm text-base leading-relaxed font-medium" // Smaller max-width and font
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              Preserve life's beautiful moments in exquisite castings that tell your family's unique story
            </motion.p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="lg:col-span-7 w-full" // Increased from 6 to 7 columns, removed max-width constraint
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 max-w-2xl mx-auto lg:mx-0">
          {/* Form will now have more width to breathe */}
          <BookingForm formId="home"/>
        </div>
      </motion.div>
    </div>
  </div>
</section>
      
      <InstagramHandle />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default ShoppingHome;