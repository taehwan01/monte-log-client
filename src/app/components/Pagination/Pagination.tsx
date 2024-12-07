import styles from './Pagination.module.css';
import Image from 'next/image';
import arrowLeft from '../../public/arrow-left.svg';
import arrowLeftDisabled from '../../public/arrow-left-disabled.svg';
import arrowRight from '../../public/arrow-right.svg';
import arrowRightDisabled from '../../public/arrow-right-disabled.svg';

export default function Pagination({ currentPage, totalPages, onPageChange }: Readonly<PaginationProps>) {
    return (
        <div className={styles.pageButtonsContainer}>
            <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                className={styles.pageButtons}
                disabled={currentPage <= 1}
            >
                <Image src={currentPage === 1 ? arrowLeftDisabled : arrowLeft} alt='이전' width={20} height={20} />
            </button>
            <span className={styles.pageContainer}>
                {currentPage}&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;{totalPages}
            </span>
            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                className={styles.pageButtons}
                disabled={currentPage >= totalPages}
            >
                <Image
                    src={currentPage >= totalPages ? arrowRightDisabled : arrowRight}
                    alt='다음'
                    width={20}
                    height={20}
                />
            </button>
        </div>
    );
}
