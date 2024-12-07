import styles from "./error.module.css"
import { useValue } from "../../context/EmailProvider";

export default function Error(){

    const { errorMailList } = useValue();


    return (
        <div className={styles.error}>
            <div>{errorMailList}</div>
        </div>
    );
}