import { useState } from 'react';
import { useLocalStorage } from 'react-use';

export default function useAuthProvider() {
    const [tokenPersistido, setTokenPersistido, removeTokenPersistido] = useLocalStorage('TOKEN', null);
    const [userPersistido, setUserPersistido, removeUserPersistido] = useLocalStorage('USER', '');
    const [categoriasPersistidas, setCategoriasPersistidas, removeCategoriasPersistidas] = useLocalStorage('CATEGORIAS', [])

    const [token, setToken] = useState(tokenPersistido);
    const [categorias, setCategorias] = useState([]);
    const [consumidor, setConsumidor] = useState(false);
    const [endereco, setEndereco] = useState('');

    const logar = (token, user, categorias) => {
        setToken(token);
        setTokenPersistido(token);
        setUserPersistido(user);
        setCategoriasPersistidas(categorias);
    } 

    const deslogar = () => {
        removeTokenPersistido();
        removeUserPersistido();
        removeCategoriasPersistidas();
        setConsumidor(false);
        setToken(null);
    }

    return {
        token,
        logar,
        deslogar,
        userPersistido,
        setUserPersistido,
        setCategorias,
        categoriasPersistidas,
        categorias,
        consumidor, 
        setConsumidor,
        endereco, 
        setEndereco,
    };
};