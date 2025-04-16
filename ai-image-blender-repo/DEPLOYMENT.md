# AI Image Blender - Vercel Deployment Instructions

This document provides step-by-step instructions for deploying the AI Image Blender application on Vercel.

## Prerequisites

Before deploying, you'll need:

1. A [Vercel account](https://vercel.com/signup) (free tier is sufficient)
2. A [Replicate account](https://replicate.com) and API token
3. This GitHub repository

## Deployment Steps

### 1. Fork or Clone the Repository

If you haven't already, fork this repository to your GitHub account.

### 2. Connect Vercel to Your GitHub Repository

1. Log in to your [Vercel dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Select the "ai-image-blender" repository
4. Vercel will automatically detect the project settings

### 3. Configure Environment Variables

This is the most important step for the application to work properly:

1. In the Vercel project setup page, expand the "Environment Variables" section
2. Add the following variable:
   - **Name**: `REPLICATE_API_TOKEN`
   - **Value**: Your Replicate API token (get it from https://replicate.com/account)
3. Make sure to click "Add" to save the variable

### 4. Deploy the Application

1. Click "Deploy" to start the deployment process
2. Vercel will build and deploy your application
3. Once complete, you'll receive a URL to access your application

## Troubleshooting Common Issues

### Node.js Version Issues

This repository is configured to use Node.js 18.x. If you encounter any Node.js version-related errors:

1. Check the deployment logs in Vercel
2. Verify that the `vercel.json` file is present in your repository
3. Make sure the `package.json` file has the correct engine specification

### API Connection Issues

If the application deploys but image generation doesn't work:

1. Check that your Replicate API token is correctly set in the environment variables
2. Verify that your Replicate account has sufficient credits
3. Check the browser console for any API-related errors

## Making Updates

After deployment, if you need to make changes:

1. Update your local repository
2. Commit and push changes to GitHub
3. Vercel will automatically redeploy your application

## Need Help?

If you encounter any issues during deployment, please:

1. Check the Vercel deployment logs for specific error messages
2. Refer to the [Vercel documentation](https://vercel.com/docs) for platform-specific guidance
3. Check the [Replicate documentation](https://replicate.com/docs) for API-related questions
