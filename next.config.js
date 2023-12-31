/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'],
  },
  env: {
    NEXTAUTH_URL: `${process.env.NEXTAUTH_URL}`,
  },
}
module.exports = nextConfig
