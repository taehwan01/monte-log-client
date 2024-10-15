'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import Post from './post/post';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
    const limit = 7; // 한 페이지당 보여줄 게시물 수

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
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/posts?page=${page}&limit=${limit}`
                );
                setPosts(response.data.posts); // 글 목록 상태 업데이트
                setTotalPages(response.data.totalPages); // 총 페이지 수 설정
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        getPosts(); // 글 목록 가져오는 함수 호출
        checkLoginStatus(); // 로그인 상태 확인 함수 호출
    }, [page]);

    // 슬러그 생성 함수 (한글 허용)
    const createSlug = (title: string): string => {
        return title
            .toLowerCase()
            .replace(/[^\p{L}\p{N}\s-]/gu, '') // \p{L}은 모든 문자, \p{N}은 숫자, 유니코드 플래그 추가
            .trim()
            .replace(/\s+/g, '-'); // 공백을 하이픈으로 변환
    };

    // 게시물 클릭 시 상세 페이지 이동
    const handlePostClick = (post: Post) => {
        const slug = createSlug(post.title); // 슬러그 생성
        window.location.href = `/post/${post.post_id}/${slug}`; // id와 슬러그를 URL에 포함
    };

    // 이전 페이지로 이동
    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    // 다음 페이지로 이동
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        }
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
                    posts.map((post) => (
                        <li key={post.post_id} onClick={() => handlePostClick(post)}>
                            <img src={post.thumbnail} alt='썸네일 이미지' />
                            <h3>{post.title}</h3>
                            <p>미리보기: {post.preview_content}</p>
                            <p>{new Date(post.created_at).toLocaleDateString()}</p>
                            <br />
                        </li>
                    ))
                ) : (
                    <p>글이 없습니다.</p>
                )}
            </ul>

            <div className={styles.pagination}>
                <button onClick={handlePreviousPage} disabled={page === 1}>
                    이전
                </button>
                <span>
                    {page} / {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                    다음
                </button>
            </div>
            <br />
            {isLoggedIn ? (
                <button onClick={handleLogout}>로그아웃</button>
            ) : (
                <button onClick={handleLogin}>관리자</button>
            )}
        </div>
    );
}
