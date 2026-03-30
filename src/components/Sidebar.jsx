import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  X,
  ChevronRight
} from "lucide-react";
import { useTheme } from "../ThemeContext";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('/');
  const sidebarRef = useRef(null);
  const linkRefs = useRef({});
  const [indicatorPos, setIndicatorPos] = useState({ top: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveTab(location.pathname);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Close sidebar on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Update active indicator position
  useEffect(() => {
    const activeLink = linkRefs.current[activeTab];
    if (sidebarRef.current && activeLink) {
      const containerRect = sidebarRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      const indicatorHeight = 48;
      const top = linkRect.top - containerRect.top + linkRect.height / 2 - indicatorHeight / 2;
      setIndicatorPos({ top });
    }
  }, [activeTab]);

  const SidebarLink = React.forwardRef(
    ({ to, IconComponent, label, badge, isActive, end = false }, ref) => {
      return (
        <div
          ref={ref}
          className={`sidebar-link ${isActive ? 'active' : ''}`}
          onClick={() => {
            setActiveTab(to);
            setIsMobileMenuOpen(false);
            navigate(to);
          }}
        >
          <div className="sidebar-link-content">
            <IconComponent className="sidebar-icon" size={20} />
            <span className="sidebar-label">{label}</span>
            {badge && <span className="sidebar-badge">{badge}</span>}
            {isActive && <ChevronRight className="sidebar-arrow" size={16} />}
          </div>
        </div>
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
          label: "Dashboard",
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
          label: "Sorting",
          badge: "12"
        },
        {
          path: "/searching",
          icon: Search,
          label: "Search",
          badge: "8"
        },
        {
          path: "/data-structures",
          icon: Database,
          label: "Data Structures",
          badge: "15"
        },
        {
          path: "/graph",
          icon: Share2,
          label: "Graph Theory",
          badge: "6",
          children: [
            { path: "/graph/bfs", label: "BFS" },
            { path: "/graph/dfs", label: "DFS" },
            { path: "/graph/dijkstra", label: "Dijkstra" }
          ]
        }
      ]
    },
    
    {
      group: "Learning",
      items: [
        {
          path: "/quiz",
          icon: Brain,
          label: "Interactive Quiz"
        },
        {
          path: "/quiz/math",
          icon: Brain,
          label: "Math Quiz"
        },
        {
          path: "/documentation",
          icon: FileText,
          label: "Documentation"
        },
        {
          path: "/contributors",
          icon: Users,
          label: "Contributors"
        },
        {
          path: "/ContributorLeaderboard",
          icon: Users,
          label: "LeaderBoard"
        }
      ]
    }
  ];

  return (
    <div className="sidebar-container">
      {/* Enhanced Mobile Menu Button with Animation */}
      <button 
        className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
        style={{ color: "#000000" }}
      >
        {isMobileMenuOpen ? <X size={24} color="#000000" style={{ stroke: "#000000" }} /> : <Menu size={24} color="#000000" style={{ stroke: "#000000" }} />}
      </button>

      {/* Backdrop with blur effect */}
      <div 
        className={`sidebar-backdrop ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Modern Sidebar */}
      <nav 
        ref={sidebarRef} 
        className={`app-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}
      >
        {/* Enhanced Logo Section */}
        <div className="sidebar-header">
          <div className="sidebar-logo" onClick={() => {
            setActiveTab('/');
            setIsMobileMenuOpen(false);
          }}>
            <div className="logo-icon">
              <Code size={28} />
            </div>
            <div className="logo-text">
              <span className="logo-main">Algo</span>
              <span className="logo-highlight">Visualizer</span>
              <div className="logo-subtitle">Learn & Explore</div>
            </div>
          </div>
        </div>

        {/* Navigation Groups */}
        <div className="sidebar-content">
          {sidebarItems.map((group, groupIndex) => (
            <div key={group.group} className="sidebar-group">
              {group.group !== "main" && (
                <div className="sidebar-group-header">
                  <span className="sidebar-group-title">{group.group}</span>
                  <div className="sidebar-group-line"></div>
                </div>
              )}
              <div className="sidebar-group-items">
                {group.items.map((item) => (
                  <div key={item.path} className="sidebar-item-with-children">
                    <SidebarLink
                      to={item.path}
                      IconComponent={item.icon}
                      label={item.label}
                      badge={item.badge}
                      isActive={activeTab === item.path}
                      end={item.end}
                      ref={(el) => (linkRefs.current[item.path] = el)}
                    />
                    {item.children && item.children.length > 0 && (
                      <div className="sidebar-subitems">
                        {item.children.map((child) => (
                          <SidebarLink
                            key={child.path}
                            to={child.path}
                            IconComponent={ChevronRight}
                            label={child.label}
                            isActive={activeTab === child.path}
                            ref={(el) => (linkRefs.current[child.path] = el)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Settings at Bottom */}
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <div className="avatar-placeholder">
                <Users size={16} />
              </div>
            </div>
            <div className="user-info">
              <div className="user-name">
                Guest User
              </div>
              <div className="user-status">
                Learning Mode
              </div>
            </div>
          </div>
          <SidebarLink
            to="/settings"
            IconComponent={Settings}
            label="Settings"
            isActive={activeTab === "/settings"}
            ref={(el) => (linkRefs.current["/settings"] = el)}
          />
        </div>

        {/* Enhanced Active Indicator */}
        <div
          className="sidebar-indicator"
          style={{
            transform: `translateY(${indicatorPos.top}px)`,
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </nav>
    </div>
  );
};

export default Sidebar;