"use client"

import React, { useState } from 'react'
import './styles.css'
import { useRouter } from "next/navigation";
import Link from 'next/link';


const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        if(firstName == '' || lastName == '' ||email == '' ||password == '' ||confirmPassword == ''){
            window.alert("Enter Valid input")
        }
        else if(password != confirmPassword){
            window.alert("Enter correct password")
        }
        else{
            const response = await fetch("http://localhost:4000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });
            if (response.ok) {
                router.push("/explore");
                console.log("Id created and redirected to explore");
            } else {
                console.error("Failed to register");
            }
        }
    };
    return (
        <div className='register-page'>
            <form action="" className='register-form'>
                <h1>Create an account</h1>
                <div className='go-to-login'>
                    <p>Already have an account?</p>
                    <Link href="/login">Login</Link>
                </div>
                <div className='name-input'>
                    <input type="text" placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}/>
                    <input type="text" placeholder='Last Name' onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div>
                    <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                    <input type="password" placeholder='Confirm password' onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                {/* <div className='terms'>
                    <input type="checkbox" id='terms'/>
                    <label htmlFor="terms">I agree to the terms and condiditons</label>
                </div> */}
                <div className='submit-button'>
                    <button onClick={handleSubmit}>Create account</button>
                </div>
            </form>
        </div>
    )
}

export default Register
