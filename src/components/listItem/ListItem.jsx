import styles from "./listItem.module.css"
import { useValue } from "../../context/EmailProvider";

export default function ListItem({ emailItem }) {

    const { read, fav, addToFav, selectedMail, updateSelectedMail } = useValue();

    const { date, from: {email, name}, id, short_description, subject } = emailItem;

    if(selectedMail?.id === id){
        return (
            <div className={`${styles.containerListItem} ${styles.read}`}>
                <div className={styles.containerImage}>
                    <div>{name[0].toUpperCase()}</div>
                </div>
                <div className={styles.containerDesc}>
                    <div className={styles.subject}>
                        <span className={`${styles.textMid} ${styles.textEllipsis} ${styles.sender}`}>From: <span className={styles.textBold}>{name} {`<${email}>`}</span></span>
                        <span className={`${styles.textMid} ${styles.textEllipsis}`}>Subject: <span className={styles.textBold}>{subject}</span></span>
                    </div>
                    <span className={`${styles.textMid} ${styles.textEllipsis} ${styles.body}`}>{short_description}</span>
                    <div className={styles.timestamp}><span className={`${styles.textMid} ${styles.textEllipsis}`}>{new Date(date).toLocaleString()}</span> {fav.has(id) ? <div className={styles.favBtnSm} onClick={() => addToFav()}>Unfavorite</div> : <div className={styles.favBtnSm} onClick={() => addToFav()}>Favorite</div>}</div>
                </div>
            </div>
        );
    } else {

        return (
             <div className={`${styles.containerListItem} ${styles.selectable}`} onClick={() => updateSelectedMail(emailItem)}>
                <div className={styles.containerImage}>
                    <div>{name[0].toUpperCase()}</div>
                </div>
                <div className={styles.containerDesc}>
                    <div className={styles.subject}>
                        <span className={`${styles.textMid} ${styles.textEllipsis} ${styles.sender}`}>From: <span className={styles.textBold}>{name} {`<${email}>`}</span></span>
                        <span className={`${styles.textMid} ${styles.textEllipsis}`}>Subject: <span className={styles.textBold}>{subject}</span></span>
                    </div>
                    {read.has(id) ? <span className={`${styles.textMid} ${styles.textEllipsis} ${styles.body}`}>{short_description}</span> : <span className={`${styles.textMid} ${styles.textEllipsis} ${styles.body} ${styles.unread}`}>{short_description}</span>}
                    <div className={styles.timestamp}><span className={`${styles.textMid} ${styles.textEllipsis}`}>{new Date(date).toLocaleString()}</span></div>
                </div>
            </div>
        );

    }

    
}