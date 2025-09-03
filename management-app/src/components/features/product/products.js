import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import ListProductComponent from './ListProductComponent';
import CreateProductComponent from './CreateProductComponent';
import ViewProductComponent from './ViewProductComponent';


const Satis = () => {
    return (
    <div className="container">
        <Switch>
              <Route path = "/products" component = {ListProductComponent}></Route>
              <Route path = "/add-product/:id" component = {CreateProductComponent}></Route>
              <Route path = "/view-product/:id" component = {ViewProductComponent}></Route>
        </Switch>
    </div>
    );
};

export default Satis;