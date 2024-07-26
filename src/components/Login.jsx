import Logo from "./Logo";

function Login({ children }) {
    return (
        <>
            <nav className="nav-bar">
                <Logo />
                {children}
            </nav>
            <div className="list list-movies login">
                <div className="login-list">
                    <label for="email" className="lable">
                        Email
                    </label>

                    <input type="email" id="email" className="login-inp" />
                </div>
                <br></br>
                <div className="login-list">
                    <label for="password" className="lable">
                        Password
                    </label>
                    <input type="password" id="password" className="login-inp" />
                </div>
                <div className="login-list">
                    <button className="btn-login">Login</button>
                </div>
            </div>
        </>
    );
}
export default Login;
