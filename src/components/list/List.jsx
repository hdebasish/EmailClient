import styles from "./list.module.css"
import ListItem from "../listItem/ListItem";
import { useValue } from "../../context/EmailProvider";
import Pagination from "../pagination/Pagination";

export default function List() {

    const {readList, unreadList, favList, filter, emailList } = useValue();
    let { list } = emailList;

    return (
    <div className={styles.wrapper}>
        <div className={styles.containerList}>
            {filter === "UNREAD" && unreadList.map((item, index) => { return (<ListItem key={index} emailItem={item} />);})}
            {filter === "READ" && readList.map((item, index) => { return (<ListItem key={index} emailItem={item} />);})}
            {filter === "FAV" && favList.map((item, index) => { return (<ListItem key={index} emailItem={item} />);})}
            {filter === null && list.map((item, index) => { return (<ListItem key={index} emailItem={item} />);})}
            
        </div>
        {!filter && <Pagination />}
    </div>
    );
}