# AI Image Generator API Research

## Requirements
- Support for multiple image inputs (product image and shop vibe image)
- Support for text prompts to guide the image generation
- Ability to blend/merge images based on the prompt
- Free or freemium pricing model
- Easy integration with Node.js backend

## Researched Options

### 1. Replicate - charlesmccarthy/blend-images

**Description:**
High quality image blending using Kandinsky 2.2 blending pipeline.

**Features:**
- Supports two image inputs (image1 and image2)
- Supports text prompt to guide the blending
- Generates high-quality blended images
- Simple API integration

**Pricing:**
- Approximately $0.020 per run (50 runs per $1)
- Open source, can be run locally with Docker if needed

**Integration:**
- RESTful API
- Node.js client library available
- Supports file uploads via URL, local file, or base64 encoding
- Quick generation time (approximately 17-21 seconds per image)

**Example Usage:**
```javascript
const input = {
  image1: "https://example.com/product-image.jpg",
  image2: "https://example.com/shop-vibe-image.jpg",
  prompt: "A product displayed in a shop setting"
};

const output = await replicate.run("charlesmccarthy/blend-images", { input });
```

### 2. Replicate - fofr/image-merge-sdxl

**Description:**
Merge two images together with a prompt using SDXL.

**Features:**
- Supports two image inputs (image_1 and image_2)
- Supports text prompt to guide the merging
- Additional parameters for fine-tuning:
  - merge_strength (adjust prompt weight)
  - negative_prompt (things to avoid in the image)
  - added_merge_noise (for more prompt control)

**Pricing:**
- Similar pricing to other Replicate models (approximately $0.020 per run)
- Open source, can be run locally with Docker

**Integration:**
- RESTful API
- Node.js client library available
- Supports file uploads via URL, local file, or base64 encoding
- Customizable output size (width and height parameters)

**Example Usage:**
```javascript
const input = {
  image_1: "https://example.com/product-image.jpg",
  image_2: "https://example.com/shop-vibe-image.jpg",
  prompt: "A product displayed in a shop setting",
  merge_strength: 0.92,
  added_merge_noise: 0.8
};

const output = await replicate.run("fofr/image-merge-sdxl", { input });
```

## Recommendation

Both APIs are suitable for our requirements, but **fofr/image-merge-sdxl** offers more fine-tuning parameters that could be useful for achieving better results. The ability to adjust merge_strength and added_merge_noise provides more control over how the product is blended into the shop environment.

For our implementation, we'll use the Replicate API with the fofr/image-merge-sdxl model, which provides:
1. Support for our required inputs (product image, shop image, text prompt)
2. Reasonable pricing ($0.020 per generation)
3. Easy integration with Node.js
4. Additional parameters for fine-tuning the results

## Integration Steps
1. Set up a Node.js backend with Express
2. Install the Replicate client library (`npm install replicate`)
3. Create API endpoints for image upload and processing
4. Implement base64 encoding for image uploads if needed
5. Call the Replicate API with the appropriate parameters
6. Return the generated image to the frontend
