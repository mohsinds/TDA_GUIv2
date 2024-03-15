/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  jsconfigPaths: true,
  env:{
    /*
    BACKEND_API_URL: process.env.BACKEND_API_URL,
    NEXT_PUBLIC_BACKEND_API_URL: process.env.BACKEND_API_URL,
    BACKEND_API_TOKEN: process.env.BACKEND_API_TOKEN,
    NEXT_PUBLIC_BACKEND_API_TOKEN: process.env.BACKEND_API_TOKEN,
    */
    BACKEND_API_URL: "https://tda-api.emergentcybernetics.net",
    NEXT_PUBLIC_BACKEND_API_URL: "https://tda-api.emergentcybernetics.net",
    //BACKEND_API_URL: "https://local.emergentcybernetics.net:7163",
    //NEXT_PUBLIC_BACKEND_API_URL: "https://local.emergentcybernetics.net:7163",
    BACKEND_API_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6InFoYW5tNHR2YTJhbTMyenl3czE4IiwiZXhwIjoxNzEzMTE0MTUzLCJpc3MiOiJ5b3VyX2lzc3VlciIsImF1ZCI6InlvdXJfYXVkaWVuY2UifQ.b6LGjAAVQ2S8G_wOL6R5QqFut0QBs4IVVIhWX2XItN0",
    NEXT_PUBLIC_BACKEND_API_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6InFoYW5tNHR2YTJhbTMyenl3czE4IiwiZXhwIjoxNzEzMTE0MTUzLCJpc3MiOiJ5b3VyX2lzc3VlciIsImF1ZCI6InlvdXJfYXVkaWVuY2UifQ.b6LGjAAVQ2S8G_wOL6R5QqFut0QBs4IVVIhWX2XItN0",
  }
}

module.exports = nextConfig
