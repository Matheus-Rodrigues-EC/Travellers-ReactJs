import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function Ticket(props){
    
    const {idPassagem} = props;
    const [ticket, setTicket] = useState();
    const Navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/passagem/${idPassagem.id}`, {
            headers: {
                id: idPassagem.id,
                cidade: idPassagem.cidade
            }
        })
            .then((res) => {
                console.log(res.data.Passagem)
                console.log(idPassagem)
                setTicket(res.data);
            })
            .catch((error) => {
                alert(error.message);
            })

    }, [idPassagem, setTicket]);

    
    return(
        <Container>
            <Voltar onClick={() => Navigate(-1)}>Voltar</Voltar>
            <Title>Passagem para {(ticket) ? (ticket.Destino.nome) : ('...')} </Title>
            <Detalhes>
                <h2>Informações</h2>
                <ul>
                    {(ticket) ? (
                        <>
                            <li>
                                Cidade de Destino:<span>{ticket.Destino.nome}</span>
                            </li>
                            <li>
                                Cidade de Origem: <span>{idPassagem.cidade}</span>
                            </li>
                            <li>
                                Companhia Aérea: <span>{ticket.Passagem.Companhia}</span>
                            </li>
                            <li>
                                Horário de partida: <span>{ticket.Passagem.Hora_saida}</span>
                            </li>
                            <li>
                                Horário previsto de chegada: <span>{ticket.Passagem.Hora_prevista_chegada}</span>
                            </li>
                            <li>
                                Preço da passagem: <span>R${Number(ticket.Passagem.Preco_passagem).toFixed(2)}</span>
                            </li>
                        </>
                    ) : (
                    <li>Carregando...</li>
                    )}
                </ul>
            </Detalhes>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    width: auto;
    height: 100vh;
    box-sizing: border-box;
    
`

const Voltar = styled.h2`
    color: #FFFFFF;
    position: absolute;
    top: -1%;
    right: 1%;
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;

    cursor: pointer;
`

const Title = styled.h1`
    margin: 20% auto 2.5% auto;
    color: #FFFFFF;
    text-shadow:    -1px -1px 1.5px #000, 
                        -1px 1px 1.5px #000,                    
                        1px -1px 1.5px #000,                  
                        1px 0px 1.5px #000;
    box-sizing: border-box;
    
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 30px;
`

const Detalhes = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1%;
    width: 80%;
    height: auto;
    margin: 5% auto 15% auto;

    color: #FFFFFF;
    border: 1px solid #000000;
    border-radius: 15px;
    background-color: rgb(0, 0, 0, 0.5);
    box-sizing: border-box;
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;

    h2{
        margin: 1% auto;
        font-size: 18px;
    }
    li{
        margin: 1.5% 0;
        display: flex;
        margin: 1% auto;
        font-size: 14px;
        box-sizing: border-box;
        span{
            margin: 0 10% 0 auto; 
        }
    }
`