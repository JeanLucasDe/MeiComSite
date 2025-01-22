import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './Casa.module.css';
import logo from "../imagens/logo.png"
import calendario from "../imagens/calendario.png"
import brilhante from "../imagens/brilhante.png"
import padrao from "../imagens/padrao.png"
import {Link} from "react-router-dom"
import {FaCalendar, FaCalendarAlt, FaCalendarCheck, FaCheckCircle, FaClock, FaRegCheckCircle, FaTimes, FaWhatsapp} from "react-icons/fa"
import {auth} from "../Service/firebase"
import NavBar from '../components/NavBar';

function Casa() {

    const [user, setUser] = useState();

    useEffect(() => {
        AOS.init();
        try{
            auth.onAuthStateChanged(user => {
                if (user) {
                    const {uid, displayName, photoURL, email} = user
                    setUser({
                        id: uid,
                        avatar: photoURL ? photoURL : '',
                        name: displayName ? displayName : '',
                        email
                    })
                }
            })
        } catch (e) {
            <button> tentar novamente </button>
        }
    }, []);

  
  return (
    <div className={styles.appContainer}>
      <NavBar/>

      <header className={`bg-primary text-white text-center py-5 ${styles.header}`}>
        <div className="container">
            <h1 className={styles.title}>Bem-vindo à Mei Com Site</h1>
            <p>Facilitando seus agendamentos de forma prática e eficiente</p>
            <Link className={styles.button} to="/perfil/user/config">Comece Agora!</Link>
        </div>
      </header>
        <div className={styles.aboutUs}>
            <h3>Quem Somos?</h3>
            <p>MeiComSite é uma iniciativa privada que tem como objetivo promover o seu negócio dando a ele uma presença online. Acreditamos no novo e investindo em tecnologia, você pode ir muito além.</p>
        </div>

      <section className={`container mt-5 ${styles.servicesSection}`} data-aos="fade-up">
        <h2 className={`${styles.title} text-center`}>Nossos Serviços</h2>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className={`card ${styles.serviceCard}`}>
              <div className={`${styles.info} card-body`}>
                    <div>
                        <FaCalendarCheck className={styles.icon}/>
                    </div>
                    <div>
                        <h5 className="card-title">Agendamentos</h5>
                        <p className="card-text">Organize seus horários e facilite sua vida.</p>
                    </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`card ${styles.serviceCard}`}>
                <div className={`${styles.info} card-body`}>
                    <div>
                        <FaClock className={styles.icon}/>
                    </div>
                    <div>
                        <h5 className="card-title">Relatórios</h5>
                        <p className="card-text">Acompanhe suas finanças em tempo real</p>
                    </div>
                </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`card ${styles.serviceCard}`}>
              <div className={`${styles.info} card-body`}>
                <div>
                    <FaWhatsapp className={styles.icon}/>
                </div>
                <div>
                    <h5 className="card-title">Integração</h5>
                    <p className="card-text">Receba seus agendamentos por Whatsapp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`container mt-5 ${styles.themesSection}`} data-aos="fade-up">
  <h2 className={`${styles.title} text-center`}>Escolha Seu Tema</h2>
  <p className="text-center mb-4">Temos três temas exclusivos e personalizáveis para você escolher, garantindo que o seu painel se adapte ao seu estilo e preferências!</p>
  <div className="row mt-4">
    {/* Tema Claro */}
    <div className="col-md-4">
      <div className={`${styles.themeCard}`}>
        <img src={calendario} alt="Tema Claro" className="card-img-top" />
        <div className="card-body">
          <h5 className={`${styles.title_card} card-title`}>Tema Calendário</h5>
          <p className="card-text">Para quem busca mais praticidade</p>
        </div>
      </div>
    </div>

    {/* Tema Escuro */}
    <div className="col-md-4">
      <div className={`${styles.themeCard}`}>
        <img src={brilhante} alt="Tema Escuro" className="card-img-top" />
        <div className="card-body">
          <h5 className={`${styles.title_card} card-title`}>Tema Brilhante</h5>
          <p className="card-text">Para quem quer falar um pouco mais de si</p>
        </div>
      </div>
    </div>

    {/* Tema Colorido */}
    <div className="col-md-4">
      <div className={`${styles.themeCard}`}>
        <img src={padrao} alt="Tema Colorido" className="card-img-top" />
        <div className="card-body">
          <h5 className={`${styles.title_card} card-title`}>Tema Padrão</h5>
          <p className="card-text">Design moderno, objetivo e rápido</p>
        </div>
      </div>
    </div>
  </div>
</section>
      <section className={styles.plansSection}>
        <h2 className="text-center">Planos</h2>
            {/* Plano Básico */}
            <div className={styles.planCard}>
                <div className="card-body text-center">
                <h3 className={styles.cardTitle}>Plano Único</h3>
                <p className={styles.obs}>(temporariamente)</p>
                <p className={styles.price}>R$19,99/mês</p>
                <ul className={styles.benefitsList}>
                    <li><FaRegCheckCircle/> Agendamento básico</li>
                    <li><FaRegCheckCircle/> Suporte por e-mail ou Whatsapp</li>
                    <li><FaRegCheckCircle/> Serviços ilimitados</li>
                    <li><FaRegCheckCircle/> Todos os temas disponíveis</li>
                </ul>
                <Link className={`${styles.button} btn btn-primary`} to="perfil/user/planos">Escolhido</Link>
                </div>
        </div>
        </section>

      <section className={`container mt-5 ${styles.testimonialsSection}`} data-aos="fade-up">
        <h2 className="text-center">Principais Dúvidas</h2>
        <div className="row mt-4">
          <div className="col-md-6">
            <div className={styles.testimonialCard}>
                <p>Como eu crio meu Site?</p>
                <p>"Preencha o formulário de cadastro, comece a adicionar seus serviços e abra sua agenda."</p>
                <footer>João Silva</footer>
            </div>
          </div>
          <div className="col-md-6">
            <div className={styles.testimonialCard}>
                <p>Porque a MeiComSite?</p>
                <p>"Oferecemos um serviço completo, humano e transparente com nossos clientes. Nosso objetivo é que seu negócio seja visto com mais facilidade aumentando assim, seus lucros. Nosso sistema de administração irá te ajudar a controlar gastos e visualizar seus lucros"</p>
                <footer>Maria Oliveira</footer>
            </div>
          </div>
        </div>
      </section>


      <footer className={`bg-light text-center py-4 ${styles.footer}`} data-aos="fade-up">
        <div className="container">
          <p>&copy; 2025 Mei Com Site. Todos os direitos reservados.</p>
          <p>
            <a href="#" className="text-decoration-none mx-2">Política de Privacidade</a>
            <a href="#" className="text-decoration-none mx-2">Termos de Serviço</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Casa;
