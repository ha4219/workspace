import Tweet from 'components/Tweet';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';


const Home = ({userObj}) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const getTweets = async() => {
        const dbtweets = await dbService.collection("tweets").get();
        dbtweets.forEach((document) => {
            const tweetObject = {
                ...document.data(),
                id: document.id,
            };
            setTweets((prev) => [tweetObject,...prev]);
        });
    };
    useEffect(() => {
        dbService.collection("tweets").onSnapshot((snapshot) => {
            const tweetArray = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray);
        });
    },[]);
    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.collection("tweets").add({
            text: tweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
        });
        setTweet("");
    };
    const onChange = (e) => {
        const {target: {value}} = e;
        setTweet(value);
    };
    console.log(tweets);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                value={tweet}
                type="text"
                placeholder="What's on your mind?" 
                maxLength={120}
                onChange={onChange} 
                />
                <input 
                type="submit" 
                value="submit" 
                />
            </form>
            <div>
                {tweets.map(tweet => (
                    <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId===userObj.uid}/>
                ))}
            </div>
        </div>
    );
};
export default Home;