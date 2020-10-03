import { dbService } from 'fbase';
import React, { useState } from 'react';


const Home = () => {
    const [tweet, setTweet] = useState("");
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
        </div>
    );
};
export default Home;