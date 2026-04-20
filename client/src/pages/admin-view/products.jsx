import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Package2, Plus, ShoppingBag, Sparkles } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  images: [],
  title: "",
  description: "",
  category: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
  isCastingKit: false,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if (currentEditedId && formData.images?.length) {
      setUploadedImageUrls(formData.images);
    }
  }, [currentEditedId]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  function onSubmit(event) {
    event.preventDefault();

    const payload = {
      ...formData,
      images: uploadedImageUrls,
    };

    if (currentEditedId !== null) {
      dispatch(
        editProduct({
          id: currentEditedId,
          formData: payload,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          resetForm();
          toast({ title: "Product updated successfully", variant: "success" });
        }
      });
    } else {
      dispatch(addNewProduct(payload)).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProducts());
          resetForm();
          toast({ title: "Product added successfully", variant: "success" });
        }
      });
    }
  }

  function resetForm() {
    setOpenCreateProductsDialog(false);
    setCurrentEditedId(null);
    setFormData(initialFormData);
    setImageFiles([]);
    setUploadedImageUrls([]);
    setImageLoadingState(false);
  }

  function handleDelete(productId) {
    dispatch(deleteProduct(productId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast({ title: "Product deleted successfully", variant: "success" });
      }
    });
  }

  function isFormValid() {
    return Object.entries(formData)
      .filter(([key]) => key !== "averageReview")
      .filter(([key]) => !(formData.isCastingKit && key === "category"))
      .every(([key, value]) => {
        if (key === "images") return uploadedImageUrls.length > 0;
        if (typeof value === "boolean") return true;
        return value !== "";
      });
  }

  return (
    <Fragment>
      <div className="space-y-8">
        {/* Top Header */}
        <div className="rounded-3xl border bg-gradient-to-r from-[#fffaf6] to-[#f8f2ec] p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[#C47D52]">
                <Sparkles size={18} />
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                  Admin Inventory
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-[#3A3A3A]">
                Products Management
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Add, edit, and manage your Beautiful Molds product catalog.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border bg-white px-5 py-3 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-[#C47D52]">
                  {productList?.length || 0}
                </p>
              </div>

              <Button
                onClick={() => setOpenCreateProductsDialog(true)}
                className="h-12 rounded-2xl bg-[#C47D52] px-5 text-white hover:bg-[#a9633d]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
            </div>
          </div>
        </div>

        {/* Product Grid Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-[#3A3A3A]">
              All Products
            </h2>
            <p className="text-sm text-muted-foreground">
              View and manage all store items from one place.
            </p>
          </div>

          {productList?.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {productList.map((productItem) => (
                <AdminProductTile
                  key={productItem._id}
                  product={productItem}
                  setFormData={setFormData}
                  setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                  setCurrentEditedId={setCurrentEditedId}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed bg-muted/20 p-12 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C47D52]/10 text-[#C47D52]">
                <ShoppingBag size={26} />
              </div>
              <h3 className="text-lg font-semibold text-[#3A3A3A]">
                No products found
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Start by adding your first product to the catalog.
              </p>
              <Button
                onClick={() => setOpenCreateProductsDialog(true)}
                className="mt-5 rounded-2xl bg-[#C47D52] text-white hover:bg-[#a9633d]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          )}
        </div>
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={(open) => {
          if (!open) resetForm();
        }}
      >
        <SheetContent
          side="right"
          className="w-full overflow-auto sm:max-w-2xl bg-[#fcfaf8]"
        >
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="flex items-center gap-3 text-2xl font-bold text-[#3A3A3A]">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C47D52]/10 text-[#C47D52]">
                <Package2 size={22} />
              </div>
              {currentEditedId ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-6 py-6">
            <div className="rounded-3xl border bg-white p-5 shadow-sm">
              <h3 className="mb-1 text-lg font-semibold text-[#3A3A3A]">
                Product Images
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Upload one or multiple product images.
              </p>

              <ProductImageUpload
                imageFiles={imageFiles}
                setImageFiles={setImageFiles}
                uploadedImageUrls={uploadedImageUrls}
                setUploadedImageUrls={setUploadedImageUrls}
                setFormData={setFormData}
                imageLoadingState={imageLoadingState}
                setImageLoadingState={setImageLoadingState}
              />
            </div>

            <div className="rounded-3xl border bg-white p-5 shadow-sm">
              <h3 className="mb-1 text-lg font-semibold text-[#3A3A3A]">
                Product Details
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Fill in the required product information below.
              </p>

              <CommonForm
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId ? "Update Product" : "Add Product"}
                formControls={addProductFormElements}
                isBtnDisabled={!isFormValid()}
                hiddenFields={formData.isCastingKit ? ["category"] : []}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;