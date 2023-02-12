import { Link } from "react-router-dom";
import { NavBar } from "../../components";

import "./style.css";

export function Register() {
	return (
		<>
			<NavBar/>
			<form className="form" action='http://localhost:8080/user/create' method='post'>
				<label htmlFor="email">E-mail:</label>
				<input id='email' type='email' name='email' required></input>
				<label htmlFor="password">Senha:</label>
				<input id='password' type='password' name='password' required></input>

				<button type='submit'>Enviar</button>

				<Link to='/login'>Login</Link>
			</form>
		</>
	);
};