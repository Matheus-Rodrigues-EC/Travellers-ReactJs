import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Navbar from "./Components/Navbar";
import { Home } from "./Pages/Home";
import { Hosting } from "./Pages/Hosting";
import Viagem from './Assets/Viagem.jpg'
import { useState } from "react";

function App() {

  const [idHotel, setIdHotel] = useState();
  const [idPassagem, setIdPassagem] = useState();

  return (
    <Container Viagem={Viagem}>
      <div>
        <BrowserRouter>
          <Navbar />

          <Routes Routes>
              <Route path="/" element={<Home setIdHotel={setIdHotel} setIdPassagem={setIdPassagem} />} />
              <Route path={`/hotel/${idHotel}`} element={<Hosting idHotel={idHotel} />} />
              <Route path="/passagem/:id" element={<Hosting idPassagem={idPassagem} />} />
          </Routes>
          
        </BrowserRouter>
      </div>
    </Container>
    
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  ::-webkit-scrollbar{
    display: none;
  }
  background-image: url(${Viagem});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
`

export default App;
