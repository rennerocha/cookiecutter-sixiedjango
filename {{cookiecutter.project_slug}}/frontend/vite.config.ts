import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '/api': {
          target: process.env.VITE_PROXY_TARGET || 'http://django:8000',
          changeOrigin: false
        }
      }
    }
  })
}
