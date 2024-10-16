'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './failure.module.css';
import dittoImage from '../../../public/ditto.jpg';

export default function LoginFailure() {
    const [timer, setTimer] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        setTimeout(() => {
            window.location.href = '/';
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id={styles.loginFailureContainer}>
            <Image src={dittoImage} alt='ditto' id={styles.ditto} />
            <div id={styles.loginFailureMessageContainer}>
                <p>로그인이 거부되었습니다.</p>
                <br />
                <p>{timer > 0 ? `${timer}초 후 ` : ''}메인 페이지로 이동합니다.</p>
            </div>
        </div>
    );
}
