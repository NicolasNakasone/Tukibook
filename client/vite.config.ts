import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      public: path.resolve(__dirname, 'public'),
      'tukibook-helper': path.resolve(__dirname, '../tukibook-helper/src'),
    },
  },
})
