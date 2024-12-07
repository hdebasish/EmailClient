import styles from "./emailList.module.css"
import List from "../../components/list/List";
import EmailBody from "../../components/emailBody/EmailBody";
import { useValue } from "../../context/EmailProvider";

export default function EmailList(){

    const { isReadContent } = useValue();

    return (<section className={styles.containerEmailList}>
        <List />
        { isReadContent && <EmailBody />}
    </section>);
}