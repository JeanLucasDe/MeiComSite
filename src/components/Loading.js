import styles from "./Loading.module.css"

export default function Loading () {
    return (
        <div className={styles.container}>
            <div className={`${styles.spinner} spinner-border`} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        )
}