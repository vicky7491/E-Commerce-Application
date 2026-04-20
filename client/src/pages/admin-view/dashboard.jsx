import FeatureImageUpload from "@/components/admin-view/FeatureImageUpload";
import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} from "@/store/common-slice";
import { ImagePlus, Trash2, Sparkles, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const { featureImageList } = useSelector(
    (state) => state.commonFeature
  );

  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) {
      setErrorMessage("Please select an image before uploading.");
      return;
    }

    setErrorMessage("");

    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setUploadedImageUrl("");
      }
    });
  }

  function handleDeleteFeatureImage(imageId) {
    dispatch(deleteFeatureImage(imageId)).then(() => {
      dispatch(getFeatureImages());
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl border bg-gradient-to-r from-[#fffaf6] to-[#f8f2ec] p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[#C47D52]">
              <Sparkles size={18} />
              <span className="text-sm font-semibold uppercase tracking-widest">
                Homepage Manager
              </span>
            </div>

            <h1 className="text-3xl font-bold text-[#3A3A3A]">
              Feature Slider Images
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Upload and manage premium banner images for homepage carousel.
            </p>
          </div>

          <div className="rounded-2xl bg-white px-5 py-3 shadow-sm border">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Total Images
            </p>
            <p className="text-2xl font-bold text-[#C47D52]">
              {featureImageList?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Upload Card */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-[#C47D52]/10 p-3 text-[#C47D52]">
            <ImagePlus size={22} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#3A3A3A]">
              Upload New Banner
            </h2>
            <p className="text-sm text-muted-foreground">
              Recommended size: 1600x700 for best quality
            </p>
          </div>
        </div>

        <FeatureImageUpload
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          imageLoadingState={imageLoadingState}
          setImageLoadingState={setImageLoadingState}
        />

        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        <Button
          onClick={handleUploadFeatureImage}
          disabled={imageLoadingState}
          className="h-12 w-full rounded-2xl bg-[#C47D52] text-white hover:bg-[#a9633d]"
        >
          {imageLoadingState ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Upload Feature Image"
          )}
        </Button>
      </div>

      {/* Gallery */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-[#3A3A3A]">
            Uploaded Images
          </h2>
          <p className="text-sm text-muted-foreground">
            Delete old banners or refresh homepage visuals.
          </p>
        </div>

        {featureImageList && featureImageList.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featureImageList.map((featureImgItem, index) => (
              <div
                key={featureImgItem._id}
                className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={featureImgItem.image}
                    alt={`Feature ${index + 1}`}
                    className="h-[240px] w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />

                  <Button
                    onClick={() =>
                      handleDeleteFeatureImage(featureImgItem._id)
                    }
                    size="icon"
                    className="absolute right-3 top-3 h-10 w-10 rounded-xl bg-red-500 text-white opacity-0 shadow-lg transition-all duration-300 hover:bg-red-600 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>

                <div className="p-4">
                  <p className="font-semibold text-[#3A3A3A]">
                    Homepage Banner {index + 1}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Active slider image
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed bg-muted/20 p-12 text-center">
            <ImagePlus className="mx-auto mb-3 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-[#3A3A3A]">
              No Images Uploaded
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Start by uploading your first homepage banner.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;