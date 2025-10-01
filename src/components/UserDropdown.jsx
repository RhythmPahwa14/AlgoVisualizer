import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { User, LogIn, LogOut, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

// Configuration data for dropdown items
const DROPDOWN_ITEMS = [
  {
    type: "link",
    to: "/login",
    icon: LogIn,
    label: "Login",
    className: "flex justify-center items-center gap-2 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer w-full"
  },
  {
    type: "button",
    icon: LogOut,
    label: "Logout",
    className: "flex justify-center items-center gap-2 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer w-full"
  },
  {
    type: "button",
    icon: Bookmark,
    label: "Saved Notes",
    className: "flex justify-center items-center gap-2 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer w-full"
  }
];

// Sub-component for rendering dropdown items
const DropdownItem = ({ item }) => {
  if (item.type === "link") {
    return (
      <DropdownMenu.Item asChild>
        <Link
          to={item.to}
          className={item.className}
        >
          <item.icon className="w-5 h-5" /> {item.label}
        </Link>
      </DropdownMenu.Item>
    );
  }

  return (
    <DropdownMenu.Item
      className={item.className}
    >
      <item.icon className="w-5 h-5" /> {item.label}
    </DropdownMenu.Item>
  );
};

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
          {DROPDOWN_ITEMS.map((item, index) => (
            <DropdownItem key={index} item={item} />
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserDropdown;