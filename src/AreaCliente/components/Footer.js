import styles from "./Footer.module.css"


export default function Footer () {
    return (
            <>
                <footer className={styles.footer}>
                    <h4>Um site criado com <a href="https://meicomsite.netlify.com/" target="_blanck">MeiComSite</a></h4>
                </footer>
            </>
        )
}