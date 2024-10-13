'use client';

export default function Login() {
    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    };

    return (
        <div>
            <h1>로그인 페이지</h1>
            <button onClick={handleGoogleLogin}>구글 로그인</button>
        </div>
    );
}
