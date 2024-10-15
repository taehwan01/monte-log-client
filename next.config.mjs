/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'github-production-user-asset-6210df.s3.amazonaws.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'velog.velcdn.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
