import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    outDir: "build",
  },
  optimizeDeps: {
    include: ['vis-network', 'vis-data'],
  },
   define: {
    global: 'window', // 👈 Fix for vis-network
  },
});
