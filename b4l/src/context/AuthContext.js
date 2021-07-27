import { createContext } from 'react';
import useAuthProvider from '../hook/useAuthProvider';

const AuthContext = createContext();

export function AuthProvider(props) {
    const auth = useAuthProvider();

    return (
        <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
    );
};

export default AuthContext;