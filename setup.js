// Copy frontend files to public directory
const fs = require('fs');
const path = require('path');

// Define source and destination paths
const sourceFiles = [
  { src: 'index.html', dest: 'public/index.html' },
  { src: 'styles.css', dest: 'public/styles.css' },
  { src: 'script.js', dest: 'public/script.js' }
];

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Copy each file
sourceFiles.forEach(file => {
  const srcPath = path.join(__dirname, file.src);
  const destPath = path.join(__dirname, file.dest);
  
  try {
    const data = fs.readFileSync(srcPath, 'utf8');
    fs.writeFileSync(destPath, data, 'utf8');
    console.log(`Successfully copied ${file.src} to ${file.dest}`);
  } catch (err) {
    console.error(`Error copying ${file.src} to ${file.dest}:`, err);
  }
});

console.log('All frontend files copied to public directory');
