import React, { useState } from 'react';
import { authService } from '../fbase';


const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const onChange = (e) => {
        const {target: {name, value}} = e;
        console.log(name, value);
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
            }else{
                // login
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        }catch(e){
            console.log(e);
        }
        
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text"
                 name="email"
                 placeholder="Email" 
                 required 
                 value={email}
                 onChange={onChange}
                 />
                <input type="password" 
                name="password"
                placeholder="Password" 
                required
                value={password}
                onChange={onChange}
                />
                <input type="submit" 
                value={newAccount ? "Create Account" : "Login"}
                />
            </form>
            <button>Continue with Google</button>
        </div>
    );
};

export default Auth;