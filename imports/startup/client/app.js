import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Index from "../../ui/pages/index";
import NotFound from "../../ui/pages/notFound";

export class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' render={(props) => {
                    return (<Index {...props} />)
                }} />
                <Route component={NotFound} />
            </Switch>
        )
    }
}

export default withTracker((props) => {
    return {
        children: props.children
    }
})(App);