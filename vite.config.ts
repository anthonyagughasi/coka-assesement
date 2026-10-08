import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

function portraitUploadPlugin() {
  return {
    name: 'portrait-upload-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/upload-portrait', (req: any, res: any) => {
        if (req.method === 'POST') {
          const chunks: Buffer[] = [];
          req.on('data', (chunk: Buffer) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const buffer = Buffer.concat(chunks);
              const publicDir = path.resolve(__dirname, 'public');
              const assetsDir = path.resolve(__dirname, 'src/assets/images');
              
              if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
              if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

              fs.writeFileSync(path.join(publicDir, 'alive_and_free_fellowship_1791470074779.jpg'), buffer);
              fs.writeFileSync(path.join(publicDir, 'crystal-kizor-portrait.png'), buffer);
              fs.writeFileSync(path.join(assetsDir, 'crystal-kizor-portrait.png'), buffer);

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, url: '/Poised in a Warm Design Studio.png' }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), portraitUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

