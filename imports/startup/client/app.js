import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Index from "../../ui/pages/index";
import NotFound from "../../ui/pages/notFound";

export default class App extends Component {

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Index} />
                <Route component={NotFound} />
            </Switch>
        )
    }
}
