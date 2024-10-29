'use client';

import { useEffect, useState } from 'react';
import styles from './error.module.css';
import LoginFailureLoading from '../components/LoginFailureLoader/LoginFailureLoader';

export default function ErrorPage() {
    const [timer, setTimer] = useState(3);
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const message = params.get('errorMessage') || '무언가 잘못됐습니다.';
        setErrorMessage(decodeURIComponent(message));

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        setTimeout(() => {
            window.location.href = '/';
        }, 2850);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id={styles.loginFailureContainer}>
            <LoginFailureLoading />
            <div id={styles.loginFailureMessageContainer}>
                <p>{errorMessage}</p>
                <br />
                <p>{timer > 0 ? `${timer}초 후 ` : ''}메인 페이지로 이동합니다.</p>
            </div>
        </div>
    );
}
