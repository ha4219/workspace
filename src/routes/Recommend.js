import { dbService } from "fbase";
import React, { useState } from "react";



const Recommend = ({userObj}) => {
    const [email, setEmail] = useState("ha4219@naver.com");
    const [data, setDate] = useState(null);

    const onChange = (e) => {
        const {target :{value}} = e;
        setEmail(value);
    };

    const onClick = async(e) => {
        e.preventDefault();
        await dbService.collection("user")
        .where("email","==",email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc);
            });
        });
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        console.log(e);
        dbService.collection("user");
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