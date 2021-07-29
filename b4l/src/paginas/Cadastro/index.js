import React from 'react';
import StepperHorizontal from '../../componentes/Stepper';
import { useForm } from 'react-hook-form';

import './index.css';

function Cadastro() {
    const { handleSubmit } = useForm();

    return (
        <div className='container-cadastro'>
            <div className='caixa'>
                <StepperHorizontal/>
            </div>

        </div>
    )
}

export default Cadastro;