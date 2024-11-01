import Category from './category.interface';

// Post 타입 정의
export default interface Post {
    post_id: number;
    title: string; // 게시글 제목
    content: string; // 게시글 내용
    preview_content: string; // 게시글 미리보기 내용
    thumbnail: string; // 게시글 썸네일 URL
    created_at: string;
    category: Category; // 카테고리 추가
    like_count: [{ count: number }]; // 좋아요 수
}
