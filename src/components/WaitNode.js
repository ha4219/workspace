import { getUserData } from 'api/ApiUser';
import React, { useEffect, useState } from 'react';


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
    useEffect(() => {
        getInfo();
    },[]);
    return (
        <div>
            {rank} {name}
        </div>
    );
};

export default WaitNode;