import { useState } from "react";

import { Link } from "react-router-dom";
import { NavBar } from "../../components";

import api from "../../api";

import "./style.css";

export function Register() {
	const [formData, setFormData] = useState({ email: "", password: "" });
	async function handleSubmit(event) {
	  event.preventDefault();
	  console.log(formData);
	  try {
		await api.register(formData);
	  } catch {
		alert("Algo deu errado!");
	  }
	}

	return (
		<>
			<NavBar />
			<form className="form" onSubmit={handleSubmit}>
				<label htmlFor="email">E-mail:</label>
				<input
					id="email"
					type="email"
					name="email"
					value={formData.email}
					onChange={(event) =>
						setFormData({ ...formData, email: event.target.value })
					}
					required
				></input>
				<label htmlFor="password">Senha:</label>
				<input
					id="password"
					type="password"
					name="password"
					value={formData.password}
					onChange={(event) =>
						setFormData({ ...formData, password: event.target.value })
					}
					required
				></input>

				<button type="submit">Enviar</button>

				<Link to="/login">Login</Link>
			</form>
		</>
	);
};