export default interface PostItemProps {
    post: {
        post_id: number;
        title: string;
        thumbnail: string;
        created_at: string;
        category: { name: string };
        like_count: { count: number }[];
        preview_content: string;
    };
}
