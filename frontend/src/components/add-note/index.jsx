import './style.css';

export function AddNote({ titulo, conteudo }) {
  return (
    <div className='note'>
      <nav className='buttons'>
        <button className='add-button'></button>
      </nav>
      <div>
        <input
          className='note-title'
          type='text'
          name='titulo'
          defaultValue={ titulo }
        />
        <input
          className='note-content'
          type='text'
          name='conteudo'
          defaultValue={ conteudo }
        />
      </div>
    </div>
  );
}