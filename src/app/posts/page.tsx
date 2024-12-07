'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './posts.module.css';
import Loading from '../components/Loading/Loading';
import Categories from '../components/Categories/Categories';
import Pagination from '../components/Pagination/Pagination';
import PostItem from '../components/PostItem/PostItem';
import Post from '../post/post.interface';

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('category');

    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 7;

    useEffect(() => {
        const page = Number(searchParams.get('page')) || 1;
        setCurrentPage(page);
    }, [searchParams]);

    useEffect(() => {
        const getPosts = async () => {
            setIsLoading(true);
            const apiUrl = categoryId
                ? `${process.env.NEXT_PUBLIC_API_URL}/posts/category/${categoryId}?page=${currentPage}&limit=${limit}`
                : `${process.env.NEXT_PUBLIC_API_URL}/posts?page=${currentPage}&limit=${limit}`;

            try {
                const { data } = await axios.get(apiUrl);
                setPosts(data.posts);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
            setIsLoading(false);
        };

        getPosts();
    }, [currentPage, categoryId]);

    const handlePageChange = (newPage: number) => {
        router.push(`/posts?page=${newPage}`);
        setCurrentPage(newPage);
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
                    posts.map((post) => <PostItem key={post.post_id} post={post} />)
                ) : (
                    <p>현재 비공개 처리되어 있습니다.</p>
                )}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
}
