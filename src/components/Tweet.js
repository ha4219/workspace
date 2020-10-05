import React from 'react';


const Tweet = ({tweetObj, isOwner}) => {
    const onDeleteClick = () => {
        const ok = window.confirm("Are you sure you want to del this?");
        if(ok){

        }
    };
    return (
        <div>
            <h4>{tweetObj.text}</h4>
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>del</button>
                    <button>edit</button>
                </>
            )}
            
        </div>
    );
};

export default Tweet;