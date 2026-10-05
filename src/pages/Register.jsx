import { useState } from "react"
import "../styles/Register.css"

function Register({ setPage }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (!username || !email || !password) {
            alert("Please input all fields!")
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.")
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })

        const data = await response.json();
        if (response.ok) {
            console.log(data.message)
            setPage("login")
        } else {
            console.log(data.message)
        }
    }

    return (
        <div className="registerOverlay">
            <form onSubmit={handleSubmit} className="registerModal">
                <h1>Create an account</h1>
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                />

                <label>Username</label>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                />

                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <button type="submit">Sign Up</button>
                <button type="button" onClick={() => setPage("login")}>
                    Log in
                </button>
            </form>
        </div >
    )
}

export default Register;