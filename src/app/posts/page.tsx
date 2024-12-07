'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import styles from './posts.module.css';
import Loading from '../components/Loading/Loading';
import Categories from '../components/Categories/Categories';
import Pagination from '../components/Pagination/Pagination';
import PostItem from '../components/PostItem/PostItem';
import Post from '../post/post.interface';

export default function Home() {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const category = searchParams.get('category') ? Number(searchParams.get('category')) : null;

    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 2;

    useEffect(() => {
        const getPosts = async () => {
            setIsLoading(true);

            let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/posts`;
            if (category) {
                apiUrl += `/category/${category}`;
            }
            if (page) {
                apiUrl += `?page=${page}&limit=${limit}`;
            }

            console.log({ page, category, apiUrl });

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
    }, [page, category]);

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
            <Pagination currentPage={page} totalPages={totalPages} />
        </div>
    );
}
