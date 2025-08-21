import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
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
  { id: "couple", label: "Couple", image: coupleimpression },
  { id: "parents", label: "Parents", image: parentsimpression },
  { id: "pet", label: "pet", image: petimpression },
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
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
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
    <div className="flex flex-col min-h-screen bg-brand-cream">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
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
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-brand-cream/90 border-brand-terracotta text-brand-terracotta"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-brand-cream/90 border-brand-terracotta text-brand-terracotta"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      {/* Shop By catogary section */}
      <section className="py-16 bg-gradient-to-b from-white to-brand-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold  text-brand-charcoal mb-4">
              Shop by Category
            </h2>
            <p className="text-brand-terracotta max-w-2xl mx-auto">
              Explore our unique collections tailored for your special moments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoriesWithIcon.map((categoryItem, index) => (
              <motion.div
                key={categoryItem.id}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isCategoryVisible
                    ? {
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 120,
                        },
                      }
                    : {}
                }
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className="cursor-pointer"
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
              >
                <Card className="h-full bg-white rounded-xl overflow-hidden shadow-lg  border border-brand-sage transition-all duration-300 hover:shadow-xl">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative overflow-hidden h-56">
                      <motion.img
                        src={categoryItem.image}
                        alt={categoryItem.label}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white">
                          {categoryItem.label}
                        </h3>
                      </div>
                    </div>

                    <div className="p-4 flex-grow flex flex-col">
                      <div className="flex-grow">
                        <p className="text-brand-charcoal text-sm mb-4">
                          Preserve precious memories with our{" "}
                          {categoryItem.label.toLowerCase()} collections
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-medium text-brand-terracotta">
                          Explore collection
                        </span>
                        <motion.div
                          className="w-8 h-8 rounded-full  bg-brand-sage/30 flex items-center justify-center"
                          whileHover={{
                            backgroundColor: "#D4A88C",
                            color: "white",
                          }}
                        >
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.5,
                            }}
                            className="text-brand-terracotta"
                          >
                            ➤
                          </motion.span>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="feature-products" className="py-12 bg-brand-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-brand-charcoal">
              Feature Products
            </h2>
            <p className="text-brand-terracotta max-w-2xl mx-auto">
              Discover our most popular memory preservation items
            </p>
          </div>

          <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {productList && productList.length > 0
              ? productList.filter((item) => item.isCastingKit !== true).map((productItem) => (
                  <ShoppingProductTile
                  key={productItem._id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
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

      {/* Booking Form Section */}
      <section className="py-16 bg-brand-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl group">
                <img
                  src={coupleimpression}
                  alt="Family hand casting"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Decorative overlay elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-brand-terracotta/20 mix-blend-soft-light"></div>
                <div className="absolute top-6 -left-4 w-24 h-24 bg-brand-terracotta/10 rotate-12 rounded-lg"></div>
                <div className="absolute bottom-8 -right-4 w-20 h-20 bg-brand-charcoal/5 rotate-6 rounded-full"></div>
              </div>
              {/* Tagline with creative typography */}
              <div className="mt-16 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-brand-charcoal mb-4 relative inline-block">
                  <span className="relative z-10">Turn Memories</span>
                  <div className="absolute bottom-2 left-0 w-full h-3 bg-brand-terracotta/30 -z-0"></div>
                </h2>
                <div className="flex flex-col items-center md:items-start">
                  <p className="text-3xl font-light text-brand-charcoal mb-3">
                    Into Timeless Art
                  </p>
                  <div className="w-24 h-1 bg-brand-terracotta mb-4"></div>
                  <p className="text-brand-terracotta max-w-md italic">
                    Preserve life's beautiful moments in exquisite castings that
                    tell your family's story
                  </p>
                </div>
              </div>
            </div>
            <div className="md:ml-auto">
              <BookingForm formId="home"/>
            </div>
          </div>
        </div>
      </section>
      
      <InstagramHandle/>
      <CallToAction />
      <Footer />
    </div>
  );
}

export default ShoppingHome;
