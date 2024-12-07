import styles from "./navbar.module.css"
import { useValue } from "../../context/EmailProvider";

export default function Navbar(){


    const {toggleUnread, toggleRead, toggleFavorite, filter} = useValue();


    return (
        <nav className={styles.containerNav}>
            <p>Filter By:</p>
            <ul>
                {filter === "UNREAD" ? <li className={styles.selected} onClick={() => toggleUnread()}>Unread</li> : <li onClick={() => toggleUnread()}>Unread</li>}
                {filter === "READ" ? <li className={styles.selected} onClick={() => toggleRead()}>Read</li> : <li onClick={() => toggleRead()}>Read</li> }
                {filter === "FAV" ? <li className={styles.selected} onClick={() => toggleFavorite()}>Favorites</li> : <li onClick={() => toggleFavorite()}>Favorites</li>}
            </ul>
        </nav>

    );
}