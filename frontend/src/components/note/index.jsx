import './style.css';

import api from './../../api';
import { useState, useEffect, useRef } from 'react';

export function Note({ id, titulo, conteudo }) {
  const [ editMode, setEditMode ] = useState(false);
  const titleInputRef = useRef(null);
  const contentInputRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    window.addEventListener('click', e => {
      if (
          e.target !== editInputRef.current &&
          e.target !== titleInputRef.current &&
          e.target !== contentInputRef.current
      ) {
        setEditMode(false);
      }
    });

    window.addEventListener('keydown', async e => {
      if(e.key !== 'Enter') return;

      if(!editMode) return;

      await api.update(id, titleInputRef.current.value, contentInputRef.current.value);
      setEditMode(false);
      document.location.reload();
    });
  }, [ editMode ]);

  const handleEdit = () => {
    setEditMode(true);
  }

  const handleDelete = async () => {
    await api.remove(id);

    document.location.reload();
  }

  return (
    <div className='note'>
      <nav className='buttons'>
        <button
          className='edit-button'
          onClick={() => {
            handleEdit();
          }}
          ref={ editInputRef }
        ></button>
        <button
          className='delete-button'
          onClick={() => {
            handleDelete();
          }}
        ></button>
      </nav>
      <div>
        {
          editMode ?
          <>
            <input
              className='note-title'
              type='text'
              name='titulo'
              defaultValue={ titulo }
              placeholder='Título'
              ref={ titleInputRef }
            />
            <input
              className='note-content'
              type='text'
              name='conteudo'
              defaultValue={ conteudo }
              placeholder='Conteúdo'
              ref={ contentInputRef }
            />
          </> :
          <>
            <h2 className='note-title'>{ titulo }</h2>
            <p className='note-content'>{ conteudo }</p>
          </>
        }
      </div>
    </div>
  );
}