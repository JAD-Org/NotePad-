import "./style.css";

import api from "../../api";

export function Logout() {
    async function handleClick() {
        try {
          await api.logout();
        } catch {
          alert("Algo deu errado!");
        }
    }

    return (
        <>
            <button className="logout-button" onClick={handleClick}></button>
        </>
    );
};