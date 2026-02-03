import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure dist directory exists
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy HTML and CSS files to dist
const srcDir = path.join(__dirname, '..', 'src');
fs.copyFileSync(
  path.join(srcDir, 'index.html'),
  path.join(distDir, 'index.html')
);
fs.copyFileSync(
  path.join(srcDir, 'index.css'),
  path.join(distDir, 'index.css')
);

// ESBuild configuration for development
const buildOptions = {
  entryPoints: [path.join(srcDir, 'index.ts')],
  bundle: true,
  outfile: path.join(distDir, 'index.js'),
  platform: 'browser',
  target: ['es2020'],
  sourcemap: 'inline',
  logLevel: 'info',
};

async function dev() {
  try {
    // Create context for watch and serve
    const ctx = await esbuild.context(buildOptions);

    // Watch for changes
    await ctx.watch();

    // Serve on port 3000
    const { host, port } = await ctx.serve({
      servedir: distDir,
      port: 3000,
    });

    console.log(`\n🚀 Development server running at http://${host}:${port}`);
    console.log('👀 Watching for changes...\n');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

dev();
