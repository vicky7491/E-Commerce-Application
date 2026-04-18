import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    historyApiFallback: true,
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          redux:  ["@reduxjs/toolkit", "react-redux"],
          ui:     ["framer-motion", "lucide-react", "@radix-ui/react-dialog", "@radix-ui/react-select"],
          swiper: ["swiper"],
          axios:  ["axios"],
        },
      },
    },
  },
});