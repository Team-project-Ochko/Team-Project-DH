import React from "react";
import { ButtonOfNav } from "./ButtonOfNav";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Logo } from "./Logo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Header = () => {
  return (
    <div className="text-white w-full h-20 flex items-center justify-between px-4">
      <div className="flex items-center">
        <div className="mr-4 lg:mr-8">
          <Logo />
        </div>
        {/* Desktop nav */}
        <nav className="hidden lg:flex font-bold items-center gap-4">
          <ButtonOfNav text={"Home"} />
          <ButtonOfNav text={"Event Halls"} />
          <ButtonOfNav text={"Performers"} />
          <ButtonOfNav text={"Hosts"} />
          <ButtonOfNav text={"Dashboard"} />
          <ButtonOfNav text={"Contact"} />
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {/* Search - show on md+ */}
        <div className="hidden md:flex items-center">
          <Search className="mr-2 w-5 text-neutral-500" />
          <Input
            placeholder="Search..."
            className="pl-3 h-9 rounded-[20px] bg-neutral-800 border-none"
          />
        </div>

        {/* Auth actions */}
        <div className="hidden sm:flex gap-2 items-center">
          <button className="bg-black rounded-md h-9 px-3 text-sm">
            LogIn
          </button>
          <button className="bg-blue-600 rounded-md px-3 h-9 text-sm">
            SignUp
          </button>
        </div>

        {/* Mobile menu */}
        <div className="flex items-center sm:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <button className="bg-blue-600 h-9 px-3 rounded-md">Menu</button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-3 w-56 mt-4 bg-black text-white">
              <ButtonOfNav text={"Home"} />
              <ButtonOfNav text={"Event Halls"} />
              <ButtonOfNav text={"Performers"} />
              <ButtonOfNav text={"Hosts"} />
              <ButtonOfNav text={"Dashboard"} />
              <ButtonOfNav text={"Contact"} />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
