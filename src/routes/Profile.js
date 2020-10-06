import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const Profile = ({ userObj }) => {
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
    const onSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" required onChange={onChange}></input>
                <input type="submit"></input>
            </form>
            <button onClick={onLogOutClick}>logout</button>
        </>
    );
};
export default Profile;