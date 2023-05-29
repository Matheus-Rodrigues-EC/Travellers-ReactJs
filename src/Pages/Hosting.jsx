import axios from "axios";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function Hosting(props){
    
    const {idHotel} = props;
    const [hotel, setHotel] = useState([]);
    const Navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/hotel/${idHotel}`, {
            headers: {
                nome: idHotel
            }
        })
            .then((res) => {
                setHotel(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                alert(error.message);
            })

    }, [idHotel]);

    
    return(
        <Container>
            <Voltar onClick={() => Navigate(-1)}>Voltar</Voltar>
            <Title>{hotel.Dados ? (hotel.Dados[0].nome) : "Carregando..."}</Title>
            <Slide id="slide">
                <button id="tras" onClick={() => null} > {`<<`} </button>
                <ul>
                    {(hotel.Fotos) ? (
                        (hotel.Fotos.length > 0) ? (
                            hotel.Fotos.map((url) => {
                                return (
                                    <li>
                                        <img src={url.foto} alt="foto do hotel" />
                                    </li>
                                )
                            })
                        ) : (<li>Nenhuma foto encontrada</li>)
                    ) : (
                        <li>Carregando...</li>
                    )}
                    
                </ul>
                <button id="frente" onClick={() => null}> {`>>`} </button>
            </Slide>

            <Infos>
                <Detalhes>
                    <h2>Caracteristicas</h2>
                    <ul>
                        {(hotel.Dados) ? (
                            <>
                                <li>{hotel.Dados[0].endereco}</li>
                                <li>Diárias a partir de: R${Number(hotel.Dados[0].diaria).toFixed(2)}</li>
                                <li>{hotel.Dados[0].descricao}</li>
                            </>
                        ) : (
                            <li>Carregando...</li>
                        )}
                    </ul>
                </Detalhes>

                <Detalhes>
                    <h2>Comodidades</h2>
                    <ul>
                        {(hotel.Comodidades) ? (
                            (hotel.Comodidades.length === 0) ? (
                                <li>Nenhuma comodidade está disponível nesta hospedagem</li>
                            ) : (
                                hotel.Comodidades.map((comod) => {
                                    return (
                                        <li>{comod.comodidade}</li>
                                    )
                                })
                            )
                        ) : (
                            <li>Carregando...</li>
                        )}
                    </ul>
                </Detalhes>
            </Infos>
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
    margin: 100px auto 2.5% auto;
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

const Slide = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 25%;
    padding: 0 5%;
    border: 1px solid #000000;
    background-color: rgb(0, 0, 0, 0.5);
    transition: 1s;
    cursor: pointer;
    :hover{
        background-color: rgb(0, 0, 0, 0.75);
        transition: 1s;
    }
    box-sizing: border-box;
    justify-content: space-around;

    button{
        border: none;
        background-color: rgb(0, 0, 0, 0.6);
        color: #FFFFFF;
        font-size: 24px;
        margin: 0 2.5%;
    }
    ul{
        list-style: none;
        
        display: inherit;
        justify-content: left;
        position: sticky;
        padding: 0;
        overflow-y: scroll;
        ::-webkit-scrollbar{
            display: none;
        }
        width: 80%;
        box-sizing: border-box;
        li{
            box-sizing: border-box;
            display: flex;
            align-items: center;
            width: 250px;
            margin: 0 5px;
            color: #FFFFFF;
            font-family: 'Lexend Deca', sans-serif;
            font-weight: 400;
            img{
                width: fit-content;
                height: 95%;
                border: 1px solid #eee;
            }
        }
    }

`

const Infos = styled.div`
    display: flex;
    flex-direction: row;
    margin: auto;
    width: 90%;
    height: 30%;
    justify-content: space-around;
    box-sizing: border-box;
`

const Detalhes = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1%;
    width: 45%;
    height: 100%;

    color: #FFFFFF;
    border: 1px solid #000000;
    border-radius: 15px;
    background-color: rgb(0, 0, 0, 0.5);
    transition: 1s;
    cursor: pointer;
    :hover{
        background-color: rgb(0, 0, 0, 0.75);
        transition: 1s;
    }
    box-sizing: border-box;
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;

    h2{
        margin: 1% auto;
        font-size: 18px;
    }
    ul{
        padding: 0 10% ;
        box-sizing: border-box;
        overflow-x: scroll;

        ::-webkit-scrollbar{
            display: none;
        }
    }
    li{
        margin: 1.5% 0;
        font-size: 14px;
        box-sizing: border-box;
    }
`