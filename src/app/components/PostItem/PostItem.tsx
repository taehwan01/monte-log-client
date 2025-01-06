import styles from './PostItem.module.css';
import Image from 'next/image';
import Link from 'next/link';
import grayHeart from '../../public/gray-heart.svg';
import PostItemProps from './PostItemProps.interface';

export default function PostItem({ post }: Readonly<PostItemProps>) {
    const createSlug = (title: string): string => {
        return title
            .toLowerCase()
            .replace(/[^\p{L}\p{N}\s-]/gu, '') // \p{L}은 모든 문자, \p{N}은 숫자, 유니코드 플래그 추가
            .trim()
            .replace(/\s+/g, '-'); // 공백을 하이픈으로 변환
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}.${month}.${day}`;
    };

    return (
        <Link href={`/post/${post.post_id}/${createSlug(post.title)}`} className={styles.postItemContainer}>
            <div className={styles.imageContainer}>
                <Image
                    src={post.thumbnail}
                    alt='썸네일 이미지'
                    className={styles.postThumbnail}
                    width={150}
                    height={150}
                />
            </div>
            <table className={styles.postItem}>
                <thead style={{ display: 'none' }}>
                    <tr>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span className={styles.postItemTitle}>
                                [{post.category.name}] {post.title}
                            </span>
                        </td>
                    </tr>
                    <tr className={styles.postItemLineBreak}></tr>
                    <tr>
                        <td>
                            <div className={styles.postItemMeta}>
                                <span>{formatDate(post.created_at)}</span>
                                <span>&#183;</span>
                                <span>{post.category.name}</span>
                                <span>&#183;</span>
                                <Image src={grayHeart} alt='좋아요' width={15} height={13} />
                                <span>&nbsp;{post.like_count[0].count}</span>
                            </div>
                        </td>
                    </tr>
                    <tr className={styles.postItemLineBreak}></tr>
                    <tr>
                        <td>
                            <span className={styles.postItemContent}>{post.preview_content}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Link>
    );
}
