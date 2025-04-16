// This file is used by Vercel to determine the build settings
// It ensures the Node.js version is correctly set and the server is properly configured

module.exports = {
  // Specify the version of Node.js to use
  version: 2,
  
  // Configure the build settings
  builds: [
    {
      src: "server.js",
      use: "@vercel/node",
      config: {
        // Explicitly set Node.js version
        runtime: "nodejs18.x"
      }
    },
    {
      src: "public/**",
      use: "@vercel/static"
    }
  ],
  
  // Configure the routing
  routes: [
    {
      src: "/api/(.*)",
      dest: "server.js"
    },
    {
      src: "/(.*)",
      dest: "public/$1"
    }
  ]
};
