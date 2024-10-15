// app/post/[id]/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // useParams로 id와 slug 가져오기
import axios from 'axios';

interface Post {
    post_id: number;
    title: string;
    content: string;
    created_at: string;
}

export default function PostDetail() {
    const { id, slug } = useParams(); // URL에서 id와 slug 추출
    const [post, setPost] = useState<Post | null>(null);

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

        fetchPost();
    }, [id]);

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>{post.created_at}</p>
        </div>
    );
}
