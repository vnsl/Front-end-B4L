import React, { useState, useEffect } from 'react';
import StepperHorizontal from '../../componentes/Stepper';
import Loading from '../../componentes/Loading';

import './index.css';

import useAuth from '../../hook/useAuth';

function Cadastro() {
    const [carregando, setCarregando] = useState(false);

    const { setCategorias } = useAuth();

    async function listarCategorias() {
        setCarregando(true);
        
        const resposta = await fetch('http://localhost:3000/categorias', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          }
        });
        const categorias = await resposta.json();
        
        setCategorias(categorias);
        setCarregando(false);
      };
    
      useEffect(() => {
        listarCategorias();
      }, []);

    return (
        <div className='container-cadastro'>
            {carregando && <Loading/>}
            <div className='caixa'>
                <StepperHorizontal/>
            </div>
        </div>
    )
}

export default Cadastro;