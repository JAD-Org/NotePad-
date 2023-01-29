import './App.css';

import { Note, AddNote, SearchNote } from './components';

import api from './api';
import { useEffect, useState } from 'react';

function App() {
  const [ notas, setNotas ] = useState([]);
  const [ search, setSearch ] = useState('');

  const handleSearch = (search) => {
    setSearch(search);
  }

  useEffect(() => {
    (async () => {
      setNotas(await api.read(search));
    })();
  }, [ search ]);

  return (
    <div className="App">
      <SearchNote handleSearch={ (search) => { handleSearch(search) } }/>
      <AddNote/>
      { notas.map((nota, index) => <Note key={ index } id={ nota._id } titulo={ nota.title } conteudo={ nota.content }/>) }
    </div>
  );
}

export default App;