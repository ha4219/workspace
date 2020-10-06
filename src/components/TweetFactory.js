import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import {v4 as uuidv4} from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";


const TweetFactory = ({userObj}) => {
    const [tweet, setTweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (e) => {
        if (tweet === "") {
            return;
        }
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
    const onClearAttachment = () => setAttachment("");
    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input 
                className="factoryInput__input"
                value={tweet}
                type="text"
                placeholder="What's on your mind?" 
                maxLength={120}
                onChange={onChange} 
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label for="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file" 
            type="file" accept="image/*" onChange={onFileChange}
            style={{opacity:0,}}></input>
            {attachment && 
                <div>
                    <div className="factoryForm__attachment">
                        <img src={attachment} style={{backgroundImage:attachment}}/>
                    </div>
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            }
        </form>
    );
};
export default TweetFactory;