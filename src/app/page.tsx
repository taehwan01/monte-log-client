'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import Post from './post/post.interface';
import Image from 'next/image';
import leftArrow from './public/arrow-left.svg';
import leftArrowDisabled from './public/arrow-left-disabled.svg';
import rightArrow from './public/arrow-right.svg';
import rightArrowDisabled from './public/arrow-right-disabled.svg';
import Loading from './components/Loading/Loading';
import grayHeart from './public/gray-heart.svg';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
    const limit = 7; // 한 페이지당 보여줄 게시물 수

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/posts?page=${page}&limit=${limit}`
                );
                console.log(response.data);
                setPosts(response.data.posts); // 글 목록 상태 업데이트
                setTotalPages(response.data.totalPages); // 총 페이지 수 설정
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        getPosts(); // 글 목록 가져오는 함수 호출
        setIsLoading(false);
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}.${month}.${day}`;
    };

    if (isLoading) {
        return (
            <div className={styles.page}>
                <Loading />
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <h2 className={styles.pageTitle}>목록</h2>
            <div id={styles.postList}>
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <div key={index} onClick={() => handlePostClick(post)} className={styles.postItemContainer}>
                            {/* {index % 2 === 0 ? <></> : <></>} */}
                            <div
                                className={styles.imageContainer}
                                style={{ backgroundColor: post.post_id === 1 ? '#b0c4cf' : '' }}
                                // [진색] YELLOW: #ffc700, RED: #d32f2f, GREEN: #388e3c, BLUE: #1976d2  ]
                                // [파스텔] YELLOW: #fdf3b5, RED: #f7b9b4, GREEN: #d0f0c0, BLUE: #b0c4cf
                            >
                                <Image
                                    src={post.thumbnail}
                                    alt='썸네일 이미지'
                                    className={styles.postThumbnail}
                                    width={150}
                                    height={150}
                                />
                            </div>
                            <table className={styles.postItem}>
                                <thead style={{ display: 'none' }}>
                                    <tr>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className={styles.postItemTitle}>{post.title}</span>
                                        </td>
                                    </tr>
                                    <tr className={styles.postItemLineBreak}></tr>
                                    <tr>
                                        <td>
                                            <div className={styles.postItemMeta}>
                                                <span>{formatDate(post.created_at)}</span>
                                                <span>&#183;</span>
                                                <span>{post.category.name}</span>
                                                <span>&#183;</span>
                                                <Image src={grayHeart} alt='좋아요' width={15} height={13} />
                                                <span>&nbsp;</span>
                                                <span>{post.like_count[0].count}</span>
                                            </div>
                                        </td>
                                        {/* <td style={{ padding: '0 10px' }}></td>
                                        <td></td> */}
                                    </tr>
                                    <tr className={styles.postItemLineBreak}></tr>
                                    <tr>
                                        <td>
                                            <span className={styles.postItemContent}>{post.preview_content}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                ) : (
                    <p>글이 없습니다.</p>
                )}
            </div>

            <div className={styles.pageButtonsContainer}>
                <button onClick={handlePreviousPage} className={styles.pageButtons} disabled={page === 1}>
                    {page === 1 ? (
                        <Image src={leftArrowDisabled} alt='이전' width={20} height={20} />
                    ) : (
                        <Image src={leftArrow} alt='이전' width={20} height={20} />
                    )}
                </button>
                <span className={styles.pageContainer}>
                    {page}&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;{totalPages}
                </span>
                <button onClick={handleNextPage} className={styles.pageButtons} disabled={page === totalPages}>
                    {page === totalPages ? (
                        <Image src={rightArrowDisabled} alt='다음' width={20} height={20} />
                    ) : (
                        <Image src={rightArrow} alt='다음' width={20} height={20} />
                    )}
                </button>
            </div>
        </div>
    );
}
