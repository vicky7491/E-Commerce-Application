import {
  BadgeCheck,
  CalendarDays,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { cn } from "@/lib/utils";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: ShoppingBasket,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: BadgeCheck,
  },
  {
    id: "bookings",
    label: "Bookings",
    path: "/admin/bookingDashboard",
    icon: CalendarDays,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mt-6 flex flex-col gap-2">
      <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
        Navigation
      </p>

      {adminSidebarMenuItems.map((menuItem) => {
        const Icon = menuItem.icon;
        const isActive = location.pathname === menuItem.path;

        return (
          <button
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              setOpen?.(false);
            }}
            className={cn(
              "group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200",
              "border border-transparent",
              isActive
                ? "bg-gradient-to-r from-[#C47D52]/15 to-[#D4AF37]/10 text-[#3A3A3A] shadow-sm border-[#C47D52]/20"
                : "text-muted-foreground hover:bg-[#faf7f4] hover:text-[#3A3A3A]"
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200",
                isActive
                  ? "bg-[#C47D52] text-white shadow-md"
                  : "bg-muted/60 text-muted-foreground group-hover:bg-white group-hover:text-[#C47D52]"
              )}
            >
              <Icon size={19} />
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold">{menuItem.label}</span>
              <span className="text-xs text-muted-foreground/70">
                Manage {menuItem.label.toLowerCase()}
              </span>
            </div>
          </button>
        );
      })}
    </nav>
  );
}

function SidebarBrand({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-border/50 bg-gradient-to-br from-[#fffaf6] to-[#f8f2ec] p-4 shadow-sm transition-all duration-200 hover:shadow-md"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C47D52] to-[#D4AF37] text-white shadow-md">
        <ChartNoAxesCombined size={24} />
      </div>

      <div className="flex flex-col">
        <h1 className="text-lg font-extrabold tracking-tight text-[#3A3A3A]">
          Admin Panel
        </h1>
        <p className="text-xs text-muted-foreground">Beautiful Molds</p>
      </div>
    </div>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-[300px] border-r bg-white/95 px-4 py-4 backdrop-blur-xl"
        >
          <div className="flex h-full flex-col">
            <SheetHeader className="border-b border-border/60 pb-4">
              <SheetTitle asChild>
                <div>
                  <SidebarBrand onClick={() => navigate("/admin/dashboard")} />
                </div>
              </SheetTitle>
            </SheetHeader>

            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden min-h-screen w-72 border-r border-border/60 bg-white/80 px-5 py-6 backdrop-blur-xl lg:flex lg:flex-col">
        <SidebarBrand onClick={() => navigate("/admin/dashboard")} />
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;