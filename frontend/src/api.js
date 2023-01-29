async function create(title, content) {
    const res = await fetch('http://localhost:8080/note', {
      method: 'POST',
      body: JSON.stringify({
        title, content
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });

    return res;
}

async function read(filter = '') {
    const res = await fetch(`http://localhost:8080/note?filter=${filter}`);
    const data = await res.json();
  
    return data;
}

async function update(id, title, content) {
    const res = await fetch(`http://localhost:8080/note/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title, content
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });

    return res;
}

async function remove(id) {
    const res = await fetch(`http://localhost:8080/note/${id}`, {
      method: 'DELETE'
    });

    return res;
}

export default {
    create, read, update, remove
}