import BoxCriar from "../layouts/layoutsHome/BoxCriar";
import BoxCriarSiteGuia from "../layouts/layoutsHome/BoxCriarSiteGuia";
import BoxModalidade from "../layouts/layoutsHome/BoxModalidades";
import BoxPix from "../layouts/layoutsHome/BoxPix";
import BoxServiços from "../layouts/layoutsHome/boxServiços";
import BoxSuporte from "../layouts/layoutsHome/BoxSuporte";
import BoxTemplates from "../layouts/layoutsHome/BoxTemplates";
import Negocios from "../layouts/layoutsHome/negocios";
import PrincipaisDuvidas from "../layouts/layoutsHome/PrincipaisDuvidas";
import NavBar from "../components/NavBar"
import Footer from "../layouts/layoutsHome/Footer"

export default function Home () {
return (
    <div>
        <NavBar/>
        <Negocios/>
        <BoxServiços/>
        <BoxPix/>
        <BoxCriarSiteGuia/>
        <BoxModalidade/>
        <BoxTemplates/>
        <BoxCriar/>
        <BoxSuporte/>
        <PrincipaisDuvidas/>
        <Footer/>
    </div>    
    )
}