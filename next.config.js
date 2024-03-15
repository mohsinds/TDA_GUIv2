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
    BACKEND_API_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6InFoYW5tNHR2YTJhbTMyenl3czE4IiwiZXhwIjoxNzEwNDE5MzM0LCJpc3MiOiJ5b3VyX2lzc3VlciIsImF1ZCI6InlvdXJfYXVkaWVuY2UifQ.uQwg0Hf4muW6dv_Pq_E2vi5dYCRp21SUo7JWxNamGbs",
    NEXT_PUBLIC_BACKEND_API_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6InFoYW5tNHR2YTJhbTMyenl3czE4IiwiZXhwIjoxNzEwNDE5MzM0LCJpc3MiOiJ5b3VyX2lzc3VlciIsImF1ZCI6InlvdXJfYXVkaWVuY2UifQ.uQwg0Hf4muW6dv_Pq_E2vi5dYCRp21SUo7JWxNamGbs",
  }
}

module.exports = nextConfig
