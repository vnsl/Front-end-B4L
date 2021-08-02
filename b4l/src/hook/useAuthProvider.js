import { useState } from 'react';
import { useLocalStorage } from 'react-use';


export default function useAuthProvider() {
    const [tokenPersistido, setTokenPersistido, removeTokenPersistido] = useLocalStorage('TOKEN', null);
    const [userPersistido, setUserPersistido, removeUserPersistido] = useLocalStorage('USER', '');


    const [token, setToken] = useState(tokenPersistido);
    const [categorias, setCategorias] = useState([]);

    const logar = (token, user) => {
        setToken(token);
        setTokenPersistido(token);
        setUserPersistido(user);
    } 

    const deslogar = () => {
        removeTokenPersistido();
        removeUserPersistido();
        setToken(null);
    }

    return {
        token,
        logar,
        deslogar,
        userPersistido,
        setUserPersistido,
        setCategorias,
        categorias
    };
};