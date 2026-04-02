// Footer data structures extracted for better maintainability
import {
  FaEnvelope,
  FaGraduationCap,
  FaRocket,
} from "react-icons/fa";
import { FaPerson, FaFile } from "react-icons/fa6";

// Navigation links data
export const navigationLinks = [
  { to: "/", icon: FaRocket, label: "Home" },
  { to: "/learn", icon: FaGraduationCap, label: "Data Structures" },
  { to: "/about", icon: FaPerson, label: "About Us" },
  { to: "/contact", icon: FaEnvelope, label: "Contact" },
];

// Resource links data
export const resourceLinks = [
  { to: "/documentation", icon: FaFile, label: "Algo Documentation" },
  { to: "/faq", icon: FaGraduationCap, label: "FAQ" },
  { to: "/community", icon: FaGraduationCap, label: "Community" },
];

// Technology pills data
export const techPills = [
  { href: "https://react.dev/", label: "React" },
  {
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    label: "JavaScript",
  },
  { href: "https://d3js.org/", label: "D3.js" },
  { href: "https://nodejs.org/", label: "Node.js" },
];
