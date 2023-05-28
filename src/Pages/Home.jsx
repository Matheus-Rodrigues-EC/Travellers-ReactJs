import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function Home(props){
    const {setIdHotel, setIdPassagem} = props;
    const [cidades, setCidades] = useState([]);
    const [visible, setVisible] = useState('none');
    const [hoteis, setHoteis] = useState([]);
    const [passagens, setPassagens] = useState([]);

    const Navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/home`)
            .then((res) => {
                if(res.data.length > 0){
                    setCidades(res.data);
                }else{
                    setCidades([]);
                }
            })
            .catch((error) => {
                alert(error.message);
            })
    }, []);

    function buscarDados(busca){
        axios.get(`${process.env.REACT_APP_API_URL}/home/${busca}`)
        .then((res) => {
            if(res.data.Hoteis || res.data.Passagens){
                setHoteis(res.data.Hoteis);
                setPassagens(res.data.Passagens);
                setVisible('flex');
            }else{
                setHoteis([]);
                setPassagens([]);
                setVisible('none');
            }
        })
        .catch((error) => {alert(error.message)})
    }
    
    return(
        <Container>
            <Buscador name="select..." onChange={(e) => {buscarDados(e.target.value)}}>
                <option value={[]}>Escolha o lugar da sua próxima memória...</option>
                {cidades.map((cidade) => {
                    return (
                        <option value={cidade.nome}>
                            {cidade.nome}
                        </option>
                    )
                })}
            </Buscador>
                <Destino visible={visible}>
                    <p>Hoteis</p>
                    <p>Passagens</p>
                </Destino>
            <Listas visible={visible}>
                <Listados>
                    {(hoteis.length) ? (
                        hoteis.map((hotel) => {
                            return(
                                <li key={hotel.id} onClick={() => {setIdHotel(hotel.id); Navigate(`/hotel/${hotel.id}`);}}>
                                    <Infos>
                                        <p>{hotel.nome}</p>
                                    </Infos>
                                    <br/>
                                </li>
                            )
                        })
                    ) : (
                        <li>
                            <Infos>
                                <p>Desculpe <br/>Não encontramos nenhuma Hospedagem cadastrada em nosso sistema para essa cidade</p>
                            </Infos>
                        </li>
                    )}
                </Listados>

                <Listados>
                    {(passagens.length) ? (
                        passagens.map((passagem) => {
                            return(
                                <li key={passagem.id} onClick={() => {
                                        setIdPassagem({id: passagem.id,cidade: passagem.Local_Partida});
                                        Navigate(`/passagem/${passagem.id}`)
                                    }}>
                                    <Infos>
                                        <p>{passagem.Companhia} - {passagem.Preco_passagem}</p>
                                    </Infos>
                                    <br/>
                                </li>
                            )
                        })
                    ) : (
                        <li>
                            <Infos>
                                <p>Desculpe <br/>Ainda não oferecemos serviço de transporte para esta cidade</p>
                            </Infos>
                        </li>
                    )}
                </Listados>
            </Listas>

        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0 5%;
    width: auto;
    height: 100vh;
    box-sizing: border-box;
`

const Buscador = styled.select`
    margin: 15% auto 5% auto;
    width: 70%;
    height: 50px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 24px;
    padding: 8px 15px;

    border-radius: 5px;
    box-sizing: border-box;
`

const Listas = styled.div`
    display: ${(props) => props.visible};
    flex-direction: row;
    margin: 0.5% 0; 

    @keyframes surgir {
        from {
            transform: translateY(10px);
        }
        to {
            transform: translateY(0);
        }
    } 
    animation: surgir 1.5s;
`

const Destino = styled.h2`
    display: ${(props) => props.visible};
    justify-content: space-around;
    color: #FFFFFF;
    p{
        margin: 2.5% 0 0 0;
        font-size: 36px;
        font-family: 'Lexend Deca', sans-serif;
        font-weight: 400;
        text-shadow:    -1px -1px 1.5px #000, 
                        -1px 1px 1.5px #000,                    
                        1px -1px 1.5px #000,                  
                        1px 0px 1.5px #000;
    }

    @keyframes surgir {
        from {
            transform: translateY(10px);
        }
        to {
            transform: translateY(0);
        }
    } 
    animation: surgir 1.5s;
`

const Listados = styled.ul`
    margin: auto;
    padding: 3%;
    box-sizing: border-box;
    width: 45%;
    height: 250px;

    border-radius: 15px;
    border: 1px solid #000000;

    overflow-y: scroll;
    ::-webkit-scrollbar{
        display:none;
    }

    li{
        cursor: pointer;
    }
    list-style-type: none;

    background-color: rgb(0, 0, 0, 0.5);
`

const Infos = styled.div`
    display: flex;
    flex-direction: column;
    p{
        margin: 1%;
        font-family: 'Lexend Deca', sans-serif;
        color: #FFFFFF;
    }
`