import styles from './Loading.module.css';

export default function Loading() {
    return (
        <div id={styles.loadingContainer}>
            <div id={styles.firstDot}></div>
            <div id={styles.secondDot}></div>
            <div id={styles.thirdDot}></div>
        </div>
    );
}
