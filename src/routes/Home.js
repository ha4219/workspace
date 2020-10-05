import Tweet from 'components/Tweet';
import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';


const Home = ({userObj}) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [attchment, setAttachment] = useState();
    // const getTweets = async() => {
    //     const dbtweets = await dbService.collection("tweets").get();
    //     dbtweets.forEach((document) => {
    //         const tweetObject = {
    //             ...document.data(),
    //             id: document.id,
    //         };
    //         setTweets((prev) => [tweetObject,...prev]);
    //     });
    // };
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
    const onFileChange = (e) => {
        const {target:{files}} = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (e) => {
            const {currentTarget:{result}} = e;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const clearAttchment = () => setAttachment(null);
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
                <input type="file" accept="image/*" onChange={onFileChange}></input>
                <input 
                type="submit" 
                value="submit" 
                />
                {attchment && 
                    <div>
                        <img src={attchment} width="50px" height="50px"/>
                        <button value="clear" onClick={clearAttchment}></button>
                    </div>
                }
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