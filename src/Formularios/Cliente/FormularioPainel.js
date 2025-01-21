import styles from "./FormularioEdit.module.css"
import { Box, Grid, Paper, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Link, useOutletContext } from "react-router-dom"
import Loading from "../../components/Loading"

export default function FormularioPainel () {

    const [mod, produtos, usuario, vendas, user,agenda, servicos] = useOutletContext()

    const consultas = agenda && agenda.filter(agenda => {
        return (
            agenda.agenda.filter(dados => {
                if (dados.nome) {
                    return dados
                }
            })
        )
    }) 
    const clientes = 
    agenda &&
    agenda
    .flatMap(agenda => 
    agenda.agenda.filter(dados => dados.nome) // Filtra apenas objetos com "nome"
    )
    .reduce((acc, item) => {
    if (item.nome) {
        acc[item.nome] = (acc[item.nome] || 0) + 1; // Conta as ocorrências de cada nome
    }
    return acc;
    }, {});

    const clientesLista = clientes && Object.entries(clientes).map(([nome, count]) => ({ nome, count }));




    
const data = [
    { month: "Janeiro",numero:1},
    { month: "Fevereiro" ,numero:2},
    { month: "Março" ,numero:3},
    { month: "Abril",numero:4},
    { month: "Maio" ,numero:5},
    { month: "Junho" ,numero:6},
    { month: "Julho" ,numero:7},
    { month: "Agosto" ,numero:8},
    { month: "Setembro" ,numero:9},
    { month: "Outubro" ,numero:10},
    { month: "Novembro" ,numero:11},
    { month: "Dezembro" ,numero:12},
    ];

    

    const resultado = agenda.length > 0 && data.map(mes => {
        // Filtra as datas para o mês correspondente
        const values = agenda.filter(data => {
          const mesData = new Date(data.date).getMonth() + 1; // Obtém o número do mês
          return mesData == mes.numero;
        });
      
        // Soma os valores das datas desse mês
        const totalValue = values.reduce((acc, item) => {

            const idsContados = new Set(); // Usado para controlar os ids já somados
            // Soma os valores do próprio item da agenda (se estiver na lista de datas)
            const agendaValue = item.agenda.reduce((sum, agendaItem) => {
            if (!agendaItem.disp && !idsContados.has(agendaItem.id)) {
                // Se o horário não está disponível e o id ainda não foi contado
                idsContados.add(agendaItem.id); // Marca o id como contado
                return sum + agendaItem.valor > 0 && parseInt(agendaItem.valor); // Soma o valor
            }
            return sum;
            }, 0);
            // Retorna o valor total somado
            return acc + agendaValue;
        }, 0);
      
        // Retorna o mês com o total de valores somados e as datas filtradas
        return { ...mes, total: totalValue, values };
      });
      
    



    return (
        <>


        <div className={styles.box_infos}>
            <div className={`${styles.consultas} ${styles.info}`}>
                <h5>Consultas</h5>
                <h5>{consultas.length}</h5>
            </div>
            <div className={`${styles.servicos} ${styles.info}`}>
                <h5>Serviços</h5>
                <h5>{servicos.length}</h5>
            </div>
            <div className={`${styles.clientes} ${styles.info}`}>
                <h5>Clientes</h5>
                <h5>{clientesLista.length}</h5>
            </div>
        </div>
        <Box sx={{ padding: "20px", minHeight: "100vh" }}>
            {/* Gráfico com rolagem horizontal */}
            <Paper elevation={3} sx={{ padding: "20px", borderRadius: "10px" }}>
                <Typography variant="h6" marginBottom={2}>
                Desempenho Anual
                </Typography>
                <Box sx={{ overflowX: "auto" }}>
                <Box sx={{ minWidth: "800px" }}>
                    <BarChart width={1200} height={400} data={resultado}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#FF9100" />
                    </BarChart>
                </Box>
                </Box>
            </Paper>
        </Box>
        
        </>
    )
}