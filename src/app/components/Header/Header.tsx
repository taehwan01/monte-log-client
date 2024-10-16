'use client';

import HorizontalRule from '../HorizontalRule/HorizontalRule';
import styles from './Header.module.css';

export default function Header() {
    const handleClickHeaderLogo = () => {
        window.location.href = '/';
    };

    return (
        <header id={styles.header}>
            <div id={styles.headerLogoContainer}>
                <div id={styles.headerLogo} onClick={handleClickHeaderLogo}>
                    <span id={styles.logoText}>m o n t e</span>
                    <div id={styles.logoSquare}></div>
                </div>
            </div>
            <HorizontalRule />
        </header>
    );
}
