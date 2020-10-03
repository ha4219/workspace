import { authService } from 'fbase';
import React from 'react';
import { useHistory } from 'react-router-dom';


const Profile = () => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    return (
        <>
            <span>Profile</span>
            <button onClick={onLogOutClick}>logout</button>
        </>
    );
};
export default Profile;