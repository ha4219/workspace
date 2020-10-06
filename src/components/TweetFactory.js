import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import {v4 as uuidv4} from "uuid";



const TweetFactory = ({userObj}) => {
    const [tweet, setTweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = "";
        
        if(attachment!==""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const tweetObj = {
            text: tweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        };
        await dbService.collection("tweets").add(tweetObj);
        setTweet("");
        setAttachment("");
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
            {attachment && 
                <div>
                    <img src={attachment} width="50px" height="50px"/>
                    <button value="clear" onClick={clearAttchment}></button>
                </div>
            }
        </form>
    );
};
export default TweetFactory;