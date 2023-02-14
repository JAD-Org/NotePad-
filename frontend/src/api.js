async function create(title, content) {
  const res = await fetch("http://localhost:8080/note", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: localStorage.getItem("token"),
    },
  });

  return res;
}

async function read(filter = "") {
  const res = await fetch(`http://localhost:8080/note?filter=${filter}`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
  const data = await res.json();

  return data;
}

async function update(id, title, content) {
  const res = await fetch(`http://localhost:8080/note/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: localStorage.getItem("token"),
    },
  });

  return res;
}

async function remove(id) {
  const res = await fetch(`http://localhost:8080/note/${id}`, {
    method: "DELETE",
  });

  return res;
}

async function login(data) {
  const res = await fetch(`http://localhost:8080/user/login`, {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return res;
}

async function register(data) {
  const res = await fetch(`http://localhost:8080/user/create`, {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return res;
}

async function logout() {
  const res = await fetch(`http://localhost:8080/user/logout`, {
    method: "POST",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });

  localStorage.removeItem("token");

  return res;
}

export default {
  create,
  read,
  update,
  remove,
  login,
  logout,
  register,
};
