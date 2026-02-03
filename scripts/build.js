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

// Copy docs directory for offline access
const docsDir = path.join(__dirname, '..', 'docs');
const distDocsDir = path.join(distDir, 'docs');
if (fs.existsSync(docsDir)) {
  if (!fs.existsSync(distDocsDir)) {
    fs.mkdirSync(distDocsDir, { recursive: true });
  }
  const docFiles = fs.readdirSync(docsDir);
  docFiles.forEach(file => {
    if (file.endsWith('.md')) {
      fs.copyFileSync(
        path.join(docsDir, file),
        path.join(distDocsDir, file)
      );
    }
  });
}

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
