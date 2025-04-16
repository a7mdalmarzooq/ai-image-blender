# AI Image Blender

A web application that uses AI to blend product images into shop environments based on text prompts.

## Features

- Upload a product image (e.g., food, item)
- Upload a shop vibe image (e.g., restaurant interior, aesthetic)
- Enter a text prompt to guide the AI blending
- Adjust advanced parameters for fine-tuning the result
- Generate high-quality blended images
- Download the generated images

## Demo

The application is currently running at: [3000-il2e7dx094k1hthd6hny6-88586dd9.manus.computer](http://3000-il2e7dx094k1hthd6hny6-88586dd9.manus.computer)

Note: This is a temporary URL for demonstration purposes.

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express
- **AI Integration**: Replicate API with fofr/image-merge-sdxl model

## Prerequisites

Before running the application, you need:

1. [Node.js](https://nodejs.org/) (v18 or higher)
2. A [Replicate](https://replicate.com) account and API token

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd ai-image-blender
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the project root with your Replicate API token:
   ```
   REPLICATE_API_TOKEN=your_replicate_api_token_here
   PORT=3000
   ```

4. Run the setup script to copy frontend files to the public directory:
   ```
   node setup.js
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Upload a product image and a shop vibe image

4. Enter a text prompt describing how you want the product to appear in the shop environment

5. (Optional) Adjust the advanced parameters:
   - **Merge Strength**: Controls the balance between the two images (lower values increase prompt influence)
   - **Noise Level**: Controls the amount of noise added during merging (higher values allow more prompt control)

6. Click "Generate AI Image" to create your blended image

7. Once generated, you can download the image using the download button

## API Endpoints

The application provides the following API endpoint:

- **POST /api/generate**: Generates a blended image based on uploaded images and parameters
  - Request body (multipart/form-data):
    - `productImage`: The product image file
    - `shopImage`: The shop vibe image file
    - `prompt`: Text prompt to guide the generation
    - `mergeStrength`: (Optional) Value between 0.1 and 1 (default: 0.92)
    - `noiseLevel`: (Optional) Value between 0 and 1 (default: 0.8)
  - Response:
    - `success`: Boolean indicating success or failure
    - `imageUrl`: URL of the generated image
    - `originalUrl`: Original URL from Replicate API

## Deployment

For detailed deployment instructions, see [deployment_instructions.md](deployment_instructions.md).

## Project Structure

```
ai-image-blender/
├── public/               # Static files served by Express
│   ├── index.html        # Main HTML file
│   ├── styles.css        # CSS styles
│   ├── script.js         # Frontend JavaScript
│   └── results/          # Directory for storing generated images
├── uploads/              # Temporary storage for uploaded images
├── server.js             # Express server and API endpoints
├── setup.js              # Script to copy frontend files to public directory
├── package.json          # Project dependencies and scripts
├── .env                  # Environment variables (not in repository)
└── README.md             # Project documentation
```

## How It Works

1. The frontend allows users to upload images and enter a text prompt
2. The backend receives the images and prompt via a POST request
3. Images are converted to base64 format
4. The backend sends a request to the Replicate API with the images and prompt
5. Replicate processes the request using the fofr/image-merge-sdxl model
6. The generated image is returned to the frontend and displayed to the user

## Limitations

- The Replicate API requires an API token and may have usage limits
- Image generation typically takes 20-30 seconds
- Maximum file size for uploads is 10MB

## Credits

- AI image generation powered by [Replicate](https://replicate.com)
- Using the [fofr/image-merge-sdxl](https://replicate.com/fofr/image-merge-sdxl) model

## License

This project is licensed under the MIT License - see the LICENSE file for details.
