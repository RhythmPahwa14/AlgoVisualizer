import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { User, LogIn, LogOut, Bookmark, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import "../styles/UserDropdown.css";

const UserDropdown = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const themeClass = isDark ? "dark" : "light";

  return (
    <DropdownMenu.Root>
      {/* Trigger Button */}
      <DropdownMenu.Trigger asChild>
        <button
          className={`user-dropdown-trigger ${themeClass}`}
          aria-label="User menu"
        >
          <User className={`user-icon ${themeClass}`} strokeWidth={2} />
        </button>
      </DropdownMenu.Trigger>

      {/* Dropdown Menu */}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          align="end"
          sideOffset={10}
          className={`user-dropdown-content ${themeClass}`}
          style={{
            animationDuration: "200ms",
            animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Header with User Info */}
          <div className={`user-dropdown-header ${themeClass}`}>
            <div className="flex items-center gap-3">
              <div className="user-avatar">
                <User className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className={`user-welcome-text ${themeClass}`}>
                  Welcome Back!
                </p>
                <p className={`user-subtitle ${themeClass}`}>
                  Manage your account
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="user-dropdown-items">
            {/* Login */}
            <DropdownMenu.Item asChild>
              <Link to="/login" className={`user-menu-item ${themeClass}`}>
                <div className={`menu-icon-container icon-blue ${themeClass}`}>
                  <LogIn className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <span className="flex-1 font-semibold">Login</span>
                <ChevronRight
                  className={`chevron-icon ${themeClass}`}
                  strokeWidth={2.5}
                />
              </Link>
            </DropdownMenu.Item>

            {/* Saved Notes */}
            <DropdownMenu.Item asChild>
              <Link to="/saved" className={`user-menu-item ${themeClass}`}>
                <div className={`menu-icon-container icon-amber ${themeClass}`}>
                  <Bookmark className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <span className="flex-1 font-semibold">Saved Notes</span>
                <ChevronRight
                  className={`chevron-icon ${themeClass}`}
                  strokeWidth={2.5}
                />
              </Link>
            </DropdownMenu.Item>

            {/* Separator */}
            <div className={`user-dropdown-separator ${themeClass}`}></div>

            {/* Logout */}
            <DropdownMenu.Item
              className={`user-menu-item ${themeClass}`}
              onClick={() => alert("Logout clicked")}
            >
              <div className={`menu-icon-container icon-red ${themeClass}`}>
                <LogOut className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <span className="flex-1 font-semibold">Logout</span>
              <ChevronRight
                className={`chevron-icon ${themeClass}`}
                strokeWidth={2.5}
              />
            </DropdownMenu.Item>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserDropdown;
