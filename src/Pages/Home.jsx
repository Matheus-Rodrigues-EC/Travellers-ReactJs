import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// import cidade1 from '../Assets/cidades/1.jpg';
import cidade2 from '../Assets/cidades/2.jpg';
import cidade3 from '../Assets/cidades/3.jpg';

// const cidades = [cidade1, cidade2, cidade3];

export function Home(props){
    const {setIdHotel, setIdPassagem} = props;
    const [cidades, setCidades] = useState([]);
    const [visible, setVisible] = useState('none');
    const [opc, setOpc] = useState('flex');
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
    }, [hoteis, passagens]);

    function buscarDados(busca){
        axios.get(`${process.env.REACT_APP_API_URL}/home/${busca}`)
        .then((res) => {
            if(res.data.Hoteis || res.data.Passagens){
                setHoteis(res.data.Hoteis);
                setPassagens(res.data.Passagens);
                setVisible('flex');
                setOpc('none');
            }else{
                setHoteis([]);
                setPassagens([]);
                setVisible('none');
                setOpc('flex');
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

            <Opc opc={opc} >
                <Seletor onClick={() => Navigate('/passagens')} >
                    <img src={cidade2} alt="imagens de cidades" />
                    <h3>Escolha como chegar nos seus sonhos.</h3>
                    <h3>Com preços e datas</h3>
                </Seletor>
                <Seletor onClick={() => Navigate('/hoteis')} >
                    <img src={cidade3} alt="imagens de cidades" />
                    <h3>Escolha sua estadia no paraíso.</h3>
                    <h3>Veja nossas acomodações</h3>
                </Seletor>
            </Opc>

        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 50px 0 0 0;
    padding: 0 5%;
    width: auto;
    height: 100vh;
    box-sizing: border-box;
`

const Buscador = styled.select`
    margin: 100px auto 0 auto;
    width: 70%;
    height: 50px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 24px;
    padding: 8px 15px;

    border-radius: 5px;
    box-sizing: border-box;
    animation: surgir 1.5s;

`

const Listas = styled.div`
    display: ${(props) => props.visible};
    flex-direction: row;
    margin: 0.5% 0; 

    @keyframes surgir {
        from {
            transform: translateY(10px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
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
    transition: 1s;
    cursor: pointer;
    :hover{
        background-color: rgb(0, 0, 0, 0.75);
        transition: 1s;
    }
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

const Opc = styled.div`
    display: ${(props) => props.opc};
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin: 0;
    padding: 0 0 10% 0;
    
    @keyframes surgir {
        from {
            transform: translateY(10px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    } 
    animation: surgir 1.5s;
`

const  Seletor = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5% 0; 
    width: 350px;
    height: 350px;
    border-radius: 15px;
    border: 1px solid #000000;
    background-color: rgb(0, 0, 0, 0.5);
    transition: 1s;
    cursor: pointer;
    box-sizing: border-box;
    :hover{
        background-color: rgb(0, 0, 0, 0.75);
        transition: 1s;
    }

    img {
        width: 90%;
        height: fit-content;
        margin: 5% auto;

        border-radius: 15px;
    }

    h3 {
        text-align: center;
        color: #FFFFFF;
        padding: 0 5%;

        font-size: 18px;
        font-family: 'Lexend Deca', sans-serif;
        font-weight: 400;
    }
`