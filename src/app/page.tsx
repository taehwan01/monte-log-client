'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';

// Post 타입 정의
interface Post {
    post_id: number;
    title: string;
    content: string;
    created_at: string;
}

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/status`, {
                    withCredentials: true, // 쿠키 포함
                });
                const { isLoggedIn } = response.data;
                setIsLoggedIn(isLoggedIn);
            } catch (error) {
                console.error('Error fetching login status:', error);
            }
        };

        const getPosts = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
                setPosts(response.data); // 글 목록 상태 업데이트
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        getPosts(); // 글 목록 가져오는 함수 호출
        checkLoginStatus(); // 로그인 상태 확인 함수 호출
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
                withCredentials: true, // 쿠키 포함
            });
            setIsLoggedIn(false); // 로그아웃 후 상태 업데이트
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    };

    return (
        <div className={styles.page}>
            <h1>몬테. 로그</h1>
            <a href='/post/new-post' style={{ textDecoration: 'underline' }}>
                글쓰기
            </a>
            <br />
            <h2>글 목록</h2>
            <ul>
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <li key={index}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <p>{post.created_at}</p>
                        </li>
                    ))
                ) : (
                    <p>글이 없습니다.</p>
                )}
            </ul>
            <br />
            {isLoggedIn ? (
                <button onClick={handleLogout}>로그아웃</button>
            ) : (
                <button onClick={handleLogin}>관리자</button>
            )}
        </div>
    );
}
