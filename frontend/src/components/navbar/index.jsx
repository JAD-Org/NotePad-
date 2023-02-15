import { Link } from 'react-router-dom';

import './style.css';

export function NavBar() {
    const isLoggedIn = !!localStorage.getItem("token");
    return (
        <nav className='navbar'>
            <Link to='/'>Página principal</Link>
            {
                !isLoggedIn ?
                <Link to='/register'>Registrar-se</Link> :
                <></>
            }
            {
                !isLoggedIn ?
                <Link to='/login'>Login</Link> :
                <></>
            }
        </nav>
    )
}