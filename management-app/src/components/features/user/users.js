import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import ListUserComponent from './ListUserComponent';
import CreateUserComponent from './CreateUserComponent';
import ViewUserComponent from './ViewUserComponent';


const Satis = () => {
    return (
    <div className="container">
        <Switch>
              <Route path = "/users" component = {ListUserComponent}></Route>
              <Route path = "/add-user/:id" component = {CreateUserComponent}></Route>
              <Route path = "/view-user/:id" component = {ViewUserComponent}></Route>
        </Switch>
    </div>
    );
};

export default Satis;