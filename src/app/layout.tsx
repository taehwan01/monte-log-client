import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

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
    description: 'monte의 개발 블로그입니다.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={gmarketSans.className}>
                <div className='container'>
                    <Header />
                    <div className='body-contents'>{children}</div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
