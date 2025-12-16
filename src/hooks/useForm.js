import { useState, useCallback } from 'react';

// Custom hook para manejar formularios de forma escalable
export function useForm(initialValues = {}) {

    //aqui se guardan todos los campos del formulario
    const [ values, setValues ] = useState(initialValues);
    
    //manejo cambios de cualquier input
    const handleChange = useCallback((event) => {
        const { name, value } = event.target;

        setValues( prev => ({
            ...prev, //copiamos los valores previos o lo que ya existia
            [name]: value //sobreescribimos el campo que cambio
        }));
    }, []);

    const resetForm = useCallback(() => {
        setValues(initialValues);
    }, [initialValues]);
    
    //si hay funciones dentro de la funcion useForm, es porque necesutan ver el estado interno (values) para trabajar

    return {
        values,
        handleChange,
        resetForm
    }
}
