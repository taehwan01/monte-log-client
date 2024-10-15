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
    const [likeCounts, setLikeCounts] = useState<number>(0); // 좋아요 수 상태
    const [hasLiked, setHasLiked] = useState<boolean>(false); // 좋아요 여부 상태

    useEffect(() => {
        const fetchPost = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
                    setPost(response.data); // API 호출하여 id로 데이터 가져오기
                } catch (error) {
                    console.error('Failed to fetch post:', error);
                }
            }
        };

        const checkLikeStatus = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/like-status`);
                    setHasLiked(response.data.hasLiked); // 좋아요 여부 설정
                } catch (error) {
                    console.error('Failed to check like status:', error);
                }
            }
        };

        const fetchLikeCounts = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/like-count`);
                    setLikeCounts(response.data.likeCounts); // API 호출하여 좋아요 수 가져오기
                } catch (error) {
                    console.error('Failed to fetch likes:', error);
                }
            }
        };

        fetchPost();
        checkLikeStatus();
        fetchLikeCounts();
    }, [id]);

    // 좋아요 버튼 클릭 핸들러
    const handleLikeClick = async () => {
        try {
            if (!hasLiked) {
                setLikeCounts((prevLikes) => prevLikes + 1); // 좋아요 수 증가
                setHasLiked(true); // 좋아요 상태 업데이트
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/like`, {}, { withCredentials: true });
            } else {
                setLikeCounts((prevLikes) => prevLikes - 1); // 좋아요 수 감소
                setHasLiked(false); // 좋아요 상태 업데이트
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/cancel-like`,
                    {},
                    { withCredentials: true }
                );
            }
        } catch (error) {
            console.error('Failed to update like status:', error);
        }
    };

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
            <p>{new Date(post.created_at).toLocaleDateString()}</p>
            <div>
                <button onClick={handleLikeClick}>{hasLiked ? '좋아요 취소' : '좋아요'}</button>
                <span>{likeCounts}명이 좋아요를 눌렀습니다.</span>
            </div>
        </div>
    );
}
