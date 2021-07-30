import React from 'react';
import './index.css';

import background from '../../assets/bg-pizzaria.png';
import novo from '../../assets/logo-pizarria.png';

export default function Header() {

    return (
        <div className='header'>
                <img className='imagem' src={background}/>
                <div className='logo'>
                    <img className='logo' src={novo}/>
                    <div className='header-text'>
                        <h1>Pizza Pizzaria & Delivery</h1>
                        <p>Logout</p>
                    </div>
                </div>
            </div>
    );
}
