import styles from "./PoliticaPrivacidade.module.css"

export default function Politica () {
    return (
            <>
                <div className={styles.container}>
                    <h3>Politica de Privacidade</h3>
                    <div className="line"/>
                    <h5>Seus dados pessoais não serão solicitados na nossa plataforma, tais como CPF, RG ou CNH.</h5>
                    <h5>Para fins de localização, se desejar exibir em sua página, será solicitado o endereço do seu negócio.</h5>
                </div>
            </>
        )
}