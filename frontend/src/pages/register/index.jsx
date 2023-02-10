import "./style.css";

export function Register() {
	return (
		<form action='#' method='post'>
			<input id='username' type='text' name='username'></input>
			<input id='password' type='password' name='password'></input>

			<button type='submit'></button>

			<a href='#'>Login</a>
		</form>
	);
};