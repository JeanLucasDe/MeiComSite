import { useState } from "react";

export default function Contador () {

    var [seg, SetSeg] = useState(180)
    var [seed, setSeed] = useState(700000000000)
    const NovoPedidoModal = document.querySelector('#ModalNovoPedido')


    setTimeout(()=> {
        setSeed(seed -= 1)
    },1000)

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
        {seg < 30 && <p> A página atualizará em <strong>{seg}</strong> segundos</p>}
        </>
        )
}