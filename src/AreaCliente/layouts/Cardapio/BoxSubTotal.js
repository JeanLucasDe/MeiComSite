import styles from "./BoxSubTotal.module.css"

export default function BoxSubTotal (props) {

    const show = props.show && props.show

    console.log(show)
    return (
            <>
                <div className={`${show ? styles.show : styles.none} ${styles.container}`}>
                    <h5>Sub TOtal</h5>
                </div>
            </>
        )
}