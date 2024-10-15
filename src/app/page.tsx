'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import Post from './post/post';

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

    // 슬러그 생성 함수 (한글 허용)
    const createSlug = (title: string): string => {
        return title
            .toLowerCase()
            .replace(/[^\p{L}\p{N}\s-]/gu, '') // \p{L}은 모든 문자, \p{N}은 숫자, 유니코드 플래그 추가
            .trim()
            .replace(/\s+/g, '-'); // 공백을 하이픈으로 변환
    };

    // Next.js에서 게시물 클릭 시 id와 slug를 함께 URL로 이동
    const handlePostClick = (post: Post) => {
        const slug = createSlug(post.title); // 슬러그 생성
        window.location.href = `/post/${post.post_id}/${slug}`; // id와 슬러그를 URL에 포함
    };

    const handleLogout = async () => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
                {},
                {
                    withCredentials: true, // 쿠키 포함
                }
            );
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
                        <li key={index} onClick={() => handlePostClick(post)}>
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
