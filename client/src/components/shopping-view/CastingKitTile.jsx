import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

function CastingKitTile({ kit, handleAddToCart }) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={kit?.image}
            alt={kit?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {kit?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : kit?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${kit?.totalStock} items left`}
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{kit?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                kit?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${kit?.price}
            </span>
            {kit?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${kit?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        {kit?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddToCart(kit?._id,  kit.totalStock)} // 👈 only productId and quantity
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default CastingKitTile;
