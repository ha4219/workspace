import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';


const Home = () => {
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
        getTweets();
    },[]);
    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.collection("tweets").add({
            tweet,
            createAt: Date.now(),
        });
        setTweet("");
    };
    const onChange = (e) => {
        const {target: {value}} = e;
        setTweet(value);
    };
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
                <div key={tweet.id}>
                    <h4>{tweet.tweet}</h4>
                </div>
                ))}
            </div>
        </div>
    );
};
export default Home;