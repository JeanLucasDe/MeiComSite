import { Link } from "react-router-dom"
import styles from "./LinkMeiComSite.module.css"

export default function LinkMeiComSite () {
    return (
            <>
            <h5 className={styles.text_footer}>Site Criado com o <Link to="/">MeiComSite</Link></h5>
            </>
        )
}