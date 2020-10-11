import React,{useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import {authService, dbService} from "fbase";


function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        getUserData(user)
        .then((s)=>{
          mergeUserObj(s, user);
        })
      }else{
        setUserObj(null);
      }
      setInit(true);
    });
  },[]);
  const mergeUserObj = (data, user) => {
    console.log(data, user);
    setUserObj({
      name:data.name,
      rank:data.rank,
      staff:data.staff,
      vertification:data.vertification,
      subTree:data.subTree,
      waitTree:data.waitTree,
      updateProfile: (args) => user.updateProfile(args),
    });
  }
  const getUserData = async(user) => {
    const tmp = await dbService.doc(`user/${user.uid}`).get();
    return tmp.data();
  }

  const refreshUser = async() => {
    const user = await authService.currentUser;
    setUserObj({
      displayName : user.displayName,
      uid:user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  
  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "Initializing...."}
      <footer>&copy; donghaTwiiter {new Date().getFullYear()}</footer>
    </>
    
  );
}

export default App;
