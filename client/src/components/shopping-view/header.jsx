import brandLogo from "@/assets/brand-logo.jpg";
import {
  LogOut,
  Menu,
  ShoppingCart,
  UserCog,
  X,
  ChevronRight,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

// ─── MenuItems ────────────────────────────────────────────────────────────────

function MenuItems({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");

    const isStaticPath = [
      "/shop",
      "/shop/testimonials",
      "/shop/aboutus",
      "/shop/contactus",
    ].includes(getCurrentMenuItem.path.toLowerCase());

    if (isStaticPath) {
      navigate(getCurrentMenuItem.path);
      onClose?.();
      return;
    }

    if (getCurrentMenuItem.id === "casting-kit") {
      navigate("/shop/CastingKit");
      onClose?.();
      return;
    }

    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "about-us" &&
      getCurrentMenuItem.id !== "search"
        ? { category: [getCurrentMenuItem.id] }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    if (location.pathname.includes("listing") && currentFilter !== null) {
      setSearchParams(
        new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
      );
    } else {
      navigate(getCurrentMenuItem.path);
    }

    onClose?.();
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

// ─── Mobile Drawer Nav ────────────────────────────────────────────────────────

function MobileNavItems({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");

    const isStaticPath = [
      "/shop",
      "/shop/testimonials",
      "/shop/aboutus",
      "/shop/contactus",
    ].includes(getCurrentMenuItem.path.toLowerCase());

    if (isStaticPath) {
      navigate(getCurrentMenuItem.path);
      onClose();
      return;
    }

    if (getCurrentMenuItem.id === "casting-kit") {
      navigate("/shop/CastingKit");
      onClose();
      return;
    }

    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "about-us" &&
      getCurrentMenuItem.id !== "search"
        ? { category: [getCurrentMenuItem.id] }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    if (location.pathname.includes("listing") && currentFilter !== null) {
      setSearchParams(
        new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
      );
    } else {
      navigate(getCurrentMenuItem.path);
    }

    onClose();
  }

  return (
    <nav className="flex flex-col gap-1">
      {shoppingViewHeaderMenuItems.map((menuItem) => {
        const isActive =
          menuItem.path === "/shop"
            ? location.pathname === "/shop"
            : location.pathname.startsWith(menuItem.path);

        return (
          <button
            key={menuItem.id}
            onClick={() => handleNavigate(menuItem)}
            className={`
              group flex items-center justify-between w-full px-4 py-3.5 rounded-xl
              text-left text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? "bg-[#0a1a2f] text-[#c19d56]"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }
            `}
          >
            <span>{menuItem.label}</span>
            <ChevronRight
              className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5
                ${isActive ? "text-[#c19d56]" : "text-gray-400"}`}
            />
          </button>
        );
      })}
    </nav>
  );
}

// ─── HeaderRightContent (desktop) ────────────────────────────────────────────

function HeaderRightContent({ openCartSheet, setOpenCartSheet }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser())
      .unwrap()
      .then((res) => {
        if (res.success) navigate("/auth/login");
      })
      .catch((err) => console.error("Logout failed", err));
  }

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          {/* Cart */}
          <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setOpenCartSheet(true)}
              className="relative h-11 w-11 rounded-xl border-slate-200 hover:bg-slate-100"
            >
              <ShoppingCart className="w-5 h-5 text-slate-700" />

              <span className="absolute -top-2 -right-2 min-w-[22px] h-[22px] px-1 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 text-white text-[11px] font-bold flex items-center justify-center shadow">
                {cartItems?.items?.length || 0}
              </span>

              <span className="sr-only">Cart</span>
            </Button>

            <UserCartWrapper
              setOpenCartSheet={setOpenCartSheet}
              cartItems={cartItems?.items || []}
            />
          </Sheet>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-2 py-1.5 hover:bg-slate-50 transition-all">
                <Avatar className="h-9 w-9 shadow-sm">
                  <AvatarFallback className="bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold">
                    {user?.userName ? user.userName[0].toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>

                <span className="hidden xl:block text-sm font-medium text-slate-700 max-w-[110px] truncate">
                  {user?.userName}
                </span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-60 rounded-2xl border border-slate-200 shadow-xl p-2"
            >
              <DropdownMenuLabel className="pb-2">
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-800">
                    {user?.userName}
                  </span>
                  <span className="text-xs text-slate-500 truncate">
                    {user?.email || "Logged in"}
                  </span>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => navigate("/shop/account")}
                className="rounded-xl cursor-pointer py-2.5"
              >
                <UserCog className="mr-2 h-4 w-4 text-slate-500" />
                My Account
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setOpenCartSheet(true)}
                className="rounded-xl cursor-pointer py-2.5"
              >
                <ShoppingCart className="mr-2 h-4 w-4 text-slate-500" />
                My Cart
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="rounded-xl cursor-pointer py-2.5 text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="rounded-xl px-5 border-slate-200"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </Button>

          <Button
            className="rounded-xl px-5 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white shadow-md"
            onClick={() => navigate("/auth/register")}
          >
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── ShoppingHeader ───────────────────────────────────────────────────────────

function ShoppingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openCartSheet, setOpenCartSheet] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser())
      .unwrap()
      .then((res) => {
        if (res.success) {
          setMobileOpen(false);
          navigate("/auth/login");
        }
      })
      .catch((err) => console.error("Logout failed", err));
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 100);
  }, []);

  return (
    <>
      {/* Shared cart sheet for both desktop + mobile */}
      {user && (
        <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
          <UserCartWrapper
            setOpenCartSheet={setOpenCartSheet}
            cartItems={cartItems?.items || []}
          />
        </Sheet>
      )}

      <header className="sticky top-0 z-40 w-full border-b bg-background bg-gradient-to-br from-rose-50 to-amber-50">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          {/* Brand */}
          <Link to="/shop" className="flex items-center gap-2 min-w-0">
            <img
              src={brandLogo}
              alt="Beautiful Molds logo"
              className="h-12 max-w-[150px] object-contain"
            />
            <span className="font-bold hidden sm:block">Beautiful Molds</span>
          </Link>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 lg:hidden">
            {user && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setOpenCartSheet(true)}
                className="relative h-10 w-10 rounded-xl border-slate-200 hover:bg-slate-100"
              >
                <ShoppingCart className="h-5 w-5 text-slate-700" />
                <span className="absolute -top-2 -right-2 min-w-[20px] h-[20px] px-1 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
                  {cartItems?.items?.length || 0}
                </span>
                <span className="sr-only">Cart</span>
              </Button>
            )}

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setMobileOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle header menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-[300px] p-0 flex flex-col overflow-hidden border-r-0"
                style={{ background: "#ffffff" }}
              >
                {/* Drawer header */}
                <div
                  className="flex items-center justify-between px-5 py-5"
                  style={{
                    background:
                      "linear-gradient(135deg, #0a1a2f 0%, #112240 50%, #1a3357 100%)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={brandLogo}
                      alt="Beautiful Molds"
                      className="h-9 w-9 rounded-full object-cover border-2"
                      style={{ borderColor: "#c19d56" }}
                    />
                    <div>
                      <p className="text-white font-bold text-sm leading-tight">
                        Beautiful Molds
                      </p>
                      <p
                        className="text-xs leading-tight"
                        style={{ color: "#c19d56" }}
                      >
                        Life Casting Studio
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full p-3 transition-colors hover:bg-white/10"
                    aria-label="Close menu"
                  >
                    {/* <X className="w-7 h-7 text-white/80" /> */}
                  </button>
                </div>

                {/* Nav items */}
                <div className="flex-1 overflow-y-auto px-3 py-4">
                  <p className="px-4 mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                    Menu
                  </p>
                  <MobileNavItems onClose={() => setMobileOpen(false)} />
                </div>

                <div className="mx-5 border-t border-gray-100" />

                {/* User block */}
                <div className="px-3 py-4">
                  {user ? (
                    <div>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 mb-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                          style={{ background: "#0a1a2f" }}
                        >
                          {user?.userName ? user.userName[0].toUpperCase() : "U"}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {user.userName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email || "Logged in"}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          navigate("/shop/account");
                          setMobileOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors mb-1"
                      >
                        <UserCog className="w-4 h-4 text-gray-400" />
                        My Account
                      </button>

                      <button
                        onClick={() => {
                          setMobileOpen(false);
                          setOpenCartSheet(true);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors mb-1"
                      >
                        <ShoppingCart className="w-4 h-4 text-gray-400" />
                        My Cart
                      </button>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 px-1">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          navigate("/auth/login");
                          setMobileOpen(false);
                        }}
                      >
                        Login
                      </Button>
                      <Button
                        className="w-full text-white"
                        style={{ background: "#0a1a2f" }}
                        onClick={() => {
                          navigate("/auth/register");
                          setMobileOpen(false);
                        }}
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            <MenuItems onClose={() => {}} />
          </div>

          {/* Desktop right content */}
          <div className="hidden lg:block">
            <HeaderRightContent
              openCartSheet={openCartSheet}
              setOpenCartSheet={setOpenCartSheet}
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default ShoppingHeader;