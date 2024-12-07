'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './posts.module.css';
import Post from '../post/post.interface';
import Image from 'next/image';
import leftArrow from '../public/arrow-left.svg';
import leftArrowDisabled from '../public/arrow-left-disabled.svg';
import rightArrow from '../public/arrow-right.svg';
import rightArrowDisabled from '../public/arrow-right-disabled.svg';
import Loading from '../components/Loading/Loading';
import grayHeart from '../public/gray-heart.svg';
import Categories from '../components/Categories/Categories';

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('category');

    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

    const limit = 7; // 한 페이지당 보여줄 게시물 수

    useEffect(() => {
        const page = Number(searchParams.get('page')) || 1;
        setCurrentPage(page);
    }, [searchParams]);

    useEffect(() => {
        const getPosts = async () => {
            const apiUrl = categoryId
                ? `${process.env.NEXT_PUBLIC_API_URL}/posts/category/${categoryId}?page=${currentPage}&limit=${limit}`
                : `${process.env.NEXT_PUBLIC_API_URL}/posts?page=${currentPage}&limit=${limit}`;
            try {
                const response = await axios.get(apiUrl);
                setPosts(response.data.posts); // 글 목록 상태 업데이트
                setTotalPages(response.data.totalPages); // 총 페이지 수 설정
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
            setIsLoading(false);
        };

        getPosts();
    }, [currentPage, categoryId]);

    // 페이지 변경 시 URL 업데이트
    const handlePageChange = (newPage: number) => {
        router.push(`/posts?page=${newPage}`);
        setCurrentPage(newPage);
    };

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
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    // 다음 페이지로 이동
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
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
            <h2 id={styles.pageTitle}>목록</h2>
            <Categories />
            <div id={styles.postList}>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div
                            key={post.post_id}
                            onClick={() => handlePostClick(post)}
                            className={styles.postItemContainer}
                        >
                            <div className={styles.imageContainer}>
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
                    <p>현재 비공개 처리되어 있습니다.</p>
                )}
            </div>

            <div className={styles.pageButtonsContainer}>
                <button onClick={handlePreviousPage} className={styles.pageButtons} disabled={currentPage <= 1}>
                    {currentPage === 1 ? (
                        <Image src={leftArrowDisabled} alt='이전' width={20} height={20} />
                    ) : (
                        <Image src={leftArrow} alt='이전' width={20} height={20} />
                    )}
                </button>
                <span className={styles.pageContainer}>
                    {currentPage}&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;{totalPages}
                </span>
                <button onClick={handleNextPage} className={styles.pageButtons} disabled={currentPage >= totalPages}>
                    {currentPage >= totalPages ? (
                        <Image src={rightArrowDisabled} alt='다음' width={20} height={20} />
                    ) : (
                        <Image src={rightArrow} alt='다음' width={20} height={20} />
                    )}
                </button>
            </div>
        </div>
    );
}
