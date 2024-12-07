import styles from './Pagination.module.css';
import Image from 'next/image';
import Link from 'next/link';
import arrowLeft from '../../public/arrow-left.svg';
import arrowLeftDisabled from '../../public/arrow-left-disabled.svg';
import arrowRight from '../../public/arrow-right.svg';
import arrowRightDisabled from '../../public/arrow-right-disabled.svg';

export default function Pagination({ currentPage, totalPages }: Readonly<PaginationProps>) {
    const getPageLink = (page: number) => `/posts?page=${page}`;

    return (
        <div className={styles.pageButtonsContainer}>
            <Link
                href={currentPage > 1 ? getPageLink(currentPage - 1) : '#'}
                className={styles.pageButtons}
                style={{ pointerEvents: currentPage <= 1 ? 'none' : 'auto', opacity: currentPage <= 1 ? 0.5 : 1 }}
            >
                <Image src={currentPage === 1 ? arrowLeftDisabled : arrowLeft} alt='이전' width={20} height={20} />
            </Link>

            <span className={styles.pageContainer}>
                {currentPage}&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;{totalPages}
            </span>

            <Link
                href={currentPage < totalPages ? getPageLink(currentPage + 1) : '#'}
                className={styles.pageButtons}
                style={{
                    pointerEvents: currentPage >= totalPages ? 'none' : 'auto',
                    opacity: currentPage >= totalPages ? 0.5 : 1,
                }}
            >
                <Image
                    src={currentPage >= totalPages ? arrowRightDisabled : arrowRight}
                    alt='다음'
                    width={20}
                    height={20}
                />
            </Link>
        </div>
    );
}
