import { XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import axios from "axios";

function ProductImageUpload({
  imageFiles,
  setImageFiles,
  uploadedImageUrls,
  setUploadedImageUrls,
  setFormData,              // 🔥 NEW
  imageLoadingState,
  setImageLoadingState,
}) {
  async function handleImageChange(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setImageLoadingState(true);

    const uploadedUrls = [];

    for (const file of files) {
      const data = new FormData();
      data.append("my_file", file);

      const res = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );

      if (res?.data?.success) {
        uploadedUrls.push(res.data.url);

      }
    }

    // ✅ Update image URLs
    setUploadedImageUrls((prev) => {
      const updated = [...prev, ...uploadedUrls];

      // 🔥 Sync with formData
      setFormData((prevForm) => ({
        ...prevForm,
        images: updated,
      }));

      return updated;
    });

    setImageFiles((prev) => [...prev, ...files]);
    setImageLoadingState(false);
  }

  function removeImage(index) {
    setUploadedImageUrls((prev) => {
      const updated = prev.filter((_, i) => i !== index);

      // 🔥 Sync with formData
      setFormData((prevForm) => ({
        ...prevForm,
        images: updated,
      }));

      return updated;
    });

    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="w-full mt-4 max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">
        Upload Images
      </Label>

      <Input
        type="file"
        multiple
        onChange={handleImageChange}
        disabled={imageLoadingState}
      />

      {imageLoadingState && (
        <Skeleton className="h-10 mt-2 bg-gray-100" />
      )}

      <div className="mt-4 space-y-2">
        {uploadedImageUrls.map((url, index) => (
          <div
            key={index}
            className="flex items-center justify-between border rounded p-2"
          >
            <img
              src={url}
              alt="product"
              className="w-16 h-16 object-cover rounded"
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => removeImage(index)}
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImageUpload;
