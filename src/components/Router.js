import React, {useState} from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from '../routes/Auth';


const AppRouter =  ({isLoggedIn}) => {
    return (
        <Router>
            <Switch>
                {isLoggedIn ? (
                 <><Route exact path="/">

                </Route></>):(<Route exact path="/"><Auth/></Route>)}
            </Switch>
        </Router>
    );
}

export default AppRouter;