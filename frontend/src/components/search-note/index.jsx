import './style.css';

export function SearchNote() {
  return (
    <div className='search-bar'>
      <input
          className='note-search'
          type='search'
          name='busca'
        />
      <nav className='buttons'>
        <button className='search-button'></button>
      </nav>
    </div>
  );
}