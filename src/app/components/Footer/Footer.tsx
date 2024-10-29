'use client';

import axios from 'axios';
import Image from 'next/image';
import styles from './Footer.module.css';
import HorizontalRule from '../HorizontalRule/HorizontalRule';
import pencil from '../../public/pencil.svg';
import logout from '../../public/logout.svg';
import { useAuth } from '@/app/context/AuthContext';

export default function Footer() {
    const { isLoggedIn } = useAuth();

    const handleClickPencil = () => {
        if (isLoggedIn) {
            const currentPath = window.location.pathname;
            if (currentPath === '/') {
                window.location.href = '/post/new-post';
            } else if (currentPath.includes('/post/')) {
                const postId = currentPath.split('/')[2];
                window.location.href = `/post/${postId}/edit`;
            }
        } else {
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
        }
    };

    const handleClickLogout = async () => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
                {},
                {
                    withCredentials: true, // 쿠키 포함
                }
            );
            window.location.href = '/';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <footer id={styles.footer}>
            <HorizontalRule />
            <div id={styles.footerInner}>
                <div id={styles.footerMessage}>
                    <span>monte의 개발 블로그</span>
                    <button onClick={handleClickPencil} id={styles.footerPencil}>
                        <Image src={pencil} alt='pencil' />
                    </button>
                    {isLoggedIn && (
                        <button onClick={handleClickLogout} id={styles.footerLogout}>
                            <Image src={logout} alt='logout' width={25} height={25} />
                        </button>
                    )}
                </div>
                <br />
                <div id={styles.footerCopyright}>
                    <span>&copy; 2024. monte all rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}
