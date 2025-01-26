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
import Agenda from "./Formularios/Cliente/Agenda";
import Servicos from "./AreaCliente/layouts/Agenda/P.Serviço/Servicos";
import Relatório from "./Formularios/Cliente/Relatório";
import FormularioHorario from "./Formularios/Cliente/FormularioHorario";
import FormularioEmpresa from "./Formularios/Cliente/FormularioEmpresa";
import FormularioClientes from "./Formularios/Cliente/FormularioClientes";
import FormularioTheme from "./Formularios/Cliente/FormularioTheme";
import FormularioPainel from "./Formularios/Cliente/FormularioPainel";
import FormularioConsultas from "./Formularios/Cliente/FormularioConsultas";
import Casa from "./Pages/Casa";
import FormularioPlano from "./Formularios/Cliente/FormularioPlano";
import PrivacyPolicy from "./Pages/Politicadeprivacidade";
import TermsOfService from "./Pages/TermosdeServico";


function App() {

  return (
      <Router>
        <Container>
            <Routes>
              <Route path="/" element={<Casa/>}/>
              <Route path="/record" element={<Gravação/>}/>
              <Route path="/politica" element={<PrivacyPolicy/>}/>
              <Route path="/termosdeservico" element={<TermsOfService/>}/>
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
                <Route path="/perfil/user/servicos" element={<Servicos/>}/>
                <Route path="/perfil/user/agenda" element={<Agenda/>}/>
                <Route path="/perfil/user/online" element={<Online/>}/>
                <Route path="/perfil/user/categorias/:categoriaa" element={<Produtos/>}/>
                <Route path="/perfil/user/config" element={<FormularioEdit/>}/>
                <Route path="/perfil/user/horarios" element={<FormularioHorario/>}/>
                <Route path="/perfil/user/empresa" element={<FormularioEmpresa/>}/>
                <Route path="/perfil/user/temas" element={<FormularioTheme/>}/>
                <Route path="/perfil/user/painel" element={<FormularioPainel/>}/>
                <Route path="/perfil/user/clientes" element={<FormularioClientes/>}/>
                <Route path="/perfil/user/planos" element={<FormularioPlano/>}/>
                <Route path="/perfil/user/consultas" element={<FormularioConsultas/>}/>
                <Route path="/perfil/user/relatorio" element={<Relatório/>}/>
                <Route path="/perfil/user/vendas" element={<Vendas/>}>
                    <Route index element={<FiltroVendas/>}/>
                </Route>

              </Route>




              <Route path="/:site" element={<HomeCliente/>}>
                <Route index element={<MarketHome/>}/>
                <Route path="/:site/:id/:idproduto" element={<Categorias/>}/>
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
