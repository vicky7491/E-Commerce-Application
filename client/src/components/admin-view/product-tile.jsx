import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { Pencil, Trash2, Sparkles } from "lucide-react";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  const hasSale = product?.salePrice > 0;
  const isOutOfStock = product?.totalStock === 0;
  const isLowStock = product?.totalStock > 0 && product?.totalStock < 10;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-sm mx-auto"
    >
      <Card className="w-full h-full bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/10 hover:border-rose-300/50 group">
        <div className="relative overflow-hidden">
          <div className="relative h-[280px] overflow-hidden">
            <img
              src={product?.images?.[0]}
              alt={product?.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {isOutOfStock ? (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg rounded-full px-3 py-1">
                Out Of Stock
              </Badge>
            ) : isLowStock ? (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg rounded-full px-3 py-1">
                Only {product?.totalStock} left
              </Badge>
            ) : hasSale ? (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg rounded-full px-3 py-1 flex items-center">
                <Sparkles className="w-3 h-3 mr-1" />
                Sale
              </Badge>
            ) : null}
          </div>

          <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-3 text-slate-800 line-clamp-2 leading-tight group-hover:text-rose-700 transition-colors duration-300">
              {product?.title}
            </h2>

            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                {product?.category || "Uncategorized"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span
                  className={`${
                    hasSale
                      ? "line-through text-slate-400 text-sm"
                      : "text-slate-800 font-bold text-lg"
                  }`}
                >
                  ₹{product?.price || 0}
                </span>

                {hasSale && (
                  <span className="text-lg font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                    ₹{product?.salePrice}
                  </span>
                )}
              </div>

              {hasSale && product?.price > 0 && (
                <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full font-medium">
                  {Math.round(
                    ((product.price - product.salePrice) / product.price) * 100
                  )}
                  % OFF
                </span>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-0 flex gap-3">
            <Button
              onClick={() => {
                setOpenCreateProductsDialog(true);
                setCurrentEditedId(product?._id);
                setFormData(product);
              }}
              className="flex-1 rounded-xl h-11 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-semibold shadow-md"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>

            <Button
              onClick={() => handleDelete(product?._id)}
              variant="outline"
              className="flex-1 rounded-xl h-11 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-semibold"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}

export default AdminProductTile;