/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'velog.velcdn.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'media.giphy.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.giphy.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
