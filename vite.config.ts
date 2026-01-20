import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    // 'base' handles the deployment path. './' makes assets relative, solving the blank page on subdirectories.
    base: './', 
    build: {
      outDir: 'dist',
    },
    // 'define' replaces global variables during build time.
    // This allows `process.env.API_KEY` to work in the browser without crashing.
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Fallback to prevent "process is not defined" error if other process.env props are accessed
      'process.env': {}
    }
  };
});