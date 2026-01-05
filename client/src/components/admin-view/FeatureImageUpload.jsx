import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import axios from "axios";

function FeatureImageUpload({
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
}) {
  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageLoadingState(true);

    const data = new FormData();
    data.append("my_file", file);

    const res = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );

    if (res?.data?.success) {
      setUploadedImageUrl(res.data.url);
    }

    setImageLoadingState(false);
  }

  return (
    <div className="w-full mt-4">
      <Label className="text-lg font-semibold mb-2 block">
        Upload Feature Image
      </Label>

      <Input type="file" onChange={handleImageChange} />

      {imageLoadingState && (
        <Skeleton className="h-10 mt-2 bg-gray-100" />
      )}

      {uploadedImageUrl && (
        <img
          src={uploadedImageUrl}
          className="mt-3 w-full h-[250px] object-cover rounded"
        />
      )}
    </div>
  );
}

export default FeatureImageUpload;
