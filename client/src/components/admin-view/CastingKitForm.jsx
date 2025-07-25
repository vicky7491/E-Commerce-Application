import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CastingKitForm = ({
  formData,
  setFormData,
  currentEditedId,
  refresh,
  closeSheet,
}) => {
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  // Sync formData into local fields
  useEffect(() => {
    if (formData) {
      setUploadedImageUrl(formData?.images?.[0]?.url || "");
    }
  }, [formData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!uploadedImageUrl) {
      toast({
        title: "Image missing",
        description: "Please upload an image before submitting.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      stock: formData.stock,
      images: [
        {
          url: uploadedImageUrl,
          public_id: imageFile?.name || formData?.images?.[0]?.public_id,
        },
      ],
    };

    try {
      const endpoint = currentEditedId
        ? `http://localhost:5000/api/admin/casting-kits/edit/${currentEditedId}`
        : `http://localhost:5000/api/admin/casting-kits/create`;

      const method = currentEditedId ? "put" : "post";

      const res = await axios[method](endpoint, payload, {
        withCredentials: true,
      });

      if (res.data) {
        toast({
          title: currentEditedId ? "Casting Kit Updated" : "Casting Kit Added",
          description: `Your casting kit was successfully ${
            currentEditedId ? "updated" : "created"
          }.`,
        });

        if (typeof refresh === "function") refresh();
        if (typeof closeSheet === "function") closeSheet();

        setFormData({
          title: "",
          description: "",
          price: "",
          stock: "",
          images: [
    {
      url: uploadedImageUrl,
      public_id: formData?.images?.[0]?.public_id || "no-id",
    },
  ],
        });

        setImageFile(null);
        setUploadedImageUrl("");
      }
    } catch (err) {
      toast({
        title: "Submission Failed",
        description: err.response?.data?.error || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-xl mx-auto p-6 bg-white shadow rounded-lg"
    >
      <h2 className="text-2xl font-bold">
        {currentEditedId ? "Edit Casting Kit" : "Add Casting Kit"}
      </h2>

      <div>
        <Label>Title</Label>
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
        />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
        />
      </div>

      <div>
        <Label>Price (₹)</Label>
        <Input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
        />
      </div>

      <div>
        <Label>Stock</Label>
        <Input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Enter stock"
        />
      </div>

      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        imageLoadingState={imageLoadingState}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        isEditMode={!!currentEditedId}
        isCustomStyling={true}
      />

      <Button type="submit" disabled={imageLoadingState}>
        {imageLoadingState
          ? "Uploading Image..."
          : currentEditedId
          ? "Update Casting Kit"
          : "Add Casting Kit"}
      </Button>
    </form>
  );
};

export default CastingKitForm;
