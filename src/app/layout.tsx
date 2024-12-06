import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { AuthProvider } from './context/AuthContext';

// 폰트 설정
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

// metadata API를 사용하여 메타 정보 설정
export const metadata: Metadata = {
    title: 'monte-log',
    description: 'monte의 개발 블로그입니다.',
    icons: {
        icon: '/favicon.ico', // 파비콘 설정
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={gmarketSans.className}>
                <AuthProvider>
                    <div className='container'>
                        <Header />
                        <div className='body-contents'>{children}</div>
                        <Footer />
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
