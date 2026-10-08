import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

function portraitUploadPlugin() {
  return {
    name: 'portrait-upload-plugin',

    configureServer(server: any) {
      server.middlewares.use('/api/upload-portrait', (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        const chunks: Buffer[] = [];

        req.on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });

        req.on('end', () => {
          try {
            const buffer = Buffer.concat(chunks);

            const publicDir = path.resolve(__dirname, 'public');
            const assetsDir = path.resolve(
              __dirname,
              'src/assets/images'
            );

            // Make sure both directories exist
            fs.mkdirSync(publicDir, { recursive: true });
            fs.mkdirSync(assetsDir, { recursive: true });

            // Save the uploaded image in BOTH locations
            const fileName = 'crystal-kizor-portrait.png';

            const publicPath = path.join(publicDir, fileName);
            const assetsPath = path.join(assetsDir, fileName);

            fs.writeFileSync(publicPath, buffer);
            fs.writeFileSync(assetsPath, buffer);

            // Keep the existing studio image name available too
            fs.writeFileSync(
              path.join(publicDir, 'Poised in a Warm Design Studio.png'),
              buffer
            );

            res.setHeader('Content-Type', 'application/json');

            res.end(
              JSON.stringify({
                success: true,
                url: `/${fileName}`,
                publicUrl: `/${fileName}`,
                assetPath: `/src/assets/images/${fileName}`,
              })
            );
          } catch (err: any) {
            res.statusCode = 500;

            res.end(
              JSON.stringify({
                success: false,
                error: err.message,
              })
            );
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      portraitUploadPlugin(),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    server: {
      hmr: process.env.DISABLE_HMR !== 'true',

      watch:
        process.env.DISABLE_HMR === 'true'
          ? null
          : {},
    },
  };
});
