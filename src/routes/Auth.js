import React from 'react';


const Auth = () => <div>
    <form>
        <input type="text" placeholder="Email" required />
        <input type="password" placeholder="Password" required/>
        <input type="submit" value="login"/>
    </form>
    <button>Continue with Google</button>
</div>

export default Auth;