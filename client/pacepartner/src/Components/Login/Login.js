
export default function Login() {
    return (
        <form className="auth-form" action="">
            <h1>Connexion</h1>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <button type="submit">Se connecter</button>
        </form>
    )
}