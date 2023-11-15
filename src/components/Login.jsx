import { useState } from 'react';

function Login() {
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const API = "http://127.0.0.1:3333"

    const submitLogin = (mail, password) => {
        fetch(`${API}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: mail, password }),
        }).catch((err) => {
            err.json().then((data) => {
                const { message } = data
                setMessage(message)
            })
        }).then((reponse) => {
            reponse.json().then((data) => {
                const { message } = data
                setMessage(message)
            })
        })
    }

    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="flex flex-col space-y-5 m-5 border border-black rounded-md p-5">
                <h1 className="font-bold text-4xl">login</h1>
                <form className="flex flex-col space-y-5" onSubmit={(e) =>{ e.preventDefault(); submitLogin(mail, password); }}>

                    <div className="flex flex-col">
                        <label htmlFor="">Mail</label>
                        <input
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            className="border border-black" type="mail" name="" id="" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-black" type="password" />
                    </div>
                    <button className="w-fit border border-black" type="submit">Login</button>
                    <p>{message}</p>
                </form>
            </div>
        </div>
    )
}

export default Login
