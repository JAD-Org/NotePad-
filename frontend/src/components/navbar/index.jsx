import { Link } from 'react-router-dom';

import './style.css';

export function NavBar() {
    return (
        <nav>
            <Link to='/'>Página principal</Link>
            <Link to='/register'>Registrar-se</Link>
            <Link to='/login'>Login</Link>
        </nav>
    )
}