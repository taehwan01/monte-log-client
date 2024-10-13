'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js 라우터 사용
import axios from 'axios'; // Axios 사용

export default function NewPostPage() {
    const [title, setTitle] = useState(''); // 제목 상태 관리
    const [content, setContent] = useState(''); // 내용 상태 관리
    const [category, setCategory] = useState(''); // 카테고리 상태 관리
    const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태 관리
    const [error, setError] = useState(''); // 에러 메시지 상태 관리
    const router = useRouter(); // Next.js 라우터

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // 폼 기본 동작(페이지 새로고침) 방지

        // 제목, 내용, 카테고리가 비어 있는지 확인
        if (!title.trim() || !content.trim() || !category.trim()) {
            setError('제목, 내용, 카테고리를 모두 입력하세요.');
            return;
        }

        setIsSubmitting(true); // 제출 상태로 변경
        setError(''); // 에러 초기화

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/posts`,
                { title, content, category },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 201) {
                alert('글 작성이 완료되었습니다.');
                router.push('/'); // 작성 완료 후 홈페이지로 이동
            } else {
                setError('글 작성에 실패했습니다.');
            }
        } catch (err) {
            console.error(err);
            setError('서버 요청 중 에러가 발생했습니다.');
        } finally {
            setIsSubmitting(false); // 제출 상태 해제
        }
    };

    return (
        <div>
            <h1>글쓰기</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    placeholder='제목을 입력하세요.'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // 제목 상태 업데이트
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                <br />
                <textarea
                    name='content'
                    rows={10}
                    cols={50}
                    placeholder='여기에 글을 작성하세요.'
                    value={content}
                    onChange={(e) => setContent(e.target.value)} // 내용 상태 업데이트
                />
                <br />
                <input
                    type='text'
                    name='category'
                    placeholder='카테고리를 입력하세요.'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)} // 카테고리 상태 업데이트
                    style={{ width: '100%', marginBottom: '10px' }}
                />
                <br />
                <button type='submit' disabled={isSubmitting}>
                    작성완료
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* 에러 메시지 표시 */}
        </div>
    );
}
