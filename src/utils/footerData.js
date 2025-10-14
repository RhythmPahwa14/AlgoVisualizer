// Footer data structures extracted for better maintainability
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCode,
  FaGraduationCap,
  FaYoutube,
  FaDiscord,
  FaRocket,
} from "react-icons/fa";
import { FaPerson, FaXTwitter, FaFile } from "react-icons/fa6";

// Navigation links data
export const navigationLinks = [
  { to: "/", icon: FaRocket, label: "Home" },
  { to: "/data-structures", icon: FaCode, label: "Algorithms" },
  { to: "/learn", icon: FaGraduationCap, label: "Data Structures" },
  { to: "/about", icon: FaPerson, label: "About Us" },
  { to: "/contributor-leaderboard", icon: FaCode, label: "Leaderboard" },
  { to: "/contact", icon: FaEnvelope, label: "Contact" },
];

// Resource links data
export const resourceLinks = [
  { to: "/documentation", icon: FaFile, label: "Documentation" },
  { to: "/faq", icon: FaGraduationCap, label: "FAQ" },
  { to: "/data-structures", icon: FaGraduationCap, label: "Tutorials" },
  { to: "/blog", icon: FaGraduationCap, label: "Blog" },
  { to: "/community", icon: FaGraduationCap, label: "Community" },
  { to: "/contribute", icon: FaCode, label: "Contribute" },
];

// Social media links data
export const socialLinks = [
  {
    href: "https://github.com/RhythmPahwa14/AlgoVisualizer",
    icon: FaGithub,
    title: "GitHub",
  },
  {
    href: "https://linkedin.com/in/sandeepvashishtha",
    icon: FaLinkedin,
    title: "LinkedIn",
  },
  { href: "https://twitter.com", icon: FaXTwitter, title: "Twitter" },
  { href: "https://discord.com", icon: FaDiscord, title: "Discord" },
  { href: "https://youtube.com", icon: FaYoutube, title: "YouTube" },
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
