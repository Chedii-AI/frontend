/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://chedii-backend-1-ctezc8and3djfpgh.southeastasia-01.azurewebsites.net/:path*'
            }
        ];
    }
};

export default nextConfig;
