import Home from "./Pages/Home"
import Suporte from "./Pages/Suporte";
import Container from "./components/Container"
import Response from "./layouts/layoutsSuporte/Response";
import ControlSuporte from "./layouts/layoutsSuporte/ControlSuporte";
import PlanosPreços from "./Pages/PlanosPreços"
import Perfil from "./Pages/Perfil"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import FormularioEdit from "./Formularios/Cliente/FormularioEdit";
import FormularioCadastro from "./Formularios/Cadastro/FormularioCadastro";
import Produto from "./AreaCliente/components/Produto";
import HomeCliente from "./AreaCliente/HomeCliente"
import CategoriasProdutos from "./Formularios/Cliente/Categorias"
import MarketHome from "./AreaCliente/components/MarketHome";
import Catalogo from "./Pages/Catálogo";
import Categorias from "./AreaCliente/components/Categorias";
import Carrinho from "./AreaCliente/components/Carrinho";
import ItensSacola from "./AreaCliente/components/ItensSacola";
import FormularioDetalhesComprador from "./AreaCliente/Formularios/FormularioDetalhesComprador"
import Vendas from "./Formularios/Cliente/Vendas";
import Produtos from "./Formularios/Cliente/Produtos";
import Fotos from "./Duvidas/Fotos";
import Pagamentos from "./Duvidas/Pagamentos";
import ComoComeçar from "./Duvidas/ComoComeçar";
import Politica from "./Duvidas/PoliticadePrivacidade";
import Gravação from "./Gravação";
import FiltroVendas from "./Formularios/Cliente/FiltroVendas";
import AreaTeste from "./AreaTesteCliente/AreaTeste";
import Online from "./Formularios/Cliente/Online";
import Login from "./Pages/Login"
import Register from "./Pages/Register";
import PageDemonstração from "./Pages/PageDemonstrationWpp";
import View_pedido from "./Pages/View_pedido";
import Box_Pedido from "./Pages/Box_Pedido";
import Box_idLoja from "./Pages/Box_idLoja";
import EntregaPedido from "./Pages/EntregaPedido";



function App() {
  return (
      <Router>
        <Container>
            <Routes>
              
              <Route path="/" element={<Home/>}/>
              <Route path="/record" element={<Gravação/>}/>

              <Route path="suporte" element={<Suporte/>}>
                <Route index element={<ControlSuporte/>}/>
                <Route path="/suporte/:query" element={<Response/>}/>
                <Route path="/suporte/fotos" element={<Fotos/>}/>
                <Route path="/suporte/pagamentos" element={<Pagamentos/>}/>
                <Route path="/suporte/passos" element={<ComoComeçar/>}/>
                <Route path="/suporte/politica" element={<Politica/>}/>
              </Route>
              
              <Route path="/entregas" element={<View_pedido/>}>
                <Route index element={<Box_idLoja/>}/>
                <Route path='/entregas/:loja' element={<Box_Pedido/>}/>
                <Route path='/entregas/:loja/:pedido' element={<EntregaPedido/>}/>
              </Route>


              <Route path="/planos" element={<PlanosPreços/>}/>
              <Route path="/:site/testarea" element={<AreaTeste/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              
              <Route path="/cadastro" element={<FormularioCadastro/>}/>
              <Route path="/page/demo" element={<PageDemonstração/>}/>

              <Route path="perfil" element={<Perfil/>}>
                <Route path="/perfil/user/categorias" element={<CategoriasProdutos/>}/>
                <Route path="/perfil/user/online" element={<Online/>}/>
                <Route path="/perfil/user/categorias/:categoriaa" element={<Produtos/>}/>
                <Route path="/perfil/user/config" element={<FormularioEdit/>}/>
                <Route path="/perfil/user/vendas" element={<Vendas/>}>
                    <Route index element={<FiltroVendas/>}/>
                </Route>

              </Route>

              <Route path="/catalogo/:modalidade" element={<Catalogo/>}/>



              <Route path="/:site" element={<HomeCliente/>}>
                <Route index element={<MarketHome/>}/>
                <Route path="/:site/:categoria" element={<Categorias/>}/>
                <Route path="/:site/compras" element={<Carrinho/>}>
                  <Route index element={<ItensSacola/>}/>
                  <Route path="/:site/compras/detalhes" element={<FormularioDetalhesComprador/>}/>
                </Route>

                <Route path="/:site/:categoria/:nome" element={<Produto/>}/>

              </Route>
            </Routes>
        </Container>
      </Router>
    
  );
}

export default App;
