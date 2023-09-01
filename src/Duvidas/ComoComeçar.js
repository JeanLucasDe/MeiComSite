import styles from "./ComoComeçar.module.css"

export default function ComoComeçar () {
    return (
        <>
            <div className={styles.container}>
                <h3>Como eu começo?</h3>
                <h5><strong>1º - </strong> Preencha suas informações.</h5>
                <h5><strong>2º - </strong> Comece a adicionar seus produtos.</h5>
                <button>Começar agora</button>
            </div>
        </>
        )
    }