import NavBar from "../components/NavBar";

export default function PrivacyPolicy() {
    return (
    <div> 
        <NavBar/>
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Política de Privacidade</h1>
        <p>
        A sua privacidade é importante para nós. Esta Política de Privacidade explica como coletamos, usamos,
        armazenamos e protegemos suas informações pessoais quando você utiliza nosso serviço de agenda online.
            </p>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "24px" }}>Informações que Coletamos</h2>
            <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "16px" }}>1. Informações Pessoais</h3>
            <ul>
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Número de telefone </li>
                <li>Enderço da empresa </li>
                <li>Data de Nascimento</li>
            </ul>
            <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "16px" }}>2. Informações de Uso</h3>
            <p>Dados sobre como você utiliza nosso serviço, como horários agendados e frequência de uso.</p>
            <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "16px" }}>3. Cookies e Dados de Navegação</h3>
            <p>
                Utilizamos cookies para melhorar sua experiência no site e coletar informações de navegação, como endereço IP
                e tipo de dispositivo.
            </p>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "24px" }}>Como Usamos Suas Informações</h2>
            <ul>
                <li><strong>Gerenciar agendamentos:</strong> Facilitar a organização de compromissos.</li>
                <li><strong>Notificações:</strong> Enviar lembretes sobre seus agendamentos.</li>
                <li><strong>Melhorias no Serviço:</strong> Analisar o uso da plataforma para otimizações futuras.</li>
            </ul>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "24px" }}>Compartilhamento de Informações</h2>
            <p>
                Não compartilhamos suas informações pessoais com terceiros, exceto quando exigido por lei ou com seu consentimento
                explícito.
            </p>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "24px" }}>Armazenamento e Segurança</h2>
            <p>
                As informações coletadas são armazenadas em servidores seguros. Utilizamos criptografia e medidas de segurança
                robustas para proteger seus dados.
            </p>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "24px" }}>Seus Direitos</h2>
            <p>Você tem o direito de:</p>
            <ul>
                <li>Acessar suas informações pessoais.</li>
                <li>Solicitar a exclusão de seus dados.</li>
                <li>Retirar seu consentimento para o uso de suas informações a qualquer momento.</li>
            </ul>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "24px" }}>Alterações nesta Política</h2>
            <p>
                Reservamo-nos o direito de atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças
                significativas por meio do nosso site ou por e-mail.
            </p>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "24px" }}>Contato</h2>
            <p>
                Se tiver dúvidas ou preocupações sobre esta Política de Privacidade, entre em contato conosco pelo e-mail
                <a href="mailto:meicomsite@gmail.com" style={{ color: "#4f46e5", textDecoration: "none" }}>meicomsite@gmail.com</a>.
            </p>
        
        </div>
    </div>
    )
}