import { dbService } from "fbase";
import React, { useState } from "react";



const Recommend = ({userObj}) => {
    const [email, setEmail] = useState("");
    const [data, setDate] = useState(null);

    const onChange = (e) => {
        const {target :{value}} = e;
        setEmail(value);
    };

    const onClick = async(e) => {
        e.preventDefault();
        const d = await dbService.collection("users")
        .where("uid","==",userObj.uid)
        .onSnapshot((snapshot) => {
            const user = snapshot.docs.map((doc) => {
                console.log(user);
            });
        })
        console.log(d);
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        console.log(e);
        dbService.collection("users").onSnapshot((snapshot) => {
            const users = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data()
            }));
            console.log(users);
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
            <button onClick={onClick}></button>
            {data}
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