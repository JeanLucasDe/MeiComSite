import styles from "./Pagamentos.module.css"

export default function Pagamentos () {
    return (
            <>
                <div className={styles.container}>
                    <h3>Pagamentos por pix (QR-CODE):</h3>
                    <div className="row">
                        <div className="col-sm-4">
                            <img src="https://img.freepik.com/free-vector/qr-code-scanning-concept-with-characters_23-2148616315.jpg?size=626&ext=jpg&ga=GA1.2.995514839.1678974862&semt=ais" className={styles.img}/>

                        </div>
                        <div className="col-sm-8">
                            <p>Disponível apartir do plano plus, cadastrando seu token do mercado pago. O valor das compras irá direto para a mesma, seu intermédio da MeiComSite.</p>
                        </div>
                    </div>
                    <h3>Pagamentos pelo whatsapp:</h3>
                    <div className="row">
                        <div className="col-sm-4">
                            <img src="https://img.freepik.com/free-vector/whatsapp-icon-design_23-2147900929.jpg?size=626&ext=jpg&ga=GA1.2.995514839.1678974862&semt=ais" className={styles.img}/>

                        </div>
                        <div className="col-sm-8">
                            <p>A venda é finalizada de forma independente, formulando as informações da compra do seu cliente, junto com as dados do mesmo em uma mensagem de pronto envio para o seu whatsapp.</p>
                        </div>
                    </div>
                </div>
            </>
        )
}