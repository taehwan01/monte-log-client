'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './VisitorStats.module.css';

export default function VisitorStats() {
    const [hasLogged, setHasLogged] = useState(false);
    const [totalVisitors, setTotalVisitors] = useState(0);
    const [todayVisitors, setTodayVisitors] = useState(0);

    useEffect(() => {
        // 최초 렌더링에서만 실행
        if (!hasLogged) {
            const logVisitor = async () => {
                try {
                    const userKey = `${window.navigator.userAgent}-${window.location.hostname}`;
                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/visitor`, { userKey });
                } catch (error) {
                    console.error('Error logging visitor:', error);
                }
            };

            const getVisitorStats = async () => {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/visitor/stats`);
                    setTotalVisitors(response.data.totalVisitors);
                    setTodayVisitors(response.data.todayVisitors);
                } catch (error) {
                    console.error('Error fetching visitor stats:', error);
                }
            };

            logVisitor();
            getVisitorStats();
            setHasLogged(true);
        }
    }, [hasLogged]);

    return (
        <div id={styles.visitorStats}>
            <p>전체 방문자: {totalVisitors === 0 ? '-' : totalVisitors}</p>
            <p>오늘의 방문자: {todayVisitors === 0 ? '-' : todayVisitors}</p>
        </div>
    );
}
