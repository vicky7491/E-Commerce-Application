// components/admin-view/CastingKitTile.jsx
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminCastingKitTile({
  kit,
  setFormData,
  setOpenCreateKitDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={kit?.images?.[0]?.url}
            alt={kit?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{kit?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold text-primary">₹{kit?.price}</span>
            <span className="text-sm">Stock: {kit?.stock}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateKitDialog(true);
              setCurrentEditedId(kit?._id);
              setFormData(kit);
            }}
          >
            Edit
          </Button>
          <Button variant="destructive" onClick={() => handleDelete(kit?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminCastingKitTile;
