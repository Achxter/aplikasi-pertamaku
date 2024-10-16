import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  runtimeConfig: {
    // Make environment variables accessible here
    public: {
      API_BASE_URL: process.env.VITE_API_BASE_URL,
      // Add more environment variables as needed
    },
  },
})
