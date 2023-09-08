import { useState } from "react"

export default function Contador () {

    var [seg, SetSeg] = useState(180)
    const NovoPedidoModal = document.querySelector('#ModalNovoPedido')


    const contador = () => {
        if (NovoPedidoModal.style.display == 'none') {
            setTimeout(()=> {
                if (seg == 0) window.location.reload()
                SetSeg(seg -= 1)
            },1000)
        }
    }

    if (NovoPedidoModal && !NovoPedidoModal.style.display) {
        
        setTimeout(()=> {
            if (seg == 0) window.location.reload()
            SetSeg(seg -= 1)
        },1000)
    }
    if (NovoPedidoModal && NovoPedidoModal.style.display) {
        contador()
    }
    
    return (
        <>
        
        </>
        )
}