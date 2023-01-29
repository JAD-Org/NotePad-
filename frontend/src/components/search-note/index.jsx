import { useRef } from 'react';
import './style.css';

import { useEffect } from 'react';

export function SearchNote({ handleSearch }) {
  const searchRef = useRef(null);

  const search = () => {
    handleSearch(searchRef.current.value);
  }

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if(e.key !== 'Enter') return;

      search();
    })
  }, []);

  return (
    <div className='search-bar'>
      <input
          className='note-search'
          type='search'
          name='busca'
          placeholder='Pesquise aqui'
          ref={ searchRef }
        />
      <nav className='buttons'>
        <button
          className='search-button'
          onClick={ () => { search() } }
        ></button>
      </nav>
    </div>
  );
}