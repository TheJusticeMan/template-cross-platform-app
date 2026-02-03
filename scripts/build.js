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

// ESBuild configuration for production
const buildOptions = {
  entryPoints: [path.join(srcDir, 'index.ts')],
  bundle: true,
  outfile: path.join(distDir, 'index.js'),
  platform: 'browser',
  target: ['es2020'],
  sourcemap: 'external',
  minify: true,
  logLevel: 'info',
};

async function build() {
  try {
    console.log('🏗️  Building for production...\n');
    
    await esbuild.build(buildOptions);
    
    console.log('✅ Build completed successfully!\n');
    console.log(`📦 Output: ${distDir}\n`);
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
