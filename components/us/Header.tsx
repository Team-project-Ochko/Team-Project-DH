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
    <div className="text-white w-full h-20 flex items-center justify-between">
      <div className="hidden lg:flex">
        <Logo />
      </div>

      <div className="hidden font-bold w-200 justify-between lg:flex items-center">
        <div className="ml-5">
          <ButtonOfNav text={"Home"} />
        </div>
        <ButtonOfNav text={"Event Halls"} />
        <ButtonOfNav text={"Performers"} />
        <ButtonOfNav text={"Hosts"} />
        <ButtonOfNav text={"Dashboard"} />
        <div className="mr-5">
          <ButtonOfNav text={"Contact"} />
        </div>
      </div>
      <div className="flex mr-10 items-center justify-between w-full lg:w-auto gap-3">
        <div className="items-center flex ml-14 lg:ml-0">
          <Search className="mr-[-36] w-5 z-10 text-neutral-500" />
          <Input
            placeholder="Search..."
            className="pl-10 h-10 rounded-[20] bg-neutral-800 border-none"
          />
        </div>
        <div className="flex gap-2">
          <button className="hidden md:block bg-black rounded-md h-10 w-20">
            LogIn
          </button>
          <button className="hidden md:block bg-blue-600 rounded-md w-20 h-10">
            SignUp
          </button>
          <div className="flex md:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <button className="bg-blue-600 h-10 w-20 rounded-md">
                  Menu
                </button>
              </PopoverTrigger>
              <PopoverContent className="flex gap-3 w-full mt-4 bg-black text-white">
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
    </div>
  );
};
