import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ListAssetComponent from '../asset/ListAssetComponent';
import CreateAssetComponent from '../asset/CreateAssetComponent';
import ViewAssetComponent from '../asset/ViewAssetComponent';

const Assets = () => {
    return (
        <div className="container">
            <Switch>
                <Route path="/assets" component={ListAssetComponent}></Route>
                <Route path="/add-asset/:id" component={CreateAssetComponent}></Route>
                <Route path="/view-asset/:id" component={ViewAssetComponent}></Route>
            </Switch>
        </div>
    );
};

export default Assets;
