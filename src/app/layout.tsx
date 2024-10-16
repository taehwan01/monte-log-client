import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const gmarketSans = localFont({
    src: [
        {
            path: './fonts/GmarketSansTTFBold.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: './fonts/GmarketSansTTFMedium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: './fonts/GmarketSansTTFLight.ttf',
            weight: '300',
            style: 'normal',
        },
    ],
    variable: '--font-gmarket-sans',
});

export const metadata: Metadata = {
    title: 'm o n t e .l o g',
    description: 'm o n t e 의 개발 저장소',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={gmarketSans.className}>{children}</body>
        </html>
    );
}
