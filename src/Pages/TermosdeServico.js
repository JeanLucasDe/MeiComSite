import NavBar from "../components/NavBar";

export default function TermsOfService() {
    return (
    <div> 
        <NavBar/>
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Termos de Serviço</h1>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "24px" }}>Aceitação dos Termos</h2>
            <p>
                Ao utilizar nosso serviço de agenda online, você concorda com os seguintes Termos de Serviço. Caso não concorde,
                solicitamos que não utilize o serviço.
            </p>

            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "24px" }}>Uso do Serviço</h2>

            <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "16px" }}>1. Elegibilidade</h3>
            <ul>
                <li>Você deve ter pelo menos 18 anos de idade para utilizar nosso serviço.</li>
                <li>Menores de idade só podem usar o serviço com consentimento dos responsáveis legais.</li>
            </ul>

            <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "16px" }}>2. Responsabilidades do Usuário</h3>
            <ul>
                <li>Fornecer informações precisas e atualizadas durante o cadastro.</li>
                <li>Manter a confidencialidade de suas credenciais de acesso.</li>
                <li>Não utilizar o serviço para fins ilegais ou não autorizados.</li>
            </ul>

            <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "16px" }}>3. Propriedade Intelectual</h3>
            <p>
                Todos os direitos sobre o design, funcionalidade e conteúdo do serviço são reservados. É proibido copiar,
                modificar ou distribuir qualquer parte do serviço sem nossa autorização prévia.
            </p>

            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "24px" }}>Limitações de Responsabilidade</h2>
            <p>
                Não nos responsabilizamos por danos indiretos, incidentais ou consequenciais decorrentes do uso do serviço.
                A disponibilidade contínua do serviço não é garantida, podendo haver interrupções para manutenção ou atualizações.
            </p>

            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "24px" }}>Cancelamento e Rescisão</h2>
            <p>
                Reservamo-nos o direito de suspender ou encerrar seu acesso ao serviço em caso de violação destes Termos.
            </p>

            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "24px" }}>Alterações nos Termos</h2>
            <p>
                Estes Termos de Serviço podem ser atualizados periodicamente. Notificaremos sobre mudanças significativas por meio
                do nosso site ou por e-mail.
            </p>

            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "24px" }}>Contato</h2>
            <p>
                Se tiver dúvidas ou preocupações sobre estes Termos de Serviço, entre em contato conosco pelo e-mail
                <a href="mailto:suporte@agendaonline.com" style={{ color: "#4f46e5", textDecoration: "none" }}>suporte@agendaonline.com</a>.
            </p>
        </div>
    </div>
    )
}