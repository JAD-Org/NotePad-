import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api.js";

import { NavBar } from "../../components";

import "./style.css";

export function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    try {
      const res = await api.login(formData);
      const jsonRes = await res.json();
      localStorage.setItem("token", jsonRes.token);

	  window.location.href = "/";
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

        <button type="submit">Entrar</button>

        <p>Não possui uma conta?</p>
        <Link to="/register">Registre-se</Link>
      </form>
    </>
  );
}
