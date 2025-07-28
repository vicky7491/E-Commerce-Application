import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const CastingKitTile = ({ kit, handleAddToCart }) => {
  const isOutOfStock = kit?.stock === 0;
  const lowStock = kit?.stock > 0 && kit?.stock < 10;

  const onAddToCart = () => {
    handleAddToCart(kit._id, "CastingKit", 1);
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={kit?.images?.[0]?.url}
            alt={kit?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {isOutOfStock ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : lowStock ? (
            <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">
              Only {kit?.stock} left
            </Badge>
          ) : null}
        </div>

        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{kit?.title}</h2>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {kit?.description}
          </p>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-primary">
              ₹{kit?.price}
            </span>
          </div>
        </CardContent>
      </div>

      <CardFooter>
        {isOutOfStock ? (
          <Button disabled className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button className="w-full" onClick={onAddToCart}>
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CastingKitTile;
