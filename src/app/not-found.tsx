'use client';

import { useEffect, useState } from 'react';
import styles from './auth/login/failure/failure.module.css';
import LoginFailureLoading from './components/LoginFailureLoader/LoginFailureLoader';

export default function NotFound() {
    const [timer, setTimer] = useState(3);

    useEffect(() => {
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
                <p>무엇을 찾으시나요...?</p>
                <br />
                <p>{timer > 0 ? `${timer}초 후 ` : ''}메인 페이지로 이동합니다.</p>
            </div>
        </div>
    );
}
