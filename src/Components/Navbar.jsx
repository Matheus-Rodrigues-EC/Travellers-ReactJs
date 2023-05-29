import styled from "styled-components";

export default function Navbar(){
    return (
        <Container>
            <Title>Travellers</Title>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 75px;
    background-color: rgb(0, 0, 0, 0.5);
    border: 0.5px solid black;
`

const Title = styled.h1`
    font-family: 'Orbitron', sans-serif;
    font-size: 36px;
    margin: 0 auto 0 auto;
    text-align: center;
    text-align: center;
    color: #FFFFFF;
`