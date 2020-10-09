import { authService, dbService } from "fbase";
import React, { useState } from "react";
import { Link } from "react-router-dom";


const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState("");
    const onChange = (e) => {
        const {target: {name, value}} = e;
        if(name==="email"){
            setEmail(value);
        }else if(name==="password"){
            setPassword(value);
        }
    };
    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            let data;
            if(newAccount){
                // create Account
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                );
                await dbService.collection("users").add({
                    uid: data.uid,
                    email: email,
                    vertification: false,
                    subTree: [],
                });
            }else{
                // login
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        }catch(e){
            setError(e.message);
        }
    };
    return (
        <>
        <form onSubmit={onSubmit} className="container">
            <input type="email"
                name="email"
                placeholder="Email" 
                required 
                value={email}
                onChange={onChange}
                className="authInput"
                />
            <input type="password" 
            name="password"
            placeholder="Password" 
            required
            value={password}
            onChange={onChange}
            className="authInput"
            />
            <input type="submit" 
            className="authInput authSubmit"
            value="Login"
            />
            
            {error && <span className="authError">{error}</span>}
        </form>
        <span className="authSwitch">
            <Link to="/signup">Create Account</Link>
        </span>
        </>
    );
};

export default AuthForm;