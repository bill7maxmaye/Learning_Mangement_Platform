import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className=" p-4 h-full border-b shadow-sm flex bg-white items-center ">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
