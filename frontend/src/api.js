async function create(title, content) {
    await fetch('http://localhost:8080/note', {
      method: 'POST',
      body: JSON.stringify({
        title, content
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
}

async function read() {
    const res = await fetch('http://localhost:8080/note');
    const data = await res.json();
  
    return data;
}

async function update(id, title, content) {
    fetch(`http://localhost:8080/note/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: title, content: content
      }),
      header: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
}

async function remove(id) {
    fetch(`http://localhost:8080/note${id}`, {
      method: 'DELETE'
    });
}

export default {
    create, read, update, remove
}