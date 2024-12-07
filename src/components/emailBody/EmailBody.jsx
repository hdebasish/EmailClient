import styles from "./emailBody.module.css"
import { useValue } from "../../context/EmailProvider";


export default function EmailBody() {

    const { fav, addToFav, isLoadingMailBody, selectedMailBody, errorMailBody } = useValue();

    const { id, body } = selectedMailBody;


    if (isLoadingMailBody) {
        return (
            <div className={styles.containerEmailBody}>
                <span>Loading...</span>
            </div>
        );
    }

    if (errorMailBody) {
        return (
            <div className={styles.containerEmailBody}>
                <span className={styles.error} >{errorMailBody}</span>
            </div>
        );
    }



    return (
        <div className={styles.containerEmailBody}>
            <div className={styles.header}>
                <div className={styles.containerImage}>
                    <div>F</div>
                </div>
                <div className={styles.containerSubject}>
                    <div className={styles.subject}>
                        <div className={`${styles.textLarge}`}>{`Lorem Ipsum`}</div>
                        {fav.has(id) ? <div className={`${styles.textMid} ${styles.favBtn}`} onClick={() => addToFav()}>{`Unmark as Favorite`}</div> : <div className={`${styles.textMid} ${styles.favBtn}`} onClick={() => addToFav()}>{`Mark as favorite`}</div>}
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.timestamp}>{`26/02/2020 10:30 AM`}</div>
                <div dangerouslySetInnerHTML={{ __html: body }} />
            </div>
        </div>);
}