const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const Replicate = require('replicate');
require('dotenv').config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Configure CORS
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  },
  fileFilter: function (req, file, cb) {
    // Accept only image files
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create results directory if it doesn't exist
const resultsDir = path.join(__dirname, 'public', 'results');
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

// API endpoint for image generation
app.post('/api/generate', upload.fields([
  { name: 'productImage', maxCount: 1 },
  { name: 'shopImage', maxCount: 1 }
]), async (req, res) => {
  try {
    // Check if files were uploaded
    if (!req.files || !req.files.productImage || !req.files.shopImage) {
      return res.status(400).json({ error: 'Both product and shop images are required' });
    }

    // Get file paths
    const productImagePath = req.files.productImage[0].path;
    const shopImagePath = req.files.shopImage[0].path;

    // Get form data
    const prompt = req.body.prompt || 'A photo';
    const mergeStrength = parseFloat(req.body.mergeStrength) || 0.92;
    const noiseLevel = parseFloat(req.body.noiseLevel) || 0.8;

    // Convert images to base64
    const productImageBase64 = fs.readFileSync(productImagePath, { encoding: 'base64' });
    const shopImageBase64 = fs.readFileSync(shopImagePath, { encoding: 'base64' });

    // Prepare input for Replicate API
    const input = {
      image_1: `data:image/jpeg;base64,${productImageBase64}`,
      image_2: `data:image/jpeg;base64,${shopImageBase64}`,
      prompt: prompt,
      merge_strength: mergeStrength,
      added_merge_noise: noiseLevel
    };

    console.log('Sending request to Replicate API...');
    
    // Call Replicate API
    const output = await replicate.run(
      "fofr/image-merge-sdxl:101190cbcc57984b9bfba21e1beea3694dc9d121e9f34a39ece814480eb0b3e9",
      { input }
    );

    if (!output || output.length === 0) {
      throw new Error('Failed to generate image');
    }

    // Get the generated image URL
    const generatedImageUrl = output[0];

    // Download the generated image
    const response = await fetch(generatedImageUrl);
    const buffer = await response.arrayBuffer();
    
    // Save the image locally
    const filename = `result-${Date.now()}.png`;
    const localPath = path.join(resultsDir, filename);
    fs.writeFileSync(localPath, Buffer.from(buffer));

    // Return the local URL to the client
    const localUrl = `/results/${filename}`;
    
    // Clean up uploaded files
    fs.unlinkSync(productImagePath);
    fs.unlinkSync(shopImagePath);

    res.json({
      success: true,
      imageUrl: localUrl,
      originalUrl: generatedImageUrl
    });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate image',
      details: error.message
    });
  }
});

// Serve the main HTML file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
