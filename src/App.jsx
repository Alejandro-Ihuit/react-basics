import { useState, useEffect } from 'react';

import { useAuth } from './hooks/useAuth.js';
import { useForm } from './hooks/useForm.js';

function App() {
	const titulo = "Mi primera aplicación con Vite y React";
	// const [ estaAutenticado, setEstaAutenticado ] = useState(false); //version sin custom hook
	const { estaAutenticado, toggleAuth } = useAuth();

	// const [ nombre, setNombre ] = useState(''); //sin custom hook
	const { values, handleChange, resetForm } = useForm({
		nombre: '',
		apellido: ''
	});

	useEffect( () => {
		if( !estaAutenticado ) {
			resetForm();
		}
	}, [ estaAutenticado ]);

	useEffect( () => {
		if( values.nombre ) {
			document.title = `Hola, ${ values.nombre }.`;
		} else {
			document.title = titulo;
		}
	}, [ values.nombre, titulo ]);

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('Formulario enviado con el nombre:', values );
		resetForm();
	}

  return (
	<div>
		{estaAutenticado && <p>Bienvenido, sesión iniciada.</p>}
		{!estaAutenticado && <p>Por favor, inicia sesión para continuar.</p>}

		{/* <button onClick={ () => setEstaAutenticado(!estaAutenticado) }>
			{estaAutenticado ? 'Cerrar Sesión' : 'Iniciar Sesión'}
		</button> */}
		
		<button onClick={ toggleAuth }>
			{estaAutenticado ? 'Cerrar Sesión' : 'Iniciar Sesión'}
		</button>

		<hr />

		<form onSubmit={ handleSubmit }>
			{/* <input //sin custom hook
				name='nombre'
				type="text" 
				placeholder='Escribe tu nombre' 
				value={ nombre } 
				disabled={!estaAutenticado}
				onChange={ (e) => setNombre(e.target.value) } 
			/> */}

			<input //custom hook
				name='nombre'
				type="text" 
				placeholder='Escribe tu nombre' 
				value={ values.nombre } 
				disabled={ !estaAutenticado }
				onChange={ handleChange }
			/>
			<input //custom hook
				name='apellido'
				type="text" 
				placeholder='Escribe tu apellido' 
				value={ values.apellido } 
				disabled={ !estaAutenticado }
				onChange={ handleChange }
			/>

			<button type='submit' disabled={!estaAutenticado || !values.nombre.trim()}>
				Enviar
			</button>
		</form>

		{ values.nombre && <p>Hola, {values.nombre}. ¡Bienvenido a {titulo}!</p>}
	</div>
  );
}

export default App;
