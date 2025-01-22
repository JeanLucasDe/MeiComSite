import styles from "./FormularioPlano.module.css"
import {useOutletContext} from "react-router-dom"
import moment from "moment/moment"

const FormularioPlano = () => {

  const [mod, produtos, usuario, vendas, user,agenda, servicos] = useOutletContext()

  const {data,tempodecasa} = usuario && usuario[0]

  const planoAtual = {
    nome: "Plano Único",
    preco: 19.99,
    periodo: "mensal",
  };
  
  const beneficios = [
    "Agendamento básico",
    "Suporte por e-mail ou Whatsapp",
    "Serviços ilimitados",
    "Todos os temas disponíveis",
  ];
  
  const handleTrocarPlano = () => {
    alert("Redirecionando para a página de troca de plano...");
  };

  const calcularProximaDataPagamento = (data) => {
    const dataInicio = new Date(data); // Data de entrada
    const dataAtual = new Date(); // Data atual
    const doisMesesDepois = new Date(dataInicio);
    doisMesesDepois.setMonth(dataInicio.getMonth() + 2); // Data de término do primeiro mês grátis

    if (dataAtual < doisMesesDepois) {
      // Está no período gratuito
      return {
        mensagem: "Você está no período de primeiro mês grátis!",
        proximaData: doisMesesDepois.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }),
      };
    } else {
      // Cobrança normal
      const proximaData = new Date(dataAtual);
      proximaData.setMonth(dataAtual.getMonth() + 1);
      return {
        mensagem: "Próxima data de pagamento",
        proximaData: proximaData.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }),
      };
    }
  };

  const { mensagem, proximaData } = calcularProximaDataPagamento(data);


    return (
      <div className={styles.plano_container}>
        <div className={styles.box_pagamento}>
          <h4>{mensagem}</h4>
          <p>Próximo Pagamento:</p>
          <strong>{proximaData}</strong>
        </div>
        <div className={styles.plano_atual}>
          <h3>Seu Plano Atual</h3>
          <p className={styles.plano_nome}>{planoAtual.nome}</p>
          <p className={styles.plano_preco}>
            R$ {planoAtual.preco.toFixed(2)} / {planoAtual.periodo}
          </p>
        </div>
        
        <div className={styles.beneficios}>
          <h4>O que está incluso no seu plano:</h4>
          <ul>
            {beneficios.map((beneficio, index) => (
              <li key={index}>{beneficio}</li>
            ))}
          </ul>
        </div>
        <div className={styles.pagamento}>
          <h4>Como funciona o pagamento?</h4>
          <p>
          O pagamento será realizado via boletos enviados diretamente para o seu número de WhatsApp. 
          Certifique-se de manter o contato atualizado. O boleto será enviado 3 dias antes da data de vencimento.
          </p>
        </div>
      </div>
    );
  };
  
  export default FormularioPlano;