import React from 'react';
import StepperHorizontal from '../../componentes/Stepper';
import { useForm } from 'react-hook-form';

import './index.css';

function Cadastro() {
    const { register, handleSubmit } = useForm();

    return (
        <div className='container-cadastro'>
            <div className='caixa'>
                <h1>Cadastro</h1>
                {/* <StepperHorizontal register={register} /> */}

            </div>

        </div>
    )
}

export default Cadastro;