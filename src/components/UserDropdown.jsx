import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { User, LogIn, LogOut, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

const UserDropdown = () => {
  return (
    <DropdownMenu.Root>
      {/* Trigger Button */}
      <DropdownMenu.Trigger asChild>
        <button
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="User menu"
        >
          <User className="w-7 h-7" />
        </button>
      </DropdownMenu.Trigger>

      {/* Dropdown Menu */}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          align="center"
          sideOffset={13}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 min-w-[150px] flex flex-col"
        >
          {/* Login */}
          <DropdownMenu.Item asChild>
            <Link
              to="/login"
              className="flex justify-center items-center gap-2 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer w-full"
            >
              <LogIn className="w-5 h-5" /> Login
            </Link>
          </DropdownMenu.Item>

          {/* Logout */}
          <DropdownMenu.Item
            className="flex justify-center items-center gap-2 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer w-full"
          >
            <LogOut className="w-5 h-5" /> Logout
          </DropdownMenu.Item>

          {/* Saved Notes */}
          <DropdownMenu.Item
            className="flex justify-center items-center gap-2 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer w-full"
          >
            <Bookmark className="w-5 h-5" /> Saved Notes
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserDropdown;
