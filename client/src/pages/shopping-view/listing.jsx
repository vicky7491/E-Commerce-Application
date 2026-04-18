import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "./Footer";

const LIMIT = 12;

function createSearchParamsHelper(filterParams, sortParam) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      queryParams.push(`${key}=${encodeURIComponent(value.join(","))}`);
    }
  }

  if (sortParam) {
    queryParams.push(`sort=${sortParam}`);
  }

  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();

  // ── Added: pagination from Redux (Change 9) ─────────────────────────────────
  const { productList, productDetails, pagination, isLoading } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);

  // ── Added: page state (Change 9) ────────────────────────────────────────────
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();

  // ── Pagination derived values ────────────────────────────────────────────────
  const totalPages    = pagination?.pages ?? 1;
  const totalProducts = pagination?.total ?? productList?.length ?? 0;
  const hasPrev       = page > 1;
  const hasNext       = page < totalPages;

  // --- Handle Sort ---
  function handleSort(value) {
    setPage(1); // reset to page 1 on sort change
    setSort(value);
  }

  // --- Handle Filter ---
  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };

    if (!cpyFilters[getSectionId]) {
      cpyFilters[getSectionId] = [getCurrentOption];
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCurrentOption);
      } else {
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }

      if (cpyFilters[getSectionId].length === 0) {
        delete cpyFilters[getSectionId];
      }
    }

    setPage(1); // reset to page 1 on filter change
    setFilters(cpyFilters);
  }

  // --- Get Product Details ---
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  // --- Add to Cart ---
  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
          variant: "success",
        });
      }
    });
  }

  // --- On Page Load: restore filters & sort from URL ---
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    const restoredFilters = {};
    for (const [key, value] of Object.entries(params)) {
      if (key !== "sort") {
        restoredFilters[key] = value.split(",");
      }
    }

    setFilters(restoredFilters);
    setSort(params.sort || "price-lowtohigh");
  }, []); // run only once on mount

  // --- Whenever filters/sort changes, sync URL ---
  useEffect(() => {
    const createQueryString = createSearchParamsHelper(filters, sort);
    setSearchParams(new URLSearchParams(createQueryString));
  }, [filters, sort]);

  // --- Fetch products on filter / sort / page change (Change 9) ---
  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({
          filterParams: filters,
          sortParams:   sort,
          page,
          limit:        LIMIT,
        })
      );
    }
  }, [dispatch, sort, filters, page]); // ← added page

  // --- Open details dialog when productDetails available ---
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
        {/* Sidebar Filter */}
        <ProductFilter filters={filters} handleFilter={handleFilter} />

        {/* Product List */}
        <div className="bg-background w-full rounded-lg shadow-sm">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-extrabold">All Products</h2>
            <div className="flex items-center gap-3">

              {/* ── Updated: uses pagination.total (Change 9) ──────────────── */}
              <span className="text-muted-foreground">
                {totalProducts} Products
              </span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem._id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>

          {/* ── Pagination controls (Change 9) ──────────────────────────────── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-4 border-t">

              {/* Left — page info */}
              <p className="text-sm text-muted-foreground">
                Page {page} of {totalPages} &mdash; {totalProducts} total
              </p>

              {/* Right — Prev / numbered pills / Next */}
              <div className="flex items-center gap-2">

                {/* Prev */}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!hasPrev || isLoading}
                  onClick={() => setPage((p) => p - 1)}
                >
                  ← Prev
                </Button>

                {/* Page number pills — shows first, last, current ±1, with … gaps */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      p === 1 ||
                      p === totalPages ||
                      Math.abs(p - page) <= 1
                  )
                  .reduce((acc, p, idx, arr) => {
                    if (idx > 0 && p - arr[idx - 1] > 1) {
                      acc.push("ellipsis-" + p);
                    }
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((item) =>
                    typeof item === "string" ? (
                      <span key={item} className="px-1 text-muted-foreground text-sm">
                        …
                      </span>
                    ) : (
                      <Button
                        key={item}
                        variant={item === page ? "default" : "outline"}
                        size="sm"
                        disabled={isLoading}
                        onClick={() => setPage(item)}
                        className={
                          item === page
                            ? "bg-black text-white hover:bg-black/90"
                            : ""
                        }
                      >
                        {item}
                      </Button>
                    )
                  )}

                {/* Next */}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!hasNext || isLoading}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next →
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Details Dialog */}
        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      </div>
      <Footer />
    </>
  );
}

export default ShoppingListing;