import './style.css';

import { useRef } from 'react';

import api from './../../api';
import { useEffect } from 'react';

export function AddNote({ titulo, conteudo }) {
  const titleInputRef = useRef(null);
  const contentInputRef = useRef(null);

  const createNote = async () => {
    if (!titleInputRef.current.value || !contentInputRef.current.value) return;

    await api.create(titleInputRef.current.value, contentInputRef.current.value);

    document.location.reload();
  }

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;

      createNote();
    })
  }, []);

  return (
    <div className='note'>
      <nav className='buttons'>
        <button
          className='add-button'
          onClick={() => { createNote() }}
        ></button>
      </nav>
      <div>
        <input
          className='note-title'
          type='text'
          name='titulo'
          defaultValue={titulo}
          placeholder='Digite o Título da Nota...'
          ref={titleInputRef}
        />
        <input
          className='note-content'
          type='text'
          name='conteudo'
          defaultValue={conteudo}
          placeholder='Digite o Conteúdo da Nota...'
          ref={contentInputRef}
        />
      </div>
    </div>
  );
}