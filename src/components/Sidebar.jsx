import React, { useEffect, useRef, useState } from "react";
import {
  Home,
  BarChart3,
  Search,
  Database,
  Share2,
  Users,
  Settings,
  Code,
  Brain,
  FileText,
  Menu,
  X
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const sidebarRef = useRef(null);
  const linkRefs = useRef({});
  const [indicatorPos, setIndicatorPos] = useState({ top: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Update active indicator position
  useEffect(() => {
    const activeLink = linkRefs.current[location.pathname];
    if (sidebarRef.current && activeLink) {
      const containerRect = sidebarRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      const indicatorHeight = 48; // Height of sidebar item
      const top = linkRect.top - containerRect.top + linkRect.height / 2 - indicatorHeight / 2;
      setIndicatorPos({ top });
    }
  }, [location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const SidebarLink = React.forwardRef(
    ({ to, IconComponent, label, badge, isActive, end = false }, ref) => {
      return (
        <Link
          to={to}
          ref={ref}
          end={end}
          className={`sidebar-link ${isActive ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="sidebar-link-content">
            <IconComponent className="sidebar-icon" size={20} />
            <span className="sidebar-label">{label}</span>
            {badge && <span className="sidebar-badge">{badge}</span>}
          </div>
        </Link>
      );
    }
  );
  SidebarLink.displayName = "SidebarLink";

  const sidebarItems = [
    {
      group: "main",
      items: [
        {
          path: "/",
          icon: Home,
          label: "Home",
          end: true
        }
      ]
    },
    {
      group: "Algorithms",
      items: [
        {
          path: "/sorting",
          icon: BarChart3,
          label: "Sorting"
        },
        {
          path: "/searching",
          icon: Search,
          label: "Search"
        },
        {
          path: "/data-structures",
          icon: Database,
          label: "Data"
        },
        {
          path: "/graph",
          icon: Share2,
          label: "Graph"
        }
      ]
    },
    {
      group: "Learning",
      items: [
        {
          path: "/quiz",
          icon: Brain,
          label: "Quiz"
        },
        {
          path: "/documentation",
          icon: FileText,
          label: "Docs"
        },
        {
          path: "/contributors",
          icon: Users,
          label: "Contributors"
        }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      <div 
        className={`sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <nav 
        ref={sidebarRef} 
        className={`app-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}
      >
        {/* Logo Section */}
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="logo-icon">
              <Code size={24} />
            </div>
            <div className="logo-text">
              <span className="logo-main">Algo</span>
              <span className="logo-highlight">Visualizer</span>
            </div>
          </Link>
        </div>

        {/* Navigation Groups */}
        <div className="sidebar-content">
          {sidebarItems.map((group, groupIndex) => (
            <div key={group.group} className="sidebar-group">
              {group.group !== "main" && (
                <div className="sidebar-group-header">
                  <span className="sidebar-group-title">{group.group}</span>
                </div>
              )}
              <div className="sidebar-group-items">
                {group.items.map((item) => (
                  <SidebarLink
                    key={item.path}
                    to={item.path}
                    IconComponent={item.icon}
                    label={item.label}
                    badge={item.badge}
                    isActive={location.pathname === item.path}
                    end={item.end}
                    ref={(el) => (linkRefs.current[item.path] = el)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Settings at Bottom */}
        <div className="sidebar-footer">
          <SidebarLink
            to="/settings"
            IconComponent={Settings}
            label="Settings"
            isActive={location.pathname === "/settings"}
            ref={(el) => (linkRefs.current["/settings"] = el)}
          />
        </div>

        {/* Active Indicator */}
        <motion.div
          className="sidebar-indicator"
          animate={{ top: indicatorPos.top }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </nav>
    </>
  );
};

export default Sidebar;
