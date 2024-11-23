const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputDir = path.join(__dirname, 'assets/images');
const outputDir = path.join(__dirname, 'assets/images/optimized');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)){
  fs.mkdirSync(outputDir);
}

// Function to optimize and resize images
fs.readdirSync(inputDir).forEach(file => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);

  sharp(inputPath)
    .resize(800) // Resize to a max width of 800px
    .jpeg({ quality: 80 }) // Compress JPEG images to 80% quality
    .toFile(outputPath, (err, info) => {
      if (err) {
        console.error('Error compressing image:', file);
      } else {
        console.log('Compressed image:', file, info);
      }
    });
});
