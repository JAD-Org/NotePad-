import "./style.css";

import { Note, AddNote, SearchNote, NavBar } from "./../../components";

import api from "./../../api";
import { useEffect, useState } from "react";
import { Logout } from "../../components/logout";
import { useNavigate } from "react-router-dom";

export function Main() {
  const navigate = useNavigate();

  if (localStorage.getItem("token") === null) {
    navigate("/login");
  }

  const [notas, setNotas] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (search) => {
    setSearch(search);
  };

  useEffect(() => {
    (async () => {
      const res = await api.read(search);
      setNotas(res === "Usuário não autenticado." ? [] : res);
    })();
  }, [search]);

  return (
    <div>
      <NavBar />
      {localStorage.getItem("token") ? <Logout /> : <></>}
      <h1>TD Notes</h1>
      <SearchNote
        handleSearch={(search) => {
          handleSearch(search);
        }}
      />
      <AddNote />
      {notas.map((nota, index) => (
        <Note
          key={index}
          id={nota._id}
          titulo={nota.title}
          conteudo={nota.content}
        />
      ))}
    </div>
  );
}
