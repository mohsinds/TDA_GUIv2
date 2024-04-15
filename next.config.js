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
    BACKEND_API_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjFlMjViNTBkLTVhZjQtNGQ1Zi1hMmM4LTMxOTEyZTBlNzU2ZCIsImV4cCI6MTcxMTU1Mzc4NiwiaXNzIjoieW91cl9pc3N1ZXIiLCJhdWQiOiJ5b3VyX2F1ZGllbmNlIn0.rF6v5SwvKTbmJHzyQAenH9WpMtCWTGV5zfDsaEf5uoA",
    NEXT_PUBLIC_BACKEND_API_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjFlMjViNTBkLTVhZjQtNGQ1Zi1hMmM4LTMxOTEyZTBlNzU2ZCIsImV4cCI6MTcxMTU1Mzc4NiwiaXNzIjoieW91cl9pc3N1ZXIiLCJhdWQiOiJ5b3VyX2F1ZGllbmNlIn0.rF6v5SwvKTbmJHzyQAenH9WpMtCWTGV5zfDsaEf5uoA",
  },
}

module.exports = nextConfig
