import { useState } from "react";

export function useAuth() { // empieza con "use" para que React lo reconozca como hook
    const [estaAutenticado, setEstaAutenticado] = useState(false);
    
    const toggleAuth = () => {
        setEstaAutenticado( prev => !prev ); //asumo que solo funciona con type Boolean, porque invierte el valor previo
    }

    return {
        estaAutenticado,
        toggleAuth
    }
}