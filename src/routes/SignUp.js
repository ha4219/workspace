import { authService, dbService } from 'fbase';
import React, { useState } from 'react';


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [entry, setEntry] = useState(null);
    const [discharge, setDischarge] = useState(null);
    const [rank, setRank] = useState(0);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");

    const onChange = (e) => {
        const {target: {name, value}} = e;
        if(name==="email"){
            setEmail(value);
        }else if(name==="password"){
            setPassword(value);
        }else if(name==="entry"){
            setEntry(value);
        }else if(name==="discharge"){
            setDischarge(value);
        }else if(name==="name"){
            setName(value);
        }else if(name ==="phoneNumber"){
            setPhoneNumber(value);
        }
    };

    const addUser = async({user}) => {
        const ref = await dbService.collection("user").doc(user.uid);
        ref.set({
            uid: user.uid,
            name: name,
            email: email,
            vertification: false,
            staff: false,
            entry: entry,
            discharge: discharge,
            rank: rank,
            phoneNumber: phoneNumber,
            subTree: [],
            waitTree: [],
        });
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            let data;
            // create Account
            data = await authService.createUserWithEmailAndPassword(
                email, password
            ).then((data) => addUser(data))
        }catch(e){
            setError(e.message);
        }
    }
    return (
        <div className className="authContainer">
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
                <input type="text" 
                name="name"
                placeholder="이름" 
                required
                value={name}
                onChange={onChange}
                className="authInput"
                />
                <input type="text" 
                name="phoneNumber"
                placeholder="000-0000-0000" 
                required
                value={phoneNumber}
                onChange={onChange}
                className="authInput"
                />
                <input type="date" 
                name="entry"
                placeholder="입대일" 
                required
                value={entry}
                onChange={onChange}
                className="authInput"
                />
                <input type="date" 
                name="discharge"
                placeholder="전역일" 
                required
                value={discharge}
                onChange={onChange}
                className="authInput"
                />
                <input type="submit" 
                className="authInput authSubmit"
                value="Create Account"
                />
                {error && <span className="authError">{error}</span>}
            </form>
        </div>
    );
};

export default SignUp;