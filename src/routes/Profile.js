import { authService, dbService } from 'fbase';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


const Profile = ({ userObj }) => {
    const history = useHistory();
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
    return (
        <>
            <span>Profile</span>
            <button onClick={onLogOutClick}>logout</button>
        </>
    );
};
export default Profile;