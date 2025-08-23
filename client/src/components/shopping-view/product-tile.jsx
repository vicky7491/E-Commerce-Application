import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Sparkles } from "lucide-react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-sm mx-auto"
    >
      <Card className="w-full h-full bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/10 hover:border-rose-300/50 group">
        <div 
          onClick={() => handleGetProductDetails(product?._id)}
          className="cursor-pointer"
        >
          <div className="relative overflow-hidden h-[280px]">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Enhanced overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* View Details Button - appears on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <Button
                size="sm"
                className="bg-white/95 backdrop-blur-sm text-slate-700 hover:bg-rose-50 hover:text-rose-700 shadow-xl border-0 rounded-full px-4 py-2"
              >
                <Eye className="w-4 h-4 mr-2" />
                Quick View
              </Button>
            </div>

            {/* Enhanced badges */}
            {product?.totalStock === 0 ? (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg rounded-full px-3 py-1">
                Out Of Stock
              </Badge>
            ) : product?.totalStock < 10 ? (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg rounded-full px-3 py-1">
                {`Only ${product?.totalStock} left`}
              </Badge>
            ) : product?.salePrice > 0 ? (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg rounded-full px-3 py-1 flex items-center">
                <Sparkles className="w-3 h-3 mr-1" />
                Sale
              </Badge>
            ) : null}
          </div>

          <CardContent className="p-6 h-[140px] flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold mb-3 text-slate-800 line-clamp-2 leading-tight group-hover:text-rose-700 transition-colors duration-300">
                {product?.title}
              </h2>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                  {categoryOptionsMap[product?.category]}
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
                  ₹{product?.price}
                </span>
                {product?.salePrice > 0 ? (
                  <span className="text-lg font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                    ₹{product?.salePrice}
                  </span>
                ) : null}
              </div>
              {product?.salePrice > 0 && (
                <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full font-medium">
                  {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                </span>
              )}
            </div>
          </CardContent>
        </div>

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
                  handleAddtoCart(product?._id, product?.totalStock);
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