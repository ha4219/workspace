import { arrayUnion, dbService } from "fbase";
import React, { useEffect, useState } from "react";



const Recommend = ({userObj}) => {
    const [email, setEmail] = useState("test1@test.com");
    const [data, setData] = useState({
        uid: "",
        name: "",
        rank: 0,
        staff:false,
        vertification:false,
    });

    const addWaiting = async(data) => {
        console.log(data);
        if(data.staff && data.vertification && (data.email!==userObj.email)){
            let ref = dbService.doc(`user/${data.uid}`);
            await ref.update({
                waitTree:arrayUnion(`${userObj.uid}`)
            });
        } else{
            console.log('add wait tree do not');
        }
    };

    const onClick = () => {
        console.log(userObj);
    }

    useEffect(() => {

    }, [data]);

    const onChange = (e) => {
        const {target :{value}} = e;
        setEmail(value);
    };

    const getParent = async() => {
        let tmp = null;
        await dbService.collection("user")
        .where("email","==",email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
                tmp = doc.data();
                setData({
                    uid:tmp.uid,
                    email:tmp.email,
                    name:tmp.name,
                    rank:tmp.rank,
                    staff:tmp.staff,
                    vertification:tmp.vertification
                });
                console.log(tmp);
                ;
            });
        });
        return tmp
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        getParent()
        .then((s) => {
            console.log(s);
            addWaiting(s);
        });
    }

    return (
        <>
            <form style={formStyle} onSubmit={onSubmit}>
                <input 
                type="email"
                onChange={onChange}
                / >
                <input style={btnStyle} type="submit" value="add friend"/>
            </form>
            {data.uid}
            <button onClick={onClick}></button>
        </>
    );
}

const formStyle = {
    color : "white",
    background: "#00acee",
    padding: ".375rem .75rem",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width:"30%",
    borderRadius: "1rem"
}
const btnStyle = {
    color: "black",
    background: "white",
    padding: ".375rem .75rem",
    borderRadius: "1rem"
}


export default Recommend;