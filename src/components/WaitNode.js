import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUserData } from 'api/ApiUser';
import React, { useEffect, useState } from 'react';
import {faCheck, faEject} from "@fortawesome/free-solid-svg-icons";


const WaitNode = ({userObj, targetUid}) => {
    const [rank, setRank] = useState("");
    const [name, setName] = useState("");
    const getInfo = () => {
        getUserData(targetUid)
        .then((data) => {
            console.log(data);
            setRank(data.rank);
            setName(data.name);
        });
        
        console.log(rank, name);
    }
    const addUser = () => {

    }

    useEffect(() => {
        getInfo();
    },[]);
    return (
        <form className="nweet" style={{marginTop:10}}>
            {rank} {name}
            <FontAwesomeIcon icon={faCheck}/>
            <FontAwesomeIcon icon={faEject}/>
        </form>
    );
};

export default WaitNode;