import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const Profile = ({ refreshUser, userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const getMyTweets = async () => {
        const tweets = await dbService.collection("tweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt").get();

    };
    useEffect(() => {
        getMyTweets();
    }, []);
    const onChange = (e) => {
        const {target:{value}} = e;
        setNewDisplayName(value);
    };
    const onSubmit = async(e) => {
        e.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser().then(()=>console.log(userObj));
        }
    };
    return (
        <div className="container">
            <form onSubmit={onSubmit}  className="profileForm">
                <input type="text" 
                autoFocus
                required 
                className="formInput"
                onChange={onChange}></input>
                <input type="submit"
                 value="Update Profile"
                 className="formBtn"
                 style={{
                   marginTop: 10,
                 }}
                />
            </form>
            <span  
            className="formBtn cancelBtn logOut"
            onClick={onLogOutClick}>logout
            </span>
        </div>
    );
};
export default Profile;