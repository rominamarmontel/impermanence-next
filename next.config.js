/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'],
  },
  env: {
    NEXTAUTH_URL: 'http://localhost:3000', // Your actual URL here
  },
}
module.exports = nextConfig
