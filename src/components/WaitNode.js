import { getUserData } from 'api/ApiUser';
import React, { useEffect, useState } from 'react';


const WaitNode = ({userObj, targetUid}) => {
    const [rank, setRank] = useState("");
    const [name, setName] = useState("");
    const getInfo = () => {
        const data = getUserData(targetUid);
        setRank(data.rank);
        setName(data.name);
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