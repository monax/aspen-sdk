import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: { https: true, port: 3000, host: '0.0.0.0' },
  optimizeDeps: {
    include: ['@monaxlabs/aspen-sdk'],
  },
});
