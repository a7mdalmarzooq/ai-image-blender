# Vercel Deployment Guide for AI Image Blender

This guide will walk you through deploying the AI Image Blender application on Vercel.

## Prerequisites

1. A [GitHub](https://github.com) account
2. A [Vercel](https://vercel.com) account
3. A [Replicate](https://replicate.com) account and API token

## Step 1: Fork or Clone the Repository

1. Go to the GitHub repository: https://github.com/a7mdalmarzooq/ai-image-blender
2. Fork the repository to your GitHub account (or use it directly if you're the owner)

## Step 2: Connect Vercel to GitHub

1. Log in to your [Vercel account](https://vercel.com)
2. Click on "Add New..." and select "Project"
3. Connect your GitHub account if you haven't already
4. Select the "ai-image-blender" repository from the list

## Step 3: Configure Deployment Settings

1. Vercel should automatically detect that this is a Node.js project
2. Leave the default settings as they are:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: (leave empty)
   - Output Directory: public

## Step 4: Add Environment Variables

1. Expand the "Environment Variables" section
2. Add the following variable:
   - Name: `REPLICATE_API_TOKEN`
   - Value: Your Replicate API token (get it from https://replicate.com/account)
3. Click "Add" to save the variable

## Step 5: Deploy

1. Click "Deploy" to start the deployment process
2. Wait for the deployment to complete (this may take a few minutes)
3. Once deployed, Vercel will provide you with a URL to access your application

## Troubleshooting

If you encounter any issues during deployment:

1. Check the deployment logs in Vercel for specific error messages
2. Verify that your Replicate API token is correct and has sufficient credits
3. Make sure all environment variables are properly set

## Making Changes

If you need to make changes to the application:

1. Clone the repository to your local machine
2. Make your changes
3. Commit and push the changes to GitHub
4. Vercel will automatically redeploy your application

## Important Notes

- The free tier of Vercel has certain limitations on serverless function execution time
- The Replicate API may have usage limits and costs associated with it
- For production use, consider implementing rate limiting and additional security measures
