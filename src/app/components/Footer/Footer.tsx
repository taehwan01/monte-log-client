'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from './Footer.module.css';
import HorizontalRule from '../HorizontalRule/HorizontalRule';
import pencil from '../../public/pencil.svg';
import logout from '../../public/logout.svg';

export default function Footer() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/status`, {
                    withCredentials: true, // 쿠키 포함
                });
                const { isLoggedIn } = response.data;
                setIsLoggedIn(isLoggedIn);
            } catch (error) {
                console.error('Error fetching login status:', error);
            }
        };

        checkLoginStatus();
    }, []);

    const handleClickNewPost = () => {
        if (isLoggedIn) {
            window.location.href = '/post/new-post';
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
            setIsLoggedIn(false); // 로그아웃 후 상태 업데이트
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
                    <Image src={pencil} alt='pencil' id={styles.footerPencil} onClick={handleClickNewPost} />
                    {isLoggedIn && (
                        <Image src={logout} alt='logout' id={styles.footerLogout} onClick={handleClickLogout} />
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