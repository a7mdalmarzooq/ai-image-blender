# AI Image Blending Website Architecture

## Overview

This document outlines the architecture for an AI image blending web application that allows users to:
1. Upload a product image
2. Upload a shop vibe image
3. Enter a text prompt
4. Generate a new AI-enhanced image that blends these elements together

The application will use the Replicate API with the `fofr/image-merge-sdxl` model for image generation.

## System Architecture

The application will follow a client-server architecture:

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│             │      │             │      │             │
│  Frontend   │◄────►│   Backend   │◄────►│  Replicate  │
│  (Browser)  │      │  (Node.js)  │      │     API     │
│             │      │             │      │             │
└─────────────┘      └─────────────┘      └─────────────┘
```

### Frontend Components

The frontend will be built using HTML, CSS, and JavaScript:

1. **User Interface Components**
   - Image upload areas (for product and shop vibe images)
   - Image preview components
   - Text prompt input field
   - Generate button
   - Result display area
   - Loading indicator

2. **JavaScript Functionality**
   - Image file handling and validation
   - Form submission
   - API communication
   - Result display
   - Error handling

### Backend Components

The backend will be built using Node.js with Express:

1. **Server Setup**
   - Express application configuration
   - CORS handling
   - Error handling middleware

2. **API Endpoints**
   - `/api/upload` - For handling image uploads
   - `/api/generate` - For processing images and generating the blended result

3. **Services**
   - Image processing service (for handling uploads and base64 encoding)
   - Replicate API service (for communicating with the AI model)

## Data Flow

1. User uploads product image, shop vibe image, and enters text prompt
2. Frontend validates inputs and sends data to backend
3. Backend processes images (converts to base64 if needed)
4. Backend sends request to Replicate API
5. Replicate API processes the request and returns the generated image
6. Backend forwards the result to the frontend
7. Frontend displays the generated image to the user

## Technical Specifications

### Frontend

- **HTML5** for structure
- **CSS3** for styling (with responsive design)
- **JavaScript** (vanilla or with minimal libraries) for interactivity
- **Fetch API** for AJAX requests

### Backend

- **Node.js** runtime environment
- **Express.js** for API routing and middleware
- **Multer** for handling multipart/form-data (file uploads)
- **Replicate** client library for AI API integration

### API Integration

- **Replicate API** with `fofr/image-merge-sdxl` model
- Authentication via API token stored in environment variables
- Parameters:
  - `image_1`: Product image (base64 or URL)
  - `image_2`: Shop vibe image (base64 or URL)
  - `prompt`: Text description for guiding the generation
  - `merge_strength`: Control parameter for blending (default: 0.92)
  - `added_merge_noise`: Control parameter for prompt influence (default: 0.8)

## Deployment

The application will be deployable on:
- **Vercel** for serverless deployment
- **Netlify** for static frontend with serverless functions

## Security Considerations

- Store API keys in environment variables, not in code
- Implement file type validation for uploads
- Set appropriate file size limits
- Use HTTPS for all communications
- Implement rate limiting to prevent abuse

## Error Handling

- Validate user inputs on both client and server
- Provide meaningful error messages
- Implement graceful fallbacks for API failures
- Log errors for debugging purposes
