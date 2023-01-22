import './style.css';

export function Note({ titulo, conteudo }) {
  return (
    <div className='note'>
      <nav className='buttons'>
        <button className='edit-button'></button>
        <button className='delete-button'></button>
      </nav>
      <div>
        <h2 className='note-title'>{ titulo }</h2>
        <p className='note-content'>{ conteudo }</p>
      </div>
    </div>
  );
}