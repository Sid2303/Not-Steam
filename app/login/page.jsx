"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import './styles.css'
import { useRouter } from "next/navigation";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // Correct header
            body: JSON.stringify({ email, password }) // Ensure proper JSON formatting
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log("Login successful:", data);
            localStorage.setItem("userId",data.userId)
            router.push("/explore");
        } else {
            console.error("Login failed:", await response.json());
        }
    };
    return (
        <div className='register-page'>
            <form action="" className='register-form'>
                <h1>Login to your account</h1>
                <div className='go-to-login'>
                    <p>Dont have an account?</p>
                    <Link href="/register">Register</Link>
                </div>
                <div>
                    <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {/* <div className='terms'>
                    <input type="checkbox" id='terms'/>
                    <label htmlFor="terms">I agree to the terms and condiditons</label>
                </div> */}
                <div className='submit-button'>
                    <button onClick={handleSubmit}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
