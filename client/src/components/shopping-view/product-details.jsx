import { StarIcon, MessageSquare, ShoppingCart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews, loading: reviewsLoading } = useSelector((state) => state.shopReview);

  const { toast } = useToast();
  
  const images = productDetails?.images || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Reset image index when product changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [productDetails]);

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  async function handleAddToCart(getCurrentProductId, getTotalStock) {
    if (!user) {
      toast({
        title: "Please login to add items to cart",
        variant: "destructive",
      });
      return;
    }

    setIsAddingToCart(true);
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Stock limit reached`,
            description: `Only ${getTotalStock} units available for this product`,
            variant: "destructive",
          });
          setIsAddingToCart(false);
          return;
        }
      }
    }

    try {
      const data = await dispatch(
        addToCart({
          userId: user?.id,
          productId: getCurrentProductId,
          quantity: 1,
        })
      );
      
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Added to cart",
          description: "Product has been added to your cart",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to add to cart",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
    setCurrentImageIndex(0);
  }

  async function handleAddReview() {
    if (!user) {
      toast({
        title: "Please login to add a review",
        variant: "destructive",
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive",
      });
      return;
    }

    setIsAddingReview(true);
    try {
      const data = await dispatch(
        addReview({
          productId: productDetails?._id,
          userId: user?.id,
          userName: user?.userName || user?.name,
          userAvatar: user?.avatar,
          reviewMessage: reviewMsg,
          reviewValue: rating,
        })
      );
      
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review submitted!",
          description: "Thank you for your feedback",
        });
      }
    } catch (error) {
      toast({
        title: "You need to purchase this product to review it.",
        variant: "destructive",
      });
    } finally {
      setIsAddingReview(false);
    }
  }

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReviews(productDetails?._id));
    }
  }, [productDetails, dispatch]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  const reviewCount = reviews?.length || 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-50 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-lg"
            onClick={handleDialogClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Image Section with Carousel */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 lg:p-8">
              <div className="relative aspect-square w-full max-w-md mx-auto">
                {/* Main Image */}
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-white shadow-lg">
                  {images.length > 0 ? (
                    <img
                      src={images[currentImageIndex]}
                      alt={`${productDetails?.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x400?text=Image+Not+Found";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-xl">
                      <span className="text-gray-400">No Image Available</span>
                    </div>
                  )}
                  
                  {/* Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <Button
                        onClick={prevImage}
                        size="icon"
                        variant="ghost"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full w-10 h-10"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      
                      <Button
                        onClick={nextImage}
                        size="icon"
                        variant="ghost"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full w-10 h-10"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </>
                  )}
                  
                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>
                
                {/* Thumbnail Navigation */}
                {images.length > 1 && (
                  <div className="flex gap-2 mt-4 overflow-x-auto py-2 px-1">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex
                            ? "border-rose-500 ring-2 ring-rose-200"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/100x100?text=Image";
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Sale Badge */}
              {productDetails?.salePrice > 0 && (
                <Badge className="absolute left-6 top-6 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 text-sm font-bold shadow-lg">
                  SALE
                </Badge>
              )}
              
              {/* Stock Badge */}
              {productDetails?.totalStock < 10 && productDetails?.totalStock > 0 && (
                <Badge className="absolute left-6 top-16 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-2 text-sm font-bold shadow-lg">
                  Only {productDetails?.totalStock} left!
                </Badge>
              )}
            </div>

            {/* Product Details Section */}
            <div className="p-6 lg:p-8 overflow-y-auto max-h-[80vh]">
              <div className="space-y-6">
                {/* Product Header */}
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {productDetails?.title}
                  </h1>
                  <p className="text-gray-600 text-lg mb-4">
                    {productDetails?.description}
                  </p>
                </div>

                {/* Price and Rating */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-3xl font-bold text-gray-900 ${productDetails?.salePrice > 0 ? "line-through text-gray-400" : ""}`}>
                        ₹{productDetails?.price}
                      </span>
                      {productDetails?.salePrice > 0 && (
                        <span className="text-3xl font-bold text-red-600">
                          ₹{productDetails?.salePrice}
                        </span>
                      )}
                    </div>
                    {productDetails?.salePrice > 0 && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1">
                        Save {Math.round(((productDetails.price - productDetails.salePrice) / productDetails.price) * 100)}%
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <StarRatingComponent rating={averageReview} size={20} />
                      <span className="text-gray-600 font-medium">
                        {averageReview.toFixed(1)} ({reviewCount} reviews)
                      </span>
                    </div>
                    <Badge variant={productDetails?.totalStock > 0 ? "outline" : "destructive"}>
                      {productDetails?.totalStock > 0 ? `${productDetails.totalStock} in stock` : "Out of stock"}
                    </Badge>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="pt-4">
                  {productDetails?.totalStock === 0 ? (
                    <Button className="w-full opacity-60 cursor-not-allowed" size="lg" disabled>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Out of Stock
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl"
                      size="lg"
                      onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}
                      disabled={isAddingToCart}
                    >
                      {isAddingToCart ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Adding...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                  )}
                </div>

                <Separator />

                {/* Reviews Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-gray-600" />
                    <h2 className="text-xl font-semibold">Customer Reviews</h2>
                  </div>

                  {reviewsLoading ? (
                    <div className="space-y-4">
                      {[1, 2].map((i) => (
                        <Card key={i}>
                          <CardContent className="p-4">
                            <div className="flex gap-3">
                              <Skeleton className="h-10 w-10 rounded-full" />
                              <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-16 w-full" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : reviews && reviews.length > 0 ? (
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                      {reviews.map((reviewItem) => (
                        <Card key={reviewItem._id} className="border-0 bg-gray-50">
                          <CardContent className="p-4">
                            <div className="flex gap-3">
                              <Avatar className="h-10 w-10 border">
                                <AvatarImage src={reviewItem.userAvatar} />
                                <AvatarFallback className="bg-blue-100 text-blue-600">
                                  {reviewItem?.userName?.[0]?.toUpperCase() || "U"}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-gray-900">
                                    {reviewItem?.userName}
                                  </h3>
                                  <span className="text-xs text-gray-500">
                                    {new Date(reviewItem.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 mb-2">
                                  <StarRatingComponent rating={reviewItem?.reviewValue} size={16} />
                                </div>
                                <p className="text-gray-700 text-sm">
                                  {reviewItem.reviewMessage}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No reviews yet. Be the first to review!</p>
                    </div>
                  )}

                  {/* Add Review Form */}
                  {user && (
                    <Card className="border-0 bg-blue-50">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-3">Write a Review</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="rating">Your Rating:</Label>
                            <StarRatingComponent
                              rating={rating}
                              handleRatingChange={handleRatingChange}
                              editable={true}
                            />
                          </div>
                          <Textarea
                            id="review"
                            placeholder="Share your experience with this product..."
                            value={reviewMsg}
                            onChange={(event) => setReviewMsg(event.target.value)}
                            className="min-h-[100px]"
                          />
                          <Button
                            onClick={handleAddReview}
                            disabled={reviewMsg.trim() === "" || rating === 0 || isAddingReview}
                            size="sm"
                          >
                            {isAddingReview ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                                Submitting...
                              </>
                            ) : (
                              "Submit Review"
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {!user && (
                    <div className="text-center py-4 text-gray-500">
                      <p>Please sign in to leave a review</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;