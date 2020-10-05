import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';


const Tweet = ({tweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setTweet] = useState(tweetObj.text);
    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to del this?");
        if(ok){
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            await storageService.refFromURL(tweetObj.attachmentUrl).delete();
        }
    };
    const onSubmit = async(e) => {
        e.preventDefault();
        await dbService.doc(`tweets/${tweetObj.id}`).update({
            text:newTweet,
        })
    };
    const onChange = (e) => {
        const {target : {value}} = e;
        setTweet(value);
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    return (
        <div>
            {
                editing ? (
                    <>
                        {isOwner && 
                            <>
                                <form onSubmit={onSubmit}>
                                    <input
                                    type="text"
                                    value={newTweet}
                                    required
                                    placeholder="Edit your tweet"
                                    onChange={onChange}
                                    ></input>
                                    <input type="submit" value="update"></input>
                                </form>
                                <button onClick={toggleEditing}>Cancel</button>
                            </>
                        }
                    </>
                ) : (
                    <>
                        <h4>{tweetObj.text}</h4>
                        {tweetObj.attachmentUrl && 
                        (<img src={tweetObj.attachmentUrl} width="500px;" height="500px;"/>)}
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>del</button>
                                <button onClick={toggleEditing}>edit</button>
                            </>
                        )}
                    </>
                )
            }
        </div>
    );
};

export default Tweet;