import './School.css'
import { FaSchool } from "react-icons/fa";
import logo from "../../../../imagens/vilarte.png"

export default function School () {
    return (
        <div className='cont'>
            <header className="header">
                <div className="container header_container">
                    <div>
                        <div className="contact_info">
                            <p>📞 (71) 99999-1234</p>
                        </div>
                        <h1><img src={logo} className='logo'/>Vilarte Kids</h1>
                    </div>
                    <nav className="nav">
                        <ul>
                            <li><a href="#about">Sobre</a></li>
                            <li><a href="#structure">Estrutura</a></li>
                            <li><a href="#programs">Programas</a></li>
                            <li><a href="#contact">Contato</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main>
            <section id="about" className="about">
                <div className="container">
                    <div className="intro">
                        <h2 className="title">Bem-vindo à Vilarte Kids</h2>
                        <p className="desc">
                            Somos uma escola inovadora, focada no desenvolvimento integral das crianças, oferecendo experiências
                            enriquecedoras que preparam nossos alunos para o futuro.
                        </p>
                        <a href="#contact" className="cta-button">Entre em contato</a>
                    </div>
                </div>
            </section>

                <section id="structure" className="structure">
                    <div className="container">
                        <h2>Estrutura</h2>
                        <p className='desc'>Nossa escola conta com espaços modernos e seguros, especialmente planejados para o aprendizado e diversão das crianças.</p>
                        <div className="images">
                            <img src="https://img.freepik.com/fotos-gratis/designers-usando-uma-impressora-3d_23-2151037104.jpg?ga=GA1.1.1918771653.1726187012&semt=ais_tags_boosted" alt="Sala de aula colorida" />
                            <img src="https://img.freepik.com/fotos-gratis/menina-com-camisa-cor-de-rosa-sentar-se-grama_23-2148267990.jpg?ga=GA1.1.1918771653.1726187012&semt=ais_tags_boosted" alt="Parquinho ao ar livre" />
                        </div>
                    </div>
                </section>

                <section className="programs">
        <div className="container">
            <h2>Programas Disponíveis</h2>
            <p>Confira os programas incríveis que temos para você. Escolha o seu e saiba mais!</p>
            <div className="programs-grid">
                <div className="program-card">
                    <img src="https://img.freepik.com/fotos-gratis/pai-de-tiro-medio-e-filho-em-casa_23-2150171988.jpg?ga=GA1.1.1918771653.1726187012&semt=ais_tags_boosted" alt="Programa 1"/>
                    <h3>Jogos e Atividades Pedagógicas para Crianças</h3>
                    <p>Este programa foca em criar experiências divertidas que estimulam a criatividade, habilidades motoras e aprendizado emocional das crianças, contribuindo para um ensino mais eficaz e divertido.</p>
                    <a href="#" className="learn-more">Saiba mais</a>
                </div>
                <div className="program-card">
                    <img src="https://img.freepik.com/fotos-gratis/mae-irreconhecivel-e-filha-fazendo-guirlanda_23-2147760629.jpg?ga=GA1.1.1918771653.1726187012&semt=ais_tags_boosted" alt="Programa 2"/>
                    <h3>Desenvolvimento Cognitivo na Primeira Infância</h3>
                    <p>Este programa aborda estratégias para estimular a memória, atenção, resolução de problemas e habilidades de pensamento crítico, essenciais para o crescimento intelectual e emocional das crianças.</p>
                    <a href="#" className="learn-more">Saiba mais</a>
                </div>
                <div className="program-card">
                    <img src="https://img.freepik.com/fotos-gratis/imagem-de-linda-garota-com-cabelo-ruivo-comprido-lendo-um-livro-interessante-envolvido-na-educacao_171337-299.jpg?ga=GA1.1.1918771653.1726187012&semt=ais_tags_boosted" alt="Programa 3"/>
                    <h3>Alfabetização e Letramento Infantil</h3>
                    <p>Focado no processo de alfabetização, você aprenderá métodos eficazes para ensinar as primeiras palavras e frases, ajudando a construir uma base sólida para a aprendizagem futura.</p>
                    <a href="#" className="learn-more">Saiba mais</a>
                </div>
            </div>
        </div>
    </section>

                <section id="contact" className="contact">
                    <div className="container">
                        <h2>Contato</h2>
                        <p className='desc'>Entre em contato conosco para saber mais ou agendar uma visita!</p>
                        <address>
                            <p>Email: contato@vilartekids.com.br</p>
                            <p>Telefone: (71) 2109-6736</p>
                        </address>
                    </div>
                </section>

                <section id="location" className="location">
                    <div className="container">
                        <h2>Localização</h2>
                        <p>Venha nos visitar! Estamos localizados em:</p>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31693.844559051934!2d-38.501136983365336!3d-12.971598960850585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7161acdb722dd1f%3A0x505030c9c60a8d1e!2sSalvador%2C%20BA%2C%20Brazil!5e0!3m2!1sen!2sus!4v1615347739813!5m2!1sen!2sus"
                            width="100%"
                            height="350"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Localização"
                        ></iframe>
                    </div>
                </section>
            </main>

            

            <footer className="footer">
                <div className="container">
                    <p>&copy; 2025 Vilarte Kids. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    )
}