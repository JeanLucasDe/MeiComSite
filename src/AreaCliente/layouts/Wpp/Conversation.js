import { FaPlus, FaRegLaughBeam, FaRegPaperPlane } from "react-icons/fa"
import styles from "./Conversation.module.css"
import BoxConversation from "./BoxConversation"

export default function Conversation (props) {

    

    return (
            <>
                <div className={styles.container}>

                    <div className={styles.perfil}>
                        
                    </div>
                    <BoxConversation produtos={props.produtos && props.produtos} usuario={props.usuario && props.usuario}/>
                </div>
            </>
        )
}