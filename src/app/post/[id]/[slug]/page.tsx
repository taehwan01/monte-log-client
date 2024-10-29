'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // useParams로 id와 slug 가져오기
import axios from 'axios';
import dynamic from 'next/dynamic'; // 동적 import를 위한 모듈
import styles from '../../post.module.css';
import Post from '../../post.interface';
import grayHeart from '../../../public/gray-heart.svg';
import redHeart from '../../../public/red-heart.svg';
import Image from 'next/image';
import Loading from '../../../components/Loading/Loading';
import Comments from '../../../components/Comments/Comments';
import HorizontalRule from '@/app/components/HorizontalRule/HorizontalRule';

// 동적 import로 MDEditor의 Markdown 컴포넌트를 클라이언트에서만 로드
const Markdown = dynamic(() => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown), { ssr: false });

export default function PostDetail() {
    const router = useRouter();
    const { id } = useParams(); // URL에서 id와 slug 추출
    const [post, setPost] = useState<Post | null>(null); // Post 타입을 정의하지 않은 경우, any로 처리
    const [likeCounts, setLikeCounts] = useState<number>(0); // 좋아요 수 상태
    const [hasLiked, setHasLiked] = useState<boolean>(false); // 좋아요 여부 상태
    const [thanks, setThanks] = useState<boolean>(false); // 감사 메시지 상태
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
                    setPost(response.data); // API 호출하여 id로 데이터 가져오기
                } catch {
                    router.push(`/error?errorMessage=${encodeURIComponent('존재하지 않거나 비공개 글입니다.')}`);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        const checkLikeStatus = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/like-status`);
                    setHasLiked(response.data.hasLiked); // 좋아요 여부 설정
                } catch {
                    router.push('/error');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        const fetchLikeCounts = async () => {
            if (id) {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/like-count`);
                    setLikeCounts(response.data.likeCounts); // API 호출하여 좋아요 수 가져오기
                } catch {
                    router.push('/error');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchPost();
        checkLikeStatus();
        fetchLikeCounts();
    }, [id]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}.${month}.${day}`;
    };

    // 좋아요 버튼 클릭 핸들러
    const handleLikeClick = async () => {
        try {
            if (!hasLiked) {
                setThanks(true);
                setTimeout(() => {
                    setThanks(false);
                }, 3000);
                setLikeCounts((prevLikes) => prevLikes + 1); // 좋아요 수 증가
                setHasLiked(true); // 좋아요 상태 업데이트
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/like`, {}, { withCredentials: true });
            } else {
                setThanks(false);
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

    if (isLoading) {
        return (
            <div id={styles.postDetailContainer}>
                <Loading />
            </div>
        );
    }

    if (!post) {
        return null;
    }

    return (
        <div id={styles.postDetailContainer}>
            <span id={styles.postDetailTitle}>{post.title}</span>
            <div id={styles.postMeta}>
                <div id={styles.postDetailMeta}>
                    <span>{formatDate(post.created_at)}</span>
                    <span style={{ padding: '0 10px' }}>&#183;</span>
                    <span>{post.category.name}</span>
                    <span style={{ padding: '0 10px' }}>&#183;</span>
                    <button onClick={handleLikeClick} id={styles.likeButton}>
                        {hasLiked ? (
                            <Image src={redHeart} alt='좋아요 취소' width={25} height={20} />
                        ) : (
                            <Image src={grayHeart} alt='좋아요' width={25} height={20} />
                        )}
                    </button>
                    <span>{likeCounts}명이 좋아요를 눌렀어요!</span>
                    {thanks && <span style={{ fontWeight: '500' }}>&nbsp;&nbsp;감사합니다 :)</span>}
                </div>
            </div>

            <HorizontalRule />
            <div style={{ height: '40px' }} />

            <div data-color-mode='light'>
                <Markdown source={post.content} className={styles.postMarkdown} />
            </div>

            <div style={{ height: '40px' }} />
            <HorizontalRule />

            <div id={styles.comments}>
                <span>댓글</span>
                <Comments repo='taehwan01/monte-log-server' label='comment' issueTerm='pathname' />
            </div>
        </div>
    );
}
