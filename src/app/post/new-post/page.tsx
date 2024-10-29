'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js 라우터 사용
import axios from 'axios'; // Axios 사용
import dynamic from 'next/dynamic';
import Image from 'next/image';
import styles from './newPost.module.css';
import note from '../../public/spiral-notepad.svg';
import pencil from '../../public/pencil.svg';
import ToggleSwitch from '@/app/components/ToggleSwitch/ToggleSwitch';

// 동적 import로 MDEditor와 Markdown 컴포넌트를 클라이언트에서만 로드
const MDEditor = dynamic(() => import('@uiw/react-md-editor').then((mod) => mod.default), { ssr: false });
const Markdown = dynamic(() => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown), { ssr: false });

export default function NewPostPage() {
    const [title, setTitle] = useState(''); // 제목 상태 관리
    const [content, setContent] = useState(''); // 내용 상태 관리
    const [category, setCategory] = useState(''); // 카테고리 상태 관리
    const [thumbnail, setThumbnail] = useState(''); // 썸네일 URL 상태 관리
    const [previewContent, setPreviewContent] = useState(''); // 미리보기 내용 상태 관리
    const [isPublic, setIsPublic] = useState(true); // 공개 여부 상태 관리
    const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태 관리
    const router = useRouter(); // Next.js 라우터

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // 폼 기본 동작(페이지 새로고침) 방지

        // 제목, 내용, 카테고리, 썸네일, 미리보기 내용이 비어 있는지 확인
        if (!title.trim() || !content.trim() || !category.trim() || !thumbnail.trim() || !previewContent.trim()) {
            alert('제목, 내용, 카테고리, 썸네일, 미리보기 내용을 모두 입력하세요.');
            return;
        }

        setIsSubmitting(true); // 제출 상태로 변경

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/posts`,
                { title, content, category, thumbnail, preview_content: previewContent, visibility: isPublic },
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
                alert('글 작성에 실패했습니다.');
            }
        } catch (err) {
            console.error(err);
            alert('서버 요청 중 에러가 발생했습니다.');
        } finally {
            setIsSubmitting(false); // 제출 상태 해제
        }
    };

    const toggleVisibility = () => {
        setIsPublic((prev) => !prev);
    };

    return (
        <div id={styles.newPostContainer}>
            <form onSubmit={handleSubmit} id={styles.newPostForm}>
                <div id={styles.inputPostMeta}>
                    <div id={styles.inputMainMeta}>
                        <input
                            id={styles.inputTitle}
                            type='text'
                            name='title'
                            placeholder='T I T L E .'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} // 제목 상태 업데이트
                        />
                        <div id={styles.toggleSwitchContainer}>
                            <input
                                id={styles.inputCategory}
                                type='text'
                                name='category'
                                placeholder='C A T E G O R Y .'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)} // 카테고리 상태 업데이트
                            />
                            <ToggleSwitch isDefault={isPublic} onToggle={toggleVisibility} />
                        </div>
                        <input
                            id={styles.inputThumbnail}
                            type='text'
                            name='thumbnail'
                            placeholder='T H U M B N A I L .'
                            value={thumbnail}
                            onChange={(e) => setThumbnail(e.target.value)} // 썸네일 상태 업데이트
                        />
                    </div>
                    <textarea
                        id={styles.inputPreviewContent}
                        name='previewContent'
                        placeholder='미리보기 내용을 입력하세요 (최대 200자).'
                        value={previewContent}
                        onChange={(e) => setPreviewContent(e.target.value)} // 미리보기 내용 상태 업데이트
                        maxLength={200}
                    />
                </div>
                <div id={styles.markdownContainer}>
                    <div data-color-mode='light' id={styles.inputMarkdownContainer}>
                        <MDEditor
                            id={styles.markdownInput}
                            value={content}
                            onChange={(value) => setContent(value ?? '')}
                            preview='edit'
                            commands={[]}
                        />
                    </div>
                    <div data-color-mode='light' id={styles.markdownPreviewContainer}>
                        <Markdown source={content} />
                    </div>
                    <button type='submit' disabled={isSubmitting} id={styles.submitButton}>
                        <Image src={note} alt='send' width={42} height={42} id={styles.noteImage} />
                        <Image src={pencil} alt='send' width={28} height={28} id={styles.pencilImage} />
                    </button>
                </div>
            </form>
        </div>
    );
}
