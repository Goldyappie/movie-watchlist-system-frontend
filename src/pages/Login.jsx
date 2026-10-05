import { useState } from "react"
import "../styles/Login.css"

function Login({ setPage }) {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (!identifier || !password) {
            alert("Please input all fields!")
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identifier: identifier,
                password
            })
        })

        const data = await response.json();
        if (response.ok) {
            console.log(data.message)
            localStorage.setItem("token", data.token);
            setPage("movies");
        } else {
            console.log(data.errors)
        }

    }

    return (
        <div className="loginOverlay">
            <form onSubmit={handleSubmit} className="loginModal">
                <h1>Login</h1>

                <label>Username or Email</label>
                <input
                    type="text"
                    placeholder="Username or Email"
                    value={identifier}
                    onChange={(e) => { setIdentifier(e.target.value) }}
                />

                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <button type="submit">Log In</button>
                <button type="button" onClick={() => setPage("register")}>
                    Create an account
                </button>
            </form>
        </div >
    )
}

export default Login;