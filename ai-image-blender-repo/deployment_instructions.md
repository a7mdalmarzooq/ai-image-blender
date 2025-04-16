# Deployment Instructions

This document provides instructions for deploying the AI Image Blender application to both Vercel and Netlify.

## Prerequisites

Before deploying, make sure you have:

1. A [Replicate](https://replicate.com) account and API token
2. A [GitHub](https://github.com) account (for easy deployment)
3. A [Vercel](https://vercel.com) or [Netlify](https://netlify.com) account

## Preparing Your Project for Deployment

1. Create a `.env` file in your project root with your Replicate API token:
   ```
   REPLICATE_API_TOKEN=your_replicate_api_token_here
   PORT=3000
   ```

2. Make sure all dependencies are listed in your `package.json` file.

## Option 1: Deploying to Vercel

Vercel is ideal for Node.js applications and provides serverless functions that work well with our Express backend.

### Step 1: Prepare for Vercel Deployment

Create a `vercel.json` file in your project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    },
    {
      "src": "public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server.js"
    },
    {
      "src": "/(.*)",
      "dest": "public/$1"
    }
  ]
}
```

### Step 2: Deploy to Vercel

1. Push your project to a GitHub repository.

2. Log in to your Vercel account and click "New Project".

3. Import your GitHub repository.

4. Configure the project:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: None (leave empty)
   - Output Directory: public

5. Add Environment Variables:
   - Add `REPLICATE_API_TOKEN` with your Replicate API token value.

6. Click "Deploy".

7. Once deployment is complete, Vercel will provide you with a URL to access your application.

## Option 2: Deploying to Netlify

Netlify is great for static sites with serverless functions. We'll use Netlify Functions to handle our backend API.

### Step 1: Prepare for Netlify Deployment

1. Create a `netlify.toml` file in your project root:

```toml
[build]
  publish = "public"
  command = "# no build command"

[functions]
  directory = "netlify/functions"
```

2. Create a `netlify/functions` directory in your project root.

3. Create a file `netlify/functions/generate.js` with the following content:

```javascript
const multer = require('multer');
const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const fs = require('fs');
const Replicate = require('replicate');
const { Buffer } = require('buffer');

const app = express();
const router = express.Router();

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  }
});

// API endpoint for image generation
router.post('/generate', upload.fields([
  { name: 'productImage', maxCount: 1 },
  { name: 'shopImage', maxCount: 1 }
]), async (req, res) => {
  try {
    // Check if files were uploaded
    if (!req.files || !req.files.productImage || !req.files.shopImage) {
      return res.status(400).json({ error: 'Both product and shop images are required' });
    }

    // Get file buffers
    const productImageBuffer = req.files.productImage[0].buffer;
    const shopImageBuffer = req.files.shopImage[0].buffer;

    // Get form data
    const prompt = req.body.prompt || 'A photo';
    const mergeStrength = parseFloat(req.body.mergeStrength) || 0.92;
    const noiseLevel = parseFloat(req.body.noiseLevel) || 0.8;

    // Convert images to base64
    const productImageBase64 = productImageBuffer.toString('base64');
    const shopImageBase64 = shopImageBuffer.toString('base64');

    // Determine image MIME types
    const productMimeType = req.files.productImage[0].mimetype;
    const shopMimeType = req.files.shopImage[0].mimetype;

    // Prepare input for Replicate API
    const input = {
      image_1: `data:${productMimeType};base64,${productImageBase64}`,
      image_2: `data:${shopMimeType};base64,${shopImageBase64}`,
      prompt: prompt,
      merge_strength: mergeStrength,
      added_merge_noise: noiseLevel
    };
    
    // Call Replicate API
    const output = await replicate.run(
      "fofr/image-merge-sdxl:101190cbcc57984b9bfba21e1beea3694dc9d121e9f34a39ece814480eb0b3e9",
      { input }
    );

    if (!output || output.length === 0) {
      throw new Error('Failed to generate image');
    }

    // Return the generated image URL
    res.json({
      success: true,
      imageUrl: output[0]
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

app.use('/.netlify/functions/generate', router);

module.exports.handler = serverless(app);
```

4. Update your `script.js` file to use the Netlify function endpoint:

```javascript
// Replace this line in the handleFormSubmit function:
const response = await fetch('/api/generate', {
    method: 'POST',
    body: formData
});

// With this:
const response = await fetch('/.netlify/functions/generate/generate', {
    method: 'POST',
    body: formData
});
```

5. Install the required dependencies:

```bash
npm install serverless-http
```

### Step 2: Deploy to Netlify

1. Push your project to a GitHub repository.

2. Log in to your Netlify account and click "New site from Git".

3. Connect to your GitHub repository.

4. Configure the build settings:
   - Build command: (leave empty)
   - Publish directory: public

5. Add Environment Variables:
   - Add `REPLICATE_API_TOKEN` with your Replicate API token value.

6. Click "Deploy site".

7. Once deployment is complete, Netlify will provide you with a URL to access your application.

## Important Notes for Both Deployment Options

1. **API Token Security**: Your Replicate API token is sensitive information. Never commit it to your repository. Always use environment variables provided by the deployment platform.

2. **File Storage**: This deployment setup doesn't include persistent file storage. Generated images are either stored temporarily or returned as URLs from the Replicate API. For a production application, consider using a service like AWS S3 for file storage.

3. **Rate Limiting**: Be aware of the rate limits and costs associated with the Replicate API. Consider implementing rate limiting in your application to prevent excessive API calls.

4. **Custom Domain**: Both Vercel and Netlify allow you to configure custom domains for your application. Refer to their documentation for instructions on setting up a custom domain.

## Troubleshooting

If you encounter issues during deployment:

1. Check the deployment logs provided by Vercel or Netlify.
2. Verify that your environment variables are correctly set.
3. Ensure your Replicate API token is valid and has sufficient credits.
4. Check that all dependencies are correctly listed in your package.json file.
