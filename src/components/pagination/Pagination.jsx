import styles from "./pagination.module.css"
import { useValue } from "../../context/EmailProvider"

export default function Pagination() {
    const { currentPage, totalPage, goToPrevPage, goToNextPage } = useValue()

    const pageList = [];

    for (let i = 1; i <= totalPage; i++) {
        pageList.push(i);
    }


    return (
        <div className={styles.pagination}>
            {currentPage===1 ? <div className={`${styles.prev} ${styles.disabled}`}>Prev</div> : <div className={styles.prev} onClick={() => goToPrevPage()}>Prev</div>}
            {currentPage===1 ? null : <div className={styles.page}>{currentPage-1}</div>}             
            {
                pageList.slice(currentPage - 1, currentPage + 2).map((page, index) => {
                    if (page === currentPage) {
                        return (<div className={`${styles.page} ${styles.curPage}`} key={index}>{page}</div>);
                    }else{
                        return null;
                    }
                })
            }
            {currentPage===totalPage ? null : <div className={styles.page}>{currentPage+1}</div>}
            {currentPage===totalPage ? <div className={`${styles.next} ${styles.disabled}`}>Next</div> : <div className={styles.next} onClick={() => goToNextPage()}>Next</div>}
        </div>
    )
}

