import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [angular()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true
      },
      '/my': {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true
      },
      '/cart': {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true,
        // logLevel não é suportado diretamente no Vite, podemos usar configure
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxy Request:', req.method, req.url);
          });
        }
      },
      '/products': {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true
      },
      '/dashboard': {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true
      }
    }
  }
});
