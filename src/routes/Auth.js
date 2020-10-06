import AuthForm from 'components/AuthForm';
import React, { useState } from 'react';
import { authService, firebaseInstance } from '../fbase';


const Auth = () => {

    
    const onSocialClick = async(e) => {
        const {target:{name}} = e;
        let provider;
        if(name==="google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name==="github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }
    return (
        <div>
            <AuthForm />
            <button name="google" onClick={onSocialClick}>Continue with Google</button>
        </div>
    );
};

export default Auth;