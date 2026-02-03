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
// Copy .nojekyll for GitHub Pages
const nojekyllPath = path.join(srcDir, '.nojekyll');
if (fs.existsSync(nojekyllPath)) {
  fs.copyFileSync(nojekyllPath, path.join(distDir, '.nojekyll'));
}

// Copy docs directory for offline access (recursively)
const docsDir = path.join(__dirname, '..', 'docs');
const distDocsDir = path.join(distDir, 'docs');

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDirRecursive(docsDir, distDocsDir);


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
    console.log(`📚 Docs copied to: ${distDocsDir}\n`);
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
