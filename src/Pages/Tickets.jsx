import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export function Tickets(props){

    // const {idPassagem} = props;
    const Navigate = useNavigate();
    const [cidade, setCidade] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/passagens`)
        .then((res) => {
            // console.log(idPassagem)
            setCidade(res.data)
        })
        .catch((error) => {
            alert(error.message)
        })
    }, [])


    return (
        
        <Container>
            <Voltar onClick={() => Navigate(-1)}>Voltar</Voltar>
            <List>
                <ul>
                    {(cidade) ? (
                        cidade.map((city) => {
                            return (
                                <li onClick={() => {
                                    alert(city.nome)
                                    // Navigate(`/passagem/${idPassagem}`)
                                    }} >
                                    {city.nome}
                                </li>
                            )
                        })
                        ) : ( 
                        <li>Carregando</li>
                        )}
                </ul>
            </List>
        </Container>
        
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5% 0 0 0;
    padding: 0 5%;
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

const List = styled.ul`
    margin:  5% auto;
    padding: 3%;
    box-sizing: border-box;
    width: 95%;
    height: 75%;

    border-radius: 15px;
    border: 1px solid #000000;

    overflow-y: scroll;
    ::-webkit-scrollbar{
        display:none;
    }
    color: #FFFFFF;

    li{
        cursor: pointer;
        padding: 0 5%;
        margin: 2.5% 0;
        font-size: 18px;
        font-family: 'Lexend Deca', sans-serif;
        font-weight: 400;
    }
    list-style-type: none;

    background-color: rgb(0, 0, 0, 0.5);
    transition: 1s;
    :hover{
        background-color: rgb(0, 0, 0, 0.75);
        transition: 1s;
    }
`