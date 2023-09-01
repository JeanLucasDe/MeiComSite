import { useState } from "react"
import styles from "./Fotos.module.css"
import passo1desk from "../img/suporteFotos/1passo.png"
import passo2desk from "../img/suporteFotos/2passo.png"
import passo3desk from "../img/suporteFotos/3passo.png"
import passo4desk from "../img/suporteFotos/4passo.png"
import passo5desk from "../img/suporteFotos/5passo.png"
import passo6desk from "../img/suporteFotos/6passo.png"
import passexterno from "../img/suporteFotos/passoexterno.png"


export default function Fotos () {

    const [width, setWidth] = useState()

    return (
            <>
                <div className={styles.container}>
                    <h4>&#8226; Como adiciono fotos externas?</h4>
                    <div className={styles.info}>
                        <h5 className={styles.title}>- Escolha a foto da sua preferência e clique em "Copiar endereço da imagem"</h5>
                        <img src={passexterno}
                        className={styles.img}
                        />
                    </div>

                    <div className="line"/>
                    <h4>&#8226; Como adiciono minhas fotos?</h4>
                    <div className={styles.info}>
                        <h5
                        className={styles.title}
                        ><strong>1º - </strong>Entre no seu google drive e clique em novo e upload de pasta ou arquivo</h5>
                        <img src={passo1desk}
                        className={styles.img}
                        />
                        <h5
                        className={styles.title}
                        ><strong>2º - </strong>selecione a pasta e clique em fazer upload</h5>
                        <img src={passo2desk}
                        className={styles.img}
                        />
                        <h5
                        className={styles.title}
                        ><strong>3º - </strong>Clique na pasta/arquivo, nos 3 pontinhos, depois em gerar link</h5>
                        <img src={passo3desk}
                        className={styles.img}
                        />
                        <h5
                        className={styles.title}
                        ><strong>4º - </strong>Altere o acesso geral para "Qualquer pessoa com o link"</h5>
                        <img src={passo4desk}
                        className={styles.img}
                        />
                        <h5
                        className={styles.title}
                        ><strong>5º - </strong>Clique nos 3 pontinhos depois em gerar link</h5>
                        <img src={passo5desk}
                        className={styles.img}
                        />
                        <h5
                        className={styles.title}
                        ><strong>6º - </strong>Pronto, agora é só copiar o link da imagem</h5>
                        <img src={passo6desk}
                        className={styles.img}
                        />
                    </div>
                </div>
            </>
        )
}