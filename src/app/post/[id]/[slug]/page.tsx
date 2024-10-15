'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // useParams로 id와 slug 가져오기
import axios from 'axios';
import dynamic from 'next/dynamic'; // 동적 import를 위한 모듈
import styles from '../../post.module.css';

// 동적 import로 MDEditor의 Markdown 컴포넌트를 클라이언트에서만 로드
const Markdown = dynamic(() => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown), { ssr: false });

export default function PostDetail() {
    const { id, slug } = useParams(); // URL에서 id와 slug 추출
    const [post, setPost] = useState<any | null>(null); // Post 타입을 정의하지 않은 경우, any로 처리

    useEffect(() => {
        const fetchPost = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
                    console.log(response);
                    setPost(response.data); // API 호출하여 id로 데이터 가져오기
                } catch (error) {
                    console.error('Failed to fetch post:', error);
                }
            }
        };

        fetchPost();
    }, [id]);

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <h5>{post.category.name}</h5>
            {/* Markdown으로 content를 렌더링 */}
            <div data-color-mode='light'>
                <Markdown source={post.content} className={styles.markdown} />
            </div>
            {/* <Markdown source={post.content} className={styles.markdown} style={{ backgroundColor: 'orange' }} /> */}
            <p>{new Date(post.created_at).toLocaleDateString()}</p>
        </div>
    );
}
