import styles from './HorizontalRule.module.css';

// 기본 색상은 검정색, 선택적으로 색상을 변경할 수 있음
export default function HorizontalRule({ color = 'black' }) {
    return <div className={styles.horizontalRule} style={{ backgroundColor: color }}></div>;
}
