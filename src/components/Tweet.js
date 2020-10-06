import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";


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
        <div className="nweet">
            {
                editing ? (
                    <>
                        {isOwner && 
                            <>
                                <form onSubmit={onSubmit} className="container nweetEdit">
                                    <input
                                    type="text"
                                    value={newTweet}
                                    required
                                    placeholder="Edit your tweet"
                                    onChange={onChange}
                                    autoFocus
                                    className="formInput"
                                    ></input>
                                    <input type="submit" value="update"  className="formBtn"></input>
                                </form>
                                <span onClick={toggleEditing}
                                 className="formBtn cancelBtn">
                                    Cancel
                                </span>
                            </>
                        }
                    </>
                ) : (
                    <>
                        <h4>{tweetObj.text}</h4>
                        {tweetObj.attachmentUrl && 
                        (<img alt="attachmentUrl" src={tweetObj.attachmentUrl}/>)}
                        {isOwner && (
                            <div class="nweet__actions">
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            </div>
                        )}
                    </>
                )
            }
        </div>
    );
};

export default Tweet;